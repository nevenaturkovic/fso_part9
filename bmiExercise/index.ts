import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);
  if (!isNaN(weight) && !isNaN(height)) {
    res.send({
      weight,
      height,
      bmi: calculateBmi(Number(height), Number(weight)),
    });
  } else {
    res.send({
      error: "malformatted parameters",
    });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  
  if (daily_exercises !== undefined && target !== undefined) {
    const targetValue = Number(target);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const numberOfHoursPerDay: Array<number> = daily_exercises;
    if (
      !isNaN(targetValue) &&
      numberOfHoursPerDay.every((hours) => !isNaN(hours))
    ) {
      res.send(calculateExercises(numberOfHoursPerDay, targetValue));
    } else {
      res.send({
        error: "malformatted parameters",
      });
    }
  } else {
    res.send({
      error: "parameters missing",
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
