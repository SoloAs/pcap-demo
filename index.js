var pcap = require('./pcap')
var parser = require('pcap-parser')
var util = require('util')
console.log('Started capturing')
pcap_session = pcap.createSession('tap2')
pcap_session.on('packet', raw_packet => {
  var packet = pcap.decode.packet(raw_packet)
  if (packet.payload.ethertype ==  '0x88cc') 
  {
    console.log('FOUND LLDP PACKET:')
//    console.log(packet)
    console.log('PACKET DESCRIPTION:')
    console.log(packet.payload.payload)
  }
})


