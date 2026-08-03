import React, { useEffect } from 'react'
import { ArrowUpRight, CheckCircle2, FileCheck2, Search, ShieldCheck, SlidersHorizontal, Sparkles, UserCheck } from 'lucide-react'
import './procuresmart.css'
import { CaseFooter, CaseHeader } from './case-chrome.jsx'

const prototypeUrl = 'https://procuresmart-health.vercel.app/need-definition'

const evidence = [
  ['01', 'Discovery overload', 'Clinicians face a large catalogue of similar products, with limited time to inspect every listing and supplier.'],
  ['02', 'Multi-criteria decision burden', 'Clinical performance, safety, risk, delivery, cost and supporting evidence must be considered together.'],
  ['03', 'Defensibility gap', 'A suitable product is not enough: internal review also needs a complete, credible and traceable evidence trail.']
]

const flow = [
  ['01', 'Need definition', 'Describe the clinical need in natural language — without translating it into catalogue terminology first.'],
  ['02', 'Criteria confirmation', 'Review and edit the structured criteria before they influence the search.'],
  ['03', 'Candidate shortlist', 'Reduce a broad catalogue to a focused set that matches the confirmed priorities.'],
  ['04', 'Comparison and evidence', 'Compare trade-offs, inspect supporting sources and make the professional judgement.']
]

function PrototypeVisual() {
  return <div className="ps-prototype-visual" aria-label="ProcureSmart workflow from clinical need to clinician decision">
    <div className="ps-app-bar"><span>ProcureSmart</span><small>Decision support workspace</small></div>
    <div className="ps-need-card">
      <div className="ps-mini-label"><Sparkles size={13}/> AI-assisted need framing</div>
      <p>“We need a reliable home blood-pressure monitor for older patients with limited dexterity.”</p>
    </div>
    <div className="ps-criteria-row">
      <span>Easy-cuff fit</span><span>Validated accuracy</span><span>Home use</span>
    </div>
    <div className="ps-shortlist">
      <div><b>3</b><span>candidates to review</span></div>
      <div className="ps-product-bars"><i/><i/><i/></div>
      <div className="ps-human-check"><UserCheck size={17}/><span>Clinician sign-off</span></div>
    </div>
  </div>
}

export default function ProcureSmartPage({ onHome, onContact, onNext }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return <div className="case-page case-redesign procuresmart-page">
    <CaseHeader onHome={onHome} onContact={onContact}/>
    <main>
      <section className="ps-hero">
        <div className="ps-hero-copy">
          <p className="ps-eyebrow">HEALTHCARE UX · AI DECISION SUPPORT</p>
          <h1>ProcureSmart<br/><em>Health</em></h1>
          <p className="ps-hero-subtitle">From clinical need to an evidence-ready shortlist</p>
          <p className="ps-hero-summary">An AI-assisted procurement decision-support workflow that helps NHS clinicians turn an ambiguous need into comparable, verifiable options — while keeping the final judgement human.</p>
          <div className="ps-tags"><span>Information Architecture</span><span>Rapid Prototyping</span><span>Hackathon concept</span></div>
          <a className="ps-prototype-link" href={prototypeUrl} target="_blank" rel="noreferrer">View prototype <ArrowUpRight size={17}/></a>
        </div>
        <div className="ps-hero-stage">
          <PrototypeVisual/>
          <blockquote>“Narrow the search before asking clinicians to judge.”</blockquote>
        </div>
      </section>

      <section className="case-section ps-context">
        <div className="case-section-label">01 / CONTEXT</div>
        <div className="ps-section-intro"><h2>The hard part is not buying.<br/>It is screening with confidence.</h2><p>Blue Garage × Goldsmiths Hackathon concept responding to an NHS procurement brief. The opportunity was to reduce the work between recognising a clinical need and preparing a defensible recommendation — without automating the decision itself.</p></div>
        <div className="ps-current-flow" aria-label="Current clinical procurement flow">
          {['Clinical need','Catalogue search','Supplier & quote review','Internal review','Procurement decision'].map((item, index) => <React.Fragment key={item}><div><span>0{index + 1}</span>{item}</div>{index < 4 && <i>→</i>}</React.Fragment>)}
        </div>
        <div className="ps-burdens"><article><Search/><h3>Too many similar options</h3><p>Catalogue breadth turns discovery into manual screening.</p></article><article><SlidersHorizontal/><h3>Interdependent criteria</h3><p>Clinical value cannot be separated from risk, delivery and cost.</p></article><article><FileCheck2/><h3>Approval-ready evidence</h3><p>The rationale must remain credible after the shortlist is made.</p></article></div>
      </section>

      <section className="case-section case-soft ps-evidence">
        <div className="case-section-label">02 / EVIDENCE</div>
        <div className="ps-section-intro"><h2>Three pressures shape the decision.</h2><p>The evidence was organised by confidence level so that stakeholder input, desk research and design interpretation were not presented as equivalent.</p></div>
        <div className="ps-evidence-grid">{evidence.map(([no,title,copy]) => <article key={no}><span>{no}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
        <div className="ps-evidence-sources">
          <article><b>Primary evidence</b><p>NHS stakeholder brief and supplied interview/video material.</p></article>
          <article><b>Secondary evidence</b><p>NHS Supply Chain, NHS England and government procurement guidance.</p></article>
          <article><b>Design inference</b><p>Workflow assumptions that still require task-based validation.</p></article>
        </div>
      </section>

      <section className="case-section ps-strategy">
        <div className="case-section-label">03 / STRATEGY</div>
        <div className="ps-section-intro"><h2>AI frames the need.<br/>Clinicians own the decision.</h2><p>The concept separates early-stage structuring from professional selection. This reduces cognitive load without hiding uncertainty or collapsing clinical trade-offs into a single automated answer.</p></div>
        <div className="ps-funnel">
          <article><span>STAGE 01</span><Sparkles/><h3>AI-assisted need framing</h3><p>Natural language becomes explicit, editable and confirmable screening criteria.</p></article>
          <i>↓</i>
          <article><span>STAGE 02</span><UserCheck/><h3>Clinician-led selection</h3><p>A narrowed candidate set supports comparison, evidence checking and final judgement.</p></article>
        </div>
        <div className="ps-responsibility">
          <div><h3>AI assists</h3>{['Structure requirements','Reduce the candidate range','Surface relevant evidence','Prepare comparison material'].map(item => <p key={item}><CheckCircle2 size={16}/>{item}</p>)}</div>
          <div><h3>Clinician decides</h3>{['Confirm clinical priorities','Weigh trade-offs','Verify evidence','Make the final decision'].map(item => <p key={item}><UserCheck size={16}/>{item}</p>)}</div>
        </div>
        <blockquote className="ps-principle">Reduce cognitive load <em>without hiding uncertainty.</em></blockquote>
      </section>

      <section className="case-section case-soft ps-product-flow">
        <div className="case-section-label">04 / PRODUCT FLOW</div>
        <div className="ps-section-intro"><h2>Four checkpoints, one traceable path.</h2><p>Each step keeps the clinician close to the reasoning and makes the system’s interpretation inspectable before the next action.</p></div>
        <div className="ps-flow-layout">
          <div className="ps-flow-list">{flow.map(([no,title,copy]) => <article key={no}><span>{no}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
          <div className="ps-flow-demo"><PrototypeVisual/><a href={prototypeUrl} target="_blank" rel="noreferrer">Explore the live workflow <ArrowUpRight size={16}/></a></div>
        </div>
        <div className="ps-scope-grid">
          <article className="ps-built"><span>BUILT NOW</span><h3>Interactive decision workflow</h3><p>Need definition, criteria confirmation, candidate filtering and clinician-led comparison.</p></article>
          <article className="ps-future"><span>FUTURE DIRECTION</span><h3>Assisted evidence preparation</h3><p>Further retrieval, comparison and approval-pack support are concepts for later validation — not implemented capabilities.</p></article>
        </div>
      </section>

      <section className="case-section ps-trust">
        <div className="case-section-label">05 / TRUST AND BOUNDARIES</div>
        <div className="ps-section-intro"><h2>Decision support has to show its workings.</h2><p>In a high-stakes context, efficiency is only useful when sources, uncertainty and ownership of the final decision remain visible.</p></div>
        <div className="ps-trust-grid">
          <article><Search/><span>01</span><h3>Source traceability</h3><p>Recommendations connect back to their supporting material.</p></article>
          <article><SlidersHorizontal/><span>02</span><h3>Editable criteria</h3><p>Clinicians can correct how their need has been interpreted.</p></article>
          <article><ShieldCheck/><span>03</span><h3>Visible uncertainty</h3><p>Incomplete or inferred information is not presented as fact.</p></article>
          <article><UserCheck/><span>04</span><h3>Human sign-off</h3><p>Selection and approval remain accountable human decisions.</p></article>
        </div>
        <div className="ps-boundary"><ShieldCheck size={25}/><p>ProcureSmart supports product discovery and comparison. <strong>It does not autonomously approve or purchase medical products.</strong></p></div>
      </section>

      <section className="case-section case-soft ps-testing">
        <div className="case-section-label">06 / PLANNED USABILITY TESTING</div>
        <div className="ps-section-intro"><h2>The next step is validation,<br/>not a victory lap.</h2><p>No usability study has been completed yet. This plan defines what must be tested before making claims about speed, trust or decision quality.</p></div>
        <div className="ps-test-plan">
          <article><span>PLANNED TASKS</span>{['Define a need in natural language','Correct generated criteria','Compare shortlisted products','Locate and verify evidence','Prepare material for internal review'].map(item => <p key={item}>{item}</p>)}</article>
          <article><span>PLANNED MEASURES</span>{['Task completion','Time to a defensible shortlist','Criteria correction rate','Evidence verification success','Decision confidence & trust calibration'].map(item => <p key={item}>{item}</p>)}</article>
        </div>
        <div className="ps-testing-placeholder"><span>TO BE COMPLETED AFTER USABILITY TESTING</span><div>{['Findings','Iteration decisions','Before / after','Final validation'].map(item => <i key={item}>{item}</i>)}</div></div>
      </section>

      <section className="case-section ps-reflection">
        <div className="case-section-label">07 / REFLECTION</div>
        <div className="ps-reflection-grid">
          <article><span>WHAT THE PROJECT ESTABLISHED</span><h2>A decision architecture, not an automated answer.</h2><p>A working route from an ambiguous clinical need to an evidence-oriented shortlist, expressed through an interactive prototype.</p></article>
          <article><span>WHAT REMAINS UNPROVEN</span><h3>Accuracy, completeness and real-world fit</h3><p>Retrieval quality, evidence coverage, trust calibration, category transferability and alignment with live procurement processes still require validation.</p></article>
          <article><span>NEXT VALIDATION</span><h3>Test the moments of correction</h3><p>Run realistic tasks with clinical and procurement stakeholders, then iterate around errors, hesitation and misplaced trust.</p></article>
        </div>
        <a className="ps-final-cta" href={prototypeUrl} target="_blank" rel="noreferrer">Open ProcureSmart Health prototype <ArrowUpRight size={18}/></a>
      </section>
    </main>
    <CaseFooter onHome={onHome} onNext={onNext}/>
  </div>
}
