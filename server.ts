import {serve} from './net-respond';

serve(1337,(req)=>{
	let msg = req.data.value.split(' ').slice(-1);
	let from = req.data.from;
	console.log(req.data);
	req.respond(`Thanks for the ${msg}`);
});