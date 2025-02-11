import { Hasher } from "@doko-js/wasm";

export const hashField_SHA3_256_TO_U64 = (data: string): string => {
  return Hasher.hash("sha3_256", data.toString(), "u64", "testnet");
};
