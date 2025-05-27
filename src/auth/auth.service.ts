/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User_Entity } from './db/auth_entity';
import { User_Login_dto } from './db/auth_dot';
import { Login_Dto } from './db/login_dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User_Entity)
    private readonly userRepository: Repository<User_Entity>,
    private readonly jwtService: JwtService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async signup(dto: User_Login_dto): Promise<string> {
    const existing = await this.userRepository.find({ where: { email: dto.email } });
    if (existing.length > 0) {
      throw new ForbiddenException('User already exists');
    }

    const hashedPassword = await this.hashPassword(dto.password);
    const newUser = this.userRepository.create({
      username: dto.username,
      email: dto.email,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(newUser);
    return `User ${savedUser.email} signed up successfully`;
  }

  async login(dto: Login_Dto): Promise<{ user: string; jwtToken: string }> {
    const { username, password } = dto;
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException('This username does not exist.');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Incorrect password');
    }

    const token = this.generateToken(user.username , user.id);
    await this.refreshToken(user.id); // optionally store it

    return {
      user: user.username,
      jwtToken: token,
    };
  }

  private generateToken(username: string, id: number): string {
    try {
      return this.jwtService.sign(
        { username, id },
        {
          secret: process.env.JWT_SECRET || 'default-secret',
          expiresIn: '15m',
        },
      );
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }

  private async refreshToken(userId: number): Promise<string> {
    return this.jwtService.sign(
      { user_id: userId },
      {
        secret: process.env.JWT_REFRESH_SECRET || 'default-refresh-secret',
        expiresIn: '7d',
      },
    );
  }

  private async verifyRefreshToken(token: string): Promise<void> {
    try {
      const decoded = await this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET || 'default-refresh-secret',
      });

      const user = await this.userRepository.findOne({ where: { id: decoded.user_id } });

      if (!user) {
        throw new ForbiddenException('Refresh token invalid');
      }
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
}
