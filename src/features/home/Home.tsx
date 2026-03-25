// 홈 화면 — SuttaLog2 스타일 (캘린더 포함)
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { buildAllLessons } from '../../data/lessons-index'
import { STORAGE_PREFIX, APP_NAME } from '../../config'
import { QUOTES } from '../../data/quotes'
import { getStudyLog } from '../../utils/study-tracker'
import { formatPron, isPronVisible } from '../../utils/pron-display'

function getProgress(lessonId: string): number {
  const val = localStorage.getItem(`${STORAGE_PREFIX}lesson-${lessonId}`)
  return parseFloat(val ?? '0') || 0
}

function getGreetingInfo() {
  const h = new Date().getHours()
  if (h < 6) return { text: '새벽 수행의 시간입니다', emoji: '🌙', period: 'dawn' as const }
  if (h < 12) return { text: '좋은 아침입니다', emoji: '🌅', period: 'morning' as const }
  if (h < 18) return { text: '좋은 오후입니다', emoji: '☀️', period: 'afternoon' as const }
  return { text: '고요한 저녁입니다', emoji: '🌿', period: 'evening' as const }
}

const CR = 24, CC = 2 * Math.PI * CR

export default function Home() {
  const nav = useNavigate()
  const LESSONS = buildAllLessons()
  const streak = parseInt(localStorage.getItem(`${STORAGE_PREFIX}study-streak`) ?? '0', 10) || 0
  const completed = LESSONS.filter(l => getProgress(l.id) >= 100).length
  const totalPct = LESSONS.length > 0
    ? Math.round(LESSONS.reduce((sum, l) => sum + getProgress(l.id), 0) / LESSONS.length)
    : 0
  const currentLesson = LESSONS.find(l => getProgress(l.id) < 100) ?? LESSONS[0]
  const currentPct = getProgress(currentLesson.id)

  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
  const quote = QUOTES[dayOfYear % QUOTES.length]
  const greeting = getGreetingInfo()

  return (
    <div className="pb-24 px-4 pt-6 max-w-lg mx-auto">

      {/* ── 상단 인사 카드 ── */}
      <div
        className="rounded-2xl p-4 mb-5 intro-fade-up"
        style={{
          background: greeting.period === 'dawn'
            ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
            : greeting.period === 'morning'
              ? 'linear-gradient(135deg, #fceabb 0%, #f8b500 100%)'
              : greeting.period === 'afternoon'
                ? 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)'
                : 'linear-gradient(135deg, #2c3e50 0%, #3d5866 50%, #2c3e50 100%)',
          color: greeting.period === 'dawn' || greeting.period === 'evening' ? '#fff' : '#1E1B16',
        }}
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">{greeting.emoji}</span>
          <div>
            <p className="text-sm opacity-80 font-medium">{greeting.text}</p>
            <h1 className="text-xl font-bold tracking-tight">{APP_NAME}</h1>
          </div>
          <button onClick={() => nav('/profile')} className="ml-auto w-9 h-9 rounded-full flex items-center justify-center
            bg-white/20 active:scale-95 transition-transform" aria-label="설정">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── 히어로 카드 ── */}
      <button
        onClick={() => nav(`/learn/${currentLesson.id}`)}
        className="w-full rounded-2xl text-left mb-5 intro-fade-up-delay active:scale-[0.98] transition-transform"
        style={{ background: 'var(--color-primary-gradient)', boxShadow: '0 4px 20px rgba(192, 107, 10, 0.35)', border: 'none', padding: 0 }}
      >
        <div className="relative overflow-hidden rounded-2xl p-5">
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)' }} />
          <div className="flex items-center gap-4 relative z-10">
            <div className="relative flex-shrink-0">
              <svg width="64" height="64">
                <circle cx="32" cy="32" r={CR} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
                <circle cx="32" cy="32" r={CR} fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="4"
                  strokeLinecap="round" strokeDasharray={CC} strokeDashoffset={CC * (1 - currentPct / 100)}
                  className="transition-all duration-700" style={{ transform: 'rotate(-90deg)', transformOrigin: '32px 32px' }} />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                {Math.round(currentPct)}%
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-white/60 mb-0.5">
                {currentPct > 0 ? '학습 이어가기' : '학습 시작하기'}
              </p>
              <p className="text-lg font-bold text-white truncate leading-tight">
                {currentLesson.icon} {currentLesson.title}
              </p>
              <p className="text-sm text-white/70 mt-0.5 truncate">{currentLesson.subtitle}</p>
              <div className="mt-2.5 h-1.5 rounded-full overflow-hidden bg-white/20">
                <div className="h-full rounded-full transition-all"
                  style={{ width: `${currentPct}%`, background: 'linear-gradient(90deg, rgba(255,255,255,0.6), rgba(255,255,255,0.95))' }} />
              </div>
            </div>
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </button>

      {/* ── 통계 카드 3칸 ── */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <StatCard icon="📚" label="완료 단원" value={`${completed}`} iconBg="rgba(192,107,10,0.1)" />
        <StatCard icon="🔥" label="연속 학습" value={`${streak}일`} iconBg="rgba(239,83,80,0.1)" />
        <StatCard icon="📖" label="전체 진도" value={`${totalPct}%`} iconBg="rgba(46,125,50,0.1)" />
      </div>

      {/* ── 학습 캘린더 ── */}
      <StudyCalendar />

      {/* ── 오늘의 명구 ── */}
      <div className="rounded-2xl overflow-hidden mt-5"
        style={{ background: 'var(--color-surface)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-border-light)' }}>
        <div className="flex">
          <div className="w-1 flex-shrink-0"
            style={{ background: 'linear-gradient(180deg, var(--color-primary-light), var(--color-primary-dark))' }} />
          <div className="p-4 flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm">🪷</span>
              <span className="text-[0.65rem] font-semibold uppercase tracking-wider"
                style={{ color: 'var(--color-primary)' }}>오늘의 경전 명구</span>
            </div>
            {(() => {
              const paliWords = quote.pali.split(' ')
              const pronKoWords = quote.pronKo.split(' ')
              const pronEnWords = quote.pronEn?.split(' ')
              const showPron = isPronVisible()
              return (
                <div className="flex flex-wrap gap-x-3 gap-y-1 mb-2">
                  {paliWords.map((word, idx) => (
                    <span key={idx} className="inline-flex flex-col items-center">
                      <span className="text-base" style={{ fontFamily: 'var(--font-pali)', fontStyle: 'italic', color: 'var(--color-text)', fontWeight: 500 }}>
                        {idx === 0 ? `\u201C${word}` : idx === paliWords.length - 1 ? `${word}\u201D` : word}
                      </span>
                      {showPron && pronKoWords[idx] && (
                        <span className="text-[0.65rem] mt-0.5" style={{ color: 'var(--color-primary)' }}>
                          {formatPron(pronKoWords[idx], pronEnWords?.[idx])}
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              )
            })()}
            <p className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>{quote.ko}</p>
            <p className="text-[0.65rem]" style={{ color: 'var(--color-text-tertiary)' }}>— {quote.source}</p>
          </div>
        </div>
      </div>

      {/* ── 푸터 ── */}
      <div className="pt-6 pb-4 text-center">
        <p className="text-[10px]" style={{ color: 'var(--color-text-tertiary)' }}>
          제작: 혜통
        </p>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, iconBg }: { icon: string; label: string; value: string; iconBg: string }) {
  return (
    <div className="p-3.5 rounded-xl text-center"
      style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-light)', boxShadow: 'var(--shadow-sm)' }}>
      <div className="w-10 h-10 rounded-full mx-auto flex items-center justify-center mb-2" style={{ background: iconBg }}>
        <span className="text-lg">{icon}</span>
      </div>
      <p className="text-xl font-bold leading-tight" style={{ color: 'var(--color-text)' }}>{value}</p>
      <p className="text-[0.65rem] font-medium mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>{label}</p>
    </div>
  )
}

// ── 학습 캘린더 (SuttaLog2 스타일) ──
function StudyCalendar() {
  const [viewDate, setViewDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstDow = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const todayStr = new Date().toISOString().slice(0, 10)
  const log = getStudyLog()

  const studyDates = new Set(
    Object.keys(log).filter(k => k.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`) && log[k].minutes > 0)
  )

  const selectedLog = selectedDate ? log[selectedDate] : null

  return (
    <div className="rounded-2xl p-4"
      style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-light)', boxShadow: 'var(--shadow-sm)' }}>
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => setViewDate(new Date(year, month - 1, 1))}
          className="w-8 h-8 flex items-center justify-center rounded-full active:scale-90"
          style={{ color: 'var(--color-text-secondary)' }}>◀</button>
        <p className="text-sm font-bold">{year}년 {month + 1}월</p>
        <button onClick={() => setViewDate(new Date(year, month + 1, 1))}
          className="w-8 h-8 flex items-center justify-center rounded-full active:scale-90"
          style={{ color: 'var(--color-text-secondary)' }}>▶</button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {['일', '월', '화', '수', '목', '금', '토'].map(d => (
          <div key={d} className="text-center text-[10px] font-semibold py-1"
            style={{ color: d === '일' ? '#EF5350' : d === '토' ? '#42A5F5' : 'var(--color-text-tertiary)' }}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDow }, (_, i) => <div key={`e${i}`} className="aspect-square" />)}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const hasStudy = studyDates.has(dateStr)
          const isToday = dateStr === todayStr
          return (
            <button key={day} onClick={() => setSelectedDate(hasStudy ? dateStr : null)}
              className="aspect-square flex flex-col items-center justify-center rounded-xl text-xs font-medium transition-all active:scale-90"
              style={{
                backgroundColor: hasStudy ? 'color-mix(in srgb, var(--color-primary) 15%, transparent)' : 'transparent',
                border: isToday ? '2px solid var(--color-primary)' : '2px solid transparent',
                color: hasStudy ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                fontWeight: hasStudy ? 700 : 400,
              }}>
              {day}
              {hasStudy && <span className="w-1 h-1 rounded-full mt-0.5" style={{ backgroundColor: 'var(--color-primary)' }} />}
            </button>
          )
        })}
      </div>
      {selectedLog && (
        <div className="mt-3 pt-3 space-y-2 reveal-down" style={{ borderTop: '1px solid var(--color-border-light)' }}>
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold">{selectedDate}</p>
            <button onClick={() => setSelectedDate(null)} className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>닫기</button>
          </div>
          <div className="flex gap-3 text-center">
            <div className="flex-1 rounded-xl py-2" style={{ backgroundColor: 'var(--color-surface-elevated)' }}>
              <p className="text-base font-bold" style={{ color: 'var(--color-primary)' }}>{selectedLog.sessions}</p>
              <p className="text-[10px]" style={{ color: 'var(--color-text-secondary)' }}>학습 횟수</p>
            </div>
            <div className="flex-1 rounded-xl py-2" style={{ backgroundColor: 'var(--color-surface-elevated)' }}>
              <p className="text-base font-bold" style={{ color: 'var(--color-primary)' }}>{selectedLog.minutes}</p>
              <p className="text-[10px]" style={{ color: 'var(--color-text-secondary)' }}>분</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
