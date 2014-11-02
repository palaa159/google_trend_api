var express = require('express'),
    mailer = require('./ioservicestatus.js'),
    PARSE = require('./parse.js'),
    app = express();

app.use(function(req, res, next) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('incoming request from ---> ' + ip);
    var url = req.originalUrl;
    // console.log('### requesting ---> ' + url);
    next();
});

app.get('/', function(req, res) {
    // console.log('api hit');
    res.setHeader('Content-Type', 'application/json');
    /////
    var query = req.query;
    // console.log(isNaN(parseInt(query.q, 16)));
    // if not provide query, give latest
    if (query.q.toLowerCase() === 'latest') {

        PARSE.getLatest(function(err, body) {
            if (err) {
                res.send({
                    msg: 'ERR',
                    data: null
                });
            } else {
                var latest = body[body.length - 1];
                res.send({
                    msg: 'OK',
                    data: latest
                });
            }
        });


    } else if (!isNaN(parseInt(query.q, 16))) {
        // console.log('HEARD NUMBER');
        PARSE.getDate(query.q, function(err, body) {
            if (err) {
                res.send({
                    msg: 'ERR',
                    data: null
                });
            } else {
                if (body.length === 0) {
                    res.send({
                        msg: 'ERR',
                        data: 'no data'
                    });
                } else {
                	res.send({
                        msg: 'OK',
                        data: body
                    });
                }
            }
        });
    } else if (query.q.toLowerCase() === 'week') {
        PARSE.getWeek(query.q, function(err, body) {
            if (err) {
                res.send({
                    msg: 'ERR',
                    data: null
                });
            } else {
                // var latest = body[body.length - 1];
                res.send({
                    msg: 'OK',
                    data: body
                });
            }
        });
    } else {
        res.send({
            msg: 'ERR: Please provide your query information.',
            data: null
        });
        res.end();
    }

});

app.listen(3010, function() {
    console.log('server running on: ' + 3010);
});