'use strict';

var chai = require('chai'),
    Model = require('../index');

chai.should();

describe('setter methods', function() {
    it('setter methods change the data', function() {
        var data = {},
            model = Model(data);

        model.setters({
            setName : function(name) { this.model.name = name; }
        });

        model.setName('Gertrude');

        data.name.should.equal('Gertrude');
    })
});

describe('calculations', function() {
    it('calculation methods should run when setters are run', function() {
        var data = {},
            model = Model(data);

        model.calculations([
            function() {
                this.model.fullName = [this.model.firstName, this.model.lastName].join(' ').trim();
            }
        ]);

        model.setters({
            firstName : function(fn) { this.model.firstName = fn; },
            lastName : function(ln) { this.model.lastName = ln; }
        });

        model.firstName('Bob');
        model.model.fullName.should.equal('Bob');

        model.lastName('Bobertson');
        model.model.fullName.should.equal('Bob Bobertson');
    });
});