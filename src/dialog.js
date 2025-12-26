// src/dialog.js
import i18n from './i18n';
import { Button, Dialog, TextArea, Text } from 'kintone-ui-component';
import { validateRecordJson, convertRecordToFormFields } from './validate';
import { createApp } from './requests/createApp';
import { addFields } from './requests/addFields';
import { publishApp } from './requests/publishApp';

export function createDialog() {
    // Use i18n.t() inside the function, not at module level
    const t = i18n.t.bind(i18n); // Helper for cleaner code

    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.style.color = 'red';
    errorDiv.style.marginBottom = '8px';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.display = 'none';

    const warningDiv = document.createElement('div');
    warningDiv.style.color = '#d97706';
    warningDiv.style.marginBottom = '8px';
    warningDiv.style.fontSize = '14px';
    warningDiv.style.display = 'none';
    warningDiv.style.whiteSpace = 'pre-line';

    const appNameLabel = document.createElement('label');
    appNameLabel.textContent = t('dialog.appNameLabel');
    appNameLabel.style.display = 'block';
    appNameLabel.style.marginBottom = '4px';
    appNameLabel.style.fontWeight = 'bold';

    const appNameInput = new Text({
        placeholder: t('dialog.appNamePlaceholder'),
        value: ''
    });

    const appNameContainer = document.createElement('div');
    appNameContainer.style.marginBottom = '16px';
    appNameContainer.appendChild(appNameLabel);
    appNameContainer.appendChild(appNameInput);

    const textAreaLabel = document.createElement('label');
    textAreaLabel.textContent = t('dialog.jsonLabel');
    textAreaLabel.style.display = 'block';
    textAreaLabel.style.marginBottom = '4px';
    textAreaLabel.style.fontWeight = 'bold';

    const contentDiv = document.createElement('div');
    const textArea = new TextArea({
        placeholder: t('dialog.jsonPlaceholder'),
        value: ''
    });

    contentDiv.appendChild(appNameContainer);
    contentDiv.appendChild(textAreaLabel);
    contentDiv.appendChild(errorDiv);
    contentDiv.appendChild(warningDiv);
    contentDiv.appendChild(textArea);

    const footerDiv = document.createElement('div');
    footerDiv.style.display = 'flex';
    footerDiv.style.justifyContent = 'flex-end';
    footerDiv.style.gap = '8px';

    const cancelButton = new Button({
        text: t('dialog.cancelButton'),
        type: 'normal'
    });

    const createButton = new Button({
        text: t('dialog.createButton'),
        type: 'submit',
        disabled: true
    });

    footerDiv.appendChild(cancelButton);
    footerDiv.appendChild(createButton);

    const dialog = new Dialog({
        header: t('dialog.title'),
        content: contentDiv,
        footer: footerDiv
    });

    let validatedData = null;

    function validateInput(value) {
        if (!value || value.trim() === '') {
            errorDiv.style.display = 'none';
            errorDiv.textContent = '';
            warningDiv.style.display = 'none';
            warningDiv.textContent = '';
            createButton.disabled = true;
            validatedData = null;
            return;
        }

        const validation = validateRecordJson(value);

        if (validation.valid) {
            errorDiv.style.display = 'none';
            errorDiv.textContent = '';

            if (validation.warnings && validation.warnings.length > 0) {
                warningDiv.style.display = 'block';
                warningDiv.textContent = validation.warnings.join('\n');
            } else {
                warningDiv.style.display = 'none';
                warningDiv.textContent = '';
            }

            validatedData = validation.data;
            const appName = appNameInput.value;
            createButton.disabled = !appName || appName.trim() === '';
        } else {
            errorDiv.style.display = 'block';
            errorDiv.textContent = validation.error;
            warningDiv.style.display = 'none';
            warningDiv.textContent = '';
            createButton.disabled = true;
            validatedData = null;
        }
    }

    textArea.addEventListener('input', (event) => {
        validateInput(event.detail.value);
    });

    appNameInput.addEventListener('change', (event) => {
        const appName = event.detail.value;
        if (appName && appName.trim() !== '' && validatedData) {
            createButton.disabled = false;
        } else {
            createButton.disabled = true;
        }
    });

    cancelButton.addEventListener('click', () => {
        dialog.close();
    });

    createButton.addEventListener('click', async () => {
        try {
            createButton.disabled = true;
            createButton.text = t('dialog.creatingButton');

            const appName = appNameInput.value;
            const createResponse = await createApp(appName);
            const appId = createResponse.app;
            let revision = createResponse.revision;

            const properties = convertRecordToFormFields(validatedData);
            const addFieldsResponse = await addFields(appId, properties, revision);
            revision = addFieldsResponse.revision;

            await publishApp(appId, revision);

            alert(`${t('dialog.successMessage')} ${appId}`);
            dialog.close();
            window.location.href = `/k/${appId}/`;

        } catch (error) {
            errorDiv.style.display = 'block';
            errorDiv.textContent = `${t('dialog.errorPrefix')}: ${error.message || error}`;
            createButton.disabled = false;
            createButton.text = t('dialog.createButton');
        }
    });

    return dialog;
}