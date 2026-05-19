import { useState, useEffect } from 'react'

const FALLBACK_QUOTES = [
  { q: "The only bad workout is the one that didn't happen.", a: "Unknown" },
  { q: "Push yourself because no one else is going to do it for you.", a: "Unknown" },
  { q: "Your body can stand almost anything. It's your mind you have to convince.", a: "Unknown" },
  { q: "Strength does not come from the body. It comes from the will of the soul.", a: "Mahatma Gandhi" },
  { q: "Take care of your body. It's the only place you have to live.", a: "Jim Rohn" },
]

export function useQuote() {
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cached = sessionStorage.getItem('fitstack_quote')
    if (cached) {
      setQuote(JSON.parse(cached))
      setLoading(false)
      return
    }

    const controller = new AbortController()
    fetch('https://zenquotes.io/api/random', { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        if (data && data[0]) {
          const q = { q: data[0].q, a: data[0].a }
          setQuote(q)
          sessionStorage.setItem('fitstack_quote', JSON.stringify(q))
        } else {
          throw new Error('No data')
        }
      })
      .catch(() => {
        const fallback = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)]
        setQuote(fallback)
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  return { quote, loading }
}
