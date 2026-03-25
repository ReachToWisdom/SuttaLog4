// 복습 모드 — 완료한 과에서 랜덤 선택
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { buildAllLessons } from '../../data/lessons-index'
import { STORAGE_PREFIX } from '../../config'

function getProgress(lessonId: string): number {
  const val = localStorage.getItem(`${STORAGE_PREFIX}lesson-${lessonId}`)
  return parseFloat(val ?? '0') || 0
}

export default function Review() {
  const nav = useNavigate()
  const LESSONS = buildAllLessons()

  const completedLessons = useMemo(() =>
    LESSONS.filter(l => getProgress(l.id) >= 100),
  [LESSONS])

  const hasCompleted = completedLessons.length > 0

  return (
    <div className="min-h-screen pb-24"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>

      <div className="px-5 pt-[max(env(safe-area-inset-top),20px)] pb-4 animate-fadeIn">
        <h1 className="text-2xl font-bold tracking-tight">복습</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
          완료한 과에서 랜덤 퀴즈
        </p>
      </div>

      {hasCompleted ? (
        <div className="px-5 space-y-3 animate-slideUp">
          <button
            onClick={() => {
              const random = completedLessons[Math.floor(Math.random() * completedLessons.length)]
              nav(`/review-learn/${random.id}`)
            }}
            className="w-full rounded-2xl p-5 text-left card-shadow transition-all active:scale-[0.98]"
            style={{ background: 'var(--color-primary-gradient)' }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/20">
                <span className="text-2xl">🔄</span>
              </div>
              <div>
                <p className="text-white font-bold text-base">랜덤 복습 시작</p>
                <p className="text-white/70 text-xs mt-0.5">
                  {completedLessons.length}개 과에서 랜덤 선택
                </p>
              </div>
            </div>
          </button>

          <h2 className="text-sm font-bold pt-3" style={{ color: 'var(--color-text-secondary)' }}>
            복습 가능한 과
          </h2>

          {completedLessons.map(lesson => (
            <button
              key={lesson.id}
              onClick={() => nav(`/review-learn/${lesson.id}`)}
              className="w-full flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left card-shadow transition-all active:scale-[0.98]"
              style={{ backgroundColor: 'var(--color-surface)', border: '1.5px solid var(--color-border-light)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'color-mix(in srgb, var(--color-accent) 10%, transparent)' }}>
                <span className="text-lg">{lesson.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[13px] truncate">{lesson.title}</p>
                <p className="text-[11px] mt-0.5 truncate" style={{ color: 'var(--color-text-secondary)' }}>
                  {lesson.subtitle}
                </p>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="var(--color-text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          ))}
        </div>
      ) : (
        <div className="px-5 pt-16 text-center animate-fadeIn">
          <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6"
            style={{ backgroundColor: 'var(--color-surface-elevated)' }}>
            <span className="text-4xl">🔄</span>
          </div>
          <h2 className="text-lg font-bold mb-2">아직 완료한 과가 없습니다</h2>
          <p className="text-sm mb-8" style={{ color: 'var(--color-text-secondary)' }}>
            과를 완료하면 여기서 복습할 수 있어요
          </p>
          <button onClick={() => nav('/courses')} className="btn-primary px-8 py-3 text-sm">
            학습 시작하기
          </button>
        </div>
      )}
    </div>
  )
}
