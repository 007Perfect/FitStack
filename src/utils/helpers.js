export function calculateBMI(weightKg, heightCm) {
  if (!weightKg || !heightCm) return null
  const heightM = heightCm / 100
  const bmi = (weightKg / (heightM * heightM)).toFixed(1)
  return parseFloat(bmi)
}

export function getBMICategory(bmi) {
  if (!bmi) return { label: 'N/A', color: '#9090b0' }
  if (bmi < 18.5) return { label: 'Underweight', color: '#3b82f6' }
  if (bmi < 25)   return { label: 'Normal',      color: '#22c55e' }
  if (bmi < 30)   return { label: 'Overweight',  color: '#f97316' }
  return                  { label: 'Obese',       color: '#ef4444' }
}

export function getTodayString() {
  return new Date().toISOString().split('T')[0]
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max)
}
