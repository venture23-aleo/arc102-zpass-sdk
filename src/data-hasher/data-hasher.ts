import { NormalizedRecord } from "../model";
import { encodeToF } from "../utils/encoding";
import { hashField } from "../utils/hasher";

const formatKey = (key: string, issuer: string) => {
  return `KYC${issuer}${key}`;
};

export class DataHasher {
  static hash(data: NormalizedRecord) {
    //const encodedRecord: Record<string, string> = {};

    // @TODO check if this is the right issuer or not
    // Validate the aleo address
    if (!data["issuer"])
      throw new Error("Issuer is missing from normalized data");

    const issuerAddress = data["issuer"].value as string;
    for (const key in data) {
      if (typeof key != "string") {
        throw new Error(
          `Undefined type for key, expected: string got ${typeof key}`
        );
      }

      // Hash key to u64
      const formattedKey = formatKey(key, issuerAddress);
      const hashedFieldKey = hashField(encodeToF(formattedKey));

      const { salt, value } = data[key];
      const hashedSalt = hashField(encodeToF(salt));

      let hashedValue = 0n;
      if (typeof value == "string") hashedValue = hashField(encodeToF(value));
      else if (typeof value == "number" || typeof value == "boolean")
        hashedValue = BigInt(value);
      else
        throw new Error(
          `Unsupported type for ${value}, expected string, boolean or number`
        );

      console.log(
        key,
        formattedKey,
        hashedFieldKey,
        salt,
        hashedSalt,
        value,
        hashedValue
      );
    }
  }
}
