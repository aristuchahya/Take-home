import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/create-auth.dto';

import { PrismaService } from 'src/common/services/prisma.service';
import { JwtService } from '@nestjs/jwt';

import { BcryptService } from 'src/common/services/bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
  ) {}
  async register(registerDto: RegisterDto) {
    const { fullName, username, email, password } = registerDto;

    await this.ensureUserDoesNotExist(username, email);

    const hashedPassword = await this.bcryptService.hashPassword(password);

    const user = await this.createUser(
      fullName,
      username,
      email,
      hashedPassword,
    );

    const token = await this.generateToken(
      user.id,
      user.username,
      user.fullName,
    );

    return { user, token };
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.findUserByUsername(username);

    await this.validatePassword(password, user.password);

    const token = await this.generateToken(
      user.id,
      user.username,
      user.fullName,
    );

    return { user, token };
  }

  private async ensureUserDoesNotExist(username: string, email: string) {
    const userWithSameEmail = await this.prisma.users.count({
      where: {
        email,
      },
    });

    if (userWithSameEmail > 0)
      throw new BadRequestException('Email already exists');

    const userWithSameUsername = await this.prisma.users.count({
      where: {
        username,
      },
    });

    if (userWithSameUsername > 0)
      throw new BadRequestException('Username already exists');
  }

  private async createUser(
    fullName: string,
    username: string,
    email: string,
    password: string,
  ) {
    return this.prisma.users.create({
      data: {
        fullName,
        username,
        email,
        password,
      },
      select: {
        id: true,
        username: true,
        fullName: true,
      },
    });
  }

  private async findUserByUsername(username: string) {
    const user = this.prisma.users.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        fullName: true,
        username: true,
        email: true,
        password: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  private async validatePassword(password: string, hashedPassword: string) {
    const isMatch = await this.bcryptService.comparePassword(
      password,
      hashedPassword,
    );
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');
  }

  private generateToken(id: string, username: string, fullName: string) {
    const payload = {
      id,
      username,
      fullName,
    };

    return this.jwtService.sign(payload);
  }
}
