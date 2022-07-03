/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';

export default function RadioInput({label, value, setValue}) {
  const selected = label === value;
  return (
    <Pressable onPress={() => setValue(label)} style={styles.radioContainer}>
      <View
        style={[styles.outerCircle, selected && styles.selectedOuterCircle]}>
        <View
          style={[styles.innerCircle, selected && styles.selectedInnerCirlce]}
        />
      </View>
      <Text style={styles.radioText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
