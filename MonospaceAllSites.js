// @ts-check
// ==UserScript==
// @name         Monospace All Sites
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Monospace everything. Keep things simple.
// @author       You
// @match        *://*/*
// @grant        none
// @run-at document-body
// ==/UserScript==

(function () {
  'use strict';

  const style = document.createElement('style');
  style.innerHTML = `
*:not([class*="icon"], [class*="symbol"] , i) {
  font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace !important;
}
       `;
  document.getElementsByTagName('head')[0].appendChild(style);
})();
