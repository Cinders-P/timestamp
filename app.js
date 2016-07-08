var express = require('express');
var url = require('url');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname + '/public')));
app.set('view engine', 'pug');




app.get('/', function(req, res) {
    res.render('index', {
        unixLink: req.protocol + '://' + req.get('host') + '/' + Date.now().toString().slice(0, -3),
        naturalLink: req.protocol + '://' + req.get('host') + '/' + new Date().toDateString().replace(/\s/g, "%20"),
        unixOutput: Date.now().toString().slice(0, -3),
        naturalOutput: new Date().toDateString()
    });
});
app.get('/:query', function(req, res, next) {
    if (/[^0-9]/g.test(req.params.query))
        var query = new Date(req.params.query);
    else
        var query = new Date(+req.params.query * 1000);

    if (query == "Invalid Date") {
        res.json({
            "unix": null,
            "natural": null
        });
    } else {

        if (/[^0-9]/g.test(req.params.query)) {
            res.json({
                "unix": Date.parse(query) / 1000,
                "natural": query.toDateString()
            });
        } else {

            res.json({
                "unix": +req.params.query,
                "natural": new Date(+req.params.query * 1000).toDateString()
            });
        }
    }
    res.end();
});

app.listen(process.env.PORT || 3000, function() {
    console.log('Timestamp API listening on port 3000!');
});
