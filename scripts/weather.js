/*
# Description:
#   Allows Hubot to know many languages.
#
# Commands:
#   hubot weather %location% - will print the weather
#
*/
var weather = require('openweathermap');
    weather.defaults({units:'metric', lang:'en', mode:'json'});

module.exports  = function(robot){
    var that = this;

    robot.respond( /weather (.+)/i, function(msg){
      var location = msg.match[1];
      if (location){
        if (location.length >= 3){
          try{
            weather.find({q: location, cnt:1}, function(weatherData){
                if (weatherData.count > 0){
                  var list = weatherData.list[0];
                  msg.send('It\'s '+list.main.temp+'°C in ['+location + '](http://maps.google.com/maps?z=12&t=m&q=loc:'+list.coord.lat+'+'+list.coord.lon+'); ' + list.weather[0].description);
                }else{
                 msg.send('Nothing found');
                }
            });
          }catch (e){
            msg.send('Something went wrong: '+e);
          }
        }else{
          msg.send('The location must contain at least 3 chars');
        }

      }else{
        msg.send('You must specify a location');
      }

    });
};
