"use strict";
var State;
(function (State) {
    State[State["OFFLINE"] = 0] = "OFFLINE";
    State[State["ONLINE"] = 1] = "ONLINE";
    State[State["DELELTED"] = 2] = "DELELTED";
})(State || (State = {}));
function getResult(status) {
    if (status == State.ONLINE) {
        return 'online';
    }
    else if (status == State.OFFLINE) {
        return 'offline';
    }
    else if (status == State.DELELTED) {
        return 'deleted';
    }
    return 'error';
}
