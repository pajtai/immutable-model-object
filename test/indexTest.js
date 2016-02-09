'use strict';

var chai = require('chai'),
    Model = require('../index');

chai.should();

describe('setter methods', function() {
    it('has default set method', function() {
        var data = {},
            model = Model(data);

        model.set('user.last.name', 'Goya');

        model.get('').user.last.name.should.equal('Goya');
    });
});

describe('get method', function() {
    it('should be able to get properties on model', function() {
        var data = {},
            model = Model(data);

        model.set('a.b.c', 'd');
        model.get('a.b.c').should.equal('d');
    });
});

describe('immutability', function() {
    it('should not be able to update models by reference', function() {
        var user = { name : { first : 'jane' }},
            model = Model(user),
            name = model.get('name');

        model.get('name.first').should.equal('jane');
        name.first = 'bob';
        model.get('name.first').should.equal('jane');
    });
});
