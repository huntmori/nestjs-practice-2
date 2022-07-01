import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class CatsCreateResponseDto extends PickType(Cat, [
  'email',
  'name',
] as const) {
  @ApiProperty({
    example: '123456789',
    description: 'id',
  })
  id: string;
}
