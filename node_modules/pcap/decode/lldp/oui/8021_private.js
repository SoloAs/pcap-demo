function IEEE_8021_PRIVATE() {
}

IEEE_8021_PRIVATE.prototype.decode = function (tlv, raw_packet, offset) {
  // https://en.wikipedia.org/wiki/Type-length-value
  // https://en.wikipedia.org/wiki/Link_Layer_Discovery_Protocol
  tlv.orgSubType = raw_packet.readUInt8(offset, true);

  switch(tlv.orgSubType) {
    case 1:
      tlv.portVlanId = raw_packet.readUInt16BE(offset+1, true);
      break;
    case 2:
      tlv.flags = raw_packet.readUInt8(offset+1, true);
      tlv.portProtocolVlanId = raw_packet.readUInt16BE(offset+2, true);
      break;
    case 3:
      tlv.vlanId = raw_packet.readUInt16BE(offset+1, true);
      var nameSubLength = raw_packet.readUInt8(offset+3, true);
      tlv.vlanName = raw_packet.toString("utf8",offset+2,offset+2+nameSubLength);
      break;
    case 4:
      var idSubLength = raw_packet.readUInt8(offset+1, true);
      tlv.protocolId = raw_packet.toString("utf8",offset+2,offset+2+idSubLength);
      break;
    case 8:
      tlv.congestionNotification = undefined;
      break;
    case 9:
      tlv.etsConfig = raw_packet.readUInt8(offset+1);
      break;
    case 10:
      tlv.etcRec = undefined;
      break;
    case 11:
      tlv.flowControlConfig = undefined;
      break;
    case 12:
      tlv.appPriority = undefined;
      break;
    case 13:
      tlv.evb = undefined;
      break;
    case 14:
      tlv.cdcp = undefined;
      break;
    default:
      console.log("Unknown Organizational SubType!");
  }
};

module.exports = IEEE_8021_PRIVATE;
