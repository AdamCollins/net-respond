"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_respond_1 = require("./net-respond");
let address = 'localhost:1337';
net_respond_1.send({ msg: 'Here is some Pie' }, address, (res) => {
    console.log('recieved:', res);
});
