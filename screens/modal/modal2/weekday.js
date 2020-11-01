import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions, ScrollView, Animated } from 'react-native';
import { useDispatch, useSelector  } from 'react-redux';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper'
import { Octicons, FontAwesome5, Ionicons, AntDesign, Feather, FontAwesome,Entypo, MaterialIcons,MaterialCommunityIcons,SimpleLineIcons } from '@expo/vector-icons';





const bottomLip = getBottomSpace();
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const baseWidth = 414;
const baseHeight = 862;

const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const fonted = Math.min(scaleWidth*415, scaleHeight*415);

const color1 = "#e77b28"
const colorGray = '#bfbfbf'
const dayColor = 'white'
const dayColorNot = '#8c572e'

const yOffset = height*.23


export const Weekday = (props) => {
  const user = useSelector(state => state.settingsReducer.user);
  const location = useSelector(state => state.settingsReducer.location);
  const dispatch = useDispatch();

  const [count, setCount] = useState(10);
  const [scrollState, setScrollState] = useState(1);


  useEffect(() => {
    setCount(18)
  }, []);

  function sampleFunction() {
    setCount(count + 1)
    dispatch({ type: 'REDUX_ADD' })
  }



  return (

    <View style={{width:width, flexDirection:'row', alignItems:'center', justifyContent:'space-around', marginBottom:height*.01}}>
      <TouchableOpacity style={{width:width*.07, alignItems:'center', justifyContent:'center'}} onPress={() => props.scrollToView1() }>
        <Text maxFontSizeMultiplier={1} style={{marginBottom:height*.005, color:(props.scrollState==1 ? dayColor:dayColorNot)}}>M</Text>
        <View style={{width:width*.07, height:width*.07, backgroundColor:(props.scrollState!==1 ? colorGray:'white'), borderRadius:width*.035}}></View>
      </TouchableOpacity>
      <TouchableOpacity style={{width:width*.07, alignItems:'center', justifyContent:'center'}} onPress={() => props.scrollToView2() }>
        <Text maxFontSizeMultiplier={1} style={{marginBottom:height*.005, color:(props.scrollState==2 ? dayColor:dayColorNot)}}>T</Text>
        <View style={{width:width*.07, height:width*.07, backgroundColor:(props.scrollState!==2 ? colorGray:'white'), borderRadius:width*.035}}></View>
      </TouchableOpacity>
      <TouchableOpacity style={{width:width*.07, alignItems:'center', justifyContent:'center'}} onPress={() => props.scrollToView3() }>
        <Text maxFontSizeMultiplier={1} style={{marginBottom:height*.005, color:(props.scrollState==3 ? dayColor:dayColorNot)}}>W</Text>
        <View style={{width:width*.07, height:width*.07, backgroundColor:(props.scrollState!==3 ? colorGray:'white'), borderRadius:width*.035}}></View>
      </TouchableOpacity>
      <TouchableOpacity style={{width:width*.07, alignItems:'center', justifyContent:'center'}} onPress={() => props.scrollToView4() }>
        <Text maxFontSizeMultiplier={1} style={{marginBottom:height*.005, color:(props.scrollState==4 ? dayColor:dayColorNot)}}>T</Text>
        <View style={{width:width*.07, height:width*.07, backgroundColor:(props.scrollState!==4 ? colorGray:'white'), borderRadius:width*.035}}></View>
      </TouchableOpacity>
      <TouchableOpacity style={{width:width*.07, alignItems:'center', justifyContent:'center'}} onPress={() => props.scrollToView5() }>
        <Text maxFontSizeMultiplier={1} style={{marginBottom:height*.005, color:(props.scrollState==5 ? dayColor:dayColorNot)}}>F</Text>
        <View style={{width:width*.07, height:width*.07, backgroundColor:(props.scrollState!==5 ? colorGray:'white'), borderRadius:width*.035}}></View>
      </TouchableOpacity>
      <TouchableOpacity style={{width:width*.07, alignItems:'center', justifyContent:'center'}} onPress={() => props.scrollToView6() }>
        <Text maxFontSizeMultiplier={1} style={{marginBottom:height*.005, color:(props.scrollState==6 ? dayColor:dayColorNot)}}>Sa</Text>
        <View style={{width:width*.07, height:width*.07, backgroundColor:(props.scrollState!==6 ? colorGray:'white'), borderRadius:width*.035}}></View>
      </TouchableOpacity>
      <TouchableOpacity style={{width:width*.07, alignItems:'center', justifyContent:'center'}} onPress={() => props.scrollToView7() }>
        <Text maxFontSizeMultiplier={1} style={{marginBottom:height*.005, color:(props.scrollState==7 ? dayColor:dayColorNot)}}>Su</Text>
        <View style={{width:width*.07, height:width*.07, backgroundColor:(props.scrollState!==7 ? colorGray:'white'), borderRadius:width*.035}}></View>
      </TouchableOpacity>
    </View>


  );
}





const styles = StyleSheet.create({
  container: {

  },
});
