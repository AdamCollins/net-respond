//@ts-check
'use strict'
let net = require('net');
let openConnections: object = {};
interface pack {
    from: string;
    to: string;
    value: string;
}


/**
 * @param {string} strMsg Message sent.
 * @param {string} address Address of server Listening.
 * @param {function} cb Callback called when message is responded to.
 */
export function send(strMsg: string, address: string, cb) {
    let pack = parseMsg(strMsg, address, null);
    let conn = addConnection(address, cb);
    conn.writeJSON(pack);
}


/**
 * @param {number} port Port server listens on.
 * @param {function} cb Callback called when data is recieved. data and response function provided  
 */
export function serve(port: number, cb) {
    let s = net.createServer((socket) => {
        socket.on('data', (data) => {
            let pack = readJSON(data);
            cb({
                respond: (str) => socket.writeJSON(parseMsg(str, socket.hostPort, socket.localAddress)),
                data: pack
            });
        });
    }).listen(port);
    openConnections[port] = s;
}


function writeJSON(json: pack) {
    let str = JSON.stringify(json);
    let buff = Buffer.from(str);
    this.write(buff);
}

(net.Socket.prototype as any).writeJSON = writeJSON;
function readJSON(buffer): pack {
    if (Buffer.isBuffer(buffer)) {
        let str = buffer.toString();
        return JSON.parse(str);
    } else {
        throw new Error('Passed object must be a buffer');
    }
}

function parseMsg(str: string, to: string, from: string): pack {
    return {
        from: from,
        to: to,
        value: str
    }
}


function addConnection(address: string, cb) {
    let ip = address.split(':')[0];
    let port = parseInt(address.split(':')[1]);
    let conn = new net.Socket().connect(port,ip);
    conn.on('data', (data) => {
        let packData: pack = readJSON(data);
        cb(packData);
    });
    conn.on('close', () => {
        openConnections[address] = null;
    });
    openConnections[address] = conn;
    return conn;
}