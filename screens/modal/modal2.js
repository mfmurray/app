import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions, ScrollView, Animated } from 'react-native';
import { useDispatch, useSelector  } from 'react-redux';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper'
import { Octicons, FontAwesome5, Ionicons, AntDesign, Feather, FontAwesome,Entypo, MaterialIcons,MaterialCommunityIcons,SimpleLineIcons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';


import {Weekday} from './modal2/weekday';
import {Weekday1} from './modal2/weekday1';


let customFonts = {
    'Inter-Black-Bold': require('../../assets/fonts/Roboto-Bold.ttf'),
    'Inter-Black': require('../../assets/fonts/Roboto-Regular.ttf'),
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
const colorGray = '#ebebeb'
const dayColor = 'white'
const dayColorNot = '#8c572e'

const yOffset = height*.27


export const Modal2 = (props) => {
  const user = useSelector(state => state.settingsReducer.user);
  const location = useSelector(state => state.settingsReducer.location);
  const scrollIndex = useSelector(state => state.settingsReducer.scrollIndex);
  const dispatch = useDispatch();

  const [isReady, setReady] = useState(false);
  const [count, setCount] = useState(10);
  const [scrollY, setScrollY] = useState(0);
  const [scrollState, setScrollState] = useState(1);
  const [headerState, setHeaderState] = useState(true);
  const [viewState, setViewState] = useState(1);
  const scrollY2 = useRef(new Animated.Value(-yOffset)).current;

  const  _cacheResourcesAsync = async () => {
    await Font.loadAsync(customFonts);
  }

  useLayoutEffect(() => {
    console.log('index change ', scrollIndex)
    var indexed = (1/3.5)*.27
    var factor = .822
     if (scrollIndex!==0 && isReady) {
       scrollViewRef.current.scrollTo({y: (scrollIndex-1)*height*factor+indexed*height+4, duration:200, animated: true,})
     }
  }, [scrollIndex]);

  function sampleFunction() {
    setCount(count + 1)
    dispatch({ type: 'REDUX_ADD' })
  }

  function upFunction() {
    props.onPress()
  }
  function upFunction2() {
    props.onPress2()
  }

  function handleScroll(tab) {

    var indexed = (1/3.5)*.27
    var factor = .822

    var number = Math.ceil(((tab/height)-indexed)/factor)
    if (tab<-180) {
      setHeaderState(false)
    }
    if (tab>-180) {
      setHeaderState(true)
    }
    if (number==0) {
      number=1
    }
    setScrollState(number)
  }

  function tabView(tab) {
    var dayString = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    var tabbed = Math.floor(tab/7)
    console.log('tab ',tab)
    console.log('tabbed ',tabbed)
    var randy = dayString[tab-tabbed*7]
      return (
        <View style={{width:width, alignItems:'center', justifyContent:'center'}}>
          <View style={{flexDirection:'row-reverse', width:width, height:height*.06, alignItems:'center'}}>
            <Text style={{fontSize:fonted*.047, fontFamily: "Inter-Black", marginRight:width*.03, color:'#7d7d7d'}}>{randy}, October {tab+1}, 2020</Text>
          </View>

          <View style={{width:width, height:height*.15, backgroundColor:'white', alignItems:'center', justifyContent:'center'}}>
            <View style={{position:'absolute', top:width*.03, left:width*.03}}>
              <Text style={{fontSize:fonted*.04, fontFamily: "Inter-Black", marginRight:width*.03, color:'#5e5e5e'}}>6:30 AM</Text>
            </View>

            <View style={{flexDirection:'row', width:width, paddingTop:height*.03, alignItems:'center', justifyContent:'space-between'}}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <View style={{backgroundColor:colorGray, width:width*.12, height:width*.12, borderRadius:width*.06, marginLeft:width*.1, alignItems:'center', justifyContent:'center'}}>
                  <Ionicons name="ios-person" size={width*.1} color="white" />
                </View>
                <Text style={{fontSize:fonted*.04, fontFamily: "Inter-Black", color:'#5e5e5e'}}>  Class Type</Text>
              </View>
              <TouchableOpacity style={{backgroundColor:color1, marginRight:width*.08, paddingTop:width*.013, paddingLeft:width*.03, paddingBottom:width*.013, paddingRight:width*.03, borderRadius:width*.015,shadowColor: "#000",
                shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.23,shadowRadius: 2.62,elevation: 4,}} onPress={() => console.log(tab) }>
                <Text style={{fontSize:fonted*.04, fontFamily: "Inter-Black", color:'white'}}>Waitlist</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{width:width, height:height*.15, backgroundColor:'white', alignItems:'center', justifyContent:'center', marginTop:height*.003}}>
            <View style={{position:'absolute', top:width*.03, left:width*.03}}>
              <Text style={{fontSize:fonted*.04, fontFamily: "Inter-Black", marginRight:width*.03, color:'#5e5e5e'}}>9:30 AM</Text>
            </View>

            <View style={{flexDirection:'row', width:width, paddingTop:height*.03, alignItems:'center', justifyContent:'space-between'}}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <View style={{backgroundColor:colorGray, width:width*.12, height:width*.12, borderRadius:width*.06, marginLeft:width*.1, alignItems:'center', justifyContent:'center'}}>
                  <Ionicons name="ios-person" size={width*.1} color="white" />
                </View>
                <Text style={{fontSize:fonted*.04, fontFamily: "Inter-Black", color:'#5e5e5e'}}>  Class Type</Text>
              </View>
              <TouchableOpacity style={{backgroundColor:color1, marginRight:width*.08, paddingTop:width*.013, paddingLeft:width*.03, paddingBottom:width*.013, paddingRight:width*.03, borderRadius:width*.015,shadowColor: "#000",
                shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.23,shadowRadius: 2.62,elevation: 4,}} onPress={() => console.log(tab) }>
                <Text style={{fontSize:fonted*.04, fontFamily: "Inter-Black", color:'white'}}>Book</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{width:width, height:height*.15, backgroundColor:'white', alignItems:'center', justifyContent:'center', marginTop:height*.003}}>
            <View style={{position:'absolute', top:width*.03, left:width*.03}}>
              <Text style={{fontSize:fonted*.04, fontFamily: "Inter-Black", marginRight:width*.03, color:'#5e5e5e'}}>1:30 PM</Text>
            </View>

            <View style={{flexDirection:'row', width:width, paddingTop:height*.03, alignItems:'center', justifyContent:'space-between'}}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <View style={{backgroundColor:colorGray, width:width*.12, height:width*.12, borderRadius:width*.06, marginLeft:width*.1, alignItems:'center', justifyContent:'center'}}>
                  <Ionicons name="ios-person" size={width*.1} color="white" />
                </View>
                <Text style={{fontSize:fonted*.04, fontFamily: "Inter-Black", color:'#5e5e5e'}}>  Class Type</Text>
              </View>
              <TouchableOpacity style={{backgroundColor:color1, marginRight:width*.08, paddingTop:width*.013, paddingLeft:width*.03, paddingBottom:width*.013, paddingRight:width*.03, borderRadius:width*.015,shadowColor: "#000",
                shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.23,shadowRadius: 2.62,elevation: 4,}} onPress={() => console.log(tab) }>
                <Text style={{fontSize:fonted*.04, fontFamily: "Inter-Black", color:'white'}}>Waitlist</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{width:width, height:height*.15, backgroundColor:'white', alignItems:'center', justifyContent:'center', marginTop:height*.003}}>
            <View style={{position:'absolute', top:width*.03, left:width*.03}}>
              <Text style={{fontSize:fonted*.04, fontFamily: "Inter-Black", marginRight:width*.03, color:'#5e5e5e'}}>3:30 PM</Text>
            </View>

            <View style={{flexDirection:'row', width:width, paddingTop:height*.03, alignItems:'center', justifyContent:'space-between'}}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <View style={{backgroundColor:colorGray, width:width*.12, height:width*.12, borderRadius:width*.06, marginLeft:width*.1, alignItems:'center', justifyContent:'center'}}>
                  <Ionicons name="ios-person" size={width*.1} color="white" />
                </View>
                <Text style={{fontSize:fonted*.04, fontFamily: "Inter-Black", color:'#5e5e5e'}}>  Class Type</Text>
              </View>
              <TouchableOpacity style={{backgroundColor:color1, marginRight:width*.08, paddingTop:width*.013, paddingLeft:width*.03, paddingBottom:width*.013, paddingRight:width*.03, borderRadius:width*.015,shadowColor: "#000",
                shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.23,shadowRadius: 2.62,elevation: 4,}} onPress={() => console.log(tab) }>
                <Text style={{fontSize:fonted*.04, fontFamily: "Inter-Black", color:'white'}}>Book</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{width:width, height:height*.15, backgroundColor:'white', alignItems:'center', justifyContent:'center', marginTop:height*.003}}>
            <View style={{position:'absolute', top:width*.03, left:width*.03}}>
              <Text style={{fontSize:fonted*.04, fontFamily: "Inter-Black", marginRight:width*.03, color:'#5e5e5e'}}>6:00 PM</Text>
            </View>

            <View style={{flexDirection:'row', width:width, paddingTop:height*.03, alignItems:'center', justifyContent:'space-between'}}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <View style={{backgroundColor:colorGray, width:width*.12, height:width*.12, borderRadius:width*.06, marginLeft:width*.1, alignItems:'center', justifyContent:'center'}}>
                  <Ionicons name="ios-person" size={width*.1} color="white" />
                </View>
                <Text style={{fontSize:fonted*.04, fontFamily: "Inter-Black", color:'#5e5e5e'}}>  Class Type</Text>
              </View>
              <TouchableOpacity style={{backgroundColor:color1, marginRight:width*.08, paddingTop:width*.013, paddingLeft:width*.03, paddingBottom:width*.013, paddingRight:width*.03, borderRadius:width*.015,shadowColor: "#000",
                shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.23,shadowRadius: 2.62,elevation: 4,}} onPress={() => console.log(tab) }>
                <Text style={{fontSize:fonted*.04, fontFamily: "Inter-Black", color:'white'}}>Waitlist</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
        )
  }

  function scrollToView (tab) {
    var scrollHeight = (tab-1)*1000+yOffset/2+2
    scrollViewRef.current.scrollTo({y: scrollHeight, duration:200, animated: true,})
  }


  const headerHeight = scrollY2.interpolate({inputRange: [0, yOffset/3.5, yOffset],outputRange: [0, -yOffset/3.5, -yOffset/3.5],extrapolate: 'clamp'})
  const headerOpacity = scrollY2.interpolate({inputRange: [0, yOffset/3],outputRange: [1, 0],extrapolate: 'clamp'})
  const scrollViewRef = useRef();


  return (
     isReady === false ? ( <AppLoading
      startAsync={_cacheResourcesAsync}
      onFinish={() => setReady(true)}
      onError={console.warn}
    />) :(

    <View style={{backgroundColor:colorGray, flex:1,width:width,alignItems: 'center',justifyContent: 'center',marginBottom: height*.06+bottomLip,borderTopLeftRadius:width*.04,borderTopRightRadius:width*.04,}}>

      <Animated.ScrollView
        onScroll={Animated.event( [{ nativeEvent: { contentOffset: {y: scrollY2}} }],{useNativeDriver: true,
          listener: event => { handleScroll(event.nativeEvent.contentOffset.y) }})}
        nestedScrollEnabled={true}
        style={{flex:1, borderTopLeftRadius:width*.04,borderTopRightRadius:width*.04,}}
        scrollEventThrottle={1}
        contentContainerStyle={{ marginTop: yOffset-height*.03, paddingBottom:yOffset, backgroundColor:colorGray, width:width, alignItems:'center'}}
        ref={scrollViewRef}
      >

        {[...Array(29).keys()].map((datum) => {
          return tabView(datum);
        })}

      </Animated.ScrollView>

      <Animated.View style={{alignItems:'center',borderTopLeftRadius:width*.04,borderTopRightRadius:width*.04, position:'absolute',top:0, left:0, right:0 ,backgroundColor:color1, height:yOffset-height*.03, width:width, transform: [{ translateY: headerHeight }] }}>
        <View style={{flex:1, width:width}}></View>
        <Text style={{fontFamily: "Inter-Black", fontSize:fonted*.044, color:'white', marginBottom:height*.007}}>October</Text>
        <Weekday1
          scrollState = {scrollState}
          scrollToView1={() => reduxScroll()}
          scrollToView2={() => scrollToView(2)}
          scrollToView3={() => scrollToView(3)}
          scrollToView4={() => scrollToView(4)}
          scrollToView5={() => scrollToView(5)}
          scrollToView6={() => scrollToView(6)}
          scrollToView7={() => scrollToView(7)}
        />
      </Animated.View>



        <Animated.View style={{borderTopLeftRadius:width*.04,borderTopRightRadius:width*.04, position:'absolute',top:0, left:0, right:0 ,backgroundColor:'white', height:yOffset/2.3, width:width ,transform: [{ translateY: headerHeight }], opacity:headerOpacity, alignItems:'center' }} >
          <TouchableOpacity style={{position:'absolute', bottom:height*.005, flexDirection:'row', alignItems:'center', justifyContent:'center', padding:width*.02}} onPress={() => upFunction2()}>
            <Entypo name="location-pin" size={fonted*.04} color="black" />
            <Text maxFontSizeMultiplier={1} style={{fontFamily: "Inter-Black", fontSize:fonted*.04}}>  {location}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{position:'absolute', top:height*.015+getStatusBarHeight(), right:height*.02, backgroundColor:color1, paddingLeft:width*.02, paddingRight:width*.02,paddingTop:width*.005,paddingBottom:width*.005,borderRadius:width*.05,}} onPress={() => upFunction()}>
            <Text maxFontSizeMultiplier={1} style={{fontFamily: "Inter-Black", color:'white', fontSize:fonted*.032}}>buy classes</Text>
          </TouchableOpacity>
        </Animated.View>


    </View>


  ));
}





const styles = StyleSheet.create({
  container: {

  },
});
