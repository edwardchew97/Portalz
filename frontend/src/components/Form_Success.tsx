import React from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { AppStore } from "../state/AppStore";

export interface ICPForm_Success {
  [prop: string]: any;
}

export const Form_Success: React.FC<ICPForm_Success> = () => {
  const [{ amountReceived, nearTransactionHash }, { toAddress }] = AppStore.useState(
    (s) => [s.success!, s.formInputs] as const,
  );

  return (
    <Flex gap={"2em"} direction={"column"}>
      <Heading color={"green.400"} fontWeight={800}>
        SUCCESS
      </Heading>
      <Flex direction={"column"} gap={"0.5em"}>
        <Text fontSize={"2em"}>106.965 NEAR</Text>
        <Text fontSize={"0.8em"}>Sent to account</Text>
        <Text fontSize={"2em"} wordBreak={"break-word"}>
          {toAddress}
        </Text>
      </Flex>
      <a target={"_blank"} href={`https://nearblocks.io/txns/${nearTransactionHash}`}>
        <Text color={"whiteAlpha.600"} fontSize={"0.8em"}>
          Transaction Hash: {nearTransactionHash}
        </Text>
      </a>
    </Flex>
  );
};
