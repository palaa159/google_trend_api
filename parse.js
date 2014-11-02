var Kaiseki = require('kaiseki'),
    moment = require('moment');

// Parse: NOW
var APP_ID = 'NwMUIpZ4oaanrEdMLdfameWezqNsszR4pnEW2X6O',
    REST_KEY = 'WLzRzfAhrqLZmdybiX8Yo7b7DvS6uEYDyCsGeVC5';

var kaiseki = new Kaiseki(APP_ID, REST_KEY);

var classname = 'US';

module.exports = {
    getLatest: function(callback) {
        kaiseki.getObjects(classname, function(err, res, body, success) {
            callback(err, body);
        });
    },
    getDate: function(date, callback) {
        var params = {
            where: {
                date: date
            }
        };
        kaiseki.getObjects(classname, params, function(err, res, body, success) {
            callback(err, body);
        });
    },
    getWeek: function(date, callback) {
        var params = {
            where: {
                date: date
            }
        };
        kaiseki.getObjects(classname, params, function(err, res, body, success) {
            callback(err, body);
        });
    }
};