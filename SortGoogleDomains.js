// @ts-check
// ==UserScript==
// @name         Sort Google Domains
// @version      0.5
// @description  Sort the search results from Google Domains (domains.google.com)
// @match        https://domains.google.com/*
// @grant        none
// @license      MIT
// @namespace    MEMIJE.IO
// @author       MEMIJE.IO
// ==/UserScript==

(function () {
  'use strict';
  // @ts-check
  {
    const observer = new MutationObserver((mutations, observer) => {
      const allDomainElems = document.querySelectorAll(
        'search-result-card-domain-name h2.cdk-visually-hidden',
      );

      const domains = Array.from(allDomainElems)
        .map((item) => item.textContent)
        .filter((item) => !(item || '').includes('unavailable'))
        .map((item) => (item || '').split(' ')[0]);
      const sorted = [...domains]
        .sort((a, b) => a.localeCompare(b))
        .sort((a, b) => (a || '').length - (b || '').length);
      if (sorted.length > 0) {
        console.clear();
        console.log(JSON.stringify(sorted));
      }
    });

    // define what element should be observed by the observer
    // and what types of mutations trigger the callback
    observer.observe(document, {
      subtree: true,
      attributes: true,
      //...
    });
  }
})();
