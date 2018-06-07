var EthernetAddr = require("../ethernet_addr");
var IPv4Addr = require("../ipv4_addr");

function portId() {
}

portId.prototype.decode = function(tlv, raw_packet, offset, length) {
	
	tlv.portIdSubType = raw_packet.readUInt8(offset, true);
	
	switch(tlv.portIdSubType) {
		case 1:
		case 2:
		case 5:
		case 6:
		case 7:
			tlv.intString = raw_packet.toString("utf8",offset+1,offset+length);
			break;
		case 3:
			tlv.macAddress = new EthernetAddr(raw_packet,offset+1);
			break;
		case 4:
			tlv.networkAddress = new IPv4Addr().decode(raw_packet, offset+1);
			break;
		default:
			console.log("Port ID Type not implemented");
	}
};

module.exports = portId;
