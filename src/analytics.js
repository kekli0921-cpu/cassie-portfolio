export const GA_MEASUREMENT_ID =
  import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-4FFMH4WZ5E'

let initialized = false

export function initAnalytics() {
  if (initialized || typeof window === 'undefined' || !GA_MEASUREMENT_ID) return

  window.dataLayer = window.dataLayer || []
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments)
    }

  const existingScript = document.querySelector(
    `script[src*="googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"]`,
  )

  if (!existingScript) {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script)
  }

  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false })
  initialized = true
}

export function trackPageView({ pageTitle, path }) {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', 'page_view', {
    page_title: pageTitle,
    page_location: `${window.location.origin}${path}`,
    page_path: path,
  })
}

export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', name, params)
}
