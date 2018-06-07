var EthernetAddr = require("../ethernet_addr");
var IPv4Addr = require("../ipv4_addr");

function chassisId() {
}

chassisId.prototype.decode = function(tlv, raw_packet, offset) {
  tlv.subType = (raw_packet.readUInt16BE(offset, true) & 0xff00) >> 8;
  // 0 - Reserved
  // 1 - Chassis component
  // 2 - Interface alias
  // 3 - Port component
  // 4 - MAC address
  // 5 - Network address
  // 6 - Interface name
  // 7 - Locally assigned
  // 8-255 - Reserved
  switch(tlv.subType) {
    case 1:
      tlv.componenet = (raw_packet.readUInt16BE(offset+1, true) & 0xff00) >> 8;
      break;
    case 2:
    case 6:
      tlv.interface = (raw_packet.readUInt16BE(offset+1, true) & 0xff00) >> 8;
      break;
    case 3:
      tlv.port = (raw_packet.readUInt16BE(offset+1, true) & 0xff00) >> 8;
      break;
    case 4:
      tlv.addr = new EthernetAddr(raw_packet, offset+1).addr;
      break;
    case 5:
      tlv.addr = new IPv4Addr().decode(raw_packet, offset+1).addr;
      break;
    case 7:
      tlv.local = (raw_packet.readUInt16BE(offset+1, true) & 0xff00) >> 8;
      break;
    default:
      console.log("Chassis ID subType is reserved!");
  }
};

module.exports = chassisId;
