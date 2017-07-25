# debugger_js

A small utility library for logging front end javascript code.

<dl>
<dt><a href="#{checkHexColor} - A function to determine if a string is a valid hexadecimal color">{checkHexColor} - A function to determine if a string is a valid hexadecimal color(color)<
/a> ⇒ <code>boolean</code></dt>
<dd></dd>
<dt><a href="#{logType} - A function to create a valid logType to be used when making a logger">{logType} - A function to create a valid logType to be used when making a logger(opts)</a></
dt>
<dd></dd>
<dt><a href="#{logType} - A function to create a debug logger">{logType} - A function to create a debug logger(opts)</a></dt>
<dd></dd>
</dl>

<a name="{checkHexColor} - A function to determine if a string is a valid hexadecimal color"></a>

## {checkHexColor} - A function to determine if a string is a valid hexadecimal color(color) ⇒ <code>boolean</code>
**Kind**: global function
**Returns**: <code>boolean</code> - - Returns true if the color parameter is a valid 3 or 6 digit hexadecimal color, false otherwise

| Param | Type | Description |
| --- | --- | --- |
| color | <code>string</code> | A hexadecimal color value. |

<a name="{logType} - A function to create a valid logType to be used when making a logger"></a>

## {logType} - A function to create a valid logType to be used when making a logger(opts)
**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>object</code> | An object containg the possible options for this function |
| opts.logStyle | <code>string</code> | The style of logging this logType will generate. Possible values: log, warn, error, info. Default value: 'log' |
| opts.textColor | <code>string</code> | The text color this logType will generate. Default value: '#000' (Black) |
| opts.backgroundColor | <code>string</code> | The background color this logType will generate. Default value: '#fff' (white) |

<a name="{logType} - A function to create a debug logger"></a>

## {logType} - A function to create a debug logger(opts)
**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>object</code> | An object containg the possible options for this function |
| opts.logTypes | <code>object</code> | A collection of logTypes created by the logType function |
| opts.debugModes | <code>string</code> | A collection of key value pairs where every key is a logType, and every value is a boolean whether or not that logType is being displayed. If no debugModes are provided, opts.logging will automatically be set to 'logNone'. |
| opts.logging | <code>string</code> | An optional parameter to set what will be logged. Possible values include 'logAll', 'logNone'. All other values will default to using the debugModes. logAll will log all debug messages, regardless of debugMode. logNone will log no debug messages, regardless of debugMode. |