"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_respond_1 = require("./net-respond");
net_respond_1.serve(1337, (req) => {
    let noun = req.data.value.msg.split(' ').slice(-1);
    console.log('recieved:', req.data);
    console.log('sending:', `Thanks for the ${noun}`);
    req.respond(`Thanks for the  ${noun}`);
});
