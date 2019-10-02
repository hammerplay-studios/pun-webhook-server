const util = require('util');
const execFile = util.promisify(require('child_process').execFile);
const unityServerBuildLocation = '/var/www/photon-auth-server/build/photon-auth-server.x86';

const instances = {};

var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    port = 80;

app.use(bodyParser.json());

app.post('/GameCreate', function (req, res) {
    var users = {};
    users[req.body.UserId] = {Nickname: req.body.Nickname};

    instances[req.body.GameId] = {
        users: users,
        gameInstance: startUnityServerBuild(req.body.GameId)
    };

    res.status(200);
    res.send();
    console.log ('Game Create: ' + JSON.stringify(instances[req.body.GameId]));
});

app.post('/GameJoin', function (req, res) {
    instances[req.body.GameId].users[req.body.UserId] = {Nickname: req.body.Nickname};

    res.status(200);
    res.send();
    console.log ('Game Join: ' + JSON.stringify(instances[req.body.GameId]));
});

app.post('/GameLeave', function (req, res) {
    delete instances[req.body.GameId].users[req.body.UserId];
    res.status(200);
    res.send();
    console.log ('Game Leave: ' + JSON.stringify(instances[req.body.GameId]));
});

app.post('/GameClose', function (req, res) {
    //console.log(req.body);
    res.status(200);
    res.send();
});

app.post('/GameEvent', function (req, res) {
    //console.log(req.body);
    res.status(200);
    res.send();
});

async function startUnityServerBuild(roomId) {
    console.log('starting unity server build ' + roomId);
    var { stdout } = await execFile(unityServerBuildLocation, ['-batchmode', '--server', '--roomId=' + roomId, '--username=server_' + roomId ]);
    return stdout;
}


var server = app.listen(port, function () {
    console.log('Listening on port %d', server.address().port);
});