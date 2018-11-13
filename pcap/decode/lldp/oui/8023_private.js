function IEEE_8023_PRIVATE() {
}

IEEE_8023_PRIVATE.prototype.decode = function (tlv, raw_packet, offset) {
  // https://en.wikipedia.org/wiki/Type-length-value
  // https://en.wikipedia.org/wiki/Link_Layer_Discovery_Protocol
  tlv.orgSubType = raw_packet.readUInt8(offset, true);

  switch(tlv.orgSubType) {
    case 1:
      tlv.autoNegotiation = raw_packet.readUInt8(offset+1, true);
      tlv.autoNegotiationCaps = raw_packet.readUInt16BE(offset+2, true);
      tlv.mauType = raw_packet.readUInt16BE(offset+4, true);
      break;
    case 2:
      tlv.mdiPowerSupport = raw_packet.readUInt8(offset+1, true);
      tlv.mdiPowerPair = raw_packet.readUInt8(offset+2, true);
      tlv.mdiPowerClass = raw_packet.readUInt8(offset+3, true);
      break;
    case 3:
      tlv.lagStatus = raw_packet.readUInt8(offset+1, true);
      tlv.lagPortId = raw_packet.readUInt32BE(offset+2, true);
      break;
    case 4:
      tlv.mtuSize = raw_packet.readUInt16BE(offset+1, true);
      break;
    default:
      console.log("Unknown Organizational SubType!");
  }
};

module.exports = IEEE_8023_PRIVATE;
