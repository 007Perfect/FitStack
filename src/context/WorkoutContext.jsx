import { createContext, useContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

const WorkoutContext = createContext(null)

export function WorkoutProvider({ children }) {
  const [workouts, setWorkouts] = useState(() => {
    const stored = localStorage.getItem('fitstack_workouts')
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem('fitstack_workouts', JSON.stringify(workouts))
  }, [workouts])

  const addWorkout = (workout) => {
    const newWorkout = { ...workout, id: uuidv4(), completed: false, createdAt: new Date().toISOString() }
    setWorkouts(prev => [newWorkout, ...prev])
  }

  const deleteWorkout = (id) => {
    setWorkouts(prev => prev.filter(w => w.id !== id))
  }

  const toggleWorkout = (id) => {
    setWorkouts(prev =>
      prev.map(w => w.id === id ? { ...w, completed: !w.completed } : w)
    )
  }

  const completedCount = workouts.filter(w => w.completed).length
  const streak = completedCount > 0 ? Math.min(completedCount, 30) : 0

  return (
    <WorkoutContext.Provider value={{ workouts, addWorkout, deleteWorkout, toggleWorkout, completedCount, streak }}>
      {children}
    </WorkoutContext.Provider>
  )
}

export function useWorkout() {
  return useContext(WorkoutContext)
}
