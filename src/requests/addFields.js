// src/requests/addFields.js

export async function addFields(appId, properties, revision) {
    const body = {
        app: appId,
        properties: properties,
        revision: revision
    };
    
    const response = await kintone.api(
        kintone.api.url('/k/v1/preview/app/form/fields.json', true),
        'POST',
        body
    );
    
    return response;
}