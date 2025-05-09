# 코코아(COCOA), 해외 거래소를 쓰는 코인러들을 위한 서비스

이름의 어원: '코'인'코'인코리'아' => 코코아

1. 해외 거래소와 한국 거래소 사이에 프리미엄 격차를 보여주는 편의성이 있는 서비스
2. 거래소별 고정 수수료를 계산해서 최적화해주는 곳이 없음

- 예: 바이낸스 100테더 > 업비트 원화로 바꾸고 싶어
- 경우의 수가 여러 개:
  1. 테더 송금
  2. 다른 걸로 교환해서 송금
  3. 각 코인별 프리미엄이 얼마가 발생하고 있는지 + 고정 수수료

3. 왜 급등했는지 알려주기

- AI 도구를 사용해서 웹 검색 + 뉴스 자동으로 생성하도록 할 것
- 한국에는 의견을 남기는 곳이 별로 없음, 그러나 외국에는 많다
- 엑스 + 스톡트윗 + 레딧 + 해외발 뉴스
- 뉴스 정보는 브라우저의 로컬 스토리지에 json string으로 변경해서 저장

## 개발 환경

- 프론트엔드: Next.js
- 백엔드: Main API server Nest.js + 추가적으로 데이터를 수집 생성 서버
- 데이터베이스: PostgreSQL
- 프론트 호스팅: Vercel
- 백엔드 호스팅: AWS(Docker 환경에서 운영)
- ORM: Drizzle

## DTO

- Zod: object creation
- 서버사이드와 프론트사이드에서 설령 공용으로 사용되더라도 각자 만들어서 쓸 것

## 상태 관리

- 대부분은 로컬 스테이트면 충분히 다뤄질듯 함
- 리팩터링 과정에서 잘 잡아주는게 더 나을거 같기도 함
- 그냥 무지성 zustand 쓰는게 좋을 수도 있음

## 디자인

- AI가 알아서 해줄 것
- UI 라이브러리: Headless UI + Tailwind CSS + (Styled Components)

## 스플라이스 이미지

- 토큰 이미지들을 모두 모아서 스플라이스 이미지로 합쳐서 background position

## 이미지 저장

- etc에서 npm start를 통해 현재 저장된 수수료가 명시된 코인들에 대해 이미지를 조사해 client에 저장합니다.

## Docker 정리

```bash
# 중지된 컨테이너 삭제
docker container prune -f

# 사용하지 않는 이미지 삭제
docker image prune -a -f

# 사용하지 않는 볼륨 삭제
docker volume prune -f

# 전체 시스템 정리 (네트워크 포함)
docker system prune -a -f --volumes
```

## 가격 예측 플로우맵

1) 상단 메뉴 > 가격 예측(/predict) > 가격 예측 메인 페이지
2) 가격 예측 메인 페이지
- 이벤트 배너(가격 예측 페이지로 이동)
- 랭킹(최다승, 최고 승률, 최대 연속 승)
- 가격 순 정렬된 코인 목록(해당 코인 페이지로 이동 가능)
3) 레디스 처리 내용
- 현재 사용자의 가격 예측(코인 아이디, 유저아이디, 예측 종류(L,S), 진입 가격, 예측 시간, 최종 가격)
- 최종 가격이 생기면서 승패가 업데이트 

## 추가 거래소

- OKX: 완료
- Bybit
- HTX
- Gate.io
- Bitget
- MEXC
- Coinbase

## 관리 메시지 전달

- API를 통해서 허용된 IP 주소로 POST 요청 발생
- 전체 시스템 메시지가 고정적으로 상시 표시
- 관리자가 끄기 전까지 적용

## 수익 인증 공유

- 프로필 페이지 > 가격 예측 기록 > 공유 버튼

## 개별 프로필

- 랭킹, 승률, 승패 횟수, 롱/숏 횟수, 최다승, 최고 승률, 최대 연속 승
- 방명록
- 게시글
- 투데이
- 소셜 링크

- ## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=joshephan/cocoa&type=Date)](https://www.star-history.com/#joshephan/cocoa&Date)
