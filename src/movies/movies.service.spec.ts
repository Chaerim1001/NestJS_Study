// .spec.ts: 테스트가 포함된 파일
// movies.service.spec.ts: movie service를 테스트하는 파일
// NestJS에는 jest가 .spec.ts 파일들을 찾아볼 수 있도록 설정되어 있다.
// jest: 자바스크립트 테스팅 프레임워크

// Testing 1)Unit: function 같은 하나의 유닛을 테스트하는 것 2)e2e: 모든 시스템을 테스팅하는 것
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    // 테스트 하기 전에 실행
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    // individual test
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    it('should return an array', () => {
      // getAll 함수가 array를 반환하는지 테스트하는 코드
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne()', () => {
    it('should return a movie', () => {
      service.create({
        title: 'TEST MOVIE',
        year: 2022,
        genres: ['TEST'],
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    // 에러가 잘 발생하는지 테스트
    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 not found.');
      }
    });
  });

  describe('deleteOne()', () => {
    it('delete a movie', () => {
      service.create({
        title: 'TEST MOVIE',
        year: 2022,
        genres: ['TEST'],
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });

    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create()', () => {
    it('should create a movie', () => {
      // movie 갯수가 늘어났는지 or 마지막으로 생성된 movie의 title이 create한 title과 같은지 등...
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'TEST MOVIE',
        year: 2022,
        genres: ['TEST'],
      });
      const afterCreate = service.getAll().length;
      console.log(beforeCreate, afterCreate);
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });
});
