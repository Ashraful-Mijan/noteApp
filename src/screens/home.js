/* eslint-disable prettier/prettier */
import {View, Text, SafeAreaView, Pressable, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

export default function Home({navigation, route, user}) {
  const [notes, setNotes] = useState([]);
  const onPressDelete = async id => {
    firestore()
      .collection('Notes')
      .doc(id)
      .delete()
      .then(() => {
        console.log('note deleted!');
      });
  };
  useEffect(() => {
    const subscriber = firestore()
      .collection('Notes')
      .where('uid', '==', user.uid)
      .onSnapshot(querySnapshot => {
        const list = [];
        querySnapshot.forEach(doc => {
          list.push({...doc.data(), id: doc.id});
        });
        setNotes(list);
      });

    return () => subscriber();
  }, [user.uid]);

  const onPressCreate = () => {
    navigation.navigate('Create');
  };
  const renderItem = ({item}) => {
    const {title, description, color, id} = item;
    return (
      <Pressable
        style={{
          backgroundColor: color,
          marginBottom: 25,
          borderRadius: 16,
          padding: 15,
        }}
        onPress={() => {
          navigation.navigate('Update', {item});
        }}>
        <Pressable
          style={{
            position: 'absolute',
            alignSelf: 'flex-end',
            padding: 15,
            zIndex: 5,
          }}
          onPress={() => onPressDelete(id)}>
          <Text>Delete</Text>
        </Pressable>
        <Text style={{color: 'white', fontSize: 24}}>{title}</Text>
        <Text style={{color: 'white', fontSize: 18, marginTop: 16}}>
          {description}
        </Text>
      </Pressable>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20,
        }}>
        <Text>My Notes</Text>
        <Pressable
          onPress={onPressCreate}
          style={{
            width: 20,
            height: 20,
            borderWidth: 1,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: 'bold'}}>+</Text>
        </Pressable>
      </View>
      <View>
        <FlatList
          contentContainerStyle={{padding: 20}}
          data={notes}
          renderItem={renderItem}
          keyExtractor={item => item.title}
        />
      </View>
    </SafeAreaView>
  );
}
