import { Store } from "pullstate";

export enum EProgress {
  P0_CONNECT_NETWORK,
  P1_SEND_AMOUNT,
  P2_SUCCESS,
}

interface IPortalFormInputs {
  progress: EProgress;
  amount: string;
  symbol?: string;
  toAddress?: string;
}

interface IAppStore {
  formInputs: IPortalFormInputs;
  success?: {
    amountReceived: string;
    nearTransactionHash: string;
    secondsTaken: number;
  };
}

export const AppStore = new Store<IAppStore>({
  formInputs: {
    progress: EProgress.P0_CONNECT_NETWORK,
    amount: "0",
  },
});
