import React from "react";
import { useState } from "react";
import OtpInput from "./OtpInput";

const PhoneOtpForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);

  function handleOnSubmit(e) {
    e.preventDefault();
    //phone validation
    const phoneNumberRegex =  /^[0-9]{10}$/;
    if ( !phoneNumberRegex.test(phoneNumber)) {
      alert("invalid phone number");
    }

    // call api send otp to user
    //show otp field
    setShowOtpField(true);
  }
function onOtpSubmit(otp){
    console.log("login with",otp);
}

  return (
    <>
      {showOtpField ? (
        <div>
           
            <p> enter otp send to {phoneNumber} </p>
            <OtpInput length ={4} onOtpSubmit={onOtpSubmit} />
            </div>
      ) : (
        <div>
          <form onSubmit={handleOnSubmit}>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter Phone Number"
            />
            <button type="submit">Send Otp</button>
          </form>
        </div>
      )}
    </>
  );
};

export default PhoneOtpForm;
