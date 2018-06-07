var types = require("./tlv_types");

function TLV(emitter) {
	this.emitter = emitter;
	this.tlvType = undefined;
	this.tlvLength = undefined;
	this.payload = undefined;
}

TLV.prototype.decode = function (raw_packet, offset) {
  // https://en.wikipedia.org/wiki/Type-length-value
  // https://en.wikipedia.org/wiki/Link_Layer_Discovery_Protocol
  this.tlvType = (raw_packet.readUInt16BE(offset, true) & 0xfe00) >> 9;
  this.tlvLength = (raw_packet.readUInt16BE(offset, true) & 0x01ff);
  var TlvDecoderType = types[this.tlvType.toString()];
  if(TlvDecoderType === undefined) {
		return this;
  } else {
		var TlvDecoder = new TlvDecoderType();
		TlvDecoder.decode(this, raw_packet, offset+2, this.tlvLength);
  }
  return this;
};

TLV.prototype.decoderName = "tlv";
TLV.prototype.eventsOnDecode = true;

module.exports = TLV;
