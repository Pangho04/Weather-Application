# Weather-Application

REALTEETH 기업 과제 - 날씨 애플리케이션

## 프로젝트 구조

이 프로젝트는 FSD (Feature-Sliced Design) 아키텍처를 따릅니다.

```
src/
├── app/              # 애플리케이션 초기화 및 설정
│   ├── providers/    # 프로바이더 (라우터, 테마 등)
│   └── index.tsx     # 진입점
├── processes/        # 비즈니스 프로세스
├── pages/            # 페이지 컴포넌트
│   └── home/         # 홈 페이지
├── widgets/          # 복합 UI 블록
│   └── weather-card/ # 날씨 카드 위젯
├── features/         # 비즈니스 기능
│   └── weather-search/ # 날씨 검색 기능
├── entities/         # 비즈니스 엔티티
│   └── weather/      # 날씨 엔티티
└── shared/           # 공유 코드
    ├── ui/           # 공유 UI 컴포넌트
    ├── lib/          # 공유 라이브러리
    ├── config/       # 공유 설정
    └── styles/       # 공유 스타일
```

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

### 미리보기

```bash
npm run preview
```

## 기술 스택

- React 18
- TypeScript
- Vite
- React Router
- FSD Architecture

## 코드 품질 도구

### ESLint & Prettier

이 프로젝트는 Airbnb ESLint 규칙과 Prettier를 사용합니다.

```bash
# 린트 검사
npm run lint

# 린트 자동 수정
npm run lint:fix

# 코드 포맷팅
npm run format

# 포맷팅 검사
npm run format:check
```

### Husky & lint-staged

커밋과 푸시 시 자동으로 린트 검사가 실행됩니다.

- **pre-commit**: 변경된 파일에 대해 ESLint와 Prettier 자동 수정
- **pre-push**: 전체 프로젝트에 대해 린트 검사

Husky 초기화:

```bash
npm run prepare
```

## 환경 변수

`.env` 파일을 생성하고 다음 변수를 설정하세요:

```
VITE_API_BASE_URL=https://api.openweathermap.org/data/2.5
```
