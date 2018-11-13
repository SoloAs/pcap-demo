var IPv4Addr = require("../ipv4_addr");
var IPv6Addr = require("../ipv6_addr");

function managementAddress() {

}

managementAddress.prototype.decode = function(tlv, raw_packet, offset) {

	//console.log(raw_packet.toString('hex'));

	var addrStringLength = (raw_packet.readUInt16BE(offset, true) & 0xff00) >> 8;
	offset++;

	//Subtype list can be found below:
	//http://www.iana.org/assignments/address-family-numbers/address-family-numbers.xhtml
	var manSubType = (raw_packet.readUInt16BE(offset, true) & 0xff00) >> 8;
	offset++;

	//This is a small subset of the available subtypes, more need to be implemented
	switch(manSubType) {
		//IPv4
		case 1:
			tlv.mgmtAddress = new IPv4Addr().decode(raw_packet, offset).addr;
			break;
		//IPv6
		case 2:
			tlv.mgmtAddress = new IPv6Addr().decode(raw_packet, offset).addr;
			break;
		default:
			console.log("Management Address ID subType is reserved!");
	}

	offset += addrStringLength;
	offset--;

	tlv.intSubType = (raw_packet.readUInt16BE(offset, true) & 0xff00) >> 8;
	offset++;

	switch(tlv.intSubType) {
		//ifIndex, a unique value assigned to each interface that stays constant
		//from the startup of network management until the next startup
		case 2:
			tlv.ifIndex = raw_packet.readUInt32BE(offset, true);
			break;
		case 3:
			tlv.sysPortNum = raw_packet.readUInt32BE(offset, true);
			break;
		default:
			console.log("Unhandled interface type");
	}

	var oidLength = (raw_packet.readUInt16BE(offset, true) & 0xff00) >> 8;

	tlv.oid = raw_packet.toString("utf8", offset, offset+oidLength);
};

module.exports = managementAddress;
