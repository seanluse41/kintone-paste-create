// src/index.js
import { createButton } from './button';

(function() {
  'use strict';
  
  kintone.events.on('portal.show', function() {
    const menuList = document.querySelector('.sc-cOHKVu.kBQnIh__right ul.sc-cOHKVu.kBQnIh__menu-list');
    if (menuList && !menuList.querySelector('button[title="paste-create"]')) {
      const newButton = createButton();
      menuList.insertBefore(newButton, menuList.firstChild);
    }
  });
})();