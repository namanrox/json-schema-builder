export type FieldType = "string" | "number" | "nested";

export interface FieldDef {
  id: number;
  name: string;
  type: FieldType;
  nestedFields?: FieldDef[];
}
