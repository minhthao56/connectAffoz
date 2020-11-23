import React, {useEffect, useState} from 'react';
import {View, Text, PermissionsAndroid, StyleSheet} from 'react-native';
import wifi from 'react-native-android-wifi';
import {Icon} from 'react-native-elements';

import {Button, OneWifi} from '../../components';

export default function Connect({navigation}) {
  const [listWifi, setListWifi] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [SSIDCurrent, setSSIDCurrent] = useState('');

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
  const getSSIDCurrent = () => {
    wifi.getSSID((ssid) => {
      setSSIDCurrent(ssid);
    });
  };
  useEffect(() => {
    permissionsAndroid();
    scanWifi();
    getSSIDCurrent();
  }, []);
  const handleDetailWifi = (SSID) => {
    navigation.navigate('DetailConnect', {
      SSID: SSID,
    });
  };

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
              <OneWifi
                item={item}
                key={i}
                handleDetailWifi={handleDetailWifi}
                isConnect={SSIDCurrent === item.SSID ? true : false}
              />
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
