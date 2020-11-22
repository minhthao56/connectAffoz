import React from 'react';
import {View} from 'react-native';
import {Button} from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import { changeLogin } from '../redux/slice/changeView';

export default function Profile() {
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    try {
      await AsyncStorage.clear();
      dispatch(changeLogin())
    } catch (error) {
      Alert.alert('Đăng xuất lỗi! ');
    }
  };
  return (
    <View>
      <Button onPress = {handleSignOut}>Đăng xuất</Button>
    </View>
  );
}
