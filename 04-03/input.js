(function() {
    'use strict';

    window.addEventListener('load', init);

    function init() {
        const obuEmail = id('obu-email');
        obuEmail.addEventListener('input', checkOBUEmail);
        const zipCode = id('zip-code');
        zipCode.addEventListener('input', checkZipCode);
    }

    function checkOBUEmail() {
        const obuEmailRegex = /^[a-z]{1,3}\d{5,}@obu\.edu$/;
        const obuEmail = id('obu-email');
        if (obuEmailRegex.test(obuEmail.value)) {
            obuEmail.classList.add('match');
            obuEmail.classList.remove('nomatch');
        } else {
            obuEmail.classList.remove('match');
            obuEmail.classList.add('nomatch');
        }
    }

    function checkZipCode() {
        const zipRegex = /^\d{5}(-\d{4})?$/;
        const zipCode = id('zip-code');
        if (zipRegex.test(zipCode.value)) {
            zipCode.classList.add('match');
            zipCode.classList.remove('nomatch');
        } else {
            zipCode.classList.remove('match');
            zipCode.classList.add('nomatch');
        }
    }

    /////////////////////////////////////////////////////////////////////
    // Helper functions
    function id(id) {
        return document.getElementById(id);
    }

    function qs(selector) {
        return document.querySelector(selector);
    }

    function qsa(selector) {
        return document.querySelectorAll(selector);
    }
})();