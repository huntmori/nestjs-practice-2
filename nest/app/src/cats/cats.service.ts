import { CatCreateReqeustDto } from './dto/cats.create.request.dto';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';
import * as bcrypt from 'bcrypt';
import { CatsCreateResponseDto } from './dto/cats.create.response.dto';
import { CatsRepository } from './cats.repository';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async signUp(body: CatCreateReqeustDto): Promise<CatsCreateResponseDto> {
    const { email, name, password } = body;
    const isCatExist = await this.catsRepository.existsByEmail(email);

    if (isCatExist) {
      throw new UnauthorizedException('이미 가입된 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    const responseDto = new CatsCreateResponseDto();
    responseDto.id = cat.id;
    responseDto.name = cat.name;
    responseDto.email = cat.email;
    return cat.readOnlyData;
  }
}
