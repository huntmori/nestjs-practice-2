import { CatCreateReqeustDto } from './dto/cats.create.request.dto';
import { CatsService } from './cats.service';
import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CatsCreateResponseDto } from './dto/cats.create.response.dto';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
// @UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  private logger = new Logger('CatsController');

  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 500,
    description: 'Server Error..',
  })
  @ApiResponse({
    status: 200,
    description: '성공 (유저생성)',
    type: CatsCreateResponseDto,
  })
  @Post()
  async signup(@Body() body: CatCreateReqeustDto) {
    this.logger.log('request-body:', body);
    return await this.catsService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  login() {
    return 'login';
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logout() {
    return 'Logout';
  }

  @ApiOperation({ summary: '고양이 이미지 업로드' })
  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
