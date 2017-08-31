var Basic = require('./basic.js');
var Cloze = require('./cloze.js');
var inquirer = require('inquirer');
var fs = require('fs');

inquirer.prompt([{
    name: 'command',
    message: 'Please make a card:',
    type: 'list',
    choices: [{
        name: 'add a card'
    }]
}]).then(function(answer) {
    if (answer.command === 'add a card') {
        addCard();
    } else if (answer.command === 'display all cards') {
        showCards();
    }
});

var addCard = function() {
    inquirer.prompt([{
        name: 'cardType',
        message: 'Select a card type:',
        type: 'list',
        choices: [{
            name: 'basic'
        }, {
            name: 'cloze'
        }]

    }]).then(function(answer) {
        if (answer.cardType === 'basic') {
            inquirer.prompt([{
                name: 'front',
                message: 'Enter a question:',
                validate: function(input) {
                    if (input === '') {
                        console.log('Please provide a question');
                        return false;
                    } else {
                        return true;
                    }
                }
            }, {
                name: 'back',
                message: 'What is the answer?',
                validate: function(input) {
                    if (input === '') {
                        console.log('Please provide an answer');
                        return false;
                    } else {
                        return true;
                    }
                }
            }]).then(function(answer) {
                var newBasic = new Basic(answer.front, answer.back);
                newBasic.create();
            });
        } else if (answer.cardType === 'cloze') {
            inquirer.prompt([{
                name: 'text',
                message: 'What is the full sentence?',
                validate: function(input) {
                    if (input === '') {
                        console.log('Please provide the full text');
                        return false;
                    } else {
                        return true;
                    }
                }
            }, {
                name: 'cloze',
                message: 'What is the cloze?',
                validate: function(input) {
                    if (input === '') {
                        console.log('Please provide the cloze');
                        return false;
                    } else {
                        return true;
                    }
                }
            }]).then(function(answer) {
                var text = answer.text;
                var cloze = answer.cloze;
                if (text.includes(cloze)) {
                    var newCloze = new Cloze(text, cloze);
                    newCloze.create();
                }
            });
        }
    });
};
