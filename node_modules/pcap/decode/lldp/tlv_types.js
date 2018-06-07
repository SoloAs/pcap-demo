var types = {};

module.exports = types;

var chassisId = 1;
var portId = 2;
var ttl = 3;
var portDescription = 4;
var systemName = 5;
var systemDescription = 6;
var systemCaps = 7;
var managementAddress = 8;
var organizational = 127;

function init(){
  types[chassisId] = require("./chassisId");
  types[portId] = require("./portId");
  types[ttl] = require("./ttl");
  types[portDescription] = require("./portDescription");
  types[systemName] = require("./systemName");
  types[systemDescription] = require("./systemDescription");
  types[systemCaps] = require("./systemCaps");
  types[managementAddress] = require("./managementAddress");
  types[organizational] = require("./organization");
}
init();
