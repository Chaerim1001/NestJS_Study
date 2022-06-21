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

@Controller('movies') // 127.0.0.1:3000/movies url로 이어지는 컨트롤러
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
  }

  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `We are searching for a movie made after: ${searchingYear}`;
  }

  @Get(':id')
  getOne(@Param('id') movieId: string) {
    // 파라미터로 넘어온 id 값을 알고싶다면? nest 에서는 무언가가 필요하면 요청을 해야한다 -> @Param decorator 사용
    return `This will return one movie with the id: ${movieId}`;
  }

  @Post()
  create(@Body() movieData) {
    return movieData;
  }

  @Delete(':id')
  remove(@Param('id') movieId: string) {
    return `This will delete a movie with the id: ${movieId}`;
  }

  @Patch(':id') // Put은 모두 업데이트 Patch는 일부 리소스만 업데이트
  patch(@Param('id') movieId: string, @Body() updateData) {
    return {
      updatedMoive: movieId,
      ...updateData,
    };
  }
}
