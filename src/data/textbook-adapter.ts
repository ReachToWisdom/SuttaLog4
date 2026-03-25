// SuttaLog2 StepType → SuttaLog4 Step 변환 어댑터
// teach-grammar → verse (표 형태로), match-listen → quiz, writing → teach, speak → teach, arrange → quiz
import type { Step } from './types'
import type { StepType } from './textbook/types'

/** SuttaLog2 스텝 배열을 SuttaLog4 스텝 배열로 변환 */
export function convertTextbookSteps(steps: StepType[]): Step[] {
  return steps.map(convertStep).filter((s): s is Step => s !== null)
}

function convertStep(s: StepType): Step | null {
  switch (s.type) {
    case 'intro':
      return { type: 'intro', title: s.title, subtitle: s.subtitle, description: s.description, icon: s.icon }

    case 'teach':
      return {
        type: 'teach', word: s.word, pronKo: s.pronKo, meaning: s.meaning,
        icon: s.icon, grammar: s.grammar,
        verseLine: s.verseLine, verseLineKo: s.verseLineKo,
      }

    case 'teach-grammar':
      // 문법 설명을 verse 스텝으로 변환 (원문=규칙, 번역=설명)
      return {
        type: 'verse',
        pali: `📐 ${s.title}\n\n${s.example}`,
        pronKo: s.exampleKo,
        translation: s.explanation,
        words: [],
      }

    case 'verse':
      return {
        type: 'verse', pali: s.pali, pronKo: s.pronKo, translation: s.translation,
        words: (s.highlight || []).map(h => ({ pali: h, pronKo: '', meaning: '' })),
        note: s.note,
      }

    case 'quiz':
      return {
        type: 'quiz', question: s.question, options: s.options, answer: s.answer,
        explanation: { correct: s.hint || `정답: ${s.options[s.answer]}` },
        hint: s.hint,
      }

    case 'match-reverse':
      return {
        type: 'match-reverse',
        meaning: s.meaning ?? (s as { instruction?: string }).instruction ?? '',
        options: s.options, answer: s.answer,
        explanation: { correct: `정답: ${s.options[s.answer]}` },
      }

    case 'match-listen':
      // 음성 듣고 맞추기 → 일반 퀴즈로 변환
      return {
        type: 'quiz',
        question: `"${s.word}"의 발음을 듣고 맞추세요 🔊`,
        options: s.options, answer: s.answer,
        explanation: { correct: `${s.word} = ${s.pronKo}` },
      }

    case 'writing':
      // 쓰기 → teach로 변환
      return {
        type: 'teach', word: s.answer, pronKo: s.pronKo, meaning: s.meaning, icon: '✍️',
      }

    case 'speak':
      // 발음 연습 → teach로 변환
      return {
        type: 'teach', word: s.pali, pronKo: s.pronKo, meaning: '발음 연습', icon: '🔊',
      }

    case 'arrange':
      // 순서 조립 → quiz로 변환
      return {
        type: 'quiz',
        question: `다음을 올바른 순서로 조립하세요:\n${s.translation}`,
        options: s.blocks.map((_) => s.correctOrder.map(idx => s.blocks[idx]).join(' ')).slice(0, 1)
          .concat([
            s.blocks.join(' '),
            [...s.blocks].reverse().join(' '),
            s.blocks.slice(1).concat(s.blocks.slice(0, 1)).join(' '),
          ]),
        answer: 0,
        explanation: { correct: `올바른 순서: ${s.correctOrder.map(i => s.blocks[i]).join(' ')}` },
      }

    default:
      return null
  }
}
