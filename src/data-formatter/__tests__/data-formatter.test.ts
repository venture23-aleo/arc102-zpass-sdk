import { expect } from "chai";
import { DataFormatter } from "../data-formatter";
import { TEST_INPUT_DATA } from "./test-input";
import { FlattenedRecord } from "../../model";

describe("Data Formatter", () => {
  it("Should flatten the nested object", async () => {
    const result: FlattenedRecord = {};
    DataFormatter.flatten(TEST_INPUT_DATA, result);
    expect(result).deep.equal({
      name: "John Doe",
      age: 26,
      dob: 19980809,
      issuer: "aleo28483838383",
      type: "KYC",
      "address,street": "123 Main St",
      "address,city": "Springfield",
      "address,state": "IL",
      "address,postalCode": "62701",
      "address,country": "USA",
    });
  });

  it("Should normalize the nested object", async () => {
    const result = {};
    DataFormatter.flatten(TEST_INPUT_DATA, result);

    const normalized = DataFormatter.normalize(result, "testpassword");
    expect(normalized).deep.equal({
      name: { salt: "4698ab18-1adf-53bf-b4db-72bd06243203", value: "John Doe" },
      age: { salt: "5e1e4eb2-ff79-555d-a579-985511069354", value: 26 },
      dob: { salt: "846abae6-6353-5373-b4f6-55ce39a49a8f", value: 19980809 },
      issuer: { salt: "f2f0ed1b-d2ed-5f50-8b44-0afe167fd606", value: "aleo28483838383" },
      type: { salt: "88010173-e22e-5de0-805a-adc75093c918", value: "KYC" },
      "address,street": {
        salt: "affa5215-237b-55a6-a273-7a4a36f19ad6",
        value: "123 Main St",
      },
      "address,city": {
        salt: "70c49247-fa14-5a83-ab4d-aa850c81442b",
        value: "Springfield",
      },
      "address,state": {
        salt: "a87d0663-7d71-5a0b-87d9-fa0f0d479b74",
        value: "IL",
      },
      "address,postalCode": {
        salt: "0df154d8-69ab-5b46-9069-f5adb541c62e",
        value: "62701",
      },
      "address,country": {
        salt: "cbbb090f-e6c5-594a-ab86-88b13f84fc72",
        value: "USA",
      },
    });
  });
});
