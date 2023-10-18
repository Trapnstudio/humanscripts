// ==UserScript==
// @name         QR from highlight
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Create a QR code from anything highlighted
// @match        http://*/*
// @match        https://*/*
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.js
// ==/UserScript==

(function () {
  'use strict';

  // Function to get the currently selected text
  function getSelectionText() {
    var selectedText = '';
    if (window.getSelection) {
      // All modern browsers and IE9+
      selectedText = window.getSelection().toString();
    }
    return selectedText;
  }

  // Function to generate and display QR code
  function generateQRCode(text) {
    let qrElement = document.getElementById('generated-qr-code');
    if (!qrElement) {
      qrElement = document.createElement('div');
      qrElement.id = 'generated-qr-code';
      document.body.appendChild(qrElement);
    }

    qrElement.innerHTML = ''; // Clear any previous QR codes

    let typeNumber = 0; // Auto detect QR code type based on input data
    let errorCorrectionLevel = 'L'; // Low error correction level
    let qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(text);
    qr.make();

    // Add QR code to the container
    qrElement.innerHTML = qr.createImgTag(5);

    // Style the container
    qrElement.style.width = '200px';
    qrElement.style.height = '200px';
    qrElement.style.position = 'fixed';
    qrElement.style.bottom = '10px';
    qrElement.style.right = '10px';
    qrElement.style.zIndex = '1000';
  }

  // Listen for text selection
  document.addEventListener('mouseup', function () {
    let selectedText = getSelectionText();
    if (selectedText) {
      generateQRCode(selectedText);
    }
  });
})();
