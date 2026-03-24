// 과목 화면 — 경전 순서 카테고리 목록
import { useNavigate } from 'react-router-dom'
import { buildAllLessons, CATEGORIES } from '../../data/lessons-index'
import { STORAGE_PREFIX } from '../../config'

function getProgress(lessonId: string): number {
  const val = localStorage.getItem(`${STORAGE_PREFIX}lesson-${lessonId}`)
  return parseFloat(val ?? '0') || 0
}

/** 원형 SVG 진도 */
function CircleProgress({ pct }: { pct: number }) {
  const r = 16
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" className="shrink-0">
      <circle cx="20" cy="20" r={r} fill="none" stroke="var(--color-border-light)" strokeWidth="3" />
      {pct > 0 && (
        <circle cx="20" cy="20" r={r} fill="none"
          stroke={pct >= 100 ? 'var(--color-accent)' : 'var(--color-primary)'}
          strokeWidth="3" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 0.4s ease' }}
        />
      )}
      <text x="20" y="20" textAnchor="middle" dominantBaseline="central"
        fill={pct >= 100 ? 'var(--color-accent)' : 'var(--color-text-secondary)'}
        fontSize="10" fontWeight="600">
        {pct >= 100 ? '✓' : `${Math.round(pct)}%`}
      </text>
    </svg>
  )
}

export default function Courses() {
  const navigate = useNavigate()
  const allLessons = buildAllLessons()

  return (
    <div className="pb-20 px-4 pt-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
        목차
      </h1>

      {CATEGORIES.map((cat) => {
        const lessons = allLessons.filter(l => l.category === cat.key)
        if (lessons.length === 0) return null

        return (
          <div key={cat.key} className="mb-6">
            {/* 카테고리 헤더 */}
            <div className="flex items-center gap-3 mb-3 px-1">
              <span className="text-lg">{cat.icon}</span>
              <h2 className="text-sm font-bold" style={{ color: 'var(--color-text-secondary)' }}>
                {cat.label}
              </h2>
              <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                {lessons.length}과
              </span>
            </div>

            {/* 단원 리스트 */}
            <div className="flex flex-col gap-2">
              {lessons.map((lesson) => {
                const pct = getProgress(lesson.id)
                const done = pct >= 100

                return (
                  <button
                    key={lesson.id}
                    onClick={() => navigate(`/learn/${lesson.id}`)}
                    className="w-full flex items-center gap-3 p-3.5 rounded-xl text-left transition-all active:scale-[0.98] card-shadow"
                    style={{
                      background: 'var(--color-surface)',
                      border: done ? '2px solid var(--color-accent)' : '1px solid var(--color-border-light)',
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'var(--color-primary-glow)' }}
                    >
                      <span className="text-base">{lesson.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate" style={{ color: 'var(--color-text)' }}>
                        {lesson.title}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>
                        {lesson.subtitle}
                      </p>
                    </div>
                    <div className="shrink-0">
                      {done ? (
                        <span className="badge badge-success">완료</span>
                      ) : pct > 0 ? (
                        <CircleProgress pct={pct} />
                      ) : (
                        <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>미학습</span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
