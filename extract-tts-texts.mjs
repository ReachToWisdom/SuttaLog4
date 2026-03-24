// SuttaLog4 — 경전 데이터에서 TTS가 필요한 빠알리어 텍스트 추출
import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataDir = join(__dirname, 'src/data')

const texts = new Set()

// 경전 데이터 파일 목록
const dataFiles = [
  'mangala-words.ts',
  'ratana-words.ts',
  'metta-words.ts',
  'dhammacakka-words.ts',
  'anatta-words.ts',
  'dhammapada-words.ts',
  'satipatthana-kaya.ts',
  'satipatthana-dhamma.ts',
  'grammar-textbook.ts',
  'alphabet.ts',
]

for (const file of dataFiles) {
  try {
    const content = readFileSync(join(dataDir, file), 'utf8')

    // pali 필드: 경전 원문 전체 + 개별 단어
    const paliMatches = content.matchAll(/pali:\s*'([^']+)'/g)
    for (const m of paliMatches) {
      const full = m[1].replace(/\\n/g, ' ').trim()
      if (full.length > 0) texts.add(full)
      // 개별 단어 (클릭 재생용)
      const tokens = full.split(/\s+/)
      for (const token of tokens) {
        const clean = token.replace(/[,.;:!?"'()""''—–\-]/g, '').trim()
        if (clean.length > 0) texts.add(clean)
      }
    }

    // word 필드: teach 스텝 단어
    const wordMatches = content.matchAll(/word:\s*'([^']+)'/g)
    for (const m of wordMatches) {
      const w = m[1].trim()
      if (w.length > 0 && !w.includes('/') && !w.startsWith('-')) texts.add(w)
    }

  } catch {
    // 파일 없으면 무시
  }
}

// SuttaLog2 기존 manifest에 있는 것은 제외 (이미 MP3 있음)
let existingTexts = new Set()
try {
  const manifest = JSON.parse(readFileSync(join(__dirname, 'public/audio/manifest.json'), 'utf8'))
  existingTexts = new Set(Object.keys(manifest).map(k => k.toLowerCase()))
} catch {
  console.log('기존 manifest 없음 — 전체 생성')
}

const newTexts = [...texts].filter(t => !existingTexts.has(t.toLowerCase())).sort()
const allTexts = [...texts].sort()

console.log(`전체 텍스트: ${allTexts.length}개`)
console.log(`기존 MP3: ${existingTexts.size}개`)
console.log(`새로 생성 필요: ${newTexts.length}개`)

// 전체 저장
writeFileSync(
  join(__dirname, 'tts-texts-all.json'),
  JSON.stringify(allTexts, null, 2),
  'utf8'
)

// 새로 생성 필요한 것만 저장
writeFileSync(
  join(__dirname, 'tts-texts-new.json'),
  JSON.stringify(newTexts, null, 2),
  'utf8'
)

console.log('\ntts-texts-all.json 저장 완료')
console.log('tts-texts-new.json 저장 완료 (Colab에 업로드)')

// 미리보기
newTexts.slice(0, 15).forEach(t => console.log(`  ${t}`))
if (newTexts.length > 15) console.log(`  ... 외 ${newTexts.length - 15}개`)
