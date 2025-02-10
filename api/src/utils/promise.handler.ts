interface WrapPromiseFunctionResponse<T> {
    data?: T | any;
    error?: Error | any | undefined ;
  }
  
  export class PromiseHandler {
    public static wrapPromise<T>(promise: Promise<any>): Promise<WrapPromiseFunctionResponse<T>> {
      return Promise.allSettled([promise]).then(
        ([result]: PromiseSettledResult<any>[]) => ({
          data: result.status === "fulfilled" ? result.value : undefined,
          error: result.status === "rejected" ? result.reason : undefined,
        })
      );
    }
  }