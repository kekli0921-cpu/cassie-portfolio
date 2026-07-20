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
