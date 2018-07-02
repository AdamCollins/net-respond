import {send} from './net-respond';

send('Here is some Pie',1337,(res)=>{
	console.log(res);
});