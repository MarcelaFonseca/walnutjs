var helperVars = require('../support/helper/variables');
var helperInfo = require('../support/helper/info');
var helperElement = require('../support/helper/element');
var helperCommon = require('../support/helper/common');

var CommonSteps = function () {

    /**
     * Sleeps the execution for a specific time in seconds
     */
    this.Then(/^user waits for ([0-9]+) seconds$/, function (time, callback) {
        browser.sleep(time * 1000).then(callback);
    });

    /**
     * Stores a value in a variable to use between scenarios
     */
    this.Given(/^user stores the value '(.*)' in variable '(.*)'$/, function (value, name) {
        var varName = helperCommon.getTreatedValue(name);
        var varvalue = helperCommon.getTreatedValue(value);
        helperVars.addVariable(varName, varvalue);
    });

    /**
     * Prints a message to console, with or without walnut vars/expressions
     */
    this.Given(/^user prints the message '(.*)' to console$/, function (text) {
        text = helperCommon.getTreatedValue(text);
        helperInfo.logInfo(text);
    });

    /**
     * Prints all variables stored at to console
     */
    this.Given(/^user prints all variables to console$/, function () {
        helperInfo.logInfo('-------------------------------------------');
        console.log(helperVars.getAllVariables());
        helperInfo.logInfo('-------------------------------------------');
    });

    /**
     * Stores the value from element inside a variable
     */
    this.Given(/^user stores the (TEXT|VALUE) from element '(.+)-(.+)' in variable '(.*)'$/, function (type, container, key, varName) {

        var deferred = protractor.promise.defer();
        var elementFinder = helperElement.getElementFinder(container, key);

        if (type.toLowerCase() === 'TEXT') {
            elementFinder.getText().then(function getTextSuccess(text) {
                helperVars.addVariable(varName, text);
                deferred.fulfill();
            });
        } else {
            elementFinder.getAttribute('VALUE').then(function getValueSuccess(value) {
                helperVars.addVariable(varName, value);
                deferred.fulfill();
            });
        }
        return deferred.promise;
    });

};

module.exports = CommonSteps;