export const calculateBmi = (height: number, weight: number) => {
  height=height/100;
  const bmi: number= weight/(height*height);
  if(bmi<18.5)
    return "Underweight"
  else if (bmi<25)
    return "Normal (healthy weight)"
  else if (bmi<30)
    return "Overweight"
  else return "Obese";
  //underweight (under 18.5 kg/m2), normal weight (18.5 to 24.9), overweight (25 to 29.9), and obese (30 or more)
}
//const height: number = Number(process.argv[2]);
//const weight: number = Number(process.argv[3]);

//console.log(calculateBmi(height, weight));