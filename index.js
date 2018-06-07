var pcap = require('pcap')
var parser = require('pcap-parser')
var util = require('util')
console.log('hello')
console.log(util.inspect({a:1, b:"b"}, false,2,true));
pcap_session = pcap.createSession()
pcap_session.on('packet', raw_packet => {
  var packet = pcap.decode.packet(raw_packet)
  
    if (packet.payload.ethertype ==  '0x88cc') 
    {
      console.log('FOUND LLDP PACKET')
      //console.log(packet.payload.ethertype)
      var optTlvs = packet.payload.payload.optionalTlvs
      optTlvs.forEach(element => {
        switch(element.tlvType) {
          case 4: console.log("port desc: " + element.portDescription); break
          case 5: console.log("OS: " + element.systemName); break
          case 6: console.log("OS desc: " + element.systemDescription); break
          case 1: console.log("addr: " + element.addr); break
          case 2: console.log("intString: " + element.intString); break
          case 3: console.log("ttl: " + element.ttlSeconds)
        }
      });
    }
  // var info = util.inspect(packet, true, 2, true)
  // console.log(JSON.parse(info))
 // console.log(packet.link.ip.tcp.port)
})


// PcapPacket {
//   link_type: 'LINKTYPE_ETHERNET',
//   pcap_header: PcapHeader { tv_sec: 1528285440, tv_usec: 331146, caplen: 60, len: 60 },
//   payload:
//    EthernetPacket {
//      emitter: undefined,
//      dhost: EthernetAddr { addr: [Object] },
//      shost: EthernetAddr { addr: [Object] },
//      ethertype: 2054,
//      vlan: null,
//      payload:
//       Arp {
//         emitter: undefined,
//         htype: 1,
//         ptype: 2048,
//         hlen: 6,
//         plen: 4,
//         operation: 1,
//         sender_ha: [Object],
//         sender_pa: [Object],
//         target_ha: [Object],
//         target_pa: [Object] } },
//   emitter: undefined }
