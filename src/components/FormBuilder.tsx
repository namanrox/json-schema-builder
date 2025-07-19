import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Divider, Typography, Card } from "antd";
import FieldEditor from "./FieldEditor";
import type { FieldDef } from "./types";

const { Title } = Typography;

function emptyField(): FieldDef {
    return { id: Date.now() + Math.random(), name: "", type: "string" };
}

const FormBuilder: React.FC = () => {
    const [fields, setFields] = useState<FieldDef[]>([]);
    const { handleSubmit, register, reset } = useForm();

    // Reset form fields to only current valid field names when fields change
    useEffect(() => {
        const emptyVals: any = {};
        const collectNames = (fs: FieldDef[], prefix = "") => {
            fs.forEach(f => {
                if (!f.name || f.name.trim().length < 2) return;
                const key = prefix ? `${prefix}.${f.name}` : f.name;
                if (f.type === "nested" && f.nestedFields) collectNames(f.nestedFields, key);
                else emptyVals[key] = "";
            });
        };
        collectNames(fields);
        reset(emptyVals);
    }, [fields, reset]);

    function renderInput(field: FieldDef, parentName = ""): React.ReactNode {
        if (!field.name || field.name.trim().length < 2) return null;
        const key = parentName ? `${parentName}.${field.name}` : field.name;
        if (field.type === "nested" && field.nestedFields) {
            return (
                <Card key={key} title={field.name} size="small" style={{ marginBottom: 8 }}>
                    {field.nestedFields.map(nf => renderInput(nf, key))}
                </Card>
            );
        }
        return (
            <Form.Item label={field.name} key={key}>
                <input {...register(key)} type={field.type === "number" ? "number" : "text"} />
            </Form.Item>
        );
    }

    function getSchema(fields: FieldDef[]): any {
        const res: any = {};
        fields.forEach(f => {
            if (!f.name || f.name.trim().length < 2) return;
            if (f.type === "nested" && f.nestedFields)
                res[f.name] = getSchema(f.nestedFields);
            else
                res[f.name] = f.type === "string" ? "STRING" : "number";
        });
        return res;
    }

    function unflatten(data: Record<string, any>): Record<string, any> {
        const result: any = {};
        Object.keys(data).forEach(key => {
            if (!key.includes(".")) {
                result[key] = data[key];
            } else {
                const keys = key.split(".");
                keys.reduce((acc, k, idx) => {
                    if (idx === keys.length - 1) {
                        acc[k] = data[key];
                    } else {
                        if (!acc[k]) acc[k] = {};
                    }
                    return acc[k];
                }, result);
            }
        });
        return result;
    }

    return (
        <div style={{ display: "flex", gap: 32, padding: 24 }}>
            <div style={{ flex: 2 }}>
                <Title level={4}>Schema Builder</Title>
                {fields.map(field =>
                    <FieldEditor
                        key={field.id}
                        field={field}
                        onChange={updated =>
                            setFields(fields.map(f => (f.id === field.id ? updated : f)))
                        }
                        onRemove={() =>
                            setFields(fields.filter(f => f.id !== field.id))
                        }
                    />
                )}
                <Button
                    type="primary"
                    onClick={() => setFields([...fields, emptyField()])}
                    style={{ marginBottom: 12 }}
                >
                    + Add Field
                </Button>
                <Divider />
                <Form onFinish={handleSubmit(data => alert(JSON.stringify(unflatten(data), null, 2)))}>
                    <Title level={5}>Sample Form</Title>
                    {fields.map(f => renderInput(f))}
                    <Button type="primary" htmlType="submit">Submit</Button>
                    <Button style={{ marginLeft: 8 }} onClick={() => reset()}>Reset</Button>
                </Form>
            </div>
            <div style={{ flex: 1 }}>
                <Title level={5}>JSON Schema Preview</Title>
                <pre style={{ background: "#f6f8fa", padding: 16 }}>
                    {JSON.stringify(getSchema(fields), null, 2)}
                </pre>
            </div>
        </div>
    );
};

export default FormBuilder;
