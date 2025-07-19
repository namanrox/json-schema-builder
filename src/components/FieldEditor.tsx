import React from "react";
import { Button, Input, Select, Space, Card } from "antd";
import type { FieldDef, FieldType } from "./types";

const typeOptions: { label: string; value: FieldType }[] = [
    { label: "String", value: "string" },
    { label: "Number", value: "number" },
    { label: "Nested", value: "nested" },
];

interface FieldEditorProps {
    field: FieldDef;
    onChange: (field: FieldDef) => void;
    onRemove: () => void;
}

const FieldEditor: React.FC<FieldEditorProps> = ({ field, onChange, onRemove }) => (
    <Card size="small" style={{ marginBottom: 8 }}>
        <Space>
            <Input
                placeholder="Field name"
                value={field.name}
                onChange={e => onChange({ ...field, name: e.target.value })}
                style={{ width: 120 }}
            />
            <Select
                value={field.type}
                onChange={value => {
                    if (value === "nested") onChange({ ...field, type: value, nestedFields: [{ name: "", type: "string" }] });
                    else onChange({ ...field, type: value, nestedFields: undefined });
                }}
                options={typeOptions}
                style={{ width: 100 }}
            />
            <Button danger onClick={onRemove}>Remove</Button>
        </Space>
        {field.type === "nested" && field.nestedFields && (
            <div style={{ marginLeft: 24, marginTop: 8 }}>
                {field.nestedFields.map((nf, idx) => (
                    <FieldEditor
                        key={idx}
                        field={nf}
                        onChange={updated =>
                            onChange({
                                ...field,
                                nestedFields: field.nestedFields!.map((f, i) => (i === idx ? updated : f)),
                            })
                        }
                        onRemove={() =>
                            onChange({
                                ...field,
                                nestedFields: field.nestedFields!.filter((_, i) => i !== idx),
                            })
                        }
                    />
                ))}
                <Button
                    type="dashed"
                    onClick={() =>
                        onChange({
                            ...field,
                            nestedFields: [...field.nestedFields!, { id: "", name: "", type: "string" }],
                        })
                    }
                >
                    + Add Nested Field
                </Button>
            </div>
        )}
    </Card>
);

export default FieldEditor;
