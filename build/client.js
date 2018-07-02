"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_respond_1 = require("./net-respond");
net_respond_1.send('Here is some Pie', 1337, (res) => {
    console.log(res);
});
