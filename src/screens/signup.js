/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import auth from '@react-native-firebase/auth';
import firestore, {
  setDoc,
  addDoc,
  collection,
  getDocs,
  doc,
  onSnapshot,
  query,
  where,
} from '@react-native-firebase/firestore';

const genderOptions = ['Male', 'Female'];

export default function Sigup({navigation}) {
  const [gender, setGenger] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  const signup = async () => {
    try {
      const result = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      await firestore()
        .collection('Users')
        .add({
          name,
          email,
          age,
          gender,
          uid: result.user.uid,
        })
        .then(() => {
          console.log('user added!');
        });
      setLoading(false);
      console.log('result:==>', result);
    } catch (error) {
      console.log('signUp Error:', error);
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={{paddingHorizontal: 16, paddingVertical: 25}}>
        <Input
          placeholder="Email address"
          autoCapitalize={'none'}
          onChangeText={text => setEmail(text)}
        />
        <Input
          placeholder="password"
          secureTextEntry
          onChangeText={text => setPassword(text)}
        />
        <Input
          placeholder="Full Name"
          autoCapitalize={'words'}
          onChangeText={text => setName(text)}
        />
        <Input placeholder="Age" onChangeText={text => setAge(text)} />
        <View style={{marginVertical: 20}}>
          <Text>Select gender</Text>
        </View>
        {genderOptions.map(option => {
          const selected = option === gender;
          return (
            <Pressable
              onPress={() => setGenger(option)}
              key={option}
              style={styles.radioContainer}>
              <View
                style={[
                  styles.outerCircle,
                  selected && styles.selectedOuterCircle,
                ]}>
                <View
                  style={[
                    styles.innerCircle,
                    selected && styles.selectedInnerCirlce,
                  ]}
                />
              </View>
              <Text style={styles.radioText}>{option}</Text>
            </Pressable>
          );
        })}
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <Button
          title="Signup"
          customStyles={{alignSelf: 'center', marginBottom: 60}}
          onPress={signup}
        />
        <Pressable onPress={() => navigation.navigate('Signin')}>
          <Text>
            Already have an account ?{' '}
            <Text style={{color: 'green', fontWeight: 'bold'}}>Sign In</Text>
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
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  outerCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#cfcfcf',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
    borderWidth: 1,
    borderColor: '#cfcfcf',
  },
  radioText: {
    marginLeft: 10,
  },
  selectedOuterCircle: {
    borderColor: 'orange',
  },
  selectedInnerCirlce: {
    backgroundColor: 'orange',
    borderColor: 'orange',
  },
});
