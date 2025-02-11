export type FlattenedRecord= Record<string, string | number | boolean>;

export type NormalizedRecord = Record<
  string,
  {
    salt: string;
    value: string | number | boolean;
  }
>;
