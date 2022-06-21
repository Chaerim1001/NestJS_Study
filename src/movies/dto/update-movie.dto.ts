import { IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDTO } from './create-movie.dto';

// export class UpdateMovieDTO {
//   @IsString()
//   readonly title?: string;

//   @IsNumber()
//   readonly year?: number;

//   @IsString({ each: true })
//   readonly genres?: string[];
// }

// 부분 타입 사용
// mapped-types: 타입을 변환 / 사용할 수 있게 하는 패키지
export class UpdateMovieDTO extends PartialType(CreateMovieDTO) {}
