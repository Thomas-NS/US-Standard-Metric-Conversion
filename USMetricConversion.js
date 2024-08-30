// ==UserScript==
// @name         US Standard and Metric unit conversion
// @namespace    https://github.com/TomTomGRUB
// @version      1.0
// @description  converts US Standard units to Metric units (and vice versa) on hover
// @author       Thomas N
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=hibbard.eu
// @grant        GM_log
// ==/UserScript==

(function() {
    'use strict';
    const convertToMetric = false;

    const fahrenheitRegex = /-?\d+\s?°?F.?/gi;
    const celsiusRegex = /-?\d+\s?°?C.?/gi;
    const milesRegex = /\d+\s?mi(le)?.?/gi;
    const kilometresRegex = /\d+\s?km.?/gi;
    const poundsRegex = /\d+\s?lbs?.?/gi;
    const kilogramsRegex = /\d+\s?kg.?/gi;

    function fahrenheitToCelsius(match) {
        const fahrenheit = parseInt(match);
        const celsius = fahrenheit > 0 ? Math.round((fahrenheit - 32) / (9/5)) : Math.round((fahrenheit - 32) * (5/9));
        return celsius + "°C";
    }
    function celsiusToFahrenheit(match) {
        const celsius = parseInt(match);
        const fahrenheit = Math.round((celsius * (9/5)) + 32);
        return fahrenheit + "°F";
    }

    function milesToKilometres(match) {
        const miles = parseInt(match);
        const kilometres = miles * 1.609;
        return kilometres + "km";
    }
    function kilometresToMiles(match) {
        const kilometres = parseInt(match);
        const miles = kilometres / 1.609;
        return miles + "mi";
    }

    function poundsToKilograms(match) {
        const pounds = parseInt(match);
        const kilograms = Math.round(pounds / 2.205);
        return kilograms + "kg ";
    }
    function kilogramsToPounds(match) {
        const kilograms = parseInt(match);
        const pounds = Math.round(kilograms * 2.205);
        return pounds + "lbs ";
    }

    const textNodes = document.evaluate('//text()', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for(let i = 0; i < textNodes.snapshotLength; i++){
        let node = textNodes.snapshotItem(i);
        if(convertToMetric) {
            textNodes.snapshotItem(i).textContent = textNodes.snapshotItem(i).textContent.replace(fahrenheitRegex, fahrenheitToCelsius);
            textNodes.snapshotItem(i).textContent = textNodes.snapshotItem(i).textContent.replace(milesRegex, milesToKilometres);
            textNodes.snapshotItem(i).textContent = textNodes.snapshotItem(i).textContent.replace(poundsRegex, poundsToKilograms);
        }
        else {
            textNodes.snapshotItem(i).textContent = textNodes.snapshotItem(i).textContent.replace(celsiusRegex, celsiusToFahrenheit);
            textNodes.snapshotItem(i).textContent = textNodes.snapshotItem(i).textContent.replace(kilometresRegex, kilometresToMiles);
            textNodes.snapshotItem(i).textContent = textNodes.snapshotItem(i).textContent.replace(kilogramsRegex, kilogramsToPounds);
        }
    }

})();