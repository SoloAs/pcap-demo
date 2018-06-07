var orgs = require("./oui/oui_types");

function ORG() {
}

ORG.prototype.decode = function (tlv, raw_packet, offset) {
  // https://en.wikipedia.org/wiki/Type-length-value
  // https://en.wikipedia.org/wiki/Link_Layer_Discovery_Protocol
  tlv.orgId = raw_packet.readUInt32BE(offset, true) >> 8;
  var OrgDecoderType = orgs[tlv.orgId.toString()];
  if(OrgDecoderType !== undefined) {
    var OrgDecoder = new OrgDecoderType();
    OrgDecoder.decode(tlv, raw_packet, offset+3);
  }
};

module.exports = ORG;
