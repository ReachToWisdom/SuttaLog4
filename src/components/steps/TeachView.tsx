// 단어 학습 카드 — SuttaLog2 스타일 (단일 카드 통합)
import type { TeachStep } from '../../data/types'
import { speakPali } from '../../utils/pali-tts'
import { formatPron } from '../../utils/pron-display'

interface Props {
  step: TeachStep
  onNext: () => void
  onBack?: () => void
}

export default function TeachView({ step, onNext, onBack }: Props) {
  const handleSpeak = () => {
    if (localStorage.getItem('suttalog4-sound') !== 'off') speakPali(step.word)
  }

  return (
    <div className="step-enter px-5 py-4 flex flex-col items-center gap-3">

      {/* 경전 구절 인용 */}
      {step.verseLine && (
        <div className="w-full max-w-sm intro-fade-up">
          <div className="pl-3 py-2 rounded-r-lg"
            style={{ borderLeft: '3px solid var(--color-primary)', background: 'var(--color-primary-glow)' }}>
            <p className="pali-text text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              {step.verseLine}
            </p>
            {step.verseLineKo && (
              <p className="text-[11px] mt-1 italic" style={{ color: 'var(--color-text-tertiary)' }}>
                {step.verseLineKo}
              </p>
            )}
          </div>
        </div>
      )}

      {/* 메인 단어 카드 (SuttaLog2: 단일 카드에 단어+발음+뜻 통합) */}
      <div
        className="w-full max-w-sm rounded-2xl p-6 text-center intro-fade-up card-shadow"
        style={{ backgroundColor: 'var(--color-surface)', border: '2px solid var(--color-primary)' }}
      >
        {step.icon && <span className="text-3xl block mb-1">{step.icon}</span>}

        {/* 빠알리 단어 (클릭 시 발음) */}
        <p
          className="pali-text text-3xl font-bold cursor-pointer active:opacity-60 transition-opacity"
          style={{ color: 'var(--color-primary)' }}
          onClick={handleSpeak}
        >
          {step.word} <span className="text-sm align-middle opacity-40">🔊</span>
        </p>

        {/* 발음 뱃지 */}
        <span
          className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium"
          style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 10%, transparent)', color: 'var(--color-primary)' }}
        >
          {formatPron(step.pronKo, step.pronEn)}
        </span>

        <hr className="my-3" style={{ borderColor: 'var(--color-border)' }} />

        {/* 뜻 */}
        <p className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
          {step.meaning}
        </p>

        {/* 문법 태그 */}
        {step.grammar && (
          <span
            className="inline-block mt-2 px-3 py-1 rounded-full text-xs"
            style={{ backgroundColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
          >
            {step.grammar}
          </span>
        )}

        {step.root && (
          <p className="text-[10px] mt-2" style={{ color: 'var(--color-text-tertiary)' }}>
            어근: {step.root}
          </p>
        )}
      </div>

      {/* 하단 버튼 */}
      <div className="flex gap-3 w-full max-w-sm mt-2">
        {onBack && (
          <button onClick={onBack} className="btn-secondary flex-1 py-3 text-sm">
            ← 이전
          </button>
        )}
        <button onClick={onNext} className="btn-primary flex-1 py-3 text-sm">
          다음 →
        </button>
      </div>
    </div>
  )
}
