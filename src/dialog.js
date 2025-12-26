// src/dialog.js
import { Button, Dialog, TextArea } from 'kintone-ui-component';


export function createDialog() {
    // Create content area with textarea
    const contentDiv = document.createElement('div');
    const textArea = new TextArea({
        placeholder: 'Paste your record object here...',
        value: ''
    });
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
    
    // Add cancel button functionality
    cancelButton.addEventListener('click', () => {
        dialog.close();
    });
    
    return dialog;
}