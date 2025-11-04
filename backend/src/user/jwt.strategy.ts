import { BadRequestException, Injectable, Req } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { DatabaseService } from "src/database/database.service";
import { request, Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly databaseService: DatabaseService) {
        super({

            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    console.log('--- JWT Extraction Attempt ---');
                    console.log('Request cookies:', req?.cookies);
                    const token = req?.cookies?.token;
                    if (token) {
                        console.log('Found token in cookie:', token);
                    } else {
                        console.log('No token found in cookie.');
                    }
                    return token;
                },
                ExtractJwt.fromAuthHeaderAsBearerToken()
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'super-secret-key-for-this-test-app',
        });

    }

    async validate(payload: any) {
        const userId = Number(payload.userId);
        console.log(`userId in validate: ${userId}`);
        if (isNaN(userId))
            throw new BadRequestException('Invalid user id');

        const user = await this.databaseService.user.findUnique({ where: { id: userId } });
        return user;
    }
}