# 빠알리어 TTS 음성 생성 가이드 (SuttaLog4)

## 구성

| 항목 | 값 |
|------|-----|
| TTS 엔진 | **edge-tts** (Microsoft Edge 내장 TTS) |
| 음성 | `hi-IN-MadhurNeural` (힌디어 남성) |
| 속도 | `-30%` (30% 감속) |
| 변환 | 빠알리 로마자 → 데바나가리 → edge-tts |
| 실행 환경 | Google Colab (GPU 불필요, 무료) |
| 기존 mp3 | 855개 (SuttaLog2에서 복사) |
| 새로 생성 필요 | 1230개 |

## Colab 실행 절차

### 1단계: 텍스트 추출 (로컬)
```bash
node extract-tts-texts.mjs
# → tts-texts-new.json (새로 생성 필요한 텍스트)
# → tts-texts-all.json (전체 텍스트)
```

### 2단계: Colab 노트북 열기
```
https://colab.research.google.com/github/ReachToWisdom/SuttaLog4/blob/main/colab-tts-generate.ipynb
```
→ 런타임 → 모두 실행 → ZIP 자동 다운로드

### 3단계: ZIP 풀기 + manifest 병합
```bash
# ZIP 해제 → public/audio/에 mp3 복사
# manifest 병합:
node -e "
const fs = require('fs');
const old = JSON.parse(fs.readFileSync('public/audio/manifest.json'));
const add = JSON.parse(fs.readFileSync('manifest-new.json'));
const merged = { ...old, ...add };
fs.writeFileSync('public/audio/manifest.json', JSON.stringify(merged, null, 2));
console.log('병합 완료:', Object.keys(merged).length, '개');
"
```

### 4단계: 커밋 + 배포
```bash
git add public/audio/
git commit -m "음성 파일 추가"
git push
```

## 주의사항

- `/` 포함 텍스트: 생성 시 `,`로 치환 (`text.replace('/', ',')`)
- ipynb 파일 수정: 검증된 노트북을 복사 → 셀 3만 교체
- 파일명 접두사: 기존 `b1_`, `b2_` / 신규 `s4_`
