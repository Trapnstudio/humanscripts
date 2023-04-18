// @ts-check
// ==UserScript==
// @name         Light / day mode all sites
// @version      0.1
// @description  Make everything easy on the eyes.
// @match        *://*/*
// @grant        none
// @run-at       document-body
// @license      MIT
// @namespace    MEMIJE.IO
// @author       MEMIJE.IO
// ==/UserScript==

(function () {
  'use strict';

  const style = document.createElement('style');
  style.innerHTML = `
* {
  background-color: #F0F0F0 !important;
  color: #333333 !important;
}
       `;
  document.getElementsByTagName('head')[0].appendChild(style);
})();
