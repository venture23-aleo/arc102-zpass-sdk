import { YAMLTransformer } from "../../data-transformer";
import { DataFormatter } from "../../data-formatter";
import { NormalizedRecord, FlattenedRecord } from "../../model";
import { DataHasher } from "../data-hasher";
import { expect } from "chai";

const data = `type: KYC
issuer: aleo123456
name: Alice Wonderland
dob: 1737213145
`;

const keyUUIDMap: Map<string, string> = new Map([
  ["type", "2fc55f97-a9a3-4ed7-8815-634441580111"],
  ["issuer", "d64266d2-b9cd-46c2-8ed1-284f96916353"],
  ["name", "1b13c461-8ed4-420a-b1f4-9d6b1f84decc"],
  ["dob", "03dff77c-f450-43ac-a8a6-54fdfe8fd58c"],
]);

describe("Data Hasher", () => {
  it("Should hash the nested object", async () => {
    const transformed = new YAMLTransformer().transfrom(data);
    const flattened: FlattenedRecord = {};
    DataFormatter.flatten(transformed, flattened);
    const normalized: NormalizedRecord = {};
    for (const key in flattened) {
      const salt = keyUUIDMap.get(key);
      if (!salt) throw new Error(`Salt not found for key ${key}`);
      normalized[key] = {
        salt,
        value: flattened[key],
      };
    }
    const leaves = DataHasher.calculateLeaves(normalized);
    expect(leaves).deep.equals([
      "3493762364786270799u64",
      "2885257838413858146u64",
      "1977705045598954156u64",
      "3824841577554724530u64",
    ]);
  });
});
