'use strict';

var getSetter = require('get-setter'),
    Immutable = require('immutable');

function Model(dataSource) {
    if (! (this instanceof Model)) {
        return new Model(dataSource);
    }

    dataSource = dataSource || {};
    this.model = Immutable.fromJS(dataSource);
}

Model.prototype.get = getMethod;
Model.prototype.set = setMethod;
module.exports = Model;

function getMethod() {
    return getSetter.get.apply(this.model.toJS(), arguments);
}

function setMethod() {
    var data = this.model.toJS();
    getSetter.set.apply(data, arguments);
    this.model = Immutable.fromJS(data);
}
