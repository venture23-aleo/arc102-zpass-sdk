export type FlattenedRecord = Record<string, string | number | boolean>;
export type NormalizedRecordValueType = {
  salt: string;
  value: string | number | boolean;
}

export type NormalizedRecord = Record<
  string,
  NormalizedRecordValueType
>;

export type U64String = string;
export type FieldString = string;
export type U128String = string;

export interface ZPassInfo {
  type: string,
  issuer: string,
  root: string;
}
