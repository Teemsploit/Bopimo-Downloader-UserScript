// ==UserScript==
// @name         Bopimo Item Data Downloader
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Adds a button to download item textures from Bopimo.com
// @author       Teemsploit
// @license      MIT
// @match        https://www.bopimo.com/items/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  function createDownloadButton() {
    var buttonPanel = document.createElement('div');
    buttonPanel.className = "shop-card";
    buttonPanel.style = "position: fixed; padding: 1rem;";
    buttonPanel.style.bottom = "1rem";
    buttonPanel.style.right = "1rem";
    
    document.getElementById("app").appendChild(buttonPanel);
    
    createButtons(buttonPanel);
    
    var credits = document.createElement('p');
    credits.textContent = "Credits: Teemsploit & Variant Tombstones";
    buttonPanel.appendChild(credits);
  }
  
  function createButtons(buttonPanel)
  {
    var tButton = document.createElement('button');
    tButton.textContent = 'Download Texture';
    tButton.className = "button";
    tButton.onclick = downloadImage;
    
    var mButton = document.createElement('button');
    mButton.textContent = 'Download Mesh';
    mButton.className = "button";
    mButton.style.marginLeft = '10px';
    mButton.onclick = downloadMesh;

    buttonPanel.appendChild(tButton);
    buttonPanel.appendChild(mButton);
  }

  function downloadImage() {
    download("image");
  }
  
  function downloadMesh()
  {
      download("mesh");
  }
  
  function download(type)
  {
      try {
      var imageUrl = document.querySelector('meta[property="og:image"]').getAttribute('content');
      if (!imageUrl) {
        alert('Image link not found.');
        return;
      }
      var assetUrl = imageUrl.replace("renders/thumbnail", "assets");
      
      if(type="mesh")
      {
          assetUrl = assetUrl.replace(".png", ".obj");
      }
      
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