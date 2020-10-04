import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector  } from 'react-redux';

export const Screen2 = ({ navigation }) => {
  const user = useSelector(state => state.settingsReducer.user);
  const dispatch = useDispatch();

  const [count, setCount] = useState(10);

  useEffect(() => {
    setCount(18)
  }, []);

  function sampleFunction() {
    setCount(count + 1)
    dispatch({ type: 'REDUX_ADD' })
    navigation.navigate('Screen1')
  }



  return (

    <View style={styles.container}>
      <View>
        <Text>count: {count}</Text>
        <Text>user: {user}</Text>
        <TouchableOpacity style={{backgroundColor:'red', padding:10}}onPress={() => sampleFunction()}>
          <Text>Click me</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>


  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
