// src/requests/createApp.js

export async function createApp(appName) {
    const body = {
        name: appName
    };
    
    const response = await kintone.api(
        kintone.api.url('/k/v1/preview/app.json'),
        'POST',
        body
    );
    
    return response;
}