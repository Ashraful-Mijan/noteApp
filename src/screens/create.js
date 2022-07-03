/* eslint-disable prettier/prettier */
import {View, Text, SafeAreaView, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import Input from '../components/Input';
import RadioInput from '../components/RadioInput';
import Button from '../components/Button';
import firestore from '@react-native-firebase/firestore';

const noteColorOptions = ['red', 'blue', 'green'];

export default function Create({navigation, route, user}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [noteColor, setNoteColor] = useState('blue');
  const [loading, setLoading] = useState(false);

  const onPressCreate = async () => {
    setLoading(true);
    try {
      await firestore()
        .collection('Notes')
        .add({
          title,
          description,
          color: noteColor,
          uid: user.uid,
        })
        .then(() => {
          console.log('note added!');
          setLoading(false);
          navigation.goBack();
        });
    } catch (err) {
      console.log('err', err);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{marginHorizontal: 20, flex: 1}}>
      <Input placeholder="title" onChangeText={text => setTitle(text)} />
      <Input
        placeholder="description"
        onChangeText={text => setDescription(text)}
        multiline={true}
      />
      <View style={{marginTop: 25, marginBottom: 15}}>
        <Text>Select your note color</Text>
      </View>
      {noteColorOptions.map((option, index) => (
        <RadioInput
          key={index}
          label={option}
          value={noteColor}
          setValue={setNoteColor}
        />
      ))}

      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button
          title="Submit"
          customStyles={{alignSelf: 'center', marginTop: 60, width: '100%'}}
          onPress={onPressCreate}
        />
      )}
    </SafeAreaView>
  );
}
