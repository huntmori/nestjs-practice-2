import { PositiveIntPipe } from './../common/pipes/positiveInt.pipe';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { CatsService } from './cats.service';
import {
  Controller,
  Delete,
  Get,
  HttpException,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
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
  // @UseFilters(HttpExceptionFilter)
  getAllCat() {
    throw new HttpException('api is borken', 401);
    return 'allCat';
  }

  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe, PositiveIntPipe) param: number) {
    this.logger.log('controller-getOneCat');
    return { cats: 'get one cat.' };
  }

  @Put(':id')
  updateCat() {
    return 'update cat';
  }

  @Patch(':id')
  updatePartialCat() {
    return;
  }

  @Delete(':id')
  deleteOne() {
    return 'delete cat';
  }
}
