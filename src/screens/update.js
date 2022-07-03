/* eslint-disable prettier/prettier */
import {View, Text, SafeAreaView, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import Input from '../components/Input';
import RadioInput from '../components/RadioInput';
import Button from '../components/Button';
import firestore from '@react-native-firebase/firestore';

const noteColorOptions = ['red', 'blue', 'green'];

export default function Update({navigation, route, user}) {
  const noteItem = route.params.item;
  const [title, setTitle] = useState(noteItem.title);
  const [description, setDescription] = useState(noteItem.description);
  const [noteColor, setNoteColor] = useState(noteItem.color);
  const [loading, setLoading] = useState(false);

  const onPressUpdate = async () => {
    setLoading(true);
    try {
      await firestore()
        .collection('Notes')
        .doc(noteItem.id)
        .update({
          title,
          description,
          color: noteColor,
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
      <Input
        placeholder="title"
        value={noteItem.title}
        onChangeText={text => setTitle(text)}
      />
      <Input
        placeholder="description"
        value={noteItem.description}
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
          onPress={onPressUpdate}
        />
      )}
    </SafeAreaView>
  );
}
