import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import wifi from 'react-native-android-wifi';
// import WifiManager from 'react-native-wifi-reborn';
import {WifiWizard, HotspotWizard} from 'react-native-wifi-and-hotspot-wizard';

import {Button, Input} from '../../components';

export default function DetailConnect({route}) {
  const {SSID} = route.params;
  const password = '12345678';
  const isWep = false;
  const connectWifi = () => {
    wifi.findAndConnect(SSID, password, (found) => {
      if (found) {
        console.log('wifi is in range');
      } else {
        console.log('wifi is not in range');
      }
    });
    console.log('Scanning Nearby Devices');
    WifiWizard.getNearbyNetworks().then((networks) => {
      console.log(networks);
      console.log(SSID);
      console.log(password);
      let network = networks.filter((network) => {
        return network.SSID == SSID;
      });
      console.log(network);
      if (network.length < 1) {
        console.log('network not found');
        // Toast.show('Network Not Found');
      } else {
        // Connect To Network
        WifiWizard.connectToNetwork(network[0], SSID, password)
          .then((data) => {
            console.log(data);
            if (data.status == 'connected') {
              setConnected(true);
              console.log(data);
            } else {
              console.log('Failed To Connect');
            }
          })
          .catch((err) => {
            console.log(err);
            console.log('err');
          });
      }
    });
  };
  return (
    <View style={Styles.container}>
      <Text style={Styles.name}>{SSID}</Text>
      <View style={Styles.input}>
        <Input placeholder="Password" secureTextEntry={true} />
      </View>
      <Button onPress={connectWifi}>Kết nối</Button>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: 'white',
    height: '100%',
  },
  input: {
    marginTop: 8,
  },
  name: {
    marginTop: 16,
    fontSize: 18,
  },
});
