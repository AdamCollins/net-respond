# net-respond
A Node module written in Typescript that allows for json objects and direct responses to TCP messages. Based off of ExpressJS request handling. 

[![npm version](https://badge.fury.io/js/net-respond.png)](https://badge.fury.io/js/net-respond)

A Node module written in Typescript that allows for responses to TCP messages in json format. Based off of ExpressJS request handling. 

## Install
### npm install
```
npm install net-respond
```

## Usage example

Here is an example of a simple server/client connection
### Client
```javascript
import {send} from './net-respond';
let address = 'localhost:1337';
//Send any json object
send({msg: 'Here is some Pie'},address,(res)=>{
	console.log('recieved:',res);
});
```
### Server
```javascript
import {serve} from './net-respond';

//listening on port 1337
serve(1337,(req)=>{
	let noun = req.data.value.msg.split(' ').slice(-1);
	console.log('recieved:',req.data);
	console.log('sending:',`Thanks for the ${noun}`);
	req.respond(`Thanks for the ${noun}`);
});
```
### Client output
```
sending: Here is some Pie
sending: recieved: { from: '::ffff:127.0.0.1', value: 'Thanks for the Pie' }
```
### Server output
```
recieved: { from: null, to: 'localhost:1337', value: 'Here is some Pie' }
sending: Thanks for the Pie
```


## License
Distributed under the MIT license.


[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
