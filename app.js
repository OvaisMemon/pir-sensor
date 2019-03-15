const onoff = require('onoff');

var gpio = onoff.Gpio;

var sensor = new gpio(4,'in','both');
var led = new gpio(17, 'out');

sensor.watch(callback);

function callback(err, value)
{
  if(err) exit(err);

  console.log(value ? 'There is someone.' : 'There is no one.');
 
  led.writeSync(value);
}


function exit(err)
{
  if(err)
  {
    console.log('An error occurred: ' + err);
  }

  sensor.unexport();
  led.writeSync(0);
  led.unexport();
  console.log('Bye, bye!');
  process.exit();
}

process.on('SIGINT', exit);
