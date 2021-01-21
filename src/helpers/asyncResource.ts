import { neverThrow } from "./lang";

export interface Init {
  readonly kind: "INIT";
}

export interface Loading<V> {
  readonly kind: "LOADING";
  readonly lastValue: V | null;
}

export interface Success<T> {
  readonly kind: "SUCCESS";
  readonly value: T;
}

export interface Failed {
  readonly kind: "FAILED";
  readonly message: string;
}

export type AsyncResource<T = unknown> =
  | Init
  | Loading<T>
  | Success<T>
  | Failed;

export function init<T>(): AsyncResource<T> {
  return {
    kind: "INIT",
  };
}

export function loading<T>(lastValue: T | null = null): AsyncResource<T> {
  return {
    kind: "LOADING",
    lastValue,
  };
}

export function success<T>(value: T): AsyncResource<T> {
  return {
    kind: "SUCCESS",
    value,
  };
}

export function failed<T>(message: string): AsyncResource<T> {
  return {
    kind: "FAILED",
    message,
  };
}

export function isInit<T>(resource: AsyncResource<T>): resource is Init {
  return resource.kind === "INIT";
}

export function isLoading<T>(
  resource: AsyncResource<T>
): resource is Loading<T> {
  return resource.kind === "LOADING";
}

export function isSuccess<T>(
  resource: AsyncResource<T>
): resource is Success<T> {
  return resource.kind === "SUCCESS";
}

export function isFailed<T>(resource: AsyncResource<T>): resource is Failed {
  return resource.kind === "FAILED";
}

export function match<T, R>(
  asyncResource: AsyncResource<T>,
  callbacks: {
    init: () => R;
    success: (value: T) => R;
    loading: (lastValue: T | null) => R;
    failed: (message: string) => R;
  }
): R {
  switch (asyncResource.kind) {
    case "INIT":
      return callbacks.init();
    case "SUCCESS":
      return callbacks.success(asyncResource.value);
    case "LOADING":
      return callbacks.loading(asyncResource.lastValue);
    case "FAILED":
      return callbacks.failed(asyncResource.message);
  }
  throw neverThrow(asyncResource);
}

export function map<T, R>(
  asyncResource: AsyncResource<T>,
  fn: (value: T) => R,
  loadingFn?: (lastValue: T | null) => R
): AsyncResource<R> {
  switch (asyncResource.kind) {
    case "SUCCESS":
      return success(fn(asyncResource.value));
    case "LOADING":
      if (asyncResource.lastValue != null) {
        if (loadingFn != null) {
          return loading(loadingFn(asyncResource.lastValue));
        }
        return loading(fn(asyncResource.lastValue));
      }
      return loading();
  }
  return asyncResource;
}
