import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect,useRef } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useDispatch, useSelector  } from 'react-redux';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { AppLoading } from 'expo';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper'
import { Octicons, FontAwesome5, Ionicons, AntDesign, Feather, FontAwesome,Entypo, MaterialIcons,MaterialCommunityIcons,SimpleLineIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';

const color1 = "#e77b28"
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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const Modal1 = (props) => {
  const user = useSelector(state => state.settingsReducer.user);
  const dispatch = useDispatch();

  const  _cacheResourcesAsync = async () => {
    await Font.loadAsync(customFonts);
  }

  const [count, setCount] = useState(10);
  const [isReady, setReady] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

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
          <TouchableOpacity style={{backgroundColor:color1, paddingLeft:width*.025, paddingRight:width*.025,paddingTop:width*.007,paddingBottom:width*.007,borderRadius:width*.05, marginRight:width*.04}} onPress={() => props.onPress2()}>
            <Text maxFontSizeMultiplier={1} style={{fontFamily:'Inter-Black', color:'white', fontSize:fonted*.032}}>buy classes</Text>
          </TouchableOpacity>
        </View>
        <View style={{width:width*.93, height:.7, backgroundColor:'#c2c2c2', marginTop:height*.01}}></View>
      </View>

      <TouchableOpacity style={{alignItems:'center', marginTop:height*.05,}} onPress={() => props.onPress3()}>
        <View style={{borderRadius:width*.03, shadowColor: "#000",shadowOffset: {width: 0,height: 5,},shadowOpacity: 0.36,shadowRadius: 6.68,elevation: 11,}}>
          <Image style={{width: width*.8,height:width*.33, borderRadius:width*.02, opacity:1}} resizeMode="contain" source={require('../../assets/syphus_big2.png')}
          />
          <View style={{borderRadius:width*.03, position:'absolute',left:0, top:0, right:width*.02, bottom:0, alignItems:'center', backgroundColor:'rgba(0,0,0,.4)', flexDirection:'row-reverse'}}>
            <AntDesign name="rightcircle" size={fonted*.07} color="white" />
            <Text maxFontSizeMultiplier={1} style={{width:width*.25, fontFamily:'Inter-Black-Bold',color:'white', fontSize:fonted*.07}}>Book a class</Text>
          </View>
        </View>

      </TouchableOpacity>

      <TouchableOpacity style={{ backgroundColor:color1, padding:10, width:width*.8, alignItems:'center', justifyContent:'center', marginTop:height*.05, borderRadius:width*.06, shadowColor: "#000",
          shadowOffset: {width: 0,height: 4,},shadowOpacity: 0.30,shadowRadius: 4.65,elevation: 8,}} onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}>
        <Text maxFontSizeMultiplier={1} style={{ fontFamily:'Inter-Black',color:'white', fontSize:fonted*.044}}>Demo: Send Push Notification</Text>
      </TouchableOpacity>
    </View>


  ));
}

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Syhpus Training',
    body: 'Sample body text',
    data: { data: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}





const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
