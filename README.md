# Model-Object

A way to set and get on objects using string and dot notation for keys. Can set calculated properties that are run on
every set.

```javascript
var data = {},
    model = Model(data);

model.calculations({
    'user.name.full' : function() {
        return [this.get('user.name.first'), this.get('user.name.last')].join(' ').trim();
    }
});

model.set('user.name.first', 'Fran');
model.set('user.name.last', 'Stan');

model.get('user.name.full').should.equal('Fran Stan');
data.user.name.full.should.equal('Fran Stan');
```