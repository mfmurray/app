import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect,useRef } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native';
import { useDispatch, useSelector  } from 'react-redux';
import Constants from 'expo-constants';
import { AppLoading } from 'expo';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper'
import { Octicons, FontAwesome5, Ionicons, AntDesign, Feather, FontAwesome,Entypo, MaterialIcons,MaterialCommunityIcons,SimpleLineIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';

import {Leaderboard} from './modal1/leaderboard';


const color1 = "#e77b28"
const colorGray = '#ebebeb'
const bottomLip = getBottomSpace();
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const baseWidth = 414;
const baseHeight = 862;

const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const fonted = Math.min(scaleWidth*415, scaleHeight*415);
let customFonts = {
    'Inter-Black-Bold': require('../../assets/fonts/Roboto-Bold.ttf'),
    'Inter-Black': require('../../assets/fonts/Roboto-Regular.ttf'),
};


export const Modal1 = (props) => {
  const user = useSelector(state => state.settingsReducer.user);
  const dispatch = useDispatch();

  const  _cacheResourcesAsync = async () => {
    await Font.loadAsync(customFonts);
  }

  const [count, setCount] = useState(10);
  const [isReady, setReady] = useState(false);


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

  function tabView(tab) {
      return (
        <View style={{width:width*.2, borderTopWidth:1, borderColor:colorGray, height:height*.05, alignItems:'center', justifyContent:'center'}}>
          <Text maxFontSizeMultiplier={1} style={{ fontFamily:'Inter-Black', fontSize:fonted*.038}}>{tab}</Text>
        </View>
        )
  }
  function tabView2(tab) {
      return (
        <View style={{flexDirection:'row'}}>
          <View style={{width:width*.2, borderTopWidth:1, borderColor:colorGray, height:height*.05, alignItems:'center', justifyContent:'center'}}>
            <Text maxFontSizeMultiplier={1} style={{ fontFamily:'Inter-Black', fontSize:fonted*.033}}>tab1 {tab}</Text>
          </View>
          <View style={{width:width*.2, borderTopWidth:1,borderColor:colorGray, height:height*.05, alignItems:'center', justifyContent:'center'}}>
            <Text maxFontSizeMultiplier={1} style={{ fontFamily:'Inter-Black', fontSize:fonted*.033}}>tab2 {tab}</Text>
          </View>
          <View style={{width:width*.2, borderTopWidth:1,borderColor:colorGray, height:height*.05, alignItems:'center', justifyContent:'center'}}>
            <Text maxFontSizeMultiplier={1} style={{ fontFamily:'Inter-Black', fontSize:fonted*.033}}>tab3 {tab}</Text>
          </View>
          <View style={{width:width*.2, borderTopWidth:1,borderColor:colorGray, height:height*.05, alignItems:'center', justifyContent:'center'}}>
            <Text maxFontSizeMultiplier={1} style={{ fontFamily:'Inter-Black', fontSize:fonted*.033}}>tab4 {tab}</Text>
          </View>
          <View style={{width:width*.2, borderTopWidth:1,borderColor:colorGray, height:height*.05, alignItems:'center', justifyContent:'center'}}>
            <Text maxFontSizeMultiplier={1} style={{ fontFamily:'Inter-Black', fontSize:fonted*.033}}>tab5 {tab}</Text>
          </View>
        </View>
        )
  }
  function tabTitle(tab) {
      return (
        <View style={{flexDirection:'row'}}>
          <View style={{width:width*.2, borderTopWidth:1, borderColor:colorGray, height:height*.05, alignItems:'center', justifyContent:'center'}}>
            <Text maxFontSizeMultiplier={1} style={{ fontFamily:'Inter-Black-Bold', fontSize:fonted*.033}}>tab1</Text>
          </View>
          <View style={{width:width*.2, borderTopWidth:1,borderColor:colorGray, height:height*.05, alignItems:'center', justifyContent:'center'}}>
            <Text maxFontSizeMultiplier={1} style={{ fontFamily:'Inter-Black-Bold', fontSize:fonted*.033}}>tab2</Text>
          </View>
          <View style={{width:width*.2, borderTopWidth:1,borderColor:colorGray, height:height*.05, alignItems:'center', justifyContent:'center'}}>
            <Text maxFontSizeMultiplier={1} style={{ fontFamily:'Inter-Black-Bold', fontSize:fonted*.033}}>tab3</Text>
          </View>
          <View style={{width:width*.2, borderTopWidth:1,borderColor:colorGray, height:height*.05, alignItems:'center', justifyContent:'center'}}>
            <Text maxFontSizeMultiplier={1} style={{ fontFamily:'Inter-Black-Bold', fontSize:fonted*.033}}>tab4</Text>
          </View>
          <View style={{width:width*.2, borderTopWidth:1,borderColor:colorGray, height:height*.05, alignItems:'center', justifyContent:'center'}}>
            <Text maxFontSizeMultiplier={1} style={{ fontFamily:'Inter-Black-Bold', fontSize:fonted*.033}}>tab5</Text>
          </View>
        </View>
        )
  }



  return (
     isReady === false ? ( <AppLoading
      startAsync={_cacheResourcesAsync}
      onFinish={() => setReady(true)}
      onError={console.warn}
    />) :(

    <View style={styles.container}>

      <View style={{alignItems:'center'}}>
        <View style={{width:width, flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:Constants.statusBarHeight+height*.01}}>
          <TouchableOpacity style={{padding:10,}} onPress={() => props.onPress()}>
            <SimpleLineIcons name="menu" size={width*.055} color={color1} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ marginTop:height*.03, borderTopWidth:1, borderColor:colorGray, width:width, justifyContent:'center', paddingTop:height*.01, paddingBottom:height*.01}}>
          <Text maxFontSizeMultiplier={1} style={{ fontFamily:'Inter-Black', fontSize:fonted*.044, marginLeft:width*.05}}>Leaderboard</Text>
      </View>

      <Leaderboard/>
    </View>


  ));
}





const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
