import React, { useEffect, useState } from 'react'
import { ArrowUpRight, Expand, FileCheck2, Search, SlidersHorizontal, X } from 'lucide-react'
import './procuresmart.css'
import { CaseFooter, CaseHeader, EditorialCaseHero } from './case-chrome.jsx'

const prototypeUrl = 'https://procuresmart-health.vercel.app/need-definition'

const mechanisms = [
  ['01', 'FUNCTION CALLING', 'From clinical language to structured criteria', 'Function calling turns a plain-language need into explicit, editable criteria before the search begins.'],
  ['02', 'TWO-STAGE SCREENING', 'Narrow broadly, then compare carefully', 'The catalogue is reduced first, then clinicians compare a focused shortlist against the priorities they confirmed.'],
  ['03', 'PEER-EVIDENCE LOOP', 'Evidence informs the next decision', 'Peer-use signals and supporting sources enter comparison alongside cost, risk and delivery — without deciding for the clinician.']
]

const chapters = ['Context', 'Strategy', 'Product flow', 'Usability testing']

export default function ProcureSmartPage({ onHome, onContact, onNext }) {
  const [contextVisualOpen, setContextVisualOpen] = useState(false)
  const [strategyStage, setStrategyStage] = useState(1)
  const [strategyVisual, setStrategyVisual] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    document.body.style.overflow = contextVisualOpen || strategyVisual ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [contextVisualOpen, strategyVisual])

  useEffect(() => {
    if (!contextVisualOpen && !strategyVisual) return undefined
    const closeOnEscape = (event) => {
      if (event.key !== 'Escape') return
      setContextVisualOpen(false)
      setStrategyVisual(null)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [contextVisualOpen, strategyVisual])

  return <div className="case-page case-redesign procuresmart-page">
    <CaseHeader onHome={onHome} onContact={onContact}/>
    <main>
      <EditorialCaseHero
        rootSelector=".procuresmart-page"
        eyebrow="HEALTHCARE UX · AI DECISION SUPPORT"
        title="ProcureSmart Health"
        subtitle="From clinical need to an evidence-ready shortlist"
        summary={[
          'An AI-assisted procurement decision-support workflow that turns a clinician’s natural-language need into editable criteria, narrows a broad catalogue through a two-stage screening model, and closes the loop with peer evidence.',
          'Function calling structures the request; clinicians confirm the criteria, inspect evidence and retain responsibility for the final decision.'
        ]}
        chapters={chapters}
        imageSrc="/projects/procuresmart-cover.svg"
        imageAlt="Clinical need transformed into editable criteria and a clinician-reviewed shortlist"
        result="AI frames the need. Clinicians own the decision."
        resultLabel="Principle"
        accent="#0b46b4"
        accentSoft="#9fc0ff"
        longTitle
        diagram
      />

      <section className="case-section ps-context">
        <div className="case-section-label">01 / CONTEXT</div>
        <div className="ps-section-intro"><h2>The hard part is not buying.<br/>It is screening with confidence.</h2><p>ProcureSmart reduces the effort required to move from a recognised clinical need to a clear, evidence-ready recommendation. It structures the search and prepares comparable options, while clinicians retain responsibility for evaluation and the final decision.</p></div>
        <div className="ps-burdens"><article className="ps-visual-card"><button type="button" onClick={() => setContextVisualOpen(true)} aria-label="Open visual: Current NHS procurement search platform"><Search/><h3>Too many similar options</h3><p>Catalogue breadth turns discovery into manual screening.</p><em>Open visual <Expand size={14}/></em></button></article><article><SlidersHorizontal/><h3>Interdependent criteria</h3><p>Clinical value cannot be separated from risk, delivery and cost.</p></article><article><FileCheck2/><h3>Approval-ready evidence</h3><p>The rationale must remain credible after the shortlist is made.</p></article></div>
        <div className="ps-evidence-note"><span>Evidence base</span><p>Primary evidence comes from the NHS stakeholder brief and supplied interview material; secondary evidence comes from NHS procurement guidance. Design inferences remain to be validated through usability testing.</p></div>
      </section>
      <section className="case-section ps-strategy">
        <div className="case-section-label">02 / STRATEGY</div>
        <div className="ps-strategy-intro"><div className="ps-strategy-heading"><h2>Two-stage screening model</h2><h2 className="ps-strategy-range">From broad category to focused decision</h2></div><p>Instead of manually searching a large catalogue, the workflow clarifies the need first, then narrows the product range before clinicians compare options.</p></div>
        <div className="ps-strategy-model" aria-label="Two-stage screening model, narrowing more than forty thousand products to thirty shortlisted products and three evidence-ready options">
          <div className="ps-pyramid-panel">
            <div className="ps-pyramid-stack">
              <button type="button" aria-label="40,000 plus products" aria-pressed={strategyStage === 1} className={`ps-pyramid-tier ps-pyramid-top ${strategyStage === 1 ? 'is-active' : ''}`} onClick={() => setStrategyStage(1)}><strong>40000+</strong><span>Products</span></button>
              <button type="button" aria-label="Stage 01: AI-assisted need framing" aria-pressed={strategyStage === 1} className={`ps-pyramid-transition ps-pyramid-transition-one ${strategyStage === 1 ? 'is-active' : ''}`} onClick={() => setStrategyStage(1)}></button>
              <button type="button" aria-label="30 shortlisted products" aria-pressed="true" className="ps-pyramid-tier ps-pyramid-middle is-active" onClick={() => setStrategyStage(1)}><strong>30</strong><span>Shortlists</span></button>
              <button type="button" aria-label="Stage 02: Clinician-led comparison" aria-pressed={strategyStage === 2} className={`ps-pyramid-transition ps-pyramid-transition-two ${strategyStage === 2 ? 'is-active' : ''}`} onClick={() => setStrategyStage(2)}></button>
              <button type="button" aria-label="3 evidence-ready options" aria-pressed={strategyStage === 2} className={`ps-pyramid-tier ps-pyramid-base ${strategyStage === 2 ? 'is-active' : ''}`} onClick={() => setStrategyStage(2)}><strong>3</strong><span>Recommendation</span></button>
            </div>
          </div>

          <div className="ps-stage-panel">
            <article className={`ps-strategy-card-v2 ${strategyStage === 1 ? 'is-active' : ''}`}>
              <button type="button" className="ps-stage-select" aria-pressed={strategyStage === 1} onClick={() => setStrategyStage(1)}>
                <span className="ps-stage-card-label">01 / NEED DEFINITION</span>
                <h3>AI-assisted need framing</h3>
                <p>Natural language becomes explicit, editable criteria before the search begins.</p>
              </button>
              <button type="button" className="ps-stage-image-button" onClick={() => { setStrategyStage(1); setStrategyVisual({ src:'/procuresmart/strategy-need-definition.png', alt:'AI-extracted filters for a clinical procurement need', title:'Stage 1 — AI-extracted filters', caption:'Clinical requirements are translated into editable filters before the search begins.' }) }} aria-label="Open Stage 1 AI-extracted filters visual">
                <img loading="lazy" width="676" height="1386" src="/procuresmart/strategy-need-definition.png" alt="AI-extracted filters for a clinical procurement need"/>
                <span>Open visual <Expand size={14}/></span>
              </button>
            </article>

            <article className={`ps-strategy-card-v2 ${strategyStage === 2 ? 'is-active' : ''}`}>
              <button type="button" className="ps-stage-select" aria-pressed={strategyStage === 2} onClick={() => setStrategyStage(2)}>
                <span className="ps-stage-card-label">02 / COMPARISON</span>
                <h3>Clinician-led selection</h3>
                <p>A focused shortlist supports evidence checking, trade-offs and final judgement.</p>
              </button>
              <button type="button" className="ps-stage-image-button" onClick={() => { setStrategyStage(2); setStrategyVisual({ src:'/procuresmart/strategy-evidence-comparison.png', alt:'Evidence comparison view for shortlisted products', title:'Stage 2 — Evidence comparison', caption:'Shortlisted products are compared side by side using evidence and commercial data.' }) }} aria-label="Open Stage 2 evidence comparison visual">
                <img loading="lazy" width="2048" height="851" src="/procuresmart/strategy-evidence-comparison.png" alt="Evidence comparison view for shortlisted products"/>
                <span>Open visual <Expand size={14}/></span>
              </button>
            </article>
          </div>
        </div>
      </section>

      <section className="case-section case-soft ps-product-flow">
        <div className="case-section-label">03 / PRODUCT FLOW</div>
        <div className="ps-section-intro"><h2>Three mechanisms make the shortlist defensible.</h2><p>The prototype combines structured need framing, two-stage narrowing and a peer-evidence loop while keeping the clinician in control.</p></div>
        <div className="ps-flow-layout">
          <div className="ps-flow-demo">
            <div className="ps-flow-demo-head">
              <div><span>Interactive Prototype</span><h3>Start from describe your need!</h3></div>
              <a href={prototypeUrl} target="_blank" rel="noreferrer">Open full screen <ArrowUpRight size={15}/></a>
            </div>
            <div className="ps-flow-prototype-scroll">
              <div className="ps-flow-prototype-frame">
                <iframe src={prototypeUrl} title="ProcureSmart Health interactive prototype" loading="lazy" allow="fullscreen"/>
              </div>
            </div>
          </div>
          <div className="ps-flow-guide">
            <header><span>PRODUCT FLOW</span></header>
            <div className="ps-flow-list">{mechanisms.map(([no,label,title,copy]) => <article key={no}><span>{no} / {label}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
          </div>
        </div>
      </section>

      <section className="case-section case-soft ps-testing">
        <div className="case-section-label">04 / PLANNED USABILITY TESTING</div>
        <div className="ps-section-intro"><h2>The next step is validation,<br/>not a victory lap.</h2><p>No usability study has been completed yet. This plan defines what must be tested before making claims about speed, trust or decision quality.</p></div>
        <div className="ps-test-plan">
          <article><span>PLANNED TASKS</span>{['Define a need in natural language','Correct generated criteria','Compare shortlisted products','Locate and verify evidence','Prepare material for internal review'].map(item => <p key={item}>{item}</p>)}</article>
          <article><span>PLANNED MEASURES</span>{['Task completion','Time to a defensible shortlist','Criteria correction rate','Evidence verification success','Decision confidence & trust calibration'].map(item => <p key={item}>{item}</p>)}</article>
        </div>
        <div className="ps-testing-placeholder"><span>TO BE COMPLETED AFTER USABILITY TESTING</span><div>{['Findings','Iteration decisions','Before / after','Final validation'].map(item => <i key={item}>{item}</i>)}</div></div>
      </section>

    </main>
    <CaseFooter onHome={onHome} onNext={onNext}/>
    {contextVisualOpen && <div className="ps-lightbox" role="dialog" aria-modal="true" aria-label="Current NHS procurement search platform" onClick={() => setContextVisualOpen(false)}>
      <button className="ps-lightbox-close" type="button" autoFocus onClick={() => setContextVisualOpen(false)}><X size={18}/> Close</button>
      <figure className="ps-lightbox-content" onClick={(event) => event.stopPropagation()}>
        <img src="/procuresmart/current-nhs-procurement-search-platform.png" alt="Current NHS procurement search platform showing medical product categories"/>
        <figcaption><strong>Current NHS procurement search platform</strong></figcaption>
      </figure>
    </div>}
    {strategyVisual && <div className="ps-lightbox" role="dialog" aria-modal="true" aria-label={strategyVisual.title} onClick={() => setStrategyVisual(null)}>
      <button className="ps-lightbox-close" type="button" autoFocus onClick={() => setStrategyVisual(null)}><X size={18}/> Close</button>
      <figure className="ps-lightbox-content" onClick={(event) => event.stopPropagation()}>
        <img src={strategyVisual.src} alt={strategyVisual.alt}/>
        <figcaption><strong>{strategyVisual.title}</strong><span>{strategyVisual.caption}</span></figcaption>
      </figure>
    </div>}
  </div>
}
