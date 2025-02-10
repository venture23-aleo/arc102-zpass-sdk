export type NormalizedRecord = Record<
  string,
  {
    salt: string;
    value: string | number | boolean;
  }
>;

export class DataFormatter {
  static flatten(
    // eslint-disable-next-line
    data: Record<string, any>,
    result: Record<string, string | number | boolean>,
    parent?: string
  ) {
    for (const key in data) {
      const value = data[key];
      if (value == null || value == undefined)
        throw new Error(`Invalid value for ${key}`);

      const name = parent ? parent.concat(",", key) : key;
      if (typeof data[key] == "object") this.flatten(value, result, name);
      else result[name] = data[key];
    }
  }
  // Flatten and normalize the data
  static normalize(data: Record<string, unknown>): NormalizedRecord {
    const flattened: Record<string, any> = {};
    this.flatten(data, flattened);

    const result: NormalizedRecord = {};
    for (const key in flattened) {
      result[key] = {
        salt: "0x12345",
        value: flattened[key],
      };
    }
    return result;
  }
}
