import {
  createAsyncAction,
  errorResult,
  IOCreateAsyncActionOutput,
  ICreateAsyncActionOptions,
  IPullstateAllStores,
  successResult,
} from "pullstate";

export class PortalzError extends Error {
  public endTags: string[];

  constructor(endTags: string[], previousError?: Error) {
    super(previousError?.message, { cause: previousError });
    this.endTags = endTags;
  }
}

export function createAsyncActionWithErrors<I, O, T extends string = string>(
  asyncMethod: (inputs: I, store: IPullstateAllStores) => Promise<O>,
  options?: ICreateAsyncActionOptions<I, O, T, any, any>,
): IOCreateAsyncActionOutput<I, O, T, any, any> {
  return createAsyncAction<I, O, T>(async (inputs, store) => {
    try {
      const resp = await asyncMethod(inputs, store);
      return successResult(resp);
    } catch (e: any) {
      if (e instanceof PortalzError) {
        return errorResult(e.endTags as T[], e.message, e.cause);
      }
      return errorResult([], e.message, e);
    }
  }, options);
}
