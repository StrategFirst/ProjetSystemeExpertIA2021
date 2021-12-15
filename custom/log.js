console.color = {
	grey: '\033[90m',
	red: '\033[91m',
	yellow: '\033[93m',
	pink: '\033[94m',
	white: '\033[97m',

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

if( logLevel < 1 ) console.debug = _=>{};
if( logLevel < 2 ) console.info = _=>{};