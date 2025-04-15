(function() {
    'use strict';

    window.addEventListener('load', init);

    function init() {
        const getFact = id('get-fact');
        getFact.addEventListener('click', goGetFact);
        
        const getDateFact = id('get-date-fact');
        getDateFact.addEventListener('click', goGetDateFact);
    }

    function goGetDateFact() {
        const dayInput = id('day');
        const monthInput = id('month');

        const url = `http://numbersapi.com/${monthInput.value}/${dayInput.value}/date`;
        fetch(url)
            .then(statusCheck)
            .then((response) => response.text())
            .then(showDateFact)
            .catch(numberError);
    }

    function showDateFact(response) {
        const dateFactContainer = id('date-fact-container');
        
        dateFactContainer.textContent = response;
    }

    function goGetFact() {
        const numberInput = id('number-input');
        const url = `http://numbersapi.com/${numberInput.value}`;
        fetch(url)
            .then(statusCheck)
            .then((response) => response.text())
            .then(showFact) // Function to use the response.
            .catch(numberError);
    }

    function showFact(response) {
        const factContainer = id('fact-container');

        factContainer.textContent = response;
    }

    function numberError(error) {
        console.log(error);
    }

    /////////////////////////////////////////////////////////////////////
    // Helper functions
    /**
    * Helper function to return the response's result text if successful, otherwise
    * returns the rejected Promise result with an error status and corresponding text
    * @param {object} res - response to check for success/error

    * @return {object} - valid response if response was successful, otherwise rejected
    *                    Promise result
    */
    async function statusCheck(res) {
        if (!res.ok) {
            throw new Error(await res.text());
        }
        return res;
    }

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