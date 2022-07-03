/* eslint-disable prettier/prettier */
import {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';
import React from 'react';
import Button from '../components/Button';
import Input from '../components/Input';

export default function Signin({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Login = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('signin successfully', res);
      });
  };

  return (
    <View style={{flex: 1}}>
      <Image
        style={{alignSelf: 'center', width: 300, height: 300}}
        source={{
          uri: 'https://img.freepik.com/free-vector/online-registration-sign-up-with-man-sitting-near-smartphone_268404-95.jpg?w=740',
        }}
      />
      <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>
        Never forget your notes
      </Text>

      <View style={{paddingHorizontal: 16, paddingVertical: 25}}>
        <Input
          placeholder="Email address"
          onChangeText={text => setEmail(text)}
        />
        <Input
          placeholder="password"
          secureTextEntry
          onChangeText={text => setPassword(text)}
        />
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <Button
          title="Login"
          customStyles={{alignSelf: 'center', marginBottom: 60}}
          onPress={Login}
        />
        <Pressable
          onPress={() => {
            navigation.navigate('Signup');
          }}>
          <Text>
            Don't have an account ?{' '}
            <Text style={{color: 'green', fontWeight: 'bold'}}>Sign up</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
});
