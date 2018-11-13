var TLV = require("./lldp/lldp_tlv");

function LLDP(emitter) {
	this.emitter = emitter;
	this.chassisTlv = undefined;
	this.portIdTlv = undefined;
	this.ttlTlv = undefined;
	this.optionalTlvs = [];
}

var getTlvLength = function(raw_packet, offset) {
        var tlvHeaderSize = 2;
	var length = 0;
        length = (raw_packet.readUInt16BE(offset, true) & 0x01ff) + tlvHeaderSize;
        return length;
};

LLDP.prototype.decode = function (raw_packet, offset) {
	this.chassisTLV = new TLV(this.emitter).decode (raw_packet, offset);
	offset += getTlvLength(raw_packet, offset);
	this.portIdTLV = new TLV(this.emitter).decode (raw_packet, offset);
	offset += getTlvLength(raw_packet, offset);
	this.ttlTLV = new TLV(this.emitter).decode (raw_packet, offset);
	offset += getTlvLength(raw_packet, offset);
	while(raw_packet.readUInt16BE(offset, true) !== 0) {
		this.optionalTlvs.push(new TLV(this.emitter).decode (raw_packet, offset));
		offset += getTlvLength(raw_packet, offset);
	}

	if(this.emitter) { this.emitter.emit("lldp", this); }
	return this;
};

LLDP.prototype.decoderName = "lldp";
LLDP.prototype.eventsOnDecode = true;

//LLDP.prototype.toString() = function {}

module.exports = LLDP;
