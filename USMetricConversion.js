// ==UserScript==
// @name         US Standard and Metric unit conversion
// @namespace    https://github.com/TomTomGRUB
// @version      1.0
// @description  converts US Standard units to Metric units (and vice versa)
// @author       Thomas N
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=hibbard.eu
// @grant        GM_log
// ==/UserScript==

(function() {
    'use strict';
    const convertToMetric = false;

    const fahrenheitRegex = /\d+°?F/gi;
    const celsiusRegex = /\d+°?C/gi;

    function fahrenheitToCelsius(match) {
        const fahrenheit = parseInt(match);
        const celsius = fahrenheit > 1 ? Math.round((fahrenheit - 32) / (9/5)) : Math.round((fahrenheit - 32) * (5/9));
        return celsius + "°C";
    }
    function celsiusToFahrenheit(match) {
        const celsius = parseInt(match);
        const fahrenheit = Math.round((celsius * (9/5)) + 32);
        return fahrenheit + "°F";
    }

    const textNodes = document.evaluate('//text()', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for(let i = 0; i < textNodes.snapshotLength; i++){
        let node = textNodes.snapshotItem(i);
        if(convertToMetric) {
            textNodes.snapshotItem(i).textContent = textNodes.snapshotItem(i).textContent.replace(fahrenheitRegex, fahrenheitToCelsius);
        }
        else {
            textNodes.snapshotItem(i).textContent = textNodes.snapshotItem(i).textContent.replace(celsiusRegex, celsiusToFahrenheit);
        }
    }

})();