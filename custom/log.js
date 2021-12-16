console.color = {
	grey: '\033[90m',
	red: '\033[91m',
	yellow: '\033[93m',
	pink: '\033[95m',
	white: '\033[97m',
	lime: '\033[92m',
	cyan: '\033[96m',
	blue: '\033[94m',

	darkcyan: '\033[36m',
	darkyellow: '\033[33m',
	darkgrey: '\033[37m',

	reset: '\033[0m'
}
console.textdecoration = {

}

let logLevel;
switch(process.data.tracemode) {
	case 'nothing':
		logLevel = 0;
		break;
	case 'small':
		logLevel = 1;
		break;
	case 'all':
		logLevel = 2;

}
const OldConsoleError = console.error;
console.error = (...k) => OldConsoleError( console.color.red , ...k , console.color.reset );

if( logLevel < 2 ) console.debug = _=>{};
if( logLevel < 1 ) console.info = _=>{};