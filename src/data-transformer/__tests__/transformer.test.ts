import { expect } from "chai";
import { YAMLTransformer } from "../yaml-transformer";

describe("YAML-Transformer", () => {
  it("Should parse yaml to nested object", async () => {
    const yaml = `name: John Doe
address:
  street: 123 Main St
  city: Springfield
  state: IL
  postalCode: "62701"
  country: USA
  coordinates:
    latitude: 39.7817
    longitude: -89.6501
 `;
    const result = new YAMLTransformer().transfrom(yaml);

    expect(result).deep.equals({
      name: "John Doe",
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
    });
  });
});
