// ==UserScript==
// @name         Bopimo Image Downloader
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds a button to download item textures from Bopimo.com
// @author       Teemsploit
// @match        https://www.bopimo.com/items/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  function createDownloadButton() {
    var buyButton = document.querySelector('form[action*="/shop/purchase/"] button');
    if (!buyButton) return;

    var button = document.createElement('button');
    button.textContent = 'Download Texture';
    button.className = buyButton.className;
    button.style.marginLeft = '10px';
    button.onclick = downloadImage;

    buyButton.parentNode.insertBefore(button, buyButton.nextSibling);
  }

  function downloadImage() {
    try {
      var imageUrl = document.querySelector('meta[property="og:image"]').getAttribute('content');
      if (!imageUrl) {
        alert('Image link not found.');
        return;
      }
      var assetUrl = imageUrl.replace("renders/thumbnail", "assets");
      var parts = assetUrl.split("/");
      var fileName = parts[parts.length - 1];
      var link = document.createElement("a");
      link.setAttribute("href", assetUrl);
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    catch (err) {
      alert('An error occurred: ' + err);
    }
  }

  createDownloadButton();
})();
