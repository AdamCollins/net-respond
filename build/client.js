"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_respond_1 = require("./net-respond");
let address = 'localhost:1337';
let msg = 'Here is some Pie';
console.log('sending:', msg);
net_respond_1.send(msg, address, (res) => {
    console.log('recieved:', res);
});
