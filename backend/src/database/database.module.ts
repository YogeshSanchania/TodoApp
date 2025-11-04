import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { Prisma, PrismaClient } from '@prisma/client';

@Module({
  imports: [PrismaClient],
  providers: [DatabaseService],
  exports: [DatabaseService]
})
export class DatabaseModule {}
