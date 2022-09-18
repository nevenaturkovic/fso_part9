import express from "express";
import cors from "cors";
import diagnosesRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";
import { NextFunction, Request, Response } from "express";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  console.error(error.message);
  response.status(400).send({ error: error.message });

  next(error);
};

app.use(errorHandler);
