// 설정 화면 — SuttaLog2 스타일 (섹션별 그룹, 토글, 글꼴, 동기화)
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { STORAGE_PREFIX, APP_NAME, APP_VERSION, getGrammarHintEnabled, setGrammarHintEnabled } from '../../config'
import { isSyncConfigured, isSyncLoggedIn, getSyncUser, initSync, syncLogin, syncLogout, pushToCloud, pullFromCloud } from '../../utils/sync'
import { FONT_SIZES, getSavedFontSize, setFontSize, type FontSizeKey } from '../../utils/font-size'

/** 애니메이션 토글 스위치 */
function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange}
      className="relative w-[50px] h-[28px] rounded-full transition-colors duration-300 flex-shrink-0"
      style={{ backgroundColor: value ? 'var(--color-accent)' : 'var(--color-border)' }}
      role="switch" aria-checked={value}>
      <span className="absolute inset-0.5 rounded-full transition-opacity duration-300"
        style={{ background: value ? 'linear-gradient(135deg, rgba(255,255,255,0.15), transparent)' : 'none' }} />
      <span className="absolute top-[3px] w-[22px] h-[22px] bg-white rounded-full transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{ left: value ? '25px' : '3px', boxShadow: '0 1px 4px rgba(0,0,0,0.18)' }} />
    </button>
  )
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-wider px-1 mb-2"
      style={{ color: 'var(--color-text-tertiary)' }}>{children}</h2>
  )
}

function SettingRow({ icon, title, desc, right, onClick, danger }: {
  icon: React.ReactNode; title: string; desc: string; right?: React.ReactNode; onClick?: () => void; danger?: boolean
}) {
  const Tag = onClick ? 'button' : 'div'
  return (
    <Tag onClick={onClick}
      className={`flex items-center gap-3 w-full p-4 rounded-2xl text-left transition-all ${onClick ? 'active:scale-[0.98]' : ''}`}
      style={{ backgroundColor: 'var(--color-surface)', border: `1px solid ${danger ? 'var(--color-error-light)' : 'var(--color-border-light)'}` }}>
      <span className="flex items-center justify-center w-9 h-9 rounded-xl text-base flex-shrink-0"
        style={{ backgroundColor: danger ? 'rgba(198,40,40,0.08)' : 'var(--color-surface-elevated)' }}>{icon}</span>
      <div className="flex-1 min-w-0">
        <p className={`font-semibold text-sm ${danger ? 'text-red-500' : ''}`}>{title}</p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{desc}</p>
      </div>
      {right}
    </Tag>
  )
}

export default function Settings() {
  const nav = useNavigate()
  const [sound, setSound] = useState(localStorage.getItem(`${STORAGE_PREFIX}sound`) !== 'off')
  const [pronShow, setPronShow] = useState(localStorage.getItem(`${STORAGE_PREFIX}pronunciation`) !== 'off')
  const [pronEn, setPronEn] = useState(localStorage.getItem(`${STORAGE_PREFIX}pron-en`) === 'on')
  const [grammarHint, setGrammarHint] = useState(getGrammarHintEnabled())
  const [fontSize, setFontSizeState] = useState<FontSizeKey>(getSavedFontSize())
  const [syncLoggedIn, setSyncLoggedIn] = useState(isSyncLoggedIn())
  const [syncLoading, setSyncLoading] = useState(false)
  const [syncMessage, setSyncMessage] = useState('')
  const syncUser = getSyncUser()
  const syncAvailable = isSyncConfigured()

  useEffect(() => {
    if (syncAvailable) initSync((loggedIn) => setSyncLoggedIn(loggedIn))
  }, [syncAvailable])

  const toggleSound = () => { const n = !sound; setSound(n); localStorage.setItem(`${STORAGE_PREFIX}sound`, n ? 'on' : 'off') }
  const togglePron = () => { const n = !pronShow; setPronShow(n); localStorage.setItem(`${STORAGE_PREFIX}pronunciation`, n ? 'on' : 'off') }
  const togglePronEn = () => { const n = !pronEn; setPronEn(n); localStorage.setItem(`${STORAGE_PREFIX}pron-en`, n ? 'on' : 'off') }
  const toggleGrammar = () => { const n = !grammarHint; setGrammarHint(n); setGrammarHintEnabled(n) }
  const changeFontSize = (key: FontSizeKey) => { setFontSizeState(key); setFontSize(key) }

  const handleSyncLogin = async () => { setSyncLoading(true); const ok = await syncLogin(); setSyncLoading(false); setSyncMessage(ok ? '로그인 성공!' : '로그인 실패'); setTimeout(() => setSyncMessage(''), 3000) }
  const handleSyncLogout = async () => { await syncLogout(); setSyncLoggedIn(false); setSyncMessage('로그아웃됨'); setTimeout(() => setSyncMessage(''), 3000) }
  const handlePush = async () => { setSyncLoading(true); const ok = await pushToCloud(); setSyncLoading(false); setSyncMessage(ok ? '업로드 완료!' : '실패'); setTimeout(() => setSyncMessage(''), 3000) }
  const handlePull = async () => { setSyncLoading(true); const ok = await pullFromCloud(); setSyncLoading(false); setSyncMessage(ok ? '다운로드 완료!' : '실패'); if (ok) setTimeout(() => window.location.reload(), 1000); else setTimeout(() => setSyncMessage(''), 3000) }

  const resetProgress = () => {
    if (!confirm('모든 진도를 초기화하시겠습니까?')) return
    const keysToRemove: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith(STORAGE_PREFIX)) keysToRemove.push(key)
    }
    keysToRemove.forEach(k => localStorage.removeItem(k))
    nav('/')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <div className="flex items-center gap-3 px-4 pt-4 pb-3 sticky top-0 z-10 max-w-lg mx-auto"
        style={{ borderBottom: '1px solid var(--color-border-light)', backgroundColor: 'var(--color-bg)' }}>
        <button onClick={() => nav(-1)}
          className="flex items-center justify-center w-8 h-8 rounded-full" style={{ backgroundColor: 'var(--color-surface)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 className="text-lg font-bold">설정</h1>
      </div>

      <div className="px-4 py-5 space-y-6 pb-safe animate-fadeIn max-w-lg mx-auto">
        {/* 학습 */}
        <section>
          <SectionHeader>학습</SectionHeader>
          <div className="space-y-3">
            <SettingRow icon={<span>📐</span>} title="문법 힌트" desc="경전 학습 시 문법 어미 힌트 표시"
              right={<Toggle value={grammarHint} onChange={toggleGrammar} />} />
            <SettingRow icon={<span>🔊</span>} title="소리" desc="TTS 발음 재생"
              right={<Toggle value={sound} onChange={toggleSound} />} />
            <SettingRow icon={<span>🔤</span>} title="발음 표시" desc="경전 원문 밑에 한글 발음"
              right={<Toggle value={pronShow} onChange={togglePron} />} />
            <SettingRow icon={<span>🌐</span>} title="영어 발음 병기" desc="한글 발음 옆에 영어 발음"
              right={<Toggle value={pronEn} onChange={togglePronEn} />} />
          </div>
        </section>

        {/* 글꼴 크기 */}
        <section>
          <SectionHeader>글씨 크기</SectionHeader>
          <div className="p-4 rounded-2xl space-y-3"
            style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border-light)' }}>
            <div className="text-center py-2 rounded-xl" style={{ backgroundColor: 'var(--color-surface-elevated)' }}>
              <p className="pali-text font-bold" style={{ color: 'var(--color-primary)' }}>Dhammaṃ care sucaritaṃ</p>
              <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>법을 잘 실천하라</p>
            </div>
            <div className="flex gap-2">
              {FONT_SIZES.map(s => (
                <button key={s.key} onClick={() => changeFontSize(s.key)}
                  className="flex-1 py-2.5 rounded-xl text-center font-semibold transition-all active:scale-[0.96]"
                  style={{
                    fontSize: `${s.px - 4}px`,
                    backgroundColor: fontSize === s.key ? 'var(--color-primary)' : 'var(--color-surface-elevated)',
                    color: fontSize === s.key ? 'white' : 'var(--color-text)',
                    border: fontSize === s.key ? '1.5px solid var(--color-primary)' : '1.5px solid var(--color-border-light)',
                  }}>{s.label}</button>
              ))}
            </div>
          </div>
        </section>

        {/* 동기화 */}
        <section>
          <SectionHeader>클라우드 동기화</SectionHeader>
          {!syncAvailable ? (
            <div className="p-4 rounded-2xl text-center text-xs"
              style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border-light)', color: 'var(--color-text-secondary)' }}>
              Firebase 설정이 필요합니다.
            </div>
          ) : !syncLoggedIn ? (
            <SettingRow icon={<span>☁️</span>} title="Google 로그인" desc="기기간 진도 동기화" onClick={handleSyncLogin}
              right={syncLoading ? <span className="animate-spin text-sm">⏳</span> : undefined} />
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 rounded-2xl"
                style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-accent)' }}>
                {syncUser?.photoURL ? <img src={syncUser.photoURL} alt="" className="w-9 h-9 rounded-full" /> :
                  <span className="flex items-center justify-center w-9 h-9 rounded-full text-base" style={{ backgroundColor: 'var(--color-surface-elevated)' }}>👤</span>}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{syncUser?.displayName || syncUser?.email}</p>
                  <p className="text-xs truncate" style={{ color: 'var(--color-text-secondary)' }}>{syncUser?.email}</p>
                </div>
                <span className="badge badge-success">연결됨</span>
              </div>
              <div className="flex gap-2">
                <button onClick={handlePush} disabled={syncLoading}
                  className="flex-1 py-3 rounded-xl text-sm font-bold transition-all active:scale-[0.98]"
                  style={{ backgroundColor: 'var(--color-surface)', border: '1.5px solid var(--color-border-light)' }}>
                  ⬆️ 업로드
                </button>
                <button onClick={handlePull} disabled={syncLoading}
                  className="flex-1 py-3 rounded-xl text-sm font-bold transition-all active:scale-[0.98]"
                  style={{ backgroundColor: 'var(--color-surface)', border: '1.5px solid var(--color-border-light)' }}>
                  ⬇️ 다운로드
                </button>
              </div>
              <SettingRow icon={<span>🚪</span>} title="로그아웃" desc="동기화 연결 해제" onClick={handleSyncLogout} />
            </div>
          )}
          {syncMessage && (
            <div className="mt-2 p-3 rounded-xl text-center text-xs font-medium animate-fadeIn"
              style={{ backgroundColor: syncMessage.includes('실패') ? 'rgba(198,40,40,0.08)' : 'rgba(46,125,50,0.08)',
                color: syncMessage.includes('실패') ? 'var(--color-error)' : 'var(--color-accent)' }}>
              {syncMessage}
            </div>
          )}
        </section>

        {/* 데이터 */}
        <section>
          <SectionHeader>데이터</SectionHeader>
          <SettingRow icon={<span>🗑️</span>} title="진도 초기화" desc="모든 학습 진도를 초기화합니다"
            onClick={resetProgress} danger />
        </section>

        {/* 정보 */}
        <section>
          <SectionHeader>정보</SectionHeader>
          <div className="p-5 rounded-2xl space-y-3"
            style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border-light)' }}>
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-11 h-11 rounded-2xl text-xl"
                style={{ background: 'var(--color-primary-gradient)', color: '#fff' }}>🪷</span>
              <div>
                <p className="font-bold text-sm">{APP_NAME}</p>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>v{APP_VERSION}</p>
              </div>
            </div>
            <hr style={{ borderColor: 'var(--color-divider)' }} />
            <div className="space-y-1.5 text-xs">
              <div className="flex gap-2"><span className="font-semibold min-w-[60px]" style={{ color: 'var(--color-text-secondary)' }}>제작</span><span>혜통</span></div>
              <div className="flex gap-2"><span className="font-semibold min-w-[60px]" style={{ color: 'var(--color-text-secondary)' }}>교재</span><span>De Silva — Pāli Primer</span></div>
            </div>
            <p className="text-[10px] text-center pt-1" style={{ color: 'var(--color-text-tertiary)' }}>
              Sadhu! Sadhu! Sadhu! 🙏
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
