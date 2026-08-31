'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  Compass,
  Layers3,
  LoaderCircle,
  Menu,
  MoveRight,
  Plus,
  Ruler,
  ScanLine,
  Sparkles,
  SunMedium,
  X,
} from 'lucide-react'

const logoSrc = '/logo.png'

const options = {
  room: ['Kitchen', 'Bathroom', 'Living room', 'Entryway'],
  type: ['Wall tile', 'Floor tile', 'Mosaic', 'Large format'],
  colour: ['Warm neutral', 'Cool neutral', 'Terracotta', 'Deep green'],
  size: ['Small / mosaic', 'Medium', 'Large', 'Extra large'],
  finish: ['Matte', 'Satin', 'Glossy', 'Textured'],
  style: ['Quiet luxury', 'Modern organic', 'Japandi', 'Bold editorial'],
  budget: ['Under $8 / sq ft', '$8–$14 / sq ft', '$14–$24 / sq ft', 'Premium'],
}

type Preferences = Record<keyof typeof options, string>

const defaultPreferences: Preferences = {
  room: 'Kitchen',
  type: 'Wall tile',
  colour: 'Warm neutral',
  size: 'Medium',
  finish: 'Matte',
  style: 'Quiet luxury',
  budget: '$8–$14 / sq ft',
}

const tiles = [
  { name: 'Travertine Veil', code: 'TV-04', tone: 'Pale mineral', price: '$12.40', match: '98%', texture: 'travertine' },
  { name: 'Clayline', code: 'CL-22', tone: 'Handmade terracotta', price: '$9.80', match: '94%', texture: 'clay' },
  { name: 'Moss Circuit', code: 'MC-09', tone: 'Deep mineral green', price: '$14.20', match: '91%', texture: 'moss' },
]

function SectionLabel({ children, index }: { children: React.ReactNode; index?: string }) {
  return <div className="section-label"><span>{index ?? '—'}</span><span>{children}</span></div>
}

function SelectField({ label, value, values, onChange }: { label: string; value: string; values: string[]; onChange: (value: string) => void }) {
  return (
    <label className="select-field">
      <span>{label}</span>
      <span className="select-wrap">
        <select value={value} onChange={(event) => onChange(event.target.value)} aria-label={label}>
          {values.map((option) => <option key={option}>{option}</option>)}
        </select>
        <ChevronDown size={15} aria-hidden="true" />
      </span>
    </label>
  )
}

function TileSwatch({ texture }: { texture: string }) {
  return <div className={`tile-swatch ${texture}`} aria-label={`${texture} tile material preview`} role="img"><span /><span /><span /><span /></div>
}

function Topology() {
  return (
    <div className="topology" aria-label="Animated recommendation topology" role="img">
      <div className="topology-ring ring-one" /><div className="topology-ring ring-two" />
      <div className="topology-node node-a">01</div><div className="topology-node node-b">02</div><div className="topology-node node-c">03</div>
      <div className="topology-center"><Sparkles size={23} /><span>match<br />engine</span></div>
      <div className="orbit orbit-one"><span>tone</span></div><div className="orbit orbit-two"><span>light</span></div><div className="orbit orbit-three"><span>scale</span></div>
    </div>
  )
}

export default function Page() {
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences)
  const [isGenerating, setIsGenerating] = useState(false)
  const [hasResults, setHasResults] = useState(false)
  const [saved, setSaved] = useState<string[]>([])
  const [mobileOpen, setMobileOpen] = useState(false)

  const match = useMemo(() => {
    const score = Object.values(preferences).filter(Boolean).length
    return Math.min(99, 86 + score * 2)
  }, [preferences])

  function update(key: keyof typeof options, value: string) {
    setPreferences((current) => ({ ...current, [key]: value }))
    setHasResults(false)
  }

  function generate() {
    setIsGenerating(true)
    setHasResults(false)
    window.setTimeout(() => { setIsGenerating(false); setHasResults(true); document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }, 1800)
  }

  function toggleSave(name: string) { setSaved((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]) }

  return (
    <main>
      <nav className="nav-shell">
        <a className="brand" href="#top" aria-label="Tile.AI home"><Image src={logoSrc} alt="Tile.AI logo" width={46} height={46} className="brand-logo" /><span>Tile<span className="brand-accent">AI</span></span></a>
        <div className={`nav-links ${mobileOpen ? 'is-open' : ''}`}><a href="#how">How it works</a><a href="#collections">Collections</a><a href="#about">About</a><a className="nav-cta" href="#recommend">Start exploring <ArrowRight size={15} /></a></div>
        <button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'}>{mobileOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy"><div className="eyebrow"><span className="signal-dot" /> MATERIAL INTELLIGENCE / 01</div><h1>Find the tile<br /><em>that feels right.</em></h1><p className="hero-lede">A calmer way to choose surfaces. Tile.AI learns your space, your light, and your point of view to surface tile recommendations with a little more <strong>clarity.</strong></p><div className="hero-actions"><a className="button button-dark" href="#recommend">Build your palette <MoveRight size={17} /></a><a className="text-link" href="#how">See how it works <ArrowDown size={15} /></a></div></div>
        <div className="hero-visual"><Topology /><div className="visual-caption"><span>LIVE MODEL / 06.24.26</span><span>LAT 40.7128° N / LON 74.0060° W</span></div></div>
      </section>

      <section className="marquee" aria-label="Tile AI capabilities"><div><span>PERSONALIZED SURFACES</span><span>◈</span><span>LIGHT-AWARE MATCHING</span><span>◈</span><span>SPEC-READY RESULTS</span><span>◈</span><span>PERSONALIZED SURFACES</span></div></section>

      <section className="recommend-section" id="recommend"><div className="section-heading"><SectionLabel index="02">YOUR STARTING POINT</SectionLabel><h2>Tell us about<br /><em>your space.</em></h2><p>Every recommendation starts with the details that make a room yours. Choose a few preferences and we&apos;ll map the rest.</p></div>
        <div className="preference-layout"><div className="preference-form">{(Object.keys(options) as Array<keyof typeof options>).map((key, index) => <SelectField key={key} label={`${String(key).toUpperCase()} / 0${index + 1}`} value={preferences[key]} values={options[key]} onChange={(value) => update(key, value)} />)}<button className="button button-coral generate-button" onClick={generate} disabled={isGenerating}>{isGenerating ? <><LoaderCircle size={18} className="spin" /> Reading your space...</> : <>Generate recommendations <Sparkles size={17} /></>}</button></div><aside className="preference-aside"><div className="aside-number">A<span>→</span></div><h3>Precision,<br />not prediction.</h3><p>Our engine considers more than style. It looks at how material, scale, sheen, and light work together in the real world.</p><div className="aside-rule" /><div className="aside-meta"><span>7 signals</span><span>1 clear direction</span></div></aside></div>
      </section>

      <section className={`results-section ${hasResults ? 'results-visible' : ''}`} id="results"><div className="results-top"><SectionLabel index="03">YOUR EDIT</SectionLabel><div className="results-score"><span>CONFIDENCE SCORE</span><strong>{match}%</strong><div className="score-bar"><i style={{ width: `${match}%` }} /></div></div></div><div className="results-title"><h2>Made for this<br /><em>moment.</em></h2><p>{hasResults ? `Based on your ${preferences.style.toLowerCase()} direction, ${preferences.room.toLowerCase()} light, and preference for ${preferences.finish.toLowerCase()} surfaces.` : 'Your considered shortlist will appear here after you generate a recommendation.'}</p></div><div className="tile-grid">{tiles.map((tile, index) => <article className="tile-card" key={tile.name}><div className="tile-card-top"><span>0{index + 1} / {tile.match} MATCH</span><button onClick={() => toggleSave(tile.name)} aria-label={`${saved.includes(tile.name) ? 'Remove' : 'Save'} ${tile.name}`} className={saved.includes(tile.name) ? 'saved' : ''}><Plus size={18} /></button></div><TileSwatch texture={tile.texture} /><div className="tile-details"><div><h3>{tile.name}</h3><p>{tile.tone} / {tile.code}</p></div><strong>{tile.price}<small> / SQ FT</small></strong></div><button className="card-link">View material <ArrowRight size={14} /></button></article>)}</div></section>

      <section className="how-section" id="how"><div className="how-intro"><SectionLabel index="04">THE METHOD</SectionLabel><h2>Less scrolling.<br /><em>More seeing.</em></h2></div><div className="method-grid"><div className="method-item"><span className="method-icon"><ScanLine size={20} /></span><span className="method-index">01</span><h3>Describe your room</h3><p>Set the parameters that matter: room, light, scale, and feeling.</p></div><div className="method-item active-method"><span className="method-icon"><Compass size={20} /></span><span className="method-index">02</span><h3>We read the signals</h3><p>Tile.AI connects material attributes to your unique visual brief.</p></div><div className="method-item"><span className="method-icon"><Ruler size={20} /></span><span className="method-index">03</span><h3>Make a confident call</h3><p>Compare a focused edit with the specs to move from idea to install.</p></div></div></section>

      <section className="collection-section" id="collections"><div className="collection-image"><div className="collection-tile mosaic-large"><span /><span /><span /><span /></div><div className="collection-stamp">CURATED<br /><strong>01</strong></div></div><div className="collection-copy"><SectionLabel index="05">THE CURRENT EDIT</SectionLabel><h2>Quiet materials<br /><em>for loud living.</em></h2><p>A considered collection of tactile, honest surfaces. Designed to sit with your life, not compete with it.</p><div className="collection-stats"><div><strong>24</strong><span>surfaces</span></div><div><strong>06</strong><span>tone families</span></div><div><strong>∞</strong><span>possibilities</span></div></div><a className="button button-outline" href="#results">Explore collection <ArrowRight size={16} /></a></div></section>

      <section className="quote-section" id="about"><div className="quote-mark">“</div><blockquote>It&apos;s like having a really good eye on call. The recommendations are specific enough to be useful, but open enough to still feel like me.</blockquote><div className="quote-byline"><span className="avatar">MS</span><span><strong>Marin S.</strong><small>Brooklyn, NY / Early access</small></span></div></section>

      <footer className="footer"><div className="footer-brand"><a className="brand" href="#top"><Image src={logoSrc} alt="Tile.AI logo" width={38} height={38} /><span>Tile<span className="brand-accent">AI</span></span></a><p>Material intelligence<br />for considered spaces.</p></div><div className="footer-links"><div><span>Explore</span><a href="#recommend">Recommendation engine</a><a href="#collections">Collections</a><a href="#how">How it works</a></div><div><span>Studio</span><a href="#about">About Tile.AI</a><a href="#about">Journal</a><a href="#about">Contact</a></div></div><div className="footer-bottom"><span>© 2026 TILE.AI / MADE FOR MATERIAL PEOPLE</span><span><SunMedium size={14} /> EARTH / LOCAL TIME 14:32</span></div></footer>
    </main>
  )
}
