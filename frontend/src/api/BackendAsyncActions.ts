import { createAsyncActionWithErrors } from "./asyncActionsUtils";
import { BackendApi, IOCreateOrder_Input, IOCreateOrder_Output } from "./BackendApi";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  Connection,
} from "@solana/web3.js";
import { ConnectionContextState, WalletContextState } from "@solana/wallet-adapter-react";

interface IOGetRates_Input {
  symbol: string;
}

interface IOGetRates_Output {
  crypto_rate: number;
  near_rate: number;
  swap_rate: number;
}

async function GetRates({ symbol }: IOGetRates_Input): Promise<IOGetRates_Output> {
  return {
    crypto_rate: 35.0495,
    near_rate: 4.5874,
    swap_rate: 7.640384531542923,
  };
}

interface IORunTransaction_Input extends IOCreateOrder_Input {
  amount: string;
  connection: Connection;
  wallet: WalletContextState;
}

interface IORunTransaction_Output extends IOCreateOrder_Output {
  secondsTaken: number;
}

async function RunTransaction({
  to_address,
  from_network,
  amount,
  connection,
  wallet,
}: IORunTransaction_Input): Promise<IORunTransaction_Output> {
  const response = await BackendApi.createOrder({
    from_network,
    to_address,
  });

  const { deposit_address } = response;

  const lamports = LAMPORTS_PER_SOL * Number(amount);

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: wallet.publicKey!,
      toPubkey: new PublicKey(deposit_address),
      lamports,
    }),
  );

  const {
    context: { slot: minContextSlot },
    value: { blockhash, lastValidBlockHeight },
  } = await connection.getLatestBlockhashAndContext();

  const signature = await wallet.sendTransaction(transaction, connection, {
    minContextSlot,
  });

  console.log("Finished send Transaction");
  const timeStart = Date.now();

  await connection.confirmTransaction({
    blockhash,
    lastValidBlockHeight,
    signature,
  });

  console.log("signature", signature);
  console.log("blockhash", blockhash);

  const finalResponse = await BackendApi.verifyOrder({
    transaction_hash: signature,
  });

  return {
    ...finalResponse,
    secondsTaken: Math.round((Date.now() - timeStart) / 1000),
  };
}

export const BackendAsyncActions = {
  GetRates: createAsyncActionWithErrors(GetRates),
  CreateOrder: createAsyncActionWithErrors(BackendApi.createOrder),
  VerifyOrder: createAsyncActionWithErrors(BackendApi.verifyOrder),
  RunTransaction: createAsyncActionWithErrors(RunTransaction, {
    subsetKey: (args) => `${args.from_network}}+${args.to_address}+${args.amount}`,
  }),
};
