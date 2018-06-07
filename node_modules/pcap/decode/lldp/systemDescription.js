function systemDescription() {
}

systemDescription.prototype.decode = function(tlv, raw_packet, offset, length) {
  tlv.systemDescription = raw_packet.toString("utf8",offset,offset+length);
};

module.exports = systemDescription;
