const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const regex = /^[1-9]\d*$/; // positive integers only

app.post("/api/step-addition", (req, res) => {
  const num1 = req.body.num1;
  const num2 = req.body.num2;
  if (!num1 || !num2) {
    return res.status(400).json({ error: "Both numbers are required" });
  }
  if (!regex.test(num1) || !regex.test(num2)) {
    return res.status(400).json({ error: "Positive integers only" });
  }
  const steps = generateSteps(num1, num2);
  res.json(steps);
});

function generateSteps(num1, num2) {
  const steps = {};
  let carry = 0;
  let i = 1;
  while (num1 > 0 || num2 > 0) {
    const digit1 = num1 % 10;
    const digit2 = num2 % 10;
    const sum = carry + digit1 + digit2;
    const carryString = carry > 0 ? `1${"_".repeat(i - 1)}` : "";
    const sumString = sum.toString().padStart(i, "0");
    steps[`step${i}`] = { carryString, sumString };
    carry = sum >= 10 ? 1 : 0;
    num1 = Math.floor(num1 / 10);
    num2 = Math.floor(num2 / 10);
    i++;
  }
  if (carry > 0) {
    steps[`step${i}`] = { carryString: `1${"_".repeat(i - 1)}`, sumString: "1".padEnd(i, "0") };
  }
  return steps;
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
