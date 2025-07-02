import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import { MailerService } from '../common/mailer.service';
export declare class UsersService {
    private readonly prisma;
    private readonly mailerService;
    constructor(prisma: PrismaService, mailerService: MailerService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto & {
        resetCode?: string | null;
        resetCodeExpiresAt?: Date | null;
    }): Promise<User>;
    remove(id: number): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    setResetCode(id: number, code: string, expires: Date): Promise<void>;
}
