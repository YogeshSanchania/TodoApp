import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { DatabaseService } from 'src/database/database.service';

@Module({
  imports: [DatabaseModule, 
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
    secret: process.env.JWT_SECRET || 'super-secret-key-for-this-test-app',
    signOptions: { expiresIn: '1h' }
  })],
  providers: [UserService, JwtStrategy, DatabaseService],
  controllers: [UserController]
})
export class UserModule { }
