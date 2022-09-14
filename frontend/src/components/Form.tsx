import React from "react";
import { AppStore, EProgress } from "../state/AppStore";
import Circle1 from "../assets/img/picture/circle1.png";
import Circle2 from "../assets/img/picture/circle2.png";
import HeaderImage from "../assets/img/picture/landingbg.png";
import Form_Sending from "./Form_Sending";
import { Form_Success } from "./Form_Success";

export interface ICPForm {
  [prop: string]: any;
}

export const Form: React.FC<ICPForm> = () => {
  const [progress, secondsTaken] = AppStore.useState(
    (s) => [s.formInputs.progress, s.success?.secondsTaken] as const,
  );

  return (
    <div id="formContainer">
      <div id="formContentInput">
        <div id="imageWrapperContainer">
          <div id="imageWrapper">
            <img id="circle1" src={Circle1} />
            <img id="circle2" src={Circle1} />
            <img id="circle3" src={Circle2} />
            <div id="homeImage">
              <img src={HeaderImage} />
            </div>
          </div>
        </div>
        <div id="formContent">
          <div id="formContentTitle">
            {secondsTaken != null && secondsTaken > 10 ? (
              <h1>
                {" "}
                Get NEAR in{" "}
                <s
                  style={{
                    textDecorationThickness: "3px",
                  }}
                >
                  10
                </s>{" "}
                <small>
                  <i>{secondsTaken}</i>
                </small>{" "}
                seconds{" "}
              </h1>
            ) : (
              <h1> Get NEAR in 10 seconds </h1>
            )}
            <p>No hassle. Low fees.</p>
          </div>
        </div>
        {[EProgress.P0_CONNECT_NETWORK, EProgress.P1_SEND_AMOUNT].includes(progress) && (
          <Form_Sending />
        )}
        {progress === EProgress.P2_SUCCESS && <Form_Success />}
      </div>
    </div>
  );
};
