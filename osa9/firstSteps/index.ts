import express from 'express';
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    const parametersOK: boolean = !isNaN(Number(height)) && !isNaN(Number(weight));
    if (!parametersOK) 
      res.status(400).send({ error: "malformatted parameters" });
    else{
      const BMI = calculateBmi(Number(height), Number(weight));
      res.send({ height, weight, BMI });}
  });

  app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    if (!daily_exercises ||  !target)
      res.status(400).send({error: "parameters missing"});
    if (isNaN(Number((daily_exercises as string[]).length)))
      res.status(400).send({ error: "malformatted parameters" });
    if  (Number((daily_exercises as string[]).length)===0)
      res.status(400).send({ error: "malformatted parameters" });
    let exerciseHours:number[]=[];
    for (let i = 0; i <(daily_exercises as string[]).length ; i++){
      const exercise=Number((daily_exercises as string[])[i]);
      if(isNaN(exercise))
        res.status(400).send({ error: "malformatted parameters" });
      exerciseHours=exerciseHours.concat(exercise);
    }
    if(isNaN(Number(target)))
      res.status(400).send({ error: "malformatted parameters" });
    res.send(calculateExercises(exerciseHours,Number(target)));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});