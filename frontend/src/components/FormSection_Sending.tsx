import React from "react";
import { IoMdInformationCircle } from "react-icons/io";
import { AppStore } from "../state/AppStore";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import {
  Flex,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";
import { Component_FormTitle } from "./Component_FormTitle";
import { BackendAsyncActions } from "../api/BackendAsyncActions";
import { notNullEmpty } from "../utils/StringUtils";

export interface ICPFormSection_ChooseNetwork {
  [prop: string]: any;
}

export const FormSection_Sending: React.FC<ICPFormSection_ChooseNetwork> = () => {
  const [formInputs] = AppStore.useState((s) => [s.formInputs] as const);

  const getRatesAction = BackendAsyncActions.GetRates.use({
    symbol: formInputs.symbol!,
  });

  return (
    <>
      <div className="formControl">
        <Component_FormTitle title={"To"} hintText={"Where do you want to receive the funds?"} />
        <select>
          <option id={"sol"}> Near</option>
          <option id={"btc"} disabled>
            {" "}
            Aurora
          </option>
        </select>
      </div>
      <div className="flexControl">
        <div className="formControl">
          <Component_FormTitle title={"You Send"} />
          <Flex align={"center"} gap={"0.5em"}>
            <NumberInput
              min={0}
              fontWeight={700}
              step={0.01}
              value={formInputs.amount}
              onChange={(e) => {
                AppStore.update((s) => {
                  s.formInputs.amount = e;
                });
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Text fontWeight={700} fontSize={"1.2em"}>
              SOL
            </Text>
          </Flex>
        </div>
        <CgArrowsExchangeAlt id="exchangeSvg" />
        <div className="formControl">
          <Component_FormTitle title={"You Receive"} />
          <Flex align={"center"} gap={"0.5em"}>
            <NumberInput
              fontWeight={700}
              value={
                !getRatesAction.error
                  ? getRatesAction.payload.swap_rate * Number(formInputs.amount)
                  : ""
              }
            >
              <NumberInputField />
            </NumberInput>
            <Text fontWeight={700} fontSize={"1.2em"}>
              NEAR
            </Text>
          </Flex>
        </div>
      </div>
      <div className="formControl">
        <Component_FormTitle
          title={
            <>
              Your <b>NEAR</b> Address
            </>
          }
        />
        <input
          value={formInputs.toAddress ?? ""}
          onChange={(e) => {
            AppStore.update((s) => {
              s.formInputs.toAddress = e.target.value;
            });
          }}
          type="text"
          placeholder="Ex: 2Mi1q7GGVFQkjCERZ4mDMMQ4Yq6MWVSHxgAkprf65b8A"
        />
      </div>
    </>
    /*<div id="formContentInput">

      <button id="formSubmitButton"> Pay</button>
    </div>*/
  );
};
