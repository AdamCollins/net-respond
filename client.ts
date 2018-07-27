import {send} from './net-respond';
let address = 'localhost:1337';

let msg = 'Here is some Pie'
console.log('sending:',msg);
send(msg,address,(res)=>{
	console.log('recieved:',res);
});