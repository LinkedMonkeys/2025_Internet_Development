(function() {
    'use strict';
    let counterValue = 0;

    window.addEventListener('load', init);

    function init() {
        let increase = id('increase');
        increase.addEventListener('click', increaseClick);
        let decrease = id('decrease');
        decrease.addEventListener('click', decreaseClick);
    }

    function decreaseClick() {
        let counter = id('counter');
        // counter.textContent = parseInt(counter.textContent) - 1;
        counterValue--;
        counter.textContent = counterValue;

        displayFactors();
        displayOddEven();
    }

    function increaseClick() {
        let counter = id('counter');
        // counter.textContent = parseInt(counter.textContent) + 1;
        counterValue++;
        counter.textContent = counterValue;

        displayFactors();
        displayOddEven();
    }

    function displayOddEven() {
        let main = qs('main');
        if (counterValue%2 == 0) {
            // Set the class of main to even.
            main.classList.replace('odd', 'even');
        } else {
            // Set the class of main to odd.
            main.classList.remove('even');
            main.classList.add('odd');
        }
    }

    function displayFactors() {
        let factorString = 'Factors: ';
        for (let i=1; i<=counterValue; i++) {
            if (counterValue%i == 0) {
               factorString += `${i} `;
            }
        }

        let factors = id('factors')
        factors.textContent = factorString;
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