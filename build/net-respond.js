//@ts-check
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
let net = require('net');
let openConnections = {};
/**
 *
 * @param {string} strMsg Message sent.
 * @param {number} port Port of server Listening.
 * @param {function} cb Callback called when message is responded to.
 */
function send(strMsg, port, cb) {
    let pack = parseMsg(strMsg, port, -1);
    let conn = addConnection(port, cb);
    conn.writeJSON(pack);
}
exports.send = send;
/**
 *
 * @param {number} port Port server listens on.
 * @param {function} cb Callback called when data is recieved. data and response function provided
 */
function serve(port, cb) {
    let s = net.createServer((socket) => {
        socket.on('data', (data) => {
            let pack = readJSON(data);
            cb({
                respond: (str) => socket.writeJSON(parseMsg(str, socket.hostPort, socket.localPort)),
                data: pack
            });
        });
    }).listen(port);
    openConnections[port] = s;
}
exports.serve = serve;
function writeJSON(json) {
    let str = JSON.stringify(json);
    let buff = Buffer.from(str);
    this.write(buff);
}
net.Socket.prototype.writeJSON = writeJSON;
function readJSON(buffer) {
    if (Buffer.isBuffer(buffer)) {
        let str = buffer.toString();
        return JSON.parse(str);
    }
    else {
        throw new Error('Passed object must be a buffer');
    }
}
function parseMsg(str, to, from) {
    return {
        from: from,
        to: to,
        value: str
    };
}
function addConnection(port, cb) {
    let conn = new net.Socket().connect(port);
    conn.on('data', (data) => {
        let packData = readJSON(data);
        if (packData.from = port) {
            cb(packData);
        }
    });
    conn.on('close', () => {
        openConnections[port] = null;
    });
    openConnections[port] = conn;
    return conn;
}
