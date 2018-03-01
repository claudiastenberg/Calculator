'use strict';

$(document).ready(function(){ //samma som window.onload i vanlig javascript.
    var buttons = calculator.buttons;
    $(".calculator-body").append(buttons);
    setButtonListner(buttons);
    calculator.reset();
}); // vi har tagit lyssnarna och satt dem här. sedan har vi lagt dem i bodyn.


function setButtonListner (buttons) {
    buttons.forEach(button => {
        button.click (event => { //klick fungerar pågrund av att vi skapar den med $ i tidgare kod. 
            var text = button.text(); //Kan använda text eftersom button är ett jquery element
            if(!isNaN(text)){ //alltså om den inte inte är ett nummer. alltså ett nummer, printa ut
                display(text); 
            }
            else { 
                //hantera texten som icke nummer(alltså signs)
                handleSpecial(text);

            }
        })
    });
}

function display(text) {
    calculator.appendCalculation(text); // varje gång vi skriver något ska den spara ner detta
    //Nu vill vi visa den i skärmen
    $('.calculator-display').append(text); // vi säger här att vi ska välja ut displayen. 
    //append betyder lägg på på de som redan finns
}

function resetDisplay() {
    $('.calculator-display').text(''); //Med andra ord vi rensar fältet
}


function addResult(result) { //den ska lägga in ett nytt item i listan ovanför
    $('.result-list').append(`<li>${result}</li>`);
}

function scrollToResult() {
    $('html, body').animate({
        scrollTop: ($('.result').offset().top -100) //offset är avståndet från toppen till elementets topp
        //-100 är för att den skaskrolla upp hel vägen 
    }, 500); //gör denna animation under 500 millisekunder
}

function handleSpecial(text) { //läses som handlespecialText.!!!
    var currentDisplay = $('.calculator-display').text();
    if(calculator.isClearCharacter(text)) { //Alltså om texten vi skriver är C vill vi rensa
        calculator.reset(); //nu rensas interna miniräknare
    }
    else{
        //Operanden ska ej vara satt första ggr eftersom vi endast har ett och ej två
        //tal att utföra en beräkning på. 
        //På detta sätt hoppar vi över calculateNewResult först gången. 
        if (calculator.isOperatorSet()) { //om operand är satt så ska miniräknaren besäkna
            calculator.calculateNewResult(currentDisplay); // beräkna då
        }
        calculator.setOperator(text);

        //Här kollar vi om vi är klara eller om vi ska fortsätta beräkna
        if(calculator.isEqualCharacter(text)) {
            addResult(calculator.getCalculation());
            scrollToResult();
        }
        else{
            calculator.setResult(Number(currentDisplay)); // annars vill vi bara sätta resultatet.
        } //Vilktigt att ha en Number(currentDisplay)
    }
    resetDisplay(); // här rensas själva displayen
}





