import { v5 as uuid } from "uuid";

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
  static normalize(
    data: Record<string, string | number | boolean>,
    password?: string
  ): NormalizedRecord {
    const result: NormalizedRecord = {};

    // Generate namespace from password
    const namespace = password ? uuid(password, uuid.URL) : crypto.randomUUID();
    for (const key in data) {
      if (
        typeof data[key] != "string" &&
        typeof data[key] != "number" &&
        typeof data[key] != "boolean"
      ) {
        throw new Error(
          `Undefined value ${data[key]} for key ${key}. Only string, number and booleans are supported.`
        );
      }

      const salt = uuid(key, namespace);
      result[key] = {
        salt,
        value: data[key],
      };
    }
    return result;
  }
}
