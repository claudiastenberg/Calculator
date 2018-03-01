'use strict';
//Defines that JavaScript code should be executed in "strict mode".

//IIFE (Immediatley invoked function expression)
/*var helloWorldIIFE = (function () {
    console.log("IIFE ran");
     var getMessage = function() {
        return "Hola mondo";
    }
    return { // object litteral. samma som att skriva {name:'Claudia'}
        getMessage: getMessage
    }
})();

console.log(helloWorldIIFE.getMessage());
*/ 


//calculator

var calculator = (function(/* här tas variablerna från botten åt*/){

    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const signs =["+", "-", "/", "*", "=", "C"]; 
    var buttons = [];

    function generateButton(text, style) {
        var button = $(`<button>${text}</button>`); // första $ är jquery
        // denna betyder att den ska hämta i ett html dokument och slänga in, som vi sedan ska använda
        button.addClass(style); //.addClass finns bara i jquary
        return button;
    }

    numbers.forEach(number => {
        buttons.push(generateButton(number, 'number-button')); //vi vill pusha på knappar som genereras av generate button
        // Skapa upp en knapp, lägg på stylen på de elementet, säger denna sats.
        //genereras från höger till vänster. push händer sist till arrayen
    });

    signs.forEach(sign => {
        buttons.push(generateButton(sign, 'sign-button')); //samma som ovan fast med sign
    });


    var isClearCharacter = function(character) {
        return character === 'C';
    }
    
    var isEqualCharacter = function(character) {
        return character === '=';
    }

    var reset = function() {
        this.result = undefined;
        this.calculation = undefined;
        this.operator = undefined;
    }

    var getResult = function() {
        return this.result;
    }

    var setResult = function(result) {
        this.result = result;
        this.calculation = result + this.operator;// säger-> varje gång något nytt händer skriver jag in de i calculation
    }

    var isOperatorSet = function() {
       return this.operator !== undefined; // alltså är den inte undifind så är den satt.
    }

    var setOperator = function(operator) {
        this.operator = operator;
    }

    var appendCalculation = function(text) {
        this.calculation += text; // text är de vi skrivit in på miniräknaren
    }

    var getCalculation = function() {
      if(!isFinite(this.result)){
          this.result = 'non-defined';
      }
      this.calculation += '=' + this.result;
      return this.calculation;
    }

    var calculateNewResult = function(value) {
        switch(this.operator) {
            case '+': this.result += Number(value); break;
            case '-': this.result -= Number(value); break;
            case '*': this.result *= Number(value); break;
            case '/': this.result /= Number(value); break; 
        }
    }


//detta gör vi för att vi vill ha ett objekt. Istället för att skriva bara return buttons;
return {
    buttons: buttons,   
    getCalculation: getCalculation,
    getResult: getResult,
    isClearCharacter: isClearCharacter,
    isEqualCharacter: isEqualCharacter,
    isOperatorSet: isOperatorSet,
    setResult: setResult,
    setOperator: setOperator,
    appendCalculation: appendCalculation,
    calculateNewResult: calculateNewResult,
    reset: reset,
}

})(/* härifrån kan du skcika variabler till IIFE anropet*/); 


