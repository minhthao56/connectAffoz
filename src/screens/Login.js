import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import axios from 'axios';

import {Input, Button, Logo} from '../components';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
    <View style={Styles.container}>
      <View style={Styles.logo}>
        <Logo />
      </View>
      <View style={Styles.from}>
        <Input
          placeholder="Email/Phone"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <Button>Đăng nhập</Button>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  from: {
    flex: 3,
  },
});
