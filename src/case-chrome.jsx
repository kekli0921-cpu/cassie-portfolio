import React from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export function CaseHeader({ onHome, onContact }) {
  return <header className="case-nav case-site-nav">
    <button type="button" onClick={onHome} className="case-back"><ArrowLeft size={16}/> Back</button>
    <nav aria-label="Case study navigation"><button type="button" className="case-contact" onClick={onContact}>Contact Me</button></nav>
  </header>
}

export function CaseFooter({ onHome, onNext }) {
  return <footer className="case-footer case-project-footer">
    <button type="button" className="brand" onClick={onHome}>KEXIN LI<span>.</span></button>
    <button type="button" className="case-next" onClick={onNext}>Next project <ArrowRight size={16}/></button>
  </footer>
}

export function EditorialCaseHero({
  rootSelector,
  eyebrow,
  title,
  subtitle,
  summary,
  chapters,
  imageSrc,
  imageAlt,
  result,
  resultLabel = 'Key outcome',
  accent = '#76629d',
  accentSoft = '#d7c9ec',
  longTitle = false,
  diagram = false
}) {
  const jump = (index) => {
    document.querySelectorAll(`${rootSelector} .case-section`)[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return <section
    className="case-hero project-editorial-hero"
    style={{ '--hero-accent': accent, '--hero-accent-soft': accentSoft }}
  >
    <div className="project-hero-panel">
      <p className="project-hero-eyebrow">{eyebrow}</p>
      <h1 className={longTitle ? 'project-hero-long-title' : ''}>{title}</h1>
      <p className="project-hero-subtitle">{subtitle}</p>
      <div className="project-hero-summary">
        {summary.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </div>
      <nav className="project-chapter-index" aria-label={`${title} chapters`}>
        {chapters.map((chapter, index) => <button type="button" key={chapter} onClick={() => jump(index)}><span>{String(index + 1).padStart(2, '0')}</span>{chapter}</button>)}
      </nav>
    </div>
    <div className={`project-hero-visual${diagram ? ' project-hero-diagram' : ''}`}>
      <figure className="project-hero-image"><img src={imageSrc} alt={imageAlt}/></figure>
      <p className="project-hero-result"><span>{resultLabel}</span>{result}</p>
    </div>
  </section>
}
