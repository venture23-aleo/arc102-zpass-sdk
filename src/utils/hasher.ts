import { Hasher } from "@doko-js/wasm";
import { FieldString, U128String, U64String } from "../model";
import { u64ToBigInt, bigIntToU128 } from "./conversion";

export const hashField_SHA3_256_TO_U64 = (data: FieldString): U64String => {
  return Hasher.hash("sha3_256", data, "u64", "testnet");
};

// @TODO add validation/type for u64(leo types) string
export const hash128 = (data: U128String): U64String => {
  return Hasher.hash("sha3_256", data, "u64", "testnet");
};

export const mergeU64 = (left: U64String, right: U64String): U128String => {
  const BASE = 18446744073709551617n; // 2^64+1
  const l = u64ToBigInt(left);
  const r = u64ToBigInt(right);

  const hashInput = l < r ? l * BASE + r : r * BASE + l;
  return bigIntToU128(hashInput);
};

export const hashMerge = (left: U64String, right: U64String): U64String => {
  return hash128(mergeU64(left, right));
}