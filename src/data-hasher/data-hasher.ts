import { NormalizedRecord, U64String } from "../model";
import { isFloat } from "../utils/conversion";
import { encodeToField } from "../utils/encoding";
import { hashField_SHA3_256_TO_U64, hashMerge } from "../utils/hasher";

const formatKey = (key: string, type: string, issuer: string) => {
  return `${type}${issuer}${key}`;
};

export class DataHasher {
  static getKeyIdentifier(key: string, certificateType: string, issuerAddress: string) {
    const formattedKey = formatKey(key, certificateType, issuerAddress);
    const hashedKey = hashField_SHA3_256_TO_U64(encodeToField(formattedKey));

    return hashedKey;
  }

  static calculateLeafHash(keyIdentifier: string, salt: string, value: string | number | boolean) {
    // Calculate hash for salt
    const hashedSalt = hashField_SHA3_256_TO_U64(encodeToField(salt));

    // Calculate hash for value
    let encodedValue;
    if (typeof value == "string") {
      encodedValue = encodeToField(value);
    } else if (typeof value == "number") {
      // @TODO maybe need to handle later 
      if (isFloat(value) || value < 0)
        throw new Error("Value as float or negative is not supported for hashing");
      encodedValue = Number(value) + "field";
    } else if (typeof value == "boolean") {
      encodedValue = Number(value) + "field";
    } else {
      throw new Error(
        `Unsupported type for ${value}, expected string, boolean or number`
      );
    }

    const hashedValue = hashField_SHA3_256_TO_U64(encodedValue);
    return hashMerge(keyIdentifier, hashMerge(hashedSalt, hashedValue));
  }

  static calculateLeaves(data: NormalizedRecord) {
    //@TODO Validate the aleo address
    if (!data["issuer"] || !data["type"])
      throw new Error("Issuer or type is missing from normalized data");

    const issuerAddress = data["issuer"].value as string;
    const type = data["type"].value as string;
    const leaves: U64String[] = [];

    for (const key in data) {
      const { salt, value } = data[key];
      const keyIdentifier = this.getKeyIdentifier(key, type, issuerAddress);
      const leaf = this.calculateLeafHash(keyIdentifier, salt, value);
      leaves.push(leaf);
    }
    return leaves;
  }
}
