// src/index.js
import { createButton } from './button';

(function() {
  'use strict';
  
  kintone.events.on('portal.show', function() {
    const menuList = document.querySelector('.sc-eqXzvo.kttbQU__right ul');
    if (menuList && !menuList.querySelector('button[title="paste-create"]')) {
      const newButton = createButton();
      menuList.insertBefore(newButton, menuList.firstChild);
    }
  });
})();