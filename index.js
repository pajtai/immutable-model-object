'use strict';

var _ = require('lodash');

function Model(dataSource) {
    if (! (this instanceof Model)) {
        return new Model(dataSource);
    }

    this.model = dataSource;
}

Model.prototype.setters = setters;
Model.prototype.calculations = calculations;

module.exports = Model;

function calculations(calcs) {

    this._calcs = calcs;
    return this;
}

function setters(setterMethods) {

    var self = this;

    _.forEach(setterMethods, function(setterMethod, key) {
        setterMethods[key] = function() {
            var result = setterMethod.apply(self, arguments);
            this._calcs.forEach(function(calculationMethod) {
                calculationMethod.apply(self, arguments);
            });
            return result;
        }
    });

    _.extend(this, setterMethods);

    return this;
}

