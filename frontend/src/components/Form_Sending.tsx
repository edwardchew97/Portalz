import React from "react";
import { AppStore, EProgress } from "../state/AppStore";
import { FormSection_ChooseNetwork } from "./FormSection_ChooseNetwork";
import { FormSection_Sending } from "./FormSection_Sending";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { BackendAsyncActions } from "../api/BackendAsyncActions";
import { notNullEmpty } from "../utils/StringUtils";
import { useToast, Text, Button } from "@chakra-ui/react";

const hash =
  "fuaJLcgbjSALRnRgZFDB2p7a47ofjsCkDr9ZXTcWZzNSvBVhstJGVVASvkRf12jMEGkxZxEs4ZfEZEdfNyk2nac";

function Form_Sending() {
  const [{ symbol, amount, progress, toAddress }] = AppStore.useState(
    (s) => [s.formInputs] as const,
  );
  const { setVisible } = useWalletModal();
  const { connection } = useConnection();
  const walletContextState = useWallet();

  const runTransactionAction = BackendAsyncActions.RunTransaction.useDefer();

  const toast = useToast();

  return (
    <>
      <FormSection_ChooseNetwork />
      {progress === EProgress.P1_SEND_AMOUNT && <FormSection_Sending />}
      {progress === EProgress.P0_CONNECT_NETWORK && (
        <button
          id="formSubmitButton"
          onClick={() => {
            setVisible(true);
            AppStore.update((s) => {
              s.formInputs.symbol = "sol";
            });
          }}
        >
          {" "}
          Connect
        </button>
      )}
      {progress === EProgress.P1_SEND_AMOUNT && (
        <Button
          isLoading={runTransactionAction.isLoading}
          disabled={runTransactionAction.isLoading || !notNullEmpty(toAddress)}
          id="formSubmitButton"
          onClick={async () => {
            const response = await runTransactionAction.execute({
              connection,
              wallet: walletContextState,
              amount,
              to_address: toAddress ?? "",
              from_network: "solana",
            });

            if (!response.error) {
              AppStore.update((s) => {
                s.success = {
                  amountReceived: response.payload.to_amount!,
                  nearTransactionHash: response.payload.transaction_hash,
                  secondsTaken: response.payload.secondsTaken,
                };
                s.formInputs.progress = EProgress.P2_SUCCESS;
              });
            } else {
              toast({
                status: "error",
                title: "Something went wrong",
                description: <Text wordBreak={"break-word"}>{response.message}</Text>,
              });
            }
            /*const response = await createOrderAction.execute({
              from_network: "solana",
              to_address: toAddress ?? "",
              // to_network: "near",
            });

            if (!response.error) {
              const { deposit_address } = response.payload;

              const lamports = LAMPORTS_PER_SOL * Number(amount);

              const transaction = new Transaction().add(
                SystemProgram.transfer({
                  fromPubkey: publicKey!,
                  toPubkey: new PublicKey(deposit_address),
                  lamports,
                }),
              );

              const {
                context: { slot: minContextSlot },
                value: { blockhash, lastValidBlockHeight },
              } = await connection.getLatestBlockhashAndContext();

              const signature = await sendTransaction(transaction, connection, {
                minContextSlot,
              });
              const transResp = await connection.confirmTransaction({
                blockhash,
                lastValidBlockHeight,
                signature,
              });

              console.log(deposit_address);
              console.log(transResp);
              console.log("signature", signature);
              console.log("blockhash", blockhash);
            }*/
          }}
        >
          {" "}
          Pay
        </Button>
      )}
    </>
  );
}

export default Form_Sending;
