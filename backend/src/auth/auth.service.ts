import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/interfaces/user.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { MailerService } from '../common/mailer.service';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string, user: User }> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new NotFoundException('User not found');
    const code = randomBytes(3).toString('hex').toUpperCase();
    const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    await this.usersService.setResetCode(user.id, code, expires);
    await this.mailerService.sendPasswordResetCode(user.email, code);
    return { message: 'Password reset code sent to your email.' };
  }

  async resetPassword(email: string, code: string, newPassword: string): Promise<{ message: string }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new NotFoundException('User not found');
    if (!user.resetCode || !user.resetCodeExpiresAt) throw new BadRequestException('No reset code set.');
    if (user.resetCode !== code) throw new BadRequestException('Invalid reset code.');
    if (user.resetCodeExpiresAt < new Date()) throw new BadRequestException('Reset code expired.');
    await this.usersService.update(user.id, { password: newPassword, resetCode: null, resetCodeExpiresAt: null });
    return { message: 'Password has been reset successfully.' };
  }
}
