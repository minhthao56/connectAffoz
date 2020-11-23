import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import wifi from 'react-native-android-wifi';
import WifiManager from 'react-native-wifi-reborn';
import {WifiWizard, HotspotWizard} from 'react-native-wifi-and-hotspot-wizard';

import {Button, Input} from '../../components';

export default function DetailConnect({route}) {
  const {SSID} = route.params;
  const password = '12345678';
  const isWep = false;
  const connectWifi = () => {
    // WifiManager.connectToProtectedSSID(SSID, password, isWep).then(
    //   () => {
    //     console.log('Connected successfully!');
    //   },
    //   () => {
    //     console.log('Connection failed!');
    //   },
    // );
    // WifiManager.getCurrentWifiSSID().then(
    //   (ssid) => {
    //     console.log('Your current connected wifi SSID is ' + ssid);
    //   },
    //   () => {
    //     console.log('Cannot get current SSID!');
    //   },
    // );
    wifi.findAndConnect(SSID, password, (found) => {
      console.log(SSID);
      console.log(found);
      if (found) {
        console.log('wifi is in range');
      } else {
        console.log('wifi is not in range');
      }
    });

    WifiWizard.getNearbyNetworks().then((networks) => {
      let jsonNetworks = JSON.parse(networks);
      let network = jsonNetworks.filter((Network) => {
        return Network.SSID == SSID;
      });
      console.log(network);
      if (network) {
        console.log('Loading');
        let stringified_network = JSON.stringify(network);
        WifiWizard.connectToNetwork(stringified_network[0], SSID, password)
          .then((data) => {
            if (data.status == 'connected') {
              console.log('Done');
            }
          })
          .catch((err) => console.log(err));
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
