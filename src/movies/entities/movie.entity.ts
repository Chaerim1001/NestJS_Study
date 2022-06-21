// 서비스를 보내고 받을 인터페이스를 export하는 파일
// 원래는 실제 데이터베이스 모델을 만드는 파일 (지금은 연습용 js object)

export class Movie {
  id: number;
  title: string;
  year: number;
  genres: string[];
}
