import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper'
import { useDispatch, useSelector  } from 'react-redux';
import { FontAwesome5, Ionicons, AntDesign, Feather, FontAwesome,Entypo, MaterialIcons,MaterialCommunityIcons,SimpleLineIcons } from '@expo/vector-icons';

const bottomLip = getBottomSpace();
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const baseWidth = 414;
const baseHeight = 862;

const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const fonted = Math.min(scaleWidth*415, scaleHeight*415);


export const Popup3 = (props) => {
  const user = useSelector(state => state.settingsReducer.user);
  const location = useSelector(state => state.settingsReducer.location);
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
  function changeLocation(tab) {
    dispatch({ type: 'REDUX_LOCATION', locate: tab})
    props.onPress()
  }
  function reloadFunction() {
    props.onPress()
  }

  function tabView(tab) {
    var string = 'location '+tab
      return (
        <TouchableOpacity style={{marginTop:height*.009, paddingTop:height*.003, paddingBottom:height*.003, width:width*.4}} onPress={() => changeLocation(string)}>
          <Text maxFontSizeMultiplier={1} style={{ fontSize:fonted*.06}}>Location {tab}</Text>
        </TouchableOpacity>
        )
  }



  return (

    <View style={styles.container}>
      <View style={{width:width, backgroundColor:'rgba(0, 0, 0, 0.05)', alignItems:'center', justifyContent:'space-between', padding:width*.02, flexDirection:'row'}}>
        <TouchableOpacity style={{}} onPress={() => props.onPress()}>
          <Feather name="x" size={width*.06} color="black" />
        </TouchableOpacity>
        <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'center', padding:width*.02}}>
          <Entypo name="location-pin" size={fonted*.045} color="black" />
          <Text style={{fontSize:fonted*.045}}>  {location}</Text>
        </View>
        <TouchableOpacity style={{}} >
          <Feather name="x" size={width*.06} color="transparent" />
        </TouchableOpacity>
      </View>
      <ScrollView style={{flex:1, marginLeft:width*.04}}>
        <TouchableOpacity style={{marginTop:height*.02, paddingTop:height*.003, paddingBottom:height*.003,}} onPress={() => changeLocation("St. Clair Shores")}>
          <Text maxFontSizeMultiplier={1} style={{ fontSize:fonted*.06}}>St. Clair Shores</Text>
        </TouchableOpacity>
        {[...Array(7).keys()].map((datum) => {
          return tabView(datum);
        })}


      </ScrollView>
    </View>


  );
}





const styles = StyleSheet.create({
  container: {
    flex:1,
    width:'100%',
    borderRadius: width*.04,
  },
});
