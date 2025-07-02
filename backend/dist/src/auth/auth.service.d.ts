import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/interfaces/user.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { MailerService } from '../common/mailer.service';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly mailerService;
    constructor(usersService: UsersService, jwtService: JwtService, mailerService: MailerService);
    validateUser(email: string, password: string): Promise<User>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: User;
    }>;
    register(createUserDto: CreateUserDto): Promise<User>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(email: string, code: string, newPassword: string): Promise<{
        message: string;
    }>;
}
