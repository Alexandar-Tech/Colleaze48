import React, {  useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  LogBox
} from 'react-native';
import { ButtonGroup } from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Modal from "react-native-modal";
import { LinearGradient } from 'expo-linear-gradient';
import { API_LOGIN } from '../APILIST/ApiList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';


const LoginHeader = () => {
  LogBox.ignoreLogs(['new NativeEventEmitter']);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bgopacity,setBgOpacity] = useState(1);

  const API_LOGIN_ENDPOINT = API_LOGIN

  const [fontsLoaded] = useFonts({
    'circular': require('../assets/fonts/circular-std-medium-500.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const fetchData = async () => {
    setLoading(true);
    const resp = await fetch(API_LOGIN_ENDPOINT,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email" : email,
        "password" : password,
        "login_type" : "1",
        "device_type" : "mobile"  
      }),

    })    
    const response = await resp.json();
    if (response.success == '1'){
      AsyncStorage.setItem('token',JSON.stringify(response))
         
      AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
      navigation.navigate('MyDrawer',{
        data:response.data
      })
      setLoading(false);      
    }else{
      setLoading(false);
      setIsVisible(true)
      setErrorMsg(response.msg)
    }
  };

  return (
    
    <View style={{flex:1,opacity:bgopacity}}>

            <Modal
                  isVisible={isVisible}
                  style={styles.modelcontainer}
                  onBackdropPress={() => setIsVisible(false)}
                  swipeDirection={['down']}
                  onSwipeComplete={() => setIsVisible(false)}
                  >
                    <View>
                      <LinearGradient
                          colors={['skyblue', 'white']}
                          style={styles.modelView}
                          >
                            <TouchableOpacity style={{alignSelf:'flex-end',right:20}} onPress={()=>setIsVisible(false)}>
                              <Icon name="closecircle" color='red' size={25} />
                            </TouchableOpacity>
                            {
                              errorMsg?<Text style={{fontSize:16,fontWeight:'bold',color:'red',alignSelf:'center',marginTop:50}}>{errorMsg}</Text>:<Text  style={{fontSize:16,fontWeight:'bold',color:'red',alignSelf:'center',marginTop:50}}>Request Failed</Text>
                            }                        
                              
                    </LinearGradient> 
                  </View> 
              </Modal>
            <StatusBar style='auto' />
            <View style={styles.container}>
              <Image style={styles.logo} source={require('../assets/Colleaze.png')} />
              <Text style={styles.paragraph}>Login</Text>
              <View style={{paddingVertical:20}}>
                  <ButtonGroup
                  buttons={['Student', 'Parent/Guardian']}
                  selectedIndex={selectedIndex}
                  onPress={(value) => {
                    setSelectedIndex(value);
                  }}
                  containerStyle={{ borderRadius:10,height:50 }}
                  textStyle={{fontSize:16,fontWeight:'bold',fontFamily:'circular'}}
                  buttonStyle={{margin:3,borderBottomEndRadius:10,borderBottomStartRadius:10,borderTopStartRadius:10,borderTopEndRadius:10}}
                />  
              </View>
            </View>
              <View style={styles.inputView}>
                <Icon name="mail" size={25} style={{ top: 10, left: 10 }} />
                <TextInput
                  style={styles.TextInput}
                  placeholder="Email"
                  placeholderTextColor="#003f5c"
                  inputMode="email"
                  onChangeText={text=>setEmail(text)}
                  value={email}
                />
              </View>
              <View style={styles.inputView}>
                <Icon name="lock" size={20} style={{ top: 10, left: 10 }} />
                <TextInput
                  style={styles.TextInput}
                  placeholder="Password"
                  inputMode="text"
                  secureTextEntry={true}
                  placeholderTextColor="#003f5c"
                  onChangeText={password=>setPassword(password)}
                  value={password}
                />
              </View>
              <View style={styles.inputView1}>
                <Text style={{height: 20,color: '#1D2F59',textAlign:'center',fontFamily:'circular'}}>You dont remember the password</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('MainForgetPassword')}>
                  <Text style={styles.forgot_button}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
              <View style={{ left: 30 }}>
                
                <TouchableOpacity style={styles.loginBtn}
                onPress={()=>fetchData()}>
                  {loading?<ActivityIndicator size={'large'} color={'red'}/>:<Text style={styles.loginText}>LOGIN</Text>}
                </TouchableOpacity>
              </View>
    </View>
  );
};

export default function LoginScreen() {
  return (
    <View>
      <LoginHeader />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1D2F59',
    height: 280,
  },
  button: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  LoginPadding: {
    top: 30,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    backgroundColor: '#ffff',
    borderRadius: 20,
  },
  paragraph: {
    marginTop: 0,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffff',
    right: 120,
    fontFamily:'circular'
  },
  logo: {
    top: 20,
    left: 10,
    height: 140,
    width: 160,
    resizeMode: 'contain',
  },
  inputView: {
    top: 20,
    left: 40,
    backgroundColor: '#FFFF',
    borderRadius: 10,
    width: '80%',
    height: 45,
    marginBottom: 20,
  },
  TextInput: {
    height: 40,
    flex: 1,
    paddingRight: 20,
    marginLeft: 60,
    bottom: 10,
    fontFamily:'circular'
  },
  inputView1: {
    marginTop:50,
    color: '#1D2F59',
    alignContent: 'center',
    justifyContent: 'center',
  },
  forgot_button: {
    height: 30,    
    color: '#0359FA',
    textDecorationLine: 'underline',
    textAlign:'center',
    fontFamily:'circular'
  },
  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    backgroundColor: '#0BCCD8',
  },
  loginText:{
    fontSize:17,    
    color:'#fff',
    fontFamily:'circular'
  },
  modelcontainer:{
    margin:20,
    justifyContent:'center'
  },
  modelView:{
    backgroundColor: 'white', 
    padding: 16,
    height:180,
    borderRadius:20,
    borderWidth:2,
    borderColor:'#0BCCD8',
  },
  indicatorWrapper: {
    // ...StyleSheet.absoluteFillObject,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // marginTop:200,
    // flex:1             
  },
  indicatorText: {
    fontSize: 18,
    marginTop: 12,
  },
});