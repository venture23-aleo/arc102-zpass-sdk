import crypto from "crypto";

const U64_MAX = 18446744073709551615n;

const bufferToBigInt = (array: Buffer) => {
  const hex = array.toString("hex");
  // pad hex to even
  const padded = hex.length % 2 == 0 ? hex : `0${hex}`;
  return BigInt(`0x${padded}`);
};

export const hashField = (data: bigint): bigint => {
  const hashFn = crypto.createHash("SHA3-256");
  const digest = hashFn.update(data.toString()).digest();
  return bufferToBigInt(digest) % U64_MAX;
};
