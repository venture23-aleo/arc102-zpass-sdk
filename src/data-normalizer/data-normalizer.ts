export class DataNormalizer {
  static flatten(
    data: Record<string, any>,
    result: Record<string, string | number | boolean>,
    parent?: string
  ) {
    for (let key in data) {
      let name = parent ? parent.concat(",", key) : key;
      if (typeof data[key] == "object") this.flatten(data[key], result, name);
      else result[name] = data[key];
    }
  }

  static normalize(data: Record<string, any>): Record<string, string> {
    const result = {};
    this.flatten(data, result);
    return result;
  }
}
