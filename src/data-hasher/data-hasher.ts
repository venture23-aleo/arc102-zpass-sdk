import { NormalizedRecord } from "../model";
import { encodeToField } from "../utils/encoding";
import { hashField_SHA3_256_TO_U64 } from "../utils/hasher";

const formatKey = (key: string, issuer: string) => {
  return `KYC${issuer}${key}`;
};

export class DataHasher {
  static hash(data: NormalizedRecord) {
    //@TODO Validate the aleo address
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
      const hashedFieldKey = hashField_SHA3_256_TO_U64(
        encodeToField(formattedKey)
      );

      const { salt, value } = data[key];
      const hashedSalt = hashField_SHA3_256_TO_U64(encodeToField(salt));

      let hashedValue = "0u64";
      if (typeof value == "string")
        hashedValue = hashField_SHA3_256_TO_U64(encodeToField(value));
      // @TODO handle floating point value
      else if (typeof value == "number" || typeof value == "boolean")
        hashedValue = Number(value) + "u64";
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
