import React, { useMemo, useState } from 'react'
import { ArrowRight, Expand, X } from 'lucide-react'
import './bodycodes.css'
import { CaseFooter, CaseHeader } from './case-chrome.jsx'

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
})

function BodyCodesImage({ name, alt, caption, onExpand, className = '' }) {
  return <figure className={`bc-image ${className}`}>
    <button type="button" onClick={() => onExpand({ name, alt })} aria-label={`Expand ${caption || alt}`}>
      <img src={`/bodycodes/${name}`} alt={alt} />
      <span><Expand size={15}/> Expand</span>
    </button>
    {caption && <figcaption>{caption}</figcaption>}
  </figure>
}

function CostSlider({ label, value, setValue, min, max, step = 1, suffix = '' }) {
  return <label className="bc-cost-input">
    <span>{label}<strong>{value.toLocaleString()}{suffix}</strong></span>
    <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => setValue(Number(event.target.value))}/>
  </label>
}

function CostModel() {
  const [employees, setEmployees] = useState(800)
  const [garments, setGarments] = useState(3)
  const [issueRate, setIssueRate] = useState(18)
  const [issueCost, setIssueCost] = useState(55)
  const [adminHours, setAdminHours] = useState(160)
  const [serviceCost, setServiceCost] = useState(7500)

  const result = useMemo(() => {
    const loadedHourlyCost = 35
    const targetReduction = .3
    const issueVolume = employees * garments * (issueRate / 100)
    const currentCost = issueVolume * issueCost + adminHours * loadedHourlyCost
    const modelledSaving = currentCost * targetReduction
    return {
      currentCost,
      modelledSaving,
      netValue: modelledSaving - serviceCost,
      coverage: serviceCost ? modelledSaving / serviceCost : 0
    }
  }, [employees, garments, issueRate, issueCost, adminHours, serviceCost])

  return <div className="bc-cost-model">
    <div className="bc-cost-heading">
      <div><span>ILLUSTRATIVE PLANNING MODEL</span><h3>What would make the service commercially viable?</h3></div>
      <p>This calculator is a design tool, not a claim of achieved impact. It makes the assumptions visible so a pilot can replace them with evidence.</p>
    </div>
    <div className="bc-cost-layout">
      <div className="bc-cost-controls">
        <CostSlider label="Employees" value={employees} setValue={setEmployees} min={100} max={3000} step={100}/>
        <CostSlider label="Garments per employee" value={garments} setValue={setGarments} min={1} max={6}/>
        <CostSlider label="Current fit-issue rate" value={issueRate} setValue={setIssueRate} min={5} max={35} suffix="%"/>
        <CostSlider label="Direct cost per issue" value={issueCost} setValue={setIssueCost} min={15} max={120} step={5} suffix=" USD"/>
        <CostSlider label="HR coordination hours" value={adminHours} setValue={setAdminHours} min={20} max={500} step={20}/>
        <CostSlider label="Annual service cost" value={serviceCost} setValue={setServiceCost} min={1000} max={25000} step={500} suffix=" USD"/>
      </div>
      <div className="bc-cost-results" aria-live="polite">
        <div><span>Current avoidable cost</span><strong>{money.format(result.currentCost)}</strong><small>Fit issues + HR coordination</small></div>
        <div><span>Modelled gross saving</span><strong>{money.format(result.modelledSaving)}</strong><small>Using a provisional 30% reduction target</small></div>
        <div className={result.netValue >= 0 ? 'positive' : ''}><span>Net annual value</span><strong>{money.format(result.netValue)}</strong><small>{result.coverage.toFixed(1)}× service-cost coverage</small></div>
      </div>
    </div>
    <details><summary>How the model works</summary><p>Current avoidable cost = estimated fit issues × direct cost per issue + HR coordination hours × a provisional loaded labour cost of $35/hour. Modelled saving applies a 30% improvement target. Every value must be replaced with client baseline data before a real investment decision.</p></details>
  </div>
}

const currentFlow = [
  ['01', 'Collect', 'HR sends another size spreadsheet'],
  ['02', 'Guess', 'Employees choose from familiar labels'],
  ['03', 'Consolidate', 'HR manually chases and combines answers'],
  ['04', 'Produce', 'Factory receives standard size quantities'],
  ['05', 'Distribute', 'Garments are issued to employees'],
  ['06', 'Correct', 'Exchanges, alterations and rush orders begin'],
  ['07', 'Forget', 'Fit feedback is not reused next cycle']
]

const serviceSteps = [
  ['01', 'Organisation setup', 'HR uploads an employee ID list, garment styles and supplier size chart.'],
  ['02', 'Private questionnaire', 'Employees answer only the fit questions needed for the order — no scan, photo or hardware.'],
  ['03', 'BodyCode matching', 'BodyCodes converts answers into a reusable code and maps it to the supplier’s existing garment system.'],
  ['04', 'Aggregate ordering', 'HR sees completion, quantities and progress — not individual body answers.'],
  ['05', 'Production handoff', 'Factories receive production-ready sizing information, not personal profiles.'],
  ['06', 'Fit feedback loop', 'Employees report fit privately; recurring issues improve the next recommendation and order cycle.']
]

export default function BodyCodesPage({ onHome, onContact, onNext }) {
  const [lightbox, setLightbox] = useState(null)

  return <div className="case-page case-redesign bodycodes-page">
    <CaseHeader onHome={onHome} onContact={onContact}/>

    <main>
      <section className="case-hero bc-hero">
        <h1>BodyCodes</h1>
        <p className="bc-hero-subtitle">Industry expansion strategy design, From Sizing Tool to Fit-Data Infrastructure</p>
        <div className="case-hero-lower">
          <div className="case-hero-copy">
            <p>BodyCodes turns a short questionnaire into a reusable fit identity. It does not require body scanning, photos, or new hardware.</p>
            <p>I explored how this consumer sizing idea could become an operational service for corporate uniforms — connecting employees, procurement teams and manufacturers without exposing personal body answers.</p>
            <p>The outcome is a B2B2C service model, implementation pathway, governance structure and validation plan for a real enterprise pilot.</p>
            <div className="case-tags"><span>Service Design</span><span>System Mapping</span><span>Business Strategy</span><span>Service Blueprinting</span></div>
          </div>
          <figure className="case-hero-graphic bc-hero-visual"><img src="/projects/bodycodes.png" alt="BodyCodes corporate uniform procurement ecosystem"/></figure>
        </div>
        <div className="bc-hero-facts">
          <div><span>MY FOCUS</span><strong>Corporate uniforms</strong></div>
          <div><span>INPUT</span><strong>Questionnaire — no scan</strong></div>
          <div><span>SERVICE MODEL</span><strong>B2B2C infrastructure</strong></div>
          <div><span>STATUS</span><strong>Concept ready for pilot</strong></div>
        </div>
      </section>

      <section className="case-section bc-overview">
        <div className="case-section-label">01 / OVERVIEW &amp; MY ROLE</div>
        <div className="bc-overview-grid">
          <div>
            <span className="bc-kicker">THE PROJECT IN PLAIN LANGUAGE</span>
            <h2>One fit profile, reused across the uniform lifecycle</h2>
            <p>Most uniform programmes still ask employees to select S, M or L. That choice is collected in spreadsheets, translated into bulk orders, and forgotten after delivery. When the garment does not fit, the same failure repeats next year.</p>
            <p>BodyCodes creates a reusable fit profile from a questionnaire, then translates it into the sizing language already used by each uniform supplier.</p>
          </div>
          <aside>
            <span>MY CONTRIBUTION</span>
            <p>I led the corporate-uniform workstream: evaluating the entry opportunity, mapping procurement and factory journeys, reframing BodyCodes as service infrastructure, and defining the service model, governance, rollout and validation logic.</p>
            <small>The wider team explored user trust and adjacent industries. Those findings informed this work, but are not presented as my individual contribution.</small>
          </aside>
        </div>
        <div className="bc-concept-chain" aria-label="BodyCodes service concept">
          {['Private questionnaire','Reusable BodyCode','Supplier size matching','Aggregate uniform order','Fit feedback'].map((item, index) => <React.Fragment key={item}><div><span>0{index + 1}</span>{item}</div>{index < 4 && <ArrowRight aria-hidden="true"/>}</React.Fragment>)}
        </div>
      </section>

      <section className="case-section case-soft bc-opportunity">
        <div className="case-section-label">02 / WHY CORPORATE UNIFORMS</div>
        <h2>Start where the value is visible and adoption is realistic</h2>
        <p className="case-lede">The team scanned eight body-related sectors. I focused the strategy on private-sector uniforms: the closest fit with BodyCodes’ existing capability and the simplest environment for a low-risk pilot.</p>
        <div className="bc-reason-grid">
          <article><span>01</span><h3>Existing demand</h3><p>Employers already manage recurring uniform programmes. BodyCodes solves a recognised coordination problem rather than creating a new category.</p></article>
          <article><span>02</span><h3>No new hardware</h3><p>A questionnaire and supplier size chart can support an MVP, avoiding scanners, specialist installations and major workflow change.</p></article>
          <article><span>03</span><h3>One decision, many users</h3><p>A single procurement decision can onboard an entire workforce and generate enough volume to test operational value.</p></article>
        </div>
        <BodyCodesImage name="industry-matrix.jpg" alt="Industry opportunity matrix comparing the value of persistent fit identity with adoption complexity" caption="Industry exploration matrix — uniforms occupy the high-value, lower-complexity opportunity zone" onExpand={setLightbox}/>
        <blockquote className="bc-decision"><span>STRATEGIC DECISION</span>Use uniforms as the first proof point. Keep footwear and vehicle ergonomics as future hypotheses, not parallel product launches.</blockquote>
      </section>

      <section className="case-section bc-current">
        <div className="case-section-label">03 / UNDERSTANDING THE CURRENT SYSTEM</div>
        <h2>The real problem is a missing feedback system</h2>
        <p className="case-lede">Inaccurate size selection is only the visible symptom. The deeper failure is that information is repeatedly collected, translated and lost across the order cycle.</p>
        <div className="bc-current-flow">
          {currentFlow.map(([no, title, copy], index) => <React.Fragment key={no}><article><span>{no}</span><h3>{title}</h3><p>{copy}</p></article>{index < currentFlow.length - 1 && <ArrowRight aria-hidden="true"/>}</React.Fragment>)}
        </div>
        <div className="bc-stakeholders">
          <article><span>EMPLOYEE</span><h3>“Which size should I choose?”</h3><p>Employees guess from familiar labels, may not understand garment-specific fit, and do not benefit from feedback collected after delivery.</p></article>
          <article><span>PROCUREMENT / HR</span><h3>“Why does every order start again?”</h3><p>Teams chase spreadsheets, coordinate exceptions and absorb fragmented costs without a persistent record of what fitted.</p></article>
          <article><span>UNIFORM FACTORY</span><h3>“What does this size total actually mean?”</h3><p>Manufacturers receive quantities, not fit context. Late clarification, alteration and rework disrupt production.</p></article>
        </div>
        <BodyCodesImage name="journey-intro.jpg" alt="Parallel employee procurement and uniform manufacturer journeys" caption="Two stakeholder journeys reveal the same structural gap: information does not travel through the full lifecycle" onExpand={setLightbox}/>
        <aside className="bc-insight"><span>CORE INSIGHT</span><strong>BodyCodes should not become another sizing screen. It should become the translation and feedback layer between people, procurement and production.</strong></aside>
      </section>

      <section className="case-section case-soft bc-strategy">
        <div className="case-section-label">04 / DESIGN STRATEGY</div>
        <h2>Reduce adoption effort before adding technical complexity</h2>
        <div className="bc-principles">
          <article><span>01 / QUESTIONNAIRE FIRST</span><h3>No scan. No photo. No hardware.</h3><p>Ask only for the information required to recommend a garment. The MVP should work in a browser on an employee’s own device.</p></article>
          <article><span>02 / PRIVACY BY SEPARATION</span><h3>Share outcomes, not body answers</h3><p>HR sees completion and order status. Factories see production-ready sizing. BodyCodes isolates questionnaire responses.</p></article>
          <article><span>03 / MINIMUM INTEGRATION</span><h3>Begin with a portal and secure CSV</h3><p>Prove the workflow before asking clients and suppliers to fund APIs or deep enterprise integration.</p></article>
          <article><span>04 / CLOSED FEEDBACK LOOP</span><h3>Make every fit issue useful</h3><p>Private post-delivery feedback improves the employee profile, the supplier mapping and the next procurement cycle.</p></article>
        </div>
        <div className="bc-boundary">
          <div><span>EMPLOYEE ANSWERS</span><strong>Private fit preferences</strong><small>Visible to employee and authorised BodyCodes processing only</small></div>
          <ArrowRight/>
          <div><span>BODYCODE OUTPUT</span><strong>Pseudonymous fit identity</strong><small>Used to match an existing garment system</small></div>
          <ArrowRight/>
          <div><span>OPERATIONAL OUTPUT</span><strong>Size, quantity and production specification</strong><small>Visible only where required to fulfil the order</small></div>
        </div>
      </section>

      <section className="case-section bc-service">
        <div className="case-section-label">05 / PROPOSED SERVICE</div>
        <h2>One service, six understandable steps</h2>
        <p className="case-lede">The proposed service fits around the workflow organisations already recognise. Personal fit data and operational order data move through separate paths.</p>
        <div className="bc-service-steps">
          {serviceSteps.map(([no, title, copy]) => <article key={no}><span>{no}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}
        </div>
        <div className="bc-access-wrap">
          <div><span className="bc-kicker">DATA ACCESS MATRIX</span><h3>Privacy becomes a permission model</h3><p>Each stakeholder sees the minimum information needed to complete their role.</p></div>
          <div className="bc-access-table" role="table" aria-label="BodyCodes data access matrix">
            <div className="bc-access-head" role="row"><span>INFORMATION</span><span>EMPLOYEE</span><span>HR</span><span>BODYCODES</span><span>FACTORY</span></div>
            {[
              ['Questionnaire answers','View / edit','—','Restricted','—'],
              ['Completion status','View','View','Manage','—'],
              ['Recommended garment','View','View','Manage','View'],
              ['Aggregate quantities','—','View','Manage','View'],
              ['Fit feedback','Submit','Summary','Manage','Production only'],
              ['Deletion request','Initiate','Status only','Execute','No raw data']
            ].map(row => <div role="row" key={row[0]}>{row.map((cell, index) => index === 0 ? <strong key={cell}>{cell}</strong> : <span key={`${row[0]}-${cell}-${index}`}>{cell}</span>)}</div>)}
          </div>
        </div>
        <BodyCodesImage name="service-blueprint.jpg" alt="BodyCodes blueprint connecting procurement and factory workflows" caption="Service blueprint — BodyCodes coordinates the lifecycle without giving every stakeholder access to every data layer" onExpand={setLightbox}/>
        <div className="bc-disclosure">
          <details><summary>View the proposed business model <span>+</span></summary><BodyCodesImage name="business-model.jpg" alt="BodyCodes B2B2C business model" onExpand={setLightbox}/></details>
          <details><summary>View the governance model <span>+</span></summary><BodyCodesImage name="governance.jpg" alt="BodyCodes service governance and data boundaries" onExpand={setLightbox}/></details>
        </div>
      </section>

      <section className="case-section case-soft bc-viability">
        <div className="case-section-label">06 / MAKING IT VIABLE</div>
        <h2>Turn a promising system into a testable business case</h2>
        <p className="case-lede">The original project proposed a service architecture. To make the next step concrete, I added a transparent cost model, a low-risk pilot and evidence gates for scaling.</p>
        <CostModel/>
        <div className="bc-rollout-head"><span className="bc-kicker">IMPLEMENTATION PATHWAY</span><h3>Start manually. Standardise what works. Integrate only after evidence.</h3></div>
        <div className="bc-rollout-grid">
          <article><span>PHASE 01 · 2–3 WEEKS</span><h3>Readiness</h3><p>Choose one employer and supplier, map the garment system, define data boundaries, and capture baseline exchange and administration costs.</p><b>Gate: workflow and privacy review</b></article>
          <article><span>PHASE 02 · ONE ORDER CYCLE</span><h3>Controlled pilot</h3><p>Test 100–200 employees, one or two garments, a browser questionnaire and supported CSV handoffs.</p><b>Gate: first-fit, effort and participation</b></article>
          <article><span>PHASE 03 · 3–6 MONTHS</span><h3>Operational scale</h3><p>Standardise onboarding and supplier mappings, then introduce automation, APIs and broader governance only where they remove proven friction.</p><b>Gate: repeatable value</b></article>
        </div>
        <div className="bc-metrics">
          <div><span>01</span><strong>Questionnaire completion</strong><small>Can employees participate without assisted measurement?</small></div>
          <div><span>02</span><strong>First-fit success</strong><small>How many garments avoid exchange or alteration?</small></div>
          <div><span>03</span><strong>Coordination effort</strong><small>How much HR and supplier time does each cycle require?</small></div>
          <div><span>04</span><strong>Employee confidence</strong><small>Do people understand and trust the data boundary?</small></div>
        </div>
        <p className="bc-target-note"><strong>Provisional pilot targets, not achieved outcomes:</strong> ≥80% questionnaire completion, ≥20% reduction in fit-related exchanges, ≥30% reduction in HR coordination time, ≥4/5 employee confidence, and zero unauthorised access incidents.</p>
      </section>

      <section className="case-section bc-reflection">
        <div className="case-section-label">07 / REFLECTION &amp; NEXT STEPS</div>
        <h2>The project moved the question from “Can we classify bodies?” to “Can organisations use the result responsibly?”</h2>
        <div className="bc-reflection-grid">
          <article><span>WHAT THE DESIGN ESTABLISHES</span><p>A focused entry market, a questionnaire-based service, explicit stakeholder boundaries, an operational workflow, and a staged route to evidence.</p></article>
          <article><span>WHAT REMAINS UNPROVEN</span><p>Questionnaire accuracy, supplier mapping effort, real integration cost, employee participation, first-fit improvement and the strength of the commercial return.</p></article>
          <article><span>NEXT RESEARCH</span><p>Run a controlled enterprise pilot, compare recommendations with delivered fit, interview HR and factory teams, and replace every cost assumption with observed data.</p></article>
        </div>
        <div className="bc-future">
          <div><span>NOW</span><strong>Corporate uniforms</strong><small>Validate the service and data model</small></div><ArrowRight/>
          <div><span>THEN</span><strong>Occupational footwear</strong><small>Test responsible reuse of the fit identity</small></div><ArrowRight/>
          <div><span>LATER</span><strong>Vehicle ergonomics</strong><small>A team hypothesis, dependent on stronger evidence and higher-complexity partnerships</small></div>
        </div>
        <p className="bc-final-note">The adjacent-industry pathway was explored by the wider team. It is retained here only as future context; my contribution focused on making the corporate-uniform service coherent, operational and testable.</p>
      </section>
    </main>

    {lightbox && <div className="bc-lightbox" role="dialog" aria-modal="true" aria-label="Expanded BodyCodes diagram" onClick={() => setLightbox(null)}>
      <button type="button" onClick={() => setLightbox(null)} aria-label="Close expanded image"><X size={18}/> Close</button>
      <img src={`/bodycodes/${lightbox.name}`} alt={lightbox.alt} onClick={(event) => event.stopPropagation()}/>
    </div>}

    <CaseFooter onHome={onHome} onNext={onNext}/>
  </div>
}
