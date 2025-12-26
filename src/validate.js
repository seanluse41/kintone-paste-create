// src/validate.js
import i18n from './i18n';

export function validateRecordJson(jsonString) {
    const result = {
        valid: false,
        error: null,
        data: null,
        warnings: []
    };
    
    // Step 1: Parse JSON string
    let parsedData;
    try {
        parsedData = JSON.parse(jsonString);
    } catch (e) {
        result.error = i18n.t('validation.invalidJson', { message: e.message });
        return result;
    }
    
    // Step 2: Check if it has a "record" property, or treat the whole object as the record
    let record;
    let wasWrapped = false;
    
    if (parsedData.record) {
        // Has record wrapper
        record = parsedData.record;
        wasWrapped = true;
    } else {
        // No wrapper - treat entire object as record
        record = parsedData;
    }
    
    // Step 3: Validate that record is an object
    if (typeof record !== 'object' || record === null || Array.isArray(record)) {
        result.error = i18n.t('validation.recordMustBeObject');
        return result;
    }
    
    // Step 4: Check that record has at least one field
    const fieldCodes = Object.keys(record);
    if (fieldCodes.length === 0) {
        result.error = i18n.t('validation.recordMustHaveFields');
        return result;
    }
    
    // Step 5: Validate each field has proper structure
    const validFieldTypes = [
        'SINGLE_LINE_TEXT', 'MULTI_LINE_TEXT', 'RICH_TEXT', 'NUMBER', 'CALC',
        'CHECK_BOX', 'RADIO_BUTTON', 'MULTI_SELECT', 'DROP_DOWN',
        'USER_SELECT', 'ORGANIZATION_SELECT', 'GROUP_SELECT',
        'DATE', 'TIME', 'DATETIME', 'LINK', 'FILE',
        'SUBTABLE', 'REFERENCE_TABLE', 'CATEGORY', 'STATUS', 'STATUS_ASSIGNEE',
        'RECORD_NUMBER', '__ID__', '__REVISION__', 'CREATOR', 'CREATED_TIME',
        'MODIFIER', 'UPDATED_TIME', 'LABEL', 'SPACER', 'HR', 'GROUP'
    ];
    
    // Non-creatable field types to warn about
    const nonCreatableTypes = {
        'CALC': 'CALC',
        'REFERENCE_TABLE': 'REFERENCE_TABLE',
        'LABEL': 'LABEL',
        'SPACER': 'SPACER',
        'HR': 'HR',
        'GROUP': 'GROUP'
    };
    
    const systemFieldTypes = [
        'RECORD_NUMBER', '__ID__', '__REVISION__',
        'CREATOR', 'CREATED_TIME', 'MODIFIER', 'UPDATED_TIME',
        'CATEGORY', 'STATUS', 'STATUS_ASSIGNEE'
    ];
    
    for (const fieldCode of fieldCodes) {
        const field = record[fieldCode];
        
        // Each field must be an object
        if (typeof field !== 'object' || field === null) {
            result.error = i18n.t('validation.fieldMustBeObject', { fieldCode });
            return result;
        }
        
        // Each field must have a "value" property
        if (!('value' in field)) {
            result.error = i18n.t('validation.fieldMustHaveValue', { fieldCode });
            return result;
        }
        
        // If type is present, validate it's a known type
        if (field.type && !validFieldTypes.includes(field.type)) {
            result.error = i18n.t('validation.unknownFieldType', { fieldCode, type: field.type });
            return result;
        }
        
        // Warn about non-creatable fields
        if (field.type && nonCreatableTypes[field.type]) {
            const fieldType = i18n.t(`validation.fieldTypes.${field.type}`);
            result.warnings.push(i18n.t('validation.warningNonCreatable', { fieldType, fieldCode }));
        }
        
        // Warn about system fields
        if (field.type && systemFieldTypes.includes(field.type)) {
            result.warnings.push(i18n.t('validation.warningSystemField', { fieldCode }));
        }
        
        // Validate SUBTABLE fields have proper structure
        if (field.type === 'SUBTABLE') {
            if (!Array.isArray(field.value)) {
                result.error = i18n.t('validation.subtableNotArray', { fieldCode });
                return result;
            }
            
            // Check each row in the table
            for (let i = 0; i < field.value.length; i++) {
                const row = field.value[i];
                if (!row.value || typeof row.value !== 'object') {
                    result.error = i18n.t('validation.subtableRowInvalid', { fieldCode, index: i });
                    return result;
                }
            }
        }
    }
    
    // Validation passed
    result.valid = true;
    // Normalize data to always have record wrapper for consistency
    result.data = wasWrapped ? parsedData : { record: record };
    
    return result;
}

export function convertRecordToFormFields(recordData) {
    const properties = {};
    const record = recordData.record;
    
    // System fields that cannot be created via API
    const systemFields = [
        '$id', '$revision', 
        'Record_number', 'レコード番号',
        'Created_by', '作成者',
        'Created_datetime', '作成日時',
        'Updated_by', '更新者', 
        'Updated_datetime', '更新日時'
    ];
    
    const systemFieldTypes = [
        'RECORD_NUMBER', '__ID__', '__REVISION__',
        'CREATOR', 'CREATED_TIME', 'MODIFIER', 'UPDATED_TIME',
        'CATEGORY', 'STATUS', 'STATUS_ASSIGNEE'
    ];
    
    // Fields that cannot be created per API documentation
    const nonCreatableTypes = [
        'LABEL', 'SPACER', 'HR', 'GROUP', 
        'REFERENCE_TABLE', // Related records field
        'CALC' // Calculated field
    ];
    
    for (const [fieldCode, field] of Object.entries(record)) {
        // Skip system fields by field code
        if (systemFields.includes(fieldCode)) {
            continue;
        }
        
        // Skip system fields by type
        if (field.type && systemFieldTypes.includes(field.type)) {
            continue;
        }
        
        // Skip non-creatable field types
        if (field.type && nonCreatableTypes.includes(field.type)) {
            continue;
        }
        
        // Convert field to properties format
        const propertyConfig = convertFieldToProperty(fieldCode, field);
        if (propertyConfig) {
            properties[fieldCode] = propertyConfig;
        }
    }
    
    return properties;
}

function convertFieldToProperty(fieldCode, field) {
    const type = field.type;
    const value = field.value;
    
    // Base property structure
    const property = {
        type: type,
        code: fieldCode,
        label: fieldCode, // Use field code as label by default
        noLabel: false,
        required: false
    };
    
    // Handle different field types
    switch (type) {
        case 'SINGLE_LINE_TEXT':
            return {
                ...property,
                minLength: '',
                maxLength: '',
                expression: '',
                hideExpression: false,
                unique: false,
                defaultValue: ''
            };
            
        case 'MULTI_LINE_TEXT':
            return {
                ...property,
                defaultValue: ''
            };
            
        case 'RICH_TEXT':
            return {
                ...property,
                defaultValue: ''
            };
            
        case 'NUMBER':
            return {
                ...property,
                minValue: '',
                maxValue: '',
                digit: false,
                unique: false,
                defaultValue: '',
                displayScale: '',
                unit: '',
                unitPosition: 'BEFORE'
            };
            
        case 'CHECK_BOX':
            return {
                ...property,
                options: extractOptions(value),
                defaultValue: [],
                align: 'HORIZONTAL'
            };
            
        case 'RADIO_BUTTON':
            return {
                ...property,
                options: extractOptions(value),
                defaultValue: typeof value === 'string' ? value : '',
                align: 'HORIZONTAL'
            };
            
        case 'MULTI_SELECT':
            return {
                ...property,
                options: extractOptions(value),
                defaultValue: []
            };
            
        case 'DROP_DOWN':
            return {
                ...property,
                options: extractOptions(value),
                defaultValue: ''
            };
            
        case 'USER_SELECT':
            return {
                ...property,
                entities: [],
                defaultValue: []
            };
            
        case 'ORGANIZATION_SELECT':
            return {
                ...property,
                entities: [],
                defaultValue: []
            };
            
        case 'GROUP_SELECT':
            return {
                ...property,
                entities: [],
                defaultValue: []
            };
            
        case 'DATE':
            return {
                ...property,
                unique: false,
                defaultValue: '',
                defaultNowValue: false
            };
            
        case 'TIME':
            return {
                ...property,
                defaultValue: '',
                defaultNowValue: false
            };
            
        case 'DATETIME':
            return {
                ...property,
                unique: false,
                defaultValue: '',
                defaultNowValue: false
            };
            
        case 'LINK':
            return {
                ...property,
                protocol: 'WEB',
                minLength: '',
                maxLength: '',
                unique: false,
                defaultValue: ''
            };
            
        case 'FILE':
            return {
                ...property,
                thumbnailSize: '150'
            };
            
        case 'SUBTABLE':
            return {
                ...property,
                fields: convertTableFields(value)
            };
            
        default:
            // If no type specified or unknown type, try to infer
            return inferFieldType(fieldCode, value);
    }
}

function extractOptions(value) {
    const options = {};
    let valueArray = [];
    
    if (Array.isArray(value)) {
        valueArray = value;
    } else if (typeof value === 'string' && value) {
        valueArray = [value];
    }
    
    valueArray.forEach((option, index) => {
        const optionLabel = String(option);
        options[optionLabel] = {
            label: optionLabel,
            index: String(index)
        };
    });
    
    return options;
}

function convertTableFields(tableRows) {
    const fields = {};
    
    if (!Array.isArray(tableRows) || tableRows.length === 0) {
        return fields;
    }
    
    // Use the first row to determine field structure
    const firstRow = tableRows[0];
    if (!firstRow.value) {
        return fields;
    }
    
    for (const [fieldCode, field] of Object.entries(firstRow.value)) {
        const fieldProperty = convertFieldToProperty(fieldCode, field);
        if (fieldProperty) {
            fields[fieldCode] = fieldProperty;
        }
    }
    
    return fields;
}

function inferFieldType(fieldCode, value) {
    const property = {
        code: fieldCode,
        label: fieldCode,
        noLabel: false,
        required: false
    };
    
    // Infer from value type
    if (typeof value === 'string') {
        // Check if it's a date, time, or datetime format
        if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/.test(value)) {
            return {
                ...property,
                type: 'DATETIME',
                unique: false,
                defaultValue: '',
                defaultNowValue: false
            };
        } else if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
            return {
                ...property,
                type: 'DATE',
                unique: false,
                defaultValue: '',
                defaultNowValue: false
            };
        } else if (/^\d{2}:\d{2}$/.test(value)) {
            return {
                ...property,
                type: 'TIME',
                defaultValue: '',
                defaultNowValue: false
            };
        } else if (/^https?:\/\//.test(value)) {
            return {
                ...property,
                type: 'LINK',
                protocol: 'WEB',
                minLength: '',
                maxLength: '',
                unique: false,
                defaultValue: ''
            };
        } else if (value.includes('\n')) {
            return {
                ...property,
                type: 'MULTI_LINE_TEXT',
                defaultValue: ''
            };
        } else if (!isNaN(value) && value.trim() !== '') {
            return {
                ...property,
                type: 'NUMBER',
                minValue: '',
                maxValue: '',
                digit: false,
                unique: false,
                defaultValue: '',
                displayScale: '',
                unit: '',
                unitPosition: 'BEFORE'
            };
        } else {
            // Default to single line text
            return {
                ...property,
                type: 'SINGLE_LINE_TEXT',
                minLength: '',
                maxLength: '',
                expression: '',
                hideExpression: false,
                unique: false,
                defaultValue: ''
            };
        }
    } else if (Array.isArray(value)) {
        if (value.length > 0 && typeof value[0] === 'object' && value[0].code) {
            // User/Organization/Group selection
            return {
                ...property,
                type: 'USER_SELECT',
                entities: [],
                defaultValue: []
            };
        } else if (value.length > 0 && typeof value[0] === 'object' && value[0].value) {
            // Subtable
            return {
                ...property,
                type: 'SUBTABLE',
                fields: convertTableFields(value)
            };
        } else if (value.length > 0 && typeof value[0] === 'object' && value[0].fileKey) {
            // File attachment
            return {
                ...property,
                type: 'FILE',
                thumbnailSize: '150'
            };
        } else {
            // Checkbox or multi-select
            return {
                ...property,
                type: 'CHECK_BOX',
                options: extractOptions(value),
                defaultValue: [],
                align: 'HORIZONTAL'
            };
        }
    }
    
    // Default fallback
    return {
        ...property,
        type: 'SINGLE_LINE_TEXT',
        minLength: '',
        maxLength: '',
        expression: '',
        hideExpression: false,
        unique: false,
        defaultValue: ''
    };
}