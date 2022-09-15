interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (
  exercisesHours: Array<number>,
  targetHours: number
): Result => {
  const numberOfDays: number = exercisesHours.length
  if (numberOfDays === 0) {
    throw new Error("No training days!")
  }
  const trainingDays: number = exercisesHours.filter(
    (hours) => hours > 0
  ).length
  const averageTime: number =
    exercisesHours.reduce((sum, hours) => sum + hours, 0) / numberOfDays
  const targetReached: boolean = averageTime >= targetHours
  let rating: number
  let ratingDescription: string
  if (targetReached) {
    rating = 3
    ratingDescription = "Excellent work!"
  } else if (averageTime >= 0.5 * targetHours) {
    rating = 2
    ratingDescription = "Not too bad but could be better!"
  } else {
    rating = 1
    ratingDescription = "You are not even trying!"
  }

  return {
    periodLength: numberOfDays,
    trainingDays: trainingDays,
    success: targetReached,
    rating: rating,
    ratingDescription: ratingDescription,
    target: targetHours,
    average: averageTime,
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
