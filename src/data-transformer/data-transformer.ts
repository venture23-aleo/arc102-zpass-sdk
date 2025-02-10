export abstract class DataTransformer {
  abstract transfrom(data: string): Record<string, any>;
}
