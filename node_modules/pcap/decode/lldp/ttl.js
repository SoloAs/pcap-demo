function ttl() {
}

ttl.prototype.decode = function(tlv, raw_packet, offset) {
	tlv.ttlSeconds = raw_packet.readUInt16BE(offset, true);
};

module.exports = ttl;
