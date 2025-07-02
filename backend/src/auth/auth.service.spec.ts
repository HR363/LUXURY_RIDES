import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: Partial<UsersService>;

  beforeEach(async () => {
    usersService = {
      create: jest.fn().mockResolvedValue({ id: 1, email: 'test@example.com', password: 'hashed', firstName: 'Test', lastName: 'User', phone: '1234567890', role: 'user', createdAt: new Date(), updatedAt: new Date() })
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: {} },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register a user', async () => {
    const dto: CreateUserDto = {
      email: 'test@example.com',
      password: 'password',
      firstName: 'Test',
      lastName: 'User',
      phone: '1234567890',
    };
    const user = await service.register(dto);
    expect(usersService.create).toHaveBeenCalledWith(dto);
    expect(user.email).toBe(dto.email);
  });
});
