import { CatReqeustDto } from './dto/cats.request.dto';
import { PositiveIntPipe } from './../common/pipes/positiveInt.pipe';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { CatsService } from './cats.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
// @UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  private logger = new Logger('CatsController');

  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @Post()
  async signup(@Body() body: CatReqeustDto) {
    this.logger.log('request-body:', body);
    return await this.catsService.signUp(body);
  }

  @Post('login')
  login() {
    return 'login';
  }

  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
