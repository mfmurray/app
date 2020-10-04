import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions } from 'react-native';
import { useDispatch, useSelector  } from 'react-redux';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper'

const bottomLip = getBottomSpace();
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const baseWidth = 414;
const baseHeight = 862;

const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const fonted = Math.min(scaleWidth*415, scaleHeight*415);

const color1 = "#e77b28"


export const Modal4 = (props) => {
  const user = useSelector(state => state.settingsReducer.user);
  const dispatch = useDispatch();

  const [count, setCount] = useState(10);

  useEffect(() => {
    setCount(18)
    console.log('sup ',props.stringy)
  }, []);

  function sampleFunction() {
    setCount(count + 1)
    dispatch({ type: 'REDUX_ADD' })
  }
  function reloadFunction() {
    props.onPress()
  }



  return (

    <View style={styles.container}>
      <Text>Stats from workout</Text>
    </View>


  );
}





const styles = StyleSheet.create({
  container: {
    height:height*.7,
    width:width,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
