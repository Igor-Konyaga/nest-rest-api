import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { checkPassword, createHashPassword } from './helpers/auth.helpers';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, SignInResponse } from './types/auth.types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(authDto: AuthDto): Promise<void> {
    const { username, password } = authDto;

    const hashedPassword = await createHashPassword(password);

    const user = this.userRepository.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.userRepository.save(user);
    } catch (error) {
      const conflictCode = '23505';

      if (error.code === conflictCode) {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async signIn(authDto: AuthDto): Promise<SignInResponse> {
    const { username, password } = authDto;

    const user = await this.userRepository.findOne({ where: { username } });

    const isPasswordValid = await checkPassword(password, user?.password || '');

    if (user && isPasswordValid) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
