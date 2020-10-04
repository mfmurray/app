import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
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
const colorGray = '#dbdbdb'
const dayColor = 'white'
const dayColorNot = '#8c572e'

const yOffset = height*.23


export const Weekday1 = (props) => {
  const user = useSelector(state => state.settingsReducer.user);
  const location = useSelector(state => state.settingsReducer.location);
  const scrollIndex = useSelector(state => state.settingsReducer.scrollIndex);
  const dispatch = useDispatch();

  const [count, setCount] = useState(10);
  const [scrollState, setScrollState] = useState(1);


  useEffect(() => {
    setCount(18)
    console.log('sup ',props.stringy)
  }, []);

  function reduxScroll(tab) {
    console.log('redux ')
    dispatch({ type: 'REDUX_SCROLL', scrolled:tab })
  }

  useLayoutEffect(() => {

    var number = Math.floor(props.scrollState/7.1)
    console.log('number ',number)
    console.log('number ',props.scrollState)
      scrollViewRef.current.scrollTo({x: width*number, duration:200, animated: true,})
  }, [props.scrollState]);

  function sampleFunction() {
    setCount(count + 1)
    dispatch({ type: 'REDUX_ADD' })
  }

  function scrollToView(tab) {
    console.log(tab)
    if (tab==1) {
      props.scrollToView1()
    }
    if (tab==2) {
      props.scrollToView2()
    }
    if (tab==3) {
      props.scrollToView3()
    }
    if (tab==4) {
      props.scrollToView4()
    }
    if (tab==5) {
      props.scrollToView5()
    }
    if (tab==6) {
      props.scrollToView6()
    }
    if (tab==7) {
      props.scrollToView7()
    }
  }

  function tabView(tab) {
      return (
        <View style={{flexGrow:1, width:width, flexDirection:'row', alignItems:'center', justifyContent:'space-around', marginBottom:height*.01}}>
          {[...Array(7).keys()].map((datum) => {
            return dayView([datum, tab]);
          })}
        </View>
        )
  }
  function dayView(tab) {
    console.log('tab ',tab)
    var weekString = ["M","T","W","T","F","Sa","Su"]
      return (
          <TouchableOpacity style={{width:width*.07, alignItems:'center', justifyContent:'center'}} onPress={() => reduxScroll(tab[0]+7*tab[1]+1) }>
            <Text maxFontSizeMultiplier={1} style={{marginBottom:height*.005, color:(props.scrollState==(tab[0]+7*tab[1]+1) ? dayColor:dayColorNot)}}>{weekString[tab[0]]}</Text>
            <View style={{width:width*.07, height:width*.07, backgroundColor:(props.scrollState!==(tab[0]+7*tab[1]+1) ? colorGray:'white'), borderRadius:width*.035, alignItems:'center', justifyContent:'center'}}>
              <Text style={{fontSize:fonted*.03}}>{tab[0]+7*tab[1]+1}</Text>
            </View>
          </TouchableOpacity>
        )
  }

  const scrollViewRef = useRef();


  return (

    <View style={{width:width, flexDirection:'row', alignItems:'center', justifyContent:'space-around', marginBottom:height*.001}}>
      <ScrollView horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false}
    contentContainerStyle={{}} ref={scrollViewRef}>

      {[...Array(4).keys()].map((datum) => {
        return tabView(datum);
      })}

      </ScrollView>
    </View>


  );
}





const styles = StyleSheet.create({
  container: {

  },
});
