 import {serve} from './net-respond';

serve(1337,(req)=>{
	let noun = req.data.value.msg.split(' ').slice(-1);
	console.log('recieved:',req.data);
	console.log('sending:',`Thanks for the ${noun}`);
	req.respond(`Thanks for the  ${noun}`);
});