export function getSchema(jsonSchema = {}, uiSchema = {}, formData = {}, bizData = {}, originSequence = []) {
    const sequence = [...originSequence];
    const properties = jsonSchema.properties || {};
    Object.keys(properties).forEach((jsonSchemaKey) => {
        if (sequence.indexOf(jsonSchemaKey) < 0) {
            sequence.push(jsonSchemaKey);
        }
    });
    return {
        jsonSchema,
        uiSchema,
        formData,
        bizData,
        sequence
    };
}

export function getFieldsBySchema(schemaData) {
    const {sequence = [], jsonSchema = {}, uiSchema = {}, formData = {}, bizData = {}} = schemaData;
    const {properties = {}, required = []} = jsonSchema;
    const fields = [];
    sequence.forEach((fieldName) => {
        const field = {};
        const fieldJsonSchema = properties[fieldName] || {};
        field.jsonSchema = {
            [fieldName]: fieldJsonSchema
        };
        const fieldUiSchema = uiSchema[fieldName];
        field.uiSchema = {
            [fieldName]: fieldUiSchema
        };
        const fieldFormData = formData[fieldName];
        field.formData = {
            [fieldName]: fieldFormData
        };
        const fieldBizData = bizData[fieldName];
        field.bizData = {
            [fieldName]: fieldBizData
        };
        field.code = fieldName;
        field.label = fieldJsonSchema.title;
        field.type = fieldBizData.type;
        field.fieldType = fieldBizData.fieldType;
        field.required = (required.indexOf(fieldName) >= 0);

        fields.push(field);
    });
    return {
        fields
    };
}

export function isSchemaLegal(schema) {
    return !!(schema.sequence && schema.jsonSchema && schema.uiSchema && schema.formData && schema.bizData);
}
