import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    // url에 대한 요청에 대한 테스트
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('welcome to my movie API');
  });

  describe('/movies', () => {
    it('GET', () => {
      // 해당 프로젝트에서 사용하는 가짜 데이터베이스는 시작이 항상 비어있으니까 expect([])
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('POST', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'TEST',
          year: 2022,
          genres: ['TEST'],
        })
        .expect(201);
    });

    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });
});
