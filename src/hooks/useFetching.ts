import { useState, useRef } from "react";

type ICallback<T> = (...args: any[]) => Promise<T>;

interface IFetching<T> {
  callback: ICallback<T>;
  defaultValue?: T;
  onError?: (error: Error) => void;
  onSuccess?: (data: T) => void;
  condition?: boolean;
}

function useFetching<T>({
  condition = true,
  onSuccess,
  callback,
  onError,
  defaultValue = null as T,
}: IFetching<T>) {
  const [data, setData] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isError, setIsError] = useState(false);
  const latestQueryArgsRef = useRef<ICallback<T>>();

  async function handlerQuery(queryFunc: ICallback<T>) {
    if (!condition) return;

    try {
      setIsLoading(true);
      const response = await queryFunc();
      setData(response);
      onSuccess?.(response);
      latestQueryArgsRef.current = queryFunc;
      setSuccess(true);
      setIsError(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
        onError?.(error);
        setSuccess(false);
        setIsError(true);
      }
    } finally {
      setIsLoading(false);
    }
  }
  async function fetchQuery(...args: any[]) {
    if (callback) {
      await handlerQuery(() => callback(...args));
    }
  }

  async function refetch() {
    if (latestQueryArgsRef.current) {
      await handlerQuery(latestQueryArgsRef.current);
    }
  }

  return {
    handlerQuery,
    fetchQuery,
    data: data,
    isSuccess,
    isLoading,
    refetch,
    isError,
    error,
  };
}

export default useFetching;
