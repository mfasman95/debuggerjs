//Check for valid hexadecimal color
const checkHexColor = (color)=>/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
//Make a log type
const logType = (opts)=>{
  let backgroundColor, logStyle, textColor;

  if(['log', 'warn', 'error', 'info'].includes(opts.logStyle)) logStyle = opts.logStyle;
  else{
    logStyle = 'log';
    console.warn('Invalid logStyle given as an options to function "logType". Defaulting to style "log" for logtype ' + opts.name + '.');
  }

  if(checkHexColor(opts.backgroundColor)) backgroundColor = opts.backgroundColor;
  else backgroundColor = '#fff';

  if(checkHexColor(opts.textColor)) textColor = opts.textColor;
  else textColor = '#000';

  return { backgroundColor, logStyle, textColor };
}
//Make a debug logger
const makeLogger = (opts)=>{
  let logger = {};
  if(!opts.logTypes || typeof opts.logTypes !== 'object'){
    console.error('Missing or invalid parameter "logTypes" in function makeDebugger', opts);
    return false;
  }
  else logger.logTypes = opts.logTypes;
  logger.logTypes.log = logType({ name: 'log', logStyle: 'log' });
  logger.logTypes.warn = logType({ name: 'warn', logStyle: 'warn' });
  logger.logTypes.error = logType({ name: 'error', logStyle: 'error' });
  logger.logTypes.info = logType({ name: 'info', logStyle: 'info' });
  if(!opts.debugModes || typeof opts.debugModes !== 'object'){
    console.warn('Missing or invalid parameter "debugModes" in function makeDebugger', opts);
    opts.logging = 'logNone';
  }
  switch(opts.logging){
    case 'logAll':
      for (var k in logger.logTypes) logger.logTypes[k].debugOn = true;
      break;
    case 'logNone':
      for (var k in logger.logTypes) logger.logTypes[k].debugOn = false;
      break;
    default:
      for (var k in logger.logTypes){
        if(opts.debugModes[k]) logger.logTypes[k].debugOn = opts.debugModes[k];
        else logger.logTypes[k].debugOn = false;
      }
      break;
  }
  logger.log = (type, message, data)=>{
    if (logger.logTypes[type]){
      if (logger.logTypes[type].debugOn){
        if (['log', 'warn', 'error', 'info'].includes(type)){
          console[type]('(Log ' + type + '): ' + message, data || '(No Log Data)');
        }
        else console[logger.logTypes[type].logStyle]('%c(Log ' + type + '): ' + message, 'background: ' + logger.logTypes[type].backgroundColor + '; color: ' + logger.logTypes[type].textColor, data || '(No Log Data)');
      }
    }
    else console.warn('Attempting to use an invalid debug log type: ', type);
  }
  return logger;
}

module.exports = { logType, makeLogger };