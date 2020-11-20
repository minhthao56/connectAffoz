import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import axios from 'axios';

const App = () => {
  // useEffect(() => {
  //   axios
  //     .post('http://dede.affoz.com/api/v1/authentication/login', {
  //       username: '0906262849',
  //       password: '123456789',
  //     })
  //     .then((res) => console.log(res.data.accessToken))
  //     .catch((err) => console.log(err.response.data.message));
  // }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        {/* <Text>Affoz</Text>
        <View>
          <TextInput placeholder="Email/Phone" />
          <TextInput placeholder="Password" />
          <TouchableOpacity>
            <Text>Đăng nhập</Text>
          </TouchableOpacity>
        </View> */}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
