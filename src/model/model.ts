export type FlattenedRecord = Record<string, string | number | boolean>;

export type NormalizedRecord = Record<
  string,
  {
    salt: string;
    value: string | number | boolean;
  }
>;

export type U64String = string;
export type FieldString = string;
export type U128String = string;
