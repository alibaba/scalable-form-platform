export function getOrderJsonSchemaBySequence(jsonSchema, sequence) {
    let sortSchema = {};
    if (typeof sequence === 'object' && sequence.length > 0) {
        let key;
        for (key in jsonSchema) {
            if (jsonSchema.hasOwnProperty(key)) {
                if (key === 'properties') {
                    sortSchema[key] = {};
                } else {
                    sortSchema[key] = jsonSchema[key];
                }
            }
        }
        sequence.map((code) => {
            if (typeof jsonSchema.properties[code] !== 'undefined') {
                sortSchema.properties[code] = jsonSchema.properties[code];
            }
        });
        return sortSchema;
    } else {
        return jsonSchema;
    }
}

// 根据sequence属性获取排序后的schema数据
export function getOrderSchemaBySequence(schema, sequence) {
    let sortSchema = {};
    if (typeof sequence === 'object' && sequence.length > 0) {
        sequence.map((code) => {
            if (typeof schema[code] !== 'undefined') {
                sortSchema[code] = schema[code];
            }
        });
        return sortSchema;
    } else {
        return schema;
    }
}
