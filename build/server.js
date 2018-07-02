"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_respond_1 = require("./net-respond");
net_respond_1.serve(1337, (req) => {
    let msg = req.data.value.split(' ').slice(-1);
    let from = req.data.from;
    console.log(req.data);
    req.respond(`Thanks for the ${msg}`);
});
