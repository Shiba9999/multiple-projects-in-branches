import React, { useState } from "react";
import Checkbox from "./components/Checkbox";
import Button from "./components/Button";
import "./styles.css"
import usePasswordGenerator from "./use-password-generator";
import PasswordStrengthIndicator from "./components/StrengthChecker";
const App = () => {
  const [length, setLength] = useState(4);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);
  const [copied, setCopied] = useState(false);

  function handleCheckboxChange(i){
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckboxData(updatedCheckboxData);
  }
  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  const { password, errorMessage, generatePassword } = usePasswordGenerator();
  return (
    <div className="container">
      {/* password and copy */}
      {password && (
        <div className="header">
          <div className="title">{password}</div>
          <Button
            text={copied ? "Copied" : "copy"}
            onClick={handleCopy}
            customClass="copyBtn"
          />
        </div>
      )}
      <div className="charlength">
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input
          type="range"
          min="4"
          max="20"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>

      {/* checkbox */}
      <div className="checkboxes">
        {checkboxData.map((checkbox, index) => {
          return (
            <Checkbox
              key={index}
              title={checkbox.title}
              onChange={() => handleCheckboxChange(index)}
              state={checkbox.state}
            />
          );
        })}
      </div>
      <PasswordStrengthIndicator password={password} />
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      <Button
        text="Generate Password"
        onClick={() => generatePassword(checkboxData, length)}
        customClass="generateBtn"
      />
    </div>
  );
};

export default App;
