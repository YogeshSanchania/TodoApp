import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { LoginUserDto } from 'src/dto/login-user.dto';
import express from 'express';
import { PassThrough } from 'stream';
import { JwtAuthGuard } from './jwt.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('check')
    @UseGuards(JwtAuthGuard)
    async checkAuth(@Req() req: any) {
        return { user: req.user };
    }

    @Get()
    async getAllUsers() {
        return await this.userService.getAllUsers();
    }

    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.getUserById(id);
    }

    @Post()
    async createUser(@Body(ValidationPipe) userDto: CreateUserDto) {
        return await this.userService.createUser(userDto);
    }

    @Post('login')
    async login(@Body(ValidationPipe) userDto: LoginUserDto, @Res({ passthrough: true }) res: express.Response) {

        const { user, access_token } = await this.userService.login(userDto);

        res.cookie(
            'token', access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000
        });

        return { access_token, user };
    }



    @Post('logout')
    logout(@Res({ passthrough: true }) res: express.Response) {
        res.clearCookie('token');
        return { message: 'Logged out' };
    }
}
