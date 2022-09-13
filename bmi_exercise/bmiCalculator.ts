const calculateBmi = (heightCm: number, weightKg: number): string => {
  if (heightCm === 0) {
    throw new Error("Height can't be 0!")
  }

  const heightM: number = heightCm / 100
  const bmi: number = weightKg / (heightM * heightM)

  if (bmi < 16.0) {
    return "Underweight (Severe thinness)"
  } else if (bmi < 17.0) {
    return "Underweight (Moderate thinness)"
  } else if (bmi < 18.5) {
    return "Underweight (Mild thinness)"
  } else if (bmi < 25.0) {
    return "Normal range"
  } else if (bmi < 30.0) {
    return "Overweight (Pre-obese)"
  } else if (bmi < 35.0) {
    return "Obese (Class I)"
  } else if (bmi < 40.0) {
    return "Obese (Class II)"
  }
  return "Obese (Class III)"
}

console.log(calculateBmi(171, 54))
