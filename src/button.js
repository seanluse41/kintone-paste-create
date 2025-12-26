// src/button.js

import { createDialog } from './dialog';

export function createButton() {
    const li = document.createElement('li');
    const div1 = document.createElement('div');
    div1.className = 'sc-gohMHu kBwwCz';

    const div2 = document.createElement('div');
    div2.className = 'sc-eDHQDy kEZbHh';

    const div3 = document.createElement('div');
    div3.className = 'sc-eDHQDy kEZbHh__button';

    const div4 = document.createElement('div');
    div4.className = 'sc-fwzISk kqVddx__container';

    const button = document.createElement('button');
    button.innerHTML = '📝';
    button.className = 'sc-fwzISk kqVddx sc-fwzISk kqVddx__undefined';
    button.title = 'paste-create';
    button.type = 'button';

    // Create dialog instance
    const dialog = createDialog();

    // close on click outside
    button.addEventListener('click', () => {
        dialog.open();
        const backdrop = document.querySelector('.kuc-dialog-1-23-1__mask');
        if (backdrop) {
            backdrop.addEventListener('click', () => dialog.close());
        }
    });

    div4.appendChild(button);
    div3.appendChild(div4);
    div2.appendChild(div3);
    div1.appendChild(div2);
    li.appendChild(div1);

    return li;
}