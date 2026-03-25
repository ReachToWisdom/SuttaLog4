// 공부 기록 — 캘린더 + 주간 차트 + 약한 단어
import { useState } from 'react'
import {
  getStudyLog,
  getRecentDays,
  getDailyAverage,
  getWeeklyAverage,
  getTotalMinutes,
  getTotalDays,
} from '../../utils/study-tracker'
import { getWeakWords, getWordStats } from '../../utils/wrong-tracker'
import type { DailyLog } from '../../utils/study-tracker'

/** 분 → "X시간 Y분" */
function formatMin(m: number): string {
  if (m < 60) return `${m}분`
  return `${Math.floor(m / 60)}시간 ${m % 60}분`
}

/** 월별 학습 날짜 Set (캘린더용) */
function getMonthStudyDates(year: number, month: number): Set<string> {
  const log = getStudyLog()
  const prefix = `${year}-${String(month + 1).padStart(2, '0')}`
  const dates = new Set<string>()
  for (const [key, val] of Object.entries(log)) {
    if (key.startsWith(prefix) && val.minutes > 0) dates.add(key)
  }
  return dates
}

export default function Stats() {
  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <div className="max-w-lg mx-auto px-4">
      <div className="pt-[max(env(safe-area-inset-top),20px)] pb-4 animate-fadeIn">
        <h1 className="text-2xl font-bold tracking-tight">공부 기록</h1>
      </div>
      <StudyCalendar />
      <WeeklyChart />
      <AverageStats />
      <WordMastery />
      <WeakWordList />
      </div>
    </div>
  )
}

// ══════════════════════════════════════════
// 캘린더 (SuttaLog2 스타일)
// ══════════════════════════════════════════
function StudyCalendar() {
  const [viewDate, setViewDate] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState<DailyLog | null>(null)

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const studyDates = getMonthStudyDates(year, month)
  const firstDow = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const todayStr = new Date().toISOString().slice(0, 10)

  const handleDayClick = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const log = getStudyLog()
    setSelectedDay(log[dateStr] ?? null)
  }

  return (
    <div
      className="rounded-2xl p-4 mb-5 card-shadow animate-slideUp"
      style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border)' }}
    >
      {/* 월 이동 헤더 */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setViewDate(new Date(year, month - 1, 1))}
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ color: 'var(--color-text-secondary)' }}
        >◀</button>
        <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
          {year}년 {month + 1}월
        </p>
        <button
          onClick={() => setViewDate(new Date(year, month + 1, 1))}
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ color: 'var(--color-text-secondary)' }}
        >▶</button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {['일', '월', '화', '수', '목', '금', '토'].map(d => (
          <div key={d} className="text-center text-[10px] font-semibold py-1"
            style={{ color: d === '일' ? '#EF5350' : d === '토' ? '#42A5F5' : 'var(--color-text-tertiary)' }}>
            {d}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDow }).map((_, i) => <div key={`e${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const hasStudy = studyDates.has(dateStr)
          const isToday = dateStr === todayStr
          const dow = (firstDow + i) % 7

          return (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              className="aspect-square flex flex-col items-center justify-center rounded-xl text-xs font-medium transition-all active:scale-90"
              style={{
                backgroundColor: hasStudy
                  ? 'color-mix(in srgb, var(--color-primary) 15%, transparent)'
                  : 'transparent',
                border: isToday ? '2px solid var(--color-primary)' : '2px solid transparent',
                color: dow === 0 ? '#EF5350'
                  : dow === 6 ? '#42A5F5'
                  : hasStudy ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                fontWeight: hasStudy ? 700 : 400,
              }}
            >
              {day}
              {hasStudy && (
                <span className="w-1 h-1 rounded-full mt-0.5"
                  style={{ backgroundColor: 'var(--color-primary)' }} />
              )}
            </button>
          )
        })}
      </div>

      {/* 선택한 날짜 상세 */}
      {selectedDay && (
        <div className="mt-3 pt-3 reveal-down" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold" style={{ color: 'var(--color-text)' }}>
              {selectedDay.date}
            </p>
            <button
              onClick={() => setSelectedDay(null)}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ color: 'var(--color-text-tertiary)', background: 'var(--color-surface-hover)' }}
            >닫기</button>
          </div>
          <div className="flex gap-3 text-center">
            <div className="flex-1 rounded-xl py-2"
              style={{ backgroundColor: 'var(--color-surface-elevated)' }}>
              <p className="text-base font-bold" style={{ color: 'var(--color-primary)' }}>
                {selectedDay.sessions}
              </p>
              <p className="text-[10px]" style={{ color: 'var(--color-text-secondary)' }}>학습 횟수</p>
            </div>
            <div className="flex-1 rounded-xl py-2"
              style={{ backgroundColor: 'var(--color-surface-elevated)' }}>
              <p className="text-base font-bold" style={{ color: 'var(--color-primary)' }}>
                {selectedDay.minutes}
              </p>
              <p className="text-[10px]" style={{ color: 'var(--color-text-secondary)' }}>분</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ══════════════════════════════════════════
// 주간 차트
// ══════════════════════════════════════════
function WeeklyChart() {
  const recent7 = getRecentDays(7)
  const max7 = Math.max(...recent7.map(d => d.minutes), 1)

  return (
    <div
      className="p-5 rounded-2xl mb-5 card-shadow animate-slideUp delay-1"
      style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-light)' }}
    >
      <h2 className="text-sm font-bold mb-4" style={{ color: 'var(--color-text-secondary)' }}>
        최근 7일
      </h2>
      <div className="flex items-end justify-between gap-2 h-28">
        {recent7.map((day, i) => {
          const h = day.minutes > 0 ? Math.max((day.minutes / max7) * 100, 8) : 4
          const dayLabel = new Date(day.date).toLocaleDateString('ko', { weekday: 'short' })
          const isToday = i === recent7.length - 1
          return (
            <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
              {day.minutes > 0 && (
                <span className="text-[10px] font-semibold" style={{ color: 'var(--color-primary)' }}>
                  {day.minutes}분
                </span>
              )}
              <div
                className="w-full rounded-t-lg transition-all"
                style={{
                  height: `${h}%`,
                  background: day.minutes > 0
                    ? (isToday ? 'var(--color-primary-gradient)' : 'var(--color-primary-light)')
                    : 'var(--color-border-light)',
                  minHeight: '4px',
                }}
              />
              <span
                className="text-[10px] font-medium"
                style={{ color: isToday ? 'var(--color-primary)' : 'var(--color-text-tertiary)' }}
              >{dayLabel}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════
// 평균 통계 4칸
// ══════════════════════════════════════════
function AverageStats() {
  return (
    <div className="grid grid-cols-2 gap-3 mb-5">
      <StatBox icon="📅" label="일평균" value={formatMin(getDailyAverage())} />
      <StatBox icon="📊" label="주평균" value={formatMin(getWeeklyAverage())} />
      <StatBox icon="⏱" label="총 학습" value={formatMin(getTotalMinutes())} />
      <StatBox icon="🔥" label="학습 일수" value={`${getTotalDays()}일`} />
    </div>
  )
}

function StatBox({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div
      className="p-4 rounded-xl text-center card-shadow"
      style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-light)' }}
    >
      <span className="text-xl">{icon}</span>
      <p className="text-lg font-bold mt-1" style={{ color: 'var(--color-text)' }}>{value}</p>
      <p className="text-[10px] font-medium" style={{ color: 'var(--color-text-tertiary)' }}>{label}</p>
    </div>
  )
}

// ══════════════════════════════════════════
// 단어 숙달 현황
// ══════════════════════════════════════════
function WordMastery() {
  const wordStats = getWordStats()
  const totalWords = Object.keys(wordStats).length
  const masteredWords = Object.values(wordStats).filter(s => s.correct >= 3 && s.wrong === 0).length

  if (totalWords === 0) return null

  return (
    <div
      className="p-5 rounded-2xl mb-5 card-shadow"
      style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-light)' }}
    >
      <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text-secondary)' }}>
        단어 숙달 현황
      </h2>
      <div className="h-3 rounded-full overflow-hidden mb-2"
        style={{ background: 'var(--color-border-light)' }}>
        <div
          className="h-full rounded-full progress-bar-gradient"
          style={{ width: `${(masteredWords / totalWords) * 100}%` }}
        />
      </div>
      <div className="flex justify-between text-xs">
        <span style={{ color: 'var(--color-text-tertiary)' }}>학습: {totalWords}개</span>
        <span style={{ color: 'var(--color-accent)' }}>숙달: {masteredWords}개</span>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════
// 약한 단어 TOP 10
// ══════════════════════════════════════════
function WeakWordList() {
  const weakWords = getWeakWords(10)
  if (weakWords.length === 0) return null

  return (
    <div
      className="p-5 rounded-2xl card-shadow"
      style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-light)' }}
    >
      <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text-secondary)' }}>
        약한 단어 TOP {weakWords.length}
      </h2>
      <div className="flex flex-col gap-2">
        {weakWords.map((w, i) => {
          const rate = Math.round((w.wrong / (w.correct + w.wrong)) * 100)
          return (
            <div key={w.pali} className="flex items-center gap-3">
              <span className="text-xs font-bold w-5 text-center"
                style={{ color: 'var(--color-text-tertiary)' }}>{i + 1}</span>
              <span className="pali-text text-sm font-semibold flex-1"
                style={{ color: 'var(--color-text)' }}>{w.pali}</span>
              <span className="text-xs" style={{ color: 'var(--color-accent)' }}>✓{w.correct}</span>
              <span className="text-xs" style={{ color: 'var(--color-error)' }}>✗{w.wrong}</span>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{
                  background: rate > 50 ? 'rgba(198,40,40,0.1)' : 'rgba(192,107,10,0.1)',
                  color: rate > 50 ? 'var(--color-error)' : 'var(--color-primary)',
                }}
              >{rate}%오답</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
