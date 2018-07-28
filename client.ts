import {send} from './net-respond';
let address = 'localhost:1337';

send({msg: 'Here is some Pie'},address,(res)=>{
	console.log('recieved:',res);
});