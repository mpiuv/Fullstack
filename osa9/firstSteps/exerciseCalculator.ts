interface Result { periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number 
}
   
const calculateExercises = (daily_exercise_hours:number[],target_amount:number): Result => {
    const periodLength: number=daily_exercise_hours.length
    const trainingDays: number=daily_exercise_hours.length-daily_exercise_hours.filter(day=> day===0).length
    const target: number=target_amount
    const average: number=daily_exercise_hours.reduce((a, b) => (a + b)) / daily_exercise_hours.length;
    const success:boolean= average>target
    const rating: number=average<1?1:average<2?2:3
    const ratingDescription: string=rating===1?"Not so good":rating===2?"not too bad but could be better":"Excellent"

  return { periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average 
  }

}
console.log(JSON.stringify(calculateExercises([3, 0, 2, 4.5, 0, 3, 1],2)))