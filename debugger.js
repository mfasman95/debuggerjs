/**
 * All possible log types
 */
const LogType = {
  LOG:   "log",
  WARN:  "warn",
  ERROR: "error",
  INFO:  "info"
};

/**
 * Keep a reference to all LogType values: ["log", "warn", ... etc]
 *
 * Note: Object.values() has mixed support across browsers, so use
 * Object.keys() then Array's map() to get the values from it
 */
const LOG_TYPES = Object.keys(LogType).map((key) => LogType[key]);

/**
 * @function {checkHexColor} - A function to determine if a string is a valid hexadecimal color
 * @param {string} color - A hexadecimal color value.
 * @returns {boolean} - Returns true if the color parameter is a valid 3 or 6 digit hexadecimal color, false otherwise
 */
const checkHexColor = (color)=>/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
/**
 * @function {logType} - A function to create a valid logType to be used when making a logger
 * @param {object} opts - An object containg the possible options for this function 
 * @param {string} opts.logStyle - The style of logging this logType will generate. Possible values: log, warn, error, info. Default value: 'log'
 * @param {string} opts.textColor - The text color this logType will generate. Default value: '#000' (Black)
 * @param {string} opts.backgroundColor - The background color this logType will generate. Default value: '#fff' (white)
 */
const logType = (opts)=>{
  //Values to be returned
  let logStyle, textColor, backgroundColor;

  //Check if the logstyle is valid, default to 'log' if invalid
  LOG_TYPES.includes(opts.logStyle) ? logStyle = opts.logStyle : logStyle = LogType.LOG;
  //Check if the text color is a valid hex color, or default to black
  checkHexColor(opts.textColor) ? textColor = opts.textColor : textColor = '#000';
  //Check if the background color is a valid hex color, or default to white
  checkHexColor(opts.backgroundColor) ? backgroundColor = opts.backgroundColor : backgroundColor = '#fff';

  return { backgroundColor, logStyle, textColor };
}
/**
 * @function {makeLogger} - A function to create a debug logger
 * @param {object} opts - An object containg the possible options for this function 
 * @param {object} opts.logTypes - A collection of logTypes created by the logType function
 * @param {string} opts.debugModes - A collection of key value pairs where every key is a logType, and every value is a boolean whether or not that logType is being displayed. If no debugModes are provided, opts.logging will automatically be set to 'logNone'.
 * @param {string} opts.logging - An optional parameter to set what will be logged. Possible values include 'logAll', 'logNone'. All other values will default to using the debugModes. logAll will log all debug messages, regardless of debugMode. logNone will log no debug messages, regardless of debugMode.
 */
const makeLogger = (opts)=>{
  let logger = {};
  if(!opts.logTypes || typeof opts.logTypes !== 'object'){
    console.error('Missing or invalid parameter "logTypes" in function makeDebugger', opts);
    return false;
  }
  else logger.logTypes = opts.logTypes;

  //Make default logging types
  logger.logTypes[LogType.LOG]   = logType({ logStyle: LogType.LOG });
  logger.logTypes[LogType.WARN]  = logType({ logStyle: LogType.WARN });
  logger.logTypes[LogType.ERROR] = logType({ logStyle: LogType.ERROR });
  logger.logTypes[LogType.INFO]  = logType({ logStyle: LogType.INFO });

  //If no debugModes are provided, or they are invalid, don't log anything
  if(!opts.debugModes || typeof opts.debugModes !== 'object') opts.logging = 'logNone';

  //Handle if all, none, or some logs are being displayed
  switch(opts.logging){
    //No logs displayed
    case 'logAll':
      for (var k in logger.logTypes) logger.logTypes[k].debugOn = true;
      break;
    //All logs displayed
    case 'logNone':
      console.warn('Logger (' + (opts.name || 'No Name Provided') + ') is displaying debug messages...');
      for (var k in logger.logTypes) logger.logTypes[k].debugOn = false;
      break;
    //Some logs displayed
    default:
      console.warn('Logger (' + (opts.name || 'No Name Provided') + ') is displaying debug messages...');
      for (var k in logger.logTypes){
        if(opts.debugModes[k]) logger.logTypes[k].debugOn = opts.debugModes[k];
        else logger.logTypes[k].debugOn = false;
      }
      break;
  }
  //The logging function exposed by this object
  logger.log = (type, message, data)=>{
    if (logger.logTypes[type]){
      if (logger.logTypes[type].debugOn){
        if (LOG_TYPES.includes(type)){
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