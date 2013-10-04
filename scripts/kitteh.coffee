# Description:
#   Recieve a random animated cat
#
# Commands:
#   hubot kitteh            - one random cat
#   hubot kitteh bomb [num] - [num] random cats

module.exports = (robot) ->

  kitteh = -> 'http://thecatapi.com/api/images/get?format=src&type=gif&random='+(+new Date)+'&tlkio=.gif'

  robot.respond /kitteh/i, (msg) ->
    msg.send kitteh()

  robot.respond /kitteh bomb( (\d+))?/i, (msg) ->
    count = msg.match[2] || 5
    kittens = ''
    kittens += kitteh() + '  \n' for x in [1..count]
    msg.send kittens


