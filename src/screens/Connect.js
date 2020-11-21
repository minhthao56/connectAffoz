import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';

import wifi from 'react-native-android-wifi';

export default function Connect() {
  const permissionsAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Wifi networks',
          message: 'We need your permission in order to find wifi networks',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Thank you for your permission! :)');
      } else {
        console.log(
          'You will not able to retrieve wifi available networks list',
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    permissionsAndroid();
  }, []);

  const checkStatusWifi = () => {
    wifi.isEnabled((isEnabled) => {
      if (isEnabled) {
        console.log('wifi service enabled');
      } else {
        console.log('wifi service is disabled');
      }
    });

    wifi.getIP((ip) => {
      console.log(ip);
    });
  };

  const handleGetListWifi = () => {
    // wifi.loadWifiList(
    //   (wifiStringList) => {
    //     var wifiArray = JSON.parse(wifiStringList);
    //     console.log(wifiArray);
    //   },
    //   (error) => {
    //     console.log(error);
    //   },
    // );

    wifi.reScanAndLoadWifiList(
      (wifiStringList) => {
        var wifiArray = JSON.parse(wifiStringList);
        console.log('Detected wifi networks - ', wifiArray);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  return (
    <View>
      <TouchableOpacity onPress={checkStatusWifi}>
        <Text>CheckStatus</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleGetListWifi}>
        <Text>Get List</Text>
      </TouchableOpacity>
    </View>
  );
}
