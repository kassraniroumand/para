"use client";

import { useState, useCallback } from "react";
import { AxiosError, AxiosRequestConfig } from "axios";
import * as api from "@/app/utils/axios-utils";

interface UseAxiosOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: AxiosError) => void;
  initialData?: T;
}

interface UseAxiosState<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
}

interface UseAxiosReturn<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
  get: (url: string, config?: AxiosRequestConfig) => Promise<T | null>;
  post: (url: string, data?: any, config?: AxiosRequestConfig) => Promise<T | null>;
  put: (url: string, data?: any, config?: AxiosRequestConfig) => Promise<T | null>;
  del: (url: string, config?: AxiosRequestConfig) => Promise<T | null>;
  patch: (url: string, data?: any, config?: AxiosRequestConfig) => Promise<T | null>;
}

export function useAxios<T = any>(options: UseAxiosOptions<T> = {}): UseAxiosReturn<T> {
  const { onSuccess, onError, initialData = null } = options;

  const [state, setState] = useState<UseAxiosState<T>>({
    data: initialData,
    loading: false,
    error: null,
  });

  const handleRequest = useCallback(
    async (
      requestFn: (url: string, ...args: any[]) => Promise<T>,
      url: string,
      ...args: any[]
    ): Promise<T | null> => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const data = await requestFn(url, ...args);
        setState({ data, loading: false, error: null });
        onSuccess?.(data);
        return data;
      } catch (err) {
        const error = err as AxiosError;
        setState({ data: null, loading: false, error });
        onError?.(error);
        return null;
      }
    },
    [onSuccess, onError]
  );

  const get = useCallback(
    (url: string, config?: AxiosRequestConfig) =>
      handleRequest(api.get, url, config),
    [handleRequest]
  );

  const post = useCallback(
    (url: string, data?: any, config?: AxiosRequestConfig) =>
      handleRequest(api.post, url, data, config),
    [handleRequest]
  );

  const put = useCallback(
    (url: string, data?: any, config?: AxiosRequestConfig) =>
      handleRequest(api.put, url, data, config),
    [handleRequest]
  );

  const del = useCallback(
    (url: string, config?: AxiosRequestConfig) =>
      handleRequest(api.del, url, config),
    [handleRequest]
  );

  const patch = useCallback(
    (url: string, data?: any, config?: AxiosRequestConfig) =>
      handleRequest(api.patch, url, data, config),
    [handleRequest]
  );

  return {
    ...state,
    get,
    post,
    put,
    del,
    patch,
  };
}
