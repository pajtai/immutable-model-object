'use strict';

var _ = require('lodash'),
    getSetter = require('get-setter');

function Model(dataSource) {
    if (! (this instanceof Model)) {
        return new Model(dataSource);
    }

    this.model = dataSource;

    this.get = function () {
        return getSetter.get.apply(this.model, arguments);
    };

    this.setters({
        set : function() {
            return getSetter.set.apply(this.model, arguments); }
    });
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
        setterMethods[key] = function(key, value, options) {
            var result = setterMethod.apply(self, arguments);
            options = options || {};
            if (this._calcs && !options.silent) {
                _.forEach(this._calcs, function (calculationMethod, calulationKey) {
                    self.set(calulationKey, calculationMethod.apply(self, arguments), {silent: true});
                });
            }
            return result;
        }
    });

    _.extend(this, setterMethods);

    return this;
}

// TODO: add default dot getters and setters