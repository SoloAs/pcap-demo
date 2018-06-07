function portDescription() {
}

portDescription.prototype.decode = function(tlv, raw_packet, offset, length) {
  tlv.portDescription = raw_packet.toString("utf8",offset,offset+length);
};

module.exports = portDescription;
