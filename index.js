'use strict';

var getSetter = require('get-setter'),
    Immutable = require('immutable');

function Model(dataSource) {
    if (! (this instanceof Model)) {
        return new Model(dataSource);
    }

    dataSource = dataSource || {};
    this.model = Immutable.fromJS(dataSource);
    this._cache = this.model.toJS();
}

Model.prototype.get = getMethod;
Model.prototype.set = setMethod;
module.exports = Model;

function getMethod() {
    return getSetter.get.apply(this._cache, arguments);
}

function setMethod() {
    var data = this.model.toJS();
    getSetter.set.apply(data, arguments);
    this.model = Immutable.fromJS(data);
    this._cache = this.model.toJS();
}
