var cron = require('node-cron');
var streak = require('./index');
//every single minute
cron.schedule('* * * * *', function(){
    streak.streakComment()
});