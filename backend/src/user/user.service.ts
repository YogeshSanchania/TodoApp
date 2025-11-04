import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/dto/login-user.dto';

@Injectable()
export class UserService {

    constructor(private readonly databaseService: DatabaseService,
        private readonly jwtService: JwtService
    ) { }


    async getAllUsers() {
        return await this.databaseService.user.findMany();
    }
    async getUserById(id: number) {
        return await this.databaseService.user.findUnique({ where: { id } });
    }

    async createUser(userDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(userDto.password, 10);
        try {
            const existingUser = await this.databaseService.user.findUnique({
                where: { email: userDto.email },
            });
            if (existingUser) {
                throw new ConflictException('User with this email already exists');
            }
            await this.databaseService.user.create({
                data: {
                    email: userDto.email,
                    password: hashedPassword,
                    name: userDto.name,
                },
            });
            return { message: 'User created successfully' };
        } catch (ex) {
            if (ex instanceof ConflictException) {
                throw ex;
            }
            throw new InternalServerErrorException('Failed to create user');
        }
    }

    private async validateUser(email: string, password: string): Promise<any> {
        const user = await this.databaseService.user.findUnique({ where: { email } });
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(userDto: LoginUserDto) {
        const user = await this.validateUser(userDto.email, userDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const token = this.jwtService.sign({ userId: user.id }, { secret: process.env.JWT_SECRET || 'super-secret-key-for-this-test-app' });
        return { user, access_token: token };
    }
}
