var ouis = {};

module.exports = ouis;

var oui_ieee_8021_private = 32962; // 0x0080C2
var oui_ieee_8023_private = 4623; // 0x00120f

function init(){
  ouis[oui_ieee_8021_private] = require("./8021_private");
  //ouis[oui_ieee_8023_private] = require("./8023_private");
  ouis[oui_ieee_8023_private] = require("./8023_private");
}
init();
