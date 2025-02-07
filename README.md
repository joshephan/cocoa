# 코코아(COCOA), 해외 거래소를 쓰는 코인러들을 위한 서비스

이름의 어원: '코'인'코'인코리'아' => 코코아

1. 해외 거래소와 한국 거래소 사이에 프리미엄 격차를 보여주는 편의성이 있는 서비스
2. 거래소별 고정 수수료를 계산해서 최적화해주는 곳이 없음
  - 예: 바이낸스 100테더 > 업비트 원화로 바꾸고 싶어
  - 경우의 수가 여러 개: 
    1) 테더 송금
    2) 다른 걸로 교환해서 송금
    3) 각 코인별 프리미엄이 얼마가 발생하고 있는지 + 고정 수수료
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
  - 백엔드 호스팅: GCP(Docker 환경에서 운영)
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