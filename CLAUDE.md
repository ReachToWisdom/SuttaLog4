# 빠알리 경전 읽기 (SuttaLog4)

경전 순서대로 읽으며 빠알리어를 배우는 학습앱

## 기술 스택
- React 19 + TypeScript + Vite + Tailwind CSS 4
- Firebase (Firestore + Google Auth) / GitHub Pages 배포
- 포트: 3024 (변경 금지), base: `/SuttaLog4/`

## 핵심 규칙

1. **SSOT**: 설정값/상수는 `src/config/index.ts` 한 곳에 정의
2. **코드 주석 한국어**, 에러 처리 필수 (try-catch)
3. **Safe Parsing**: 모든 parseFloat에 기본값 필수
4. **파일 200줄 제한**
5. **해석 중심**: 문법 퀴즈 없음, 해석/번역 퀴즈만
6. **한 화면 원칙**: 스마트폰 스크롤 없이 표시될 분량

## 포트/컬렉션 (변경 금지)
- 포트: 3024
- Firebase 컬렉션: `suttalog4-users`
- localStorage prefix: `suttalog4-`

## 개발 명령어
```bash
npm run dev      # localhost:3024
npm run build    # tsc + vite build → dist/
```

## 자기 검증

위 규칙을 위반하는 코드를 작성하려 할 때:
1. 즉시 중단하고 "⚠️ SPEC 위반: [항목]" 경고 출력
2. 사용자에게 승인 요청
3. 승인 없이 진행 금지
