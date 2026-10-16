# 도톨패턴 스튜디오

도형 또는 이미지 1–5개로 패턴을 만드는 브라우저 기반 편집기입니다.

- 크기, 개수, 회전, 가로·세로 엇갈림 조절
- 보색·유사색 생성 및 추천 색상 조합 24종
- 정사각형 1200×1200, 캐러셀 1080×1350, PPT 1920×1080 미리보기 및 PNG 저장
- 이미지 처리는 브라우저에서 수행하며 서버에 업로드하지 않습니다.

## 실행

index.html을 브라우저에서 열면 됩니다. 설치 및 빌드가 필요하지 않습니다.

## Cloudflare Pages 배포

GitHub 저장소를 Cloudflare Pages에 연결합니다.

- Production branch: main
- Framework preset: None
- Build command: 비워둠
- Build output directory: .
- Root directory: 기본값

배포 후 제공되는 pages.dev 주소로 접속할 수 있습니다. 이 프로젝트에는 유료 API나 서버 함수가 없습니다.

## 외부 리소스

Noto Sans KR 웹폰트를 Google Fonts에서 불러옵니다. 색감은 Color Hunt 및 Adobe Color의 분류와 색상 조화 방식에서 영감을 받아 구성했습니다. 보색은 HSL 색상환의 180°, 유사색은 ±30°를 기준으로 계산합니다.

업로드하는 이미지의 사용 권한은 각 이미지의 권리 조건을 확인해 주세요.
