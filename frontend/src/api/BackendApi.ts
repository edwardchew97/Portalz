import { PortalzError } from "./asyncActionsUtils";

interface IBackendResponse<R> {
  statusCode: number;
  message: string;
  response: R;
}

let baseBackendUrl = "http://192.168.43.28:3000";

interface IExecuteRequest {
  path: string;
  body?: any;
  method?: "POST" | "GET";
}

async function executeRequest<R>({ path, body, method = "POST" }: IExecuteRequest): Promise<R> {
  const response: IBackendResponse<R> = await fetch(`${baseBackendUrl}/${path}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
    },
  }).then((resp) => resp.json());

  if (response.statusCode === 200) {
    return response.response;
  }

  console.error(response.message);
  throw new PortalzError([], new Error(response.message));
}

export interface IOCreateOrder_Input {
  from_network: "solana";
  // to_network: "near";
  to_address: string;
}

export interface IOCreateOrder_Output {
  id: number;
  deposit_address: string;
  from_amount?: string;
  to_amount?: string;
  transaction_hash: string;
  updated_at: string;
}

async function createOrder(inputs: IOCreateOrder_Input): Promise<IOCreateOrder_Output> {
  return executeRequest({ path: "orders/create", body: inputs });
}

export interface IOVerifyOrder_Input {
  transaction_hash: string;
}

async function verifyOrder(inputs: IOVerifyOrder_Input): Promise<IOCreateOrder_Output> {
  return executeRequest({ path: "orders/verify", body: inputs });
}

export const BackendApi = {
  createOrder,
  verifyOrder,
};
