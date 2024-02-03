import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const OtpInput = ({ length, onOtpSubmit }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);
  console.log("otp", otp);
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);



  function handleChange(index, e) {
    const value = e.target.value;
    if (isNaN(value)) {
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
       // Move to next input if current field is filled
       if (value && index < length - 1 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    const combinedOtp = newOtp.join("");
    if(combinedOtp.length == length){
        onOtpSubmit(combinedOtp);
    }
    

  }


  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };
  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };
  return (
    <>
      {otp.map((value, index) => (
        <input
          key={index}
          ref={(input) => (inputRefs.current[index] = input)}
          type="text"
          value={value}
          onChange={(e) => handleChange(index, e)}
          onClick={() => handleClick(index)}
          onKeyDown={(e) => {
            handleKeyDown(index, e);
          }}
          className="otpInput"
        />
      ))}
    </>
  );
};

export default OtpInput;
