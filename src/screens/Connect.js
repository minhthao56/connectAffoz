import React, {useEffect, useState} from 'react';
import {View, Text, PermissionsAndroid, StyleSheet} from 'react-native';
import wifi from 'react-native-android-wifi';
import {Icon} from 'react-native-elements';
import {Button} from '../components';

export default function Connect() {
  const [listWifi, setListWifi] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const scanWifi = () => {
    setIsLoading(true);
    wifi.reScanAndLoadWifiList(
      (wifiStringList) => {
        let wifiArray = JSON.parse(wifiStringList);
        setListWifi(wifiArray);
        setIsLoading(false);
      },
      (error) => {
        console.log(error);
        setIsLoading(false);
      },
    );
  };

  useEffect(() => {
    permissionsAndroid();
    scanWifi();
  }, []);

  // const checkStatusWifi = () => {
  //   wifi.isEnabled((isEnabled) => {
  //     if (isEnabled) {
  //       console.log('wifi service enabled');
  //     } else {
  //       console.log('wifi service is disabled');
  //     }
  //   });

  //   wifi.getIP((ip) => {
  //     console.log(ip);
  //   });
  // };

  return (
    <View style={Styles.full}>
      <View style={Styles.title}>
        <Icon name="share-2" type="feather" size={16} reverse />
        <Text style={Styles.text}>Danh sách wifi</Text>
      </View>
      <View style={Styles.constainer}>
        {isLoading ? (
          <Text>Đang tìm wifi...</Text>
        ) : (
          listWifi.map((item, i) => {
            return (
              <View key={i} style={Styles.listWifi}>
                <Icon
                  name="wifi"
                  type="feather"
                  color="#aaa"
                  size={20}
                  style={{marginRight: 8}}
                />
                <View>
                  <Text>{item.SSID}</Text>
                </View>
              </View>
            );
          })
        )}
      </View>
      <View style={Styles.button}>
        <Button onPress={() => scanWifi()}>Scan again</Button>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
  },
  constainer: {
    paddingLeft: 8,
    paddingRight: 8,
  },
  listWifi: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 12,
    borderRadius: 4,
    borderColor: '#e1e1e1',
    marginBottom: 8,
  },
  button: {
    marginTop: 'auto',
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  full: {
    height: '100%',
  },
});
