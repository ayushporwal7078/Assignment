import React, { useState } from "react";
import axios from "axios";

function StepAddition() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [steps, setSteps] = useState(null);
  const [result, setResult] = useState(null);

  const handleNum1Change = (event) => {
    setNum1(event.target.value);
  };

  const handleNum2Change = (event) => {
    setNum2(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:5000/api/step-addition", { num1, num2 })
      .then((response) => {
        setSteps(response.data.steps);
        setResult(response.data.result);        
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          First number:
          <input type="text" value={num1} onChange={handleNum1Change} />
        </label>
        <br />
        <label>
          Second number:
          <input type="text" value={num2} onChange={handleNum2Change} />
        </label>
        <br />
        <button type="submit">Generate step</button>
      </form>
      <div>
        {steps && (
          <pre>{JSON.stringify(steps, null, 2)}</pre>
        )}
         {result && (
          <p>The result is: {result}</p>
        )}
      </div>
    </div>
  );
}

export default StepAddition;
