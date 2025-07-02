"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcryptjs");
const mailer_service_1 = require("../common/mailer.service");
const crypto_1 = require("crypto");
let AuthService = class AuthService {
    usersService;
    jwtService;
    mailerService;
    constructor(usersService, jwtService, mailerService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.mailerService = mailerService;
    }
    async validateUser(email, password) {
        const user = await this.usersService.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        throw new common_1.UnauthorizedException('Invalid credentials');
    }
    async login(loginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        const payload = { sub: user.id, email: user.email, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user,
        };
    }
    async register(createUserDto) {
        return this.usersService.create(createUserDto);
    }
    async forgotPassword(email) {
        const user = await this.usersService.findByEmail(email);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const code = (0, crypto_1.randomBytes)(3).toString('hex').toUpperCase();
        const expires = new Date(Date.now() + 15 * 60 * 1000);
        await this.usersService.setResetCode(user.id, code, expires);
        await this.mailerService.sendPasswordResetCode(user.email, code);
        return { message: 'Password reset code sent to your email.' };
    }
    async resetPassword(email, code, newPassword) {
        const user = await this.usersService.findByEmail(email);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (!user.resetCode || !user.resetCodeExpiresAt)
            throw new common_1.BadRequestException('No reset code set.');
        if (user.resetCode !== code)
            throw new common_1.BadRequestException('Invalid reset code.');
        if (user.resetCodeExpiresAt < new Date())
            throw new common_1.BadRequestException('Reset code expired.');
        await this.usersService.update(user.id, { password: newPassword, resetCode: null, resetCodeExpiresAt: null });
        return { message: 'Password has been reset successfully.' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        mailer_service_1.MailerService])
], AuthService);
//# sourceMappingURL=auth.service.js.map