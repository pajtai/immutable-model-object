'use strict';

var chai = require('chai'),
    Model = require('../index');

chai.should();

describe('setter methods', function() {
    it('has default set method', function() {
        var data = {},
            model = Model(data);

        model.set('user.last.name', 'Goya');

        console.log('data', data);
        data.user.last.name.should.equal('Goya');
    });

    it('custom setter methods change the data', function() {
        var data = {},
            model = Model(data);

        model.setters({
            setName : function(name) { this.model.name = name; }
        });

        model.setName('Gertrude');

        data.name.should.equal('Gertrude');
    })
});

describe('get method', function() {
    it('should be able to get properties on model', function() {
        var data = {},
            model = Model(data);

        model.set('a.b.c', 'd');
        model.get('a.b.c').should.equal('d');
    });
});

describe('calculations', function() {
    it('calculation methods should run when default setter method is run', function() {
        var data = {},
            model = Model(data);

        model.calculations({
            'user.name.full' : function() {
                return [this.get('user.name.first'), this.get('user.name.last')].join(' ').trim();
            }
        });

        model.set('user.name.first', 'Fran');
        model.get('user.name.full').should.equal('Fran');

        model.set('user.name.last', 'Stan');
        model.get('user.name.full').should.equal('Fran Stan');
    });

    it('can run calculation method on same property as getter method', function() {
        var data = {},
            model = Model(data);

        model.calculations({
            'lowercase' : function() {
                var lc = this.get('lowercase');
                return lc && ('' + lc).toLowerCase();
            }
        });

        model.set('lowercase', 'Something To TALK About');
        model.get('lowercase').should.equal('something to talk about');
    });
});
