// src/dialog.js
import { Button, Dialog, TextArea, Text } from 'kintone-ui-component';
import { validateRecordJson, convertRecordToFormFields } from './validate';
import { createApp } from './requests/createApp';
import { addFields } from './requests/addFields';
import { publishApp } from './requests/publishApp';


export function createDialog() {
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.style.color = 'red';
    errorDiv.style.marginBottom = '8px';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.display = 'none'; // Hidden by default
    
    // Create warning message element
    const warningDiv = document.createElement('div');
    warningDiv.style.color = '#d97706'; // Amber/orange color
    warningDiv.style.marginBottom = '8px';
    warningDiv.style.fontSize = '14px';
    warningDiv.style.display = 'none'; // Hidden by default
    warningDiv.style.whiteSpace = 'pre-line'; // Allow line breaks
    
    // Create app name input
    const appNameLabel = document.createElement('label');
    appNameLabel.textContent = 'App Name:';
    appNameLabel.style.display = 'block';
    appNameLabel.style.marginBottom = '4px';
    appNameLabel.style.fontWeight = 'bold';
    
    const appNameInput = new Text({
        placeholder: 'Enter app name...',
        value: ''
    });
    
    const appNameContainer = document.createElement('div');
    appNameContainer.style.marginBottom = '16px';
    appNameContainer.appendChild(appNameLabel);
    appNameContainer.appendChild(appNameInput);
    
    // Create textarea label
    const textAreaLabel = document.createElement('label');
    textAreaLabel.textContent = 'Record JSON:';
    textAreaLabel.style.display = 'block';
    textAreaLabel.style.marginBottom = '4px';
    textAreaLabel.style.fontWeight = 'bold';
    
    // Create content area with textarea
    const contentDiv = document.createElement('div');
    const textArea = new TextArea({
        placeholder: 'Paste your record object here...',
        value: ''
    });
    
    contentDiv.appendChild(appNameContainer);
    contentDiv.appendChild(textAreaLabel);
    contentDiv.appendChild(errorDiv);
    contentDiv.appendChild(warningDiv);
    contentDiv.appendChild(textArea);
    
    // Create footer with buttons
    const footerDiv = document.createElement('div');
    footerDiv.style.display = 'flex';
    footerDiv.style.justifyContent = 'flex-end';
    footerDiv.style.gap = '8px';
    
    const cancelButton = new Button({
        text: 'Cancel',
        type: 'normal'
    });
    
    const createButton = new Button({
        text: 'Create',
        type: 'submit',
        disabled: true
    });
    
    footerDiv.appendChild(cancelButton);
    footerDiv.appendChild(createButton);
    
    const dialog = new Dialog({
        header: 'Paste & Create App',
        content: contentDiv,
        footer: footerDiv
    });
    
    // Store validated data
    let validatedData = null;
    
    // Validation function
    function validateInput(value) {
        if (!value || value.trim() === '') {
            // Empty input - hide error and warnings, disable button
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
            // Valid input - hide error, show warnings if any, enable button if app name is filled
            errorDiv.style.display = 'none';
            errorDiv.textContent = '';
            
            // Display warnings if any
            if (validation.warnings && validation.warnings.length > 0) {
                warningDiv.style.display = 'block';
                warningDiv.textContent = validation.warnings.join('\n');
            } else {
                warningDiv.style.display = 'none';
                warningDiv.textContent = '';
            }
            
            validatedData = validation.data;
            
            // Enable create button only if app name is also filled
            const appName = appNameInput.value;
            createButton.disabled = !appName || appName.trim() === '';
        } else {
            // Invalid input - show error, hide warnings, disable button
            errorDiv.style.display = 'block';
            errorDiv.textContent = validation.error;
            warningDiv.style.display = 'none';
            warningDiv.textContent = '';
            createButton.disabled = true;
            validatedData = null;
        }
    }
    
    // Add input event listener to textarea
    textArea.addEventListener('input', (event) => {
        validateInput(event.detail.value);
    });
    
    // Add change event listener to app name input
    appNameInput.addEventListener('change', (event) => {
        const appName = event.detail.value;
        // Enable create button only if both app name and valid JSON are present
        if (appName && appName.trim() !== '' && validatedData) {
            createButton.disabled = false;
        } else {
            createButton.disabled = true;
        }
    });
    
    // Add cancel button functionality
    cancelButton.addEventListener('click', () => {
        dialog.close();
    });
    
    // Add create button functionality
    createButton.addEventListener('click', async () => {
        try {
            // Disable button and show loading state
            createButton.disabled = true;
            createButton.text = 'Creating...';
            
            const appName = appNameInput.value;
            
            // Step 1: Create preview app
            const createResponse = await createApp(appName);
            const appId = createResponse.app;
            let revision = createResponse.revision;
            
            // Step 2: Convert record to form fields
            const properties = convertRecordToFormFields(validatedData);
            
            // Step 3: Add fields to the app
            const addFieldsResponse = await addFields(appId, properties, revision);
            revision = addFieldsResponse.revision;
            
            // Step 4: Publish the app
            await publishApp(appId, revision);
            
            // Success! Close dialog
            alert(`App created successfully! App ID: ${appId}`);
            dialog.close();
            
            // Optionally redirect to the new app
            window.location.href = `/k/${appId}/`;
            
        } catch (error) {
            // Show error
            errorDiv.style.display = 'block';
            errorDiv.textContent = `Error creating app: ${error.message || error}`;
            createButton.disabled = false;
            createButton.text = 'Create';
        }
    });
    
    return dialog;
}