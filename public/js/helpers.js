import Handlebars from 'handlebars';

Handlebars.registerHelper('eq', function(a, b, opts) {
    if (a === b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});

export default Handlebars.helpers;