import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Body,
  Query,
} from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies') // 127.0.0.1:3000/movies url로 이어지는 컨트롤러
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    // @Req() req, @Res() res
    // NestJS는 express 위에서 돌아가기 때문에 req,res 객체에 접근 가능 -> 그러나 express 객체를 직접적으로 사용하는 것은 좋은 방법은 아님
    // Fastify처럼 express랑은 다른 방법을 쓰고 싶을 수 있으니까
    return this.movieService.getAll();
  }

  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `We are searching for a movie made after: ${searchingYear}`;
  }

  @Get(':id')
  getOne(@Param('id') movieId: number): Movie {
    // url로 받은 값은 모두 string이라 우리가 다시 number로 바꿔서 사용해야하는데 transform을 true로 설정해주면 자동으로 타입을 변환해준다.
    // +string 하면 number로 형변환
    console.log(typeof movieId);
    return this.movieService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDTO) {
    return this.movieService.create(movieData);
  }

  @Delete(':id')
  remove(@Param('id') movieId: number) {
    return this.movieService.deleteOne(movieId);
  }

  @Patch(':id') // Put은 모두 업데이트 Patch는 일부 리소스만 업데이트
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDTO) {
    return this.movieService.update(movieId, updateData);
  }
}
