import express from 'express';
import { calculateBmi } from "./bmiCalculator";
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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});