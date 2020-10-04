import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Animated, Dimensions, PanResponder } from 'react-native';
import { useDispatch, useSelector  } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { getBottomSpace, getStatusBarHeight, ifIphoneX } from 'react-native-iphone-x-helper'
import { Octicons, FontAwesome5, Ionicons, AntDesign, Feather, FontAwesome,Entypo, MaterialIcons,MaterialCommunityIcons,SimpleLineIcons } from '@expo/vector-icons';
import Constants from "expo-constants";

import {Modal1} from '../screens/modal/modal1';
import {Modal2} from '../screens/modal/modal2';
import {Modal3} from '../screens/modal/modal3';
import {Modal4} from '../screens/modal/modal4';

import {Popup1} from '../screens/popup/popup1';
import {Popup2} from '../screens/popup/popup2';
import {Popup3} from '../screens/popup/popup3';
let customFonts = {
    'Inter-Black-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
    'Inter-Black': require('../assets/fonts/Roboto-Regular.ttf'),
};
const bottomLip = getBottomSpace();
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const baseWidth = 414;
const baseHeight = 862;

const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const fonted = Math.min(scaleWidth*415, scaleHeight*415);

const color1 = "#e77b28"
var panResponderSpeed = 40

export const Screen1 = ({ navigation }) => {

  /////////////Redux
  const user = useSelector(state => state.settingsReducer.user);
  const dispatch = useDispatch();
  /////////////Fonts
  const  _cacheResourcesAsync = async () => {
    await Font.loadAsync(customFonts);
  }

  useEffect(() => {
    setCount(18)
    console.log('useEffect')
    console.log('popupState ',popupState)
    console.log('pan.y ',pan.y)
  }, [popupState]);
  const [isReady, setReady] = useState(false);
  const [popupState, setpopupState] = useState(1);
  const [count, setCount] = useState(10);
  const [mainState, setmainState] = useState(1);
  const [viewState, setViewState] = useState(1);


  const pull = useRef(new Animated.Value(height)).current;
  const pan = useRef(new Animated.ValueXY({x:0,y:height})).current;
  const panResponder = useRef(
   PanResponder.create({
     onStartShouldSetPanResponder : () => false,
     onMoveShouldSetPanResponder : (e, gestureState) => {
         const {dx, dy} = gestureState;

         return (Math.abs(dy) > 40);
     },
     onPanResponderGrant: () => {pan.setOffset({x: 0,y: 0});},
     onPanResponderMove: Animated.event([null,{ dx: pan.x, dy: pan.y }], {useNativeDriver: false} ),
     onPanResponderRelease: (evt, gestureState) => {
       pan.flattenOffset()

       var speed = gestureState.vy
       var position = parseInt(JSON.stringify(pan.y))

       if (speed>2 || position>height*.3) {
         Animated.timing(pan,{toValue:{x:0,y:height}, duration:50, useNativeDriver: true}).start();
         setViewState(1)
         console.log('speed ',speed)
       }
       else {
         Animated.timing(pan,{toValue:{x:0,y:height*.06}, duration:50, useNativeDriver: true}).start();
       }

     }
   })
  ).current;


  ///////////////////////////////

  function sampleFunction() {
    setCount(count + 1)
    dispatch({ type: 'REDUX_ADD' })
    navigation.navigate('Screen2')
  }

  function addFunction() {
    setCount(count + 1)
    Animated.timing(pull, {toValue: 0, duration: 500, useNativeDriver: true}).start();
    console.log("pull ",pull)
  }
  function downFunction() {
    setViewState(1)
    panResponderSpeed = 40
    Animated.timing(pan,{toValue:{x:0,y:height}, duration:100, useNativeDriver: true}).start();
  }
  function upSettings() {
      setViewState(2)
      setpopupState(1,
      Animated.timing(pan,{toValue:{x:0,y:height*.06}, duration:100, useNativeDriver: true}).start())
  }
  function upClasses() {
      setViewState(2)
      setpopupState(2,
      Animated.timing(pan,{toValue:{x:0,y:height*.06}, duration:100, useNativeDriver: true}).start())
  }
  function upLocations() {
      setViewState(2)
      panResponderSpeed = 150
      setpopupState(3,
      Animated.timing(pan,{toValue:{x:0,y:height*.06}, duration:100, useNativeDriver: true}).start())
  }


  //////////////////////////////
  const panYlimit = pan.y.interpolate({inputRange: [height*.06, height],outputRange: [height*.06, height],extrapolate: 'clamp'})
  const mainViewScale = panYlimit.interpolate({inputRange: [0, height],outputRange: [0.9, 1],extrapolate: 'clamp'})
  const mainViewHeight = panYlimit.interpolate({inputRange: [0, height],outputRange: [height*.05, 0],extrapolate: 'clamp'})
  const mainViewOpacity = pan.y.interpolate({inputRange: [0, height],outputRange: [0.2, 0],extrapolate: 'clamp'})

  return (
     isReady === false ? ( <AppLoading
      startAsync={_cacheResourcesAsync}
      onFinish={() => setReady(true)}
      onError={console.warn}
    />) :(

    <View style={styles.container}>
      <Animated.View style={{backgroundColor:'white', height:height, width:width, alignItems:'center',transform: [{ translateY: mainViewHeight}, {scaleX:mainViewScale}], borderRadius:(viewState==1 ? 0:width*.04)}}>

        {mainState==1 ? (<Modal1
          stringy = {"hello"}
          navigation = {navigation}
          onPress={() => upSettings()}
          onPress2={() => upClasses()}
          onPress3={() => setmainState(2)}
        />):(null)}

        {mainState==2 ? (<Modal2
          stringy = {"hello"}
          navigation = {navigation}
          onPress={() => upClasses()}
          onPress2={() => upLocations()}
        />):(null)}

        {mainState==3 ? (<Modal3
          stringy = {"hello"}
          navigation = {navigation}
          onPress={() => addFunction()}
        />):(null)}

        {mainState==4 ? (<Modal4
          stringy = {"hello"}
          navigation = {navigation}
          onPress={() => addFunction()}
        />):(null)}

        <View style={{position:'absolute', bottom:0, left:0, right:0, backgroundColor:color1, paddingTop:height*.007,...ifIphoneX({paddingBottom: 25}, {paddingBottom: 0})}}>
          <View style={{width:width, flexDirection:'row', justifyContent:'space-around', paddingBottom:0}}>
            <TouchableOpacity activeOpacity={1} style={{padding:width*.025, alignItems:'center'}} onPress={() => setmainState(1)}>
              <Text maxFontSizeMultiplier={1} style={{fontFamily:"Inter-Black" ,color:(mainState==1 ? "black":'rgba(0, 0, 0, 0.4)'), fontSize:fonted*.038}}>Main</Text>
              <Octicons name="primitive-dot" size={width*.03} color={mainState==1 ? "black":'transparent'} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={{padding:width*.025, alignItems:'center'}} onPress={() => setmainState(2)}>
              <Text maxFontSizeMultiplier={1} style={{fontFamily:"Inter-Black" ,color:(mainState==2 ? "black":'rgba(0, 0, 0, 0.4)'), fontSize:fonted*.038}}>Find class</Text>
              <Octicons name="primitive-dot" size={width*.03} color={mainState==2 ? "black":'transparent'} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={{padding:width*.025, alignItems:'center'}} onPress={() => setmainState(3)}>
              <Text maxFontSizeMultiplier={1} style={{fontFamily:"Inter-Black" ,color:(mainState==3 ? "black":'rgba(0, 0, 0, 0.4)'), fontSize:fonted*.038}}>Studios</Text>
              <Octicons name="primitive-dot" size={width*.03} color={mainState==3 ? "black":'transparent'} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={{padding:width*.025, alignItems:'center'}} onPress={() => setmainState(4)}>
              <Text maxFontSizeMultiplier={1} style={{fontFamily:"Inter-Black" ,color:(mainState==4 ? "black":'rgba(0, 0, 0, 0.4)'), fontSize:fonted*.038}}>Stats</Text>
              <Octicons name="primitive-dot" size={width*.03} color={mainState==4 ? "black":'transparent'} />
            </TouchableOpacity>
          </View>
        </View>

        <Animated.View style={{position:'absolute', top:0, left:0, right:0, bottom:0, opacity:mainViewOpacity, backgroundColor:'black'}} pointerEvents="none"></Animated.View>
      </Animated.View>

      <Animated.View style={{height:height, transform: [{ translateX: 0 }, { translateY: panYlimit }], width:width, backgroundColor:'white', position:'absolute',alignItems:'center', justifyContent:'center', top:0, borderRadius:width*.04}}
      {...panResponder.panHandlers}>
        {popupState==1 ? (<Popup1
          onPress={() => downFunction()}
        />):
        (null)}
        {popupState==2 ? (<Popup2
          onPress={() => downFunction()}
        />):
        (null)}
        {popupState==3 ? (<Popup3
          onPress={() => downFunction()}
        />):
        (null)}
      </Animated.View>

      <StatusBar style="auto" />

    </View>


  ));
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    width:width
  },
});
