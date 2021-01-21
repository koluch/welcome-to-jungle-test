// https://basarat.gitbooks.io/typescript/docs/types/never.html
export function neverThrow(obj: never, message?: string): never {
  throw new Error(message == null ? "Should never happen" : "message");
}
