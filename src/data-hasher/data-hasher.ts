import { NormalizedRecord } from "../model";
import { u64ToBigInt } from "../utils/conversion";
import { encodeToField } from "../utils/encoding";
import { hashField_SHA3_256_TO_U64, hashMerge } from "../utils/hasher";

const formatKey = (key: string, issuer: string) => {
  return `KYC${issuer}${key}`;
};

export class DataHasher {
  static calculateLeaves(data: NormalizedRecord) {
    //@TODO Validate the aleo address
    if (!data["issuer"])
      throw new Error("Issuer is missing from normalized data");

    const issuerAddress = data["issuer"].value as string;
    const leaves: bigint[] = [];

    for (const key in data) {
      if (typeof key != "string") {
        throw new Error(
          `Undefined type for key, expected: string got ${typeof key}`
        );
      }

      // Hash key to u64
      const formattedKey = formatKey(key, issuerAddress);
      const hashedKey = hashField_SHA3_256_TO_U64(encodeToField(formattedKey));

      const { salt, value } = data[key];

      // Calculate hash for salt
      const hashedSalt = hashField_SHA3_256_TO_U64(encodeToField(salt));

      // Calculate hash for value
      let encodedValue;
      if (typeof value == "string") {
        encodedValue = encodeToField(value);
      } else if (typeof value == "number" || typeof value == "boolean") {
        // @TODO handle floating point value
        encodedValue = Number(value) + "field";
      } else {
        throw new Error(
          `Unsupported type for ${value}, expected string, boolean or number`
        );
      }
      const hashedValue = hashField_SHA3_256_TO_U64(encodedValue);

      const leaf = hashMerge(hashedKey, hashMerge(hashedSalt, hashedValue));
      leaves.push(u64ToBigInt(leaf));
    }
    return leaves;
  }
}
