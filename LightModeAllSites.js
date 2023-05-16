// @ts-check
// ==UserScript==
// @name         Light / day mode all sites
// @version      0.2
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
:root {
  --color-dark: #F0F0F0;
  --color-light: #333333;
}

* {
  fill: var(--color-dark) !important;
  color: var(--color-dark) !important;
  border-color: var(--color-dark) !important;
  outline-color: var(--color-dark) !important;
  background-color: transparent !important;
  /*background-image: none !important;*/
  text-decoration-color: var(--color-dark) !important;
  box-shadow: none !important;
  text-shadow: none !important;
  opacity: 1 !important;
}

html, body {
  background-color: var(--color-light) !important;
}

::placeholder {
  color: var(--color-dark) !important;
}

::selection {
  background-color: var(--color-dark) !important;
  color: var(--color-light) !important;
}
`;
  document.getElementsByTagName('head')[0].appendChild(style);
})();
