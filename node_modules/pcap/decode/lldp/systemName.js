function systemName() {
}

systemName.prototype.decode = function(tlv, raw_packet, offset, length) {
  tlv.systemName = raw_packet.toString("utf8",offset,offset+length);
};

module.exports = systemName;
