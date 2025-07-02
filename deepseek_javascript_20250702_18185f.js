// ==UserScript==
// @name         MINHHEPSIGMA Floating UI
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  UI nổi với nút tròn cho nikata.fun
// @author       You
// @match        https://nikata.fun/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    // Thêm CSS
    const style = document.createElement('style');
    style.textContent = `
        /* Dán toàn bộ CSS từ code trên vào đây */
    `;
    document.head.appendChild(style);
    
    // Thêm HTML
    const uiHTML = `
        <!-- Dán phần HTML từ code trên vào đây -->
    `;
    document.body.insertAdjacentHTML('beforeend', uiHTML);
    
    // Thêm JavaScript
    const script = document.createElement('script');
    script.textContent = `
        // Dán phần JavaScript từ code trên vào đây
    `;
    document.body.appendChild(script);
})();