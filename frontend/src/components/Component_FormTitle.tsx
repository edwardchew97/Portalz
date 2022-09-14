import React from "react";
import { Flex, Text, Tooltip } from "@chakra-ui/react";
import { IoMdInformationCircle } from "react-icons/io";

export interface ICPComponent_FormTitle {
  title: string | React.ReactElement;
  hintText?: string;
}

export const Component_FormTitle: React.FC<ICPComponent_FormTitle> = ({ title, hintText = "" }) => {
  return (
    <Flex align={"center"} gap={"0.5em"} mb={"0.5em"}>
      <Text fontSize={"0.8em"}>{title}</Text>
      {hintText.length > 0 && (
        <Tooltip label={hintText}>
          <div>
            <IoMdInformationCircle />
          </div>
        </Tooltip>
      )}
    </Flex>
  );
};
