import { U128String, U64String } from "../model";

export const u64ToBigInt = (input: U64String): bigint => {
  if (!input.includes("u64")) {
    throw new Error(`Cannot convert u64 to BigInt ${input}`);
  }
  return BigInt(input.replace("u64", ""));
};

export const bigIntToU128 = (input: bigint): U128String => {
  return input + "u128";
};

export const bigIntToU64 = (input: bigint): U128String => {
  return input + "u64";
};

export const isFloat = (input: number) => {
  return input % 1 !== 0;
};
