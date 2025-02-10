import { DataTransformer } from "./data-transformer";
import * as yaml from "js-yaml";

export class YAMLTransformer extends DataTransformer {
  transfrom(data: string): Record<string, unknown> {
    return yaml.load(data, { json: true }) as Record<string, unknown>;
  }
}
