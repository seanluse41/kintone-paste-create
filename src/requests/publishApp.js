// src/requests/publishApp.js

export async function publishApp(appId, revision) {
    const body = {
        apps: [
            {
                app: appId,
                revision: revision
            }
        ],
        revert: false
    };
    
    const response = await kintone.api(
        kintone.api.url('/k/v1/preview/app/deploy.json', true),
        'POST',
        body
    );
    
    return response;
}