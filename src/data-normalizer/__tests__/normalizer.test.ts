import { expect } from "chai";
import { DataNormalizer } from "../data-normalizer";

describe("YAML-Transformer", () => {
  it("Should parse yaml to nested object", async () => {
    const input = {
      name: "John Doe",
      age: 26,
      dob: 19980809,
      address: {
        street: "123 Main St",
        city: "Springfield",
        state: "IL",
        postalCode: "62701",
        country: "USA",
        coordinates: {
          latitude: 39.7817,
          longitude: -89.6501,
        },
      },
    };
    const result = DataNormalizer.normalize(input);
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
