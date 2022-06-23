import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // beforeEach로 세팅을 해놓으면 테스트마다 (테스트를 위한) 어플리케이션을 생성하게 된다.
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    // ***** e2e 테스트를 할 때에느 테스트에도 실제 어플리케이션의 환경을 그대로 적용시켜줘야 한다.
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
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
      return request(app.getHttpServer()) // 127.0.0.1:3000 이런식으로 쓰는걸 막기 위해
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

  describe('/movies/:id', () => {
    //GET, DELETE, PATCH 모두 테스트 -> it.todo() 사용
    // it.todo('GET');
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer()).get('/movies/999').expect(404);
    });

    // it.todo('PATCH');
    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'Updated Test' })
        .expect(200);
    });

    it.todo('DELETE');
  });
});
