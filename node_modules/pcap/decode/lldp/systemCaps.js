function systemCaps() {
}

systemCaps.prototype.decode = function(tlv, raw_packet, offset) {
  tlv.sysCaps = raw_packet.readUInt16BE(offset, true);
  tlv.enabledCaps = raw_packet.readUInt16BE(offset, true);
};

module.exports = systemCaps;
