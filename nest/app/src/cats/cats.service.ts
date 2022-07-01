import { CatCreateReqeustDto } from './dto/cats.create.request.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';
import * as bcrypt from 'bcrypt';
import { CatsCreateResponseDto } from './dto/cats.create.response.dto';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async signUp(body: CatCreateReqeustDto): Promise<CatsCreateResponseDto> {
    const { email, name, password } = body;
    const isCatExist = await this.catModel.exists({ email });

    if (isCatExist) {
      throw new UnauthorizedException('이미 가입된 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catModel.create({
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
