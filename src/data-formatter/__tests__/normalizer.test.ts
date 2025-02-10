import { expect } from "chai";
import { DataFormatter } from "../data-formatter";
import { TEST_INPUT_DATA } from "./test-input";

describe("Data Formatter", () => {
  it("Should flatten the nested object", async () => {
    const result = {};
    DataFormatter.flatten(TEST_INPUT_DATA, result);
    expect(result).deep.equal({
      name: "John Doe",
      age: 26,
      dob: 19980809,
      "address,street": "123 Main St",
      "address,city": "Springfield",
      "address,state": "IL",
      "address,postalCode": "62701",
      "address,country": "USA",
      "address,coordinates,latitude": 39.7817,
      "address,coordinates,longitude": -89.6501,
    });
  });
});
