import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ScrollView,Image,TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';
import { API_FORGET,API_VALIDATEFORGET,API_RESETPASSWORD } from '../../APILIST/ApiList';

export function MainForgetPassword({navigation}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [digit, setDigit] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [check,setCheck] = useState(true);
    const [checkforget,setCheckForget] = useState(true);
    const [loginSuccess,setLoginSuccess] = useState(true);

    let API_URL = ''
    let response = ''

    const NewPassword = async () => {
        API_URL = API_RESETPASSWORD
        const resp = await fetch(API_URL,{
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email" : email,
                "new_password" : password,
                "confirm_password" :confirmPassword,
            }),
    
        }) 
        response = await resp.json();   
        if (response.success == '1'){ 
            setLoginSuccess(false)
        }
    }

    const ForgetPasswordFunc = async (valDATA) => {
       if (!valDATA){
        API_URL = API_FORGET
        const resp = await fetch(API_URL,{
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email" : email,
            }),
    
        }) 
        response = await resp.json();
       }
       else{
        API_URL = API_VALIDATEFORGET
        const resp = await fetch(API_URL,{
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email" : email,
                'otp':digit
            }),
    
        }) 
        response = await resp.json();
       }
           
        
        if (response.success == '1'){
            setCheck(false)

            if(response.msg == 'otp validate Successfully' & !check){
                setCheckForget(false)               
            }
        }
    }; 
    
    return(
        <>
        <LinearGradient
            colors={['skyblue', 'white']}
            style={{flex:1}}>
                <View style={{ flex: 1}}>
                    <View style={styles.headerPad}>
                        <View style={styles.headpadCss}>
                            <TouchableOpacity onPress={()=>navigation.goBack()}>
                                <View style={styles.headpad}>
                                    <Icon name="chevron-left" size={30}/>
                                </View>
                            </TouchableOpacity>
                            <View>
                                <Text style={styles.headerText}>Forget Password</Text>
                            </View>
                            <View></View>
                        </View>
                    </View>
                    <ScrollView style={{flex:1}}>
                        <View style={{padding:20}}>
                            {
                                checkforget?(
                                    <View>    
                                <View style={{margin:10}}>
                                    {
                                        check?<Text style={{textAlign:'justify',color:'#1D2F59',fontSize:15,fontWeight:'bold'}}>
                                        Provide your account’s email for which you want to reset your password?
                                    </Text>:<Text style={{textAlign:'justify',color:'#1D2F59',fontSize:15,fontWeight:'bold'}}>
                                        We have sent four digit code on your email.
                                    </Text>
                                    }
                                    
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
                                {
                                    !check?(
                                        <View style={styles.inputView}>
                                            <Icon name="mail" size={25} style={{ top: 10, left: 10 }} />
                                            <TextInput
                                                style={styles.TextInput}
                                                placeholder="Four Digit Code"
                                                placeholderTextColor="#003f5c"
                                                inputMode="numeric"
                                                onChangeText={text=>setDigit(text)}
                                            />
                                        </View>
                                    ):null
                                }
                                <View>
                                    {
                                        check?(
                                            <TouchableOpacity style={styles.loginBtn} onPress={()=>ForgetPasswordFunc(0)}>
                                                <Text style={styles.loginText}>SUBMIT</Text>
                                            </TouchableOpacity>
                                        ):(
                                            <TouchableOpacity style={styles.loginBtn} onPress={()=>ForgetPasswordFunc(1)}>
                                                <Text style={styles.loginText}>Verify</Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                    
                                </View>
                            </View>
                                ):(
                                    loginSuccess?(
                                    <View>
                                        <View style={styles.inputView}>                                            
                                            <TextInput
                                                style={[styles.TextInput,{top:1}]}
                                                placeholder="New Password"
                                                placeholderTextColor="#003f5c"
                                                inputMode="numeric"
                                                onChangeText={text=>setPassword(text)}
                                            />
                                        </View>
                                        <View style={styles.inputView}>                                            
                                            <TextInput
                                                style={[styles.TextInput,{top:1}]}
                                                placeholder="Confirm Password"
                                                placeholderTextColor="#003f5c"
                                                inputMode="numeric"
                                                onChangeText={text=>setConfirmPassword(text)}
                                            />
                                        </View>
                                        <TouchableOpacity style={styles.loginBtn} onPress={()=>NewPassword()}>
                                                <Text style={styles.loginText}>Submit</Text>
                                            </TouchableOpacity>
                                        
                                    </View>):(
                                        <View>
                                            <TouchableOpacity onPress={()=>navigation.navigate('LoginScreen')}>
                                                <Image style={styles.logo} source={require('../../assets/Login_success.png')} />
                                            </TouchableOpacity>
                                        </View>
                                    )
                                )
                            }
                            
                                    
                        </View>
                    </ScrollView>
                </View>
            </LinearGradient>
        </>
    )
}

const styles = StyleSheet.create({
  headerPad:{
      height:130,
      borderRadius:20,
      backgroundColor:'#1D2F59',
  },
  headpadCss:{
      flexDirection:'row',
      marginTop:40,
      justifyContent:'space-between',
      paddingHorizontal:10,
      margin:10
  },
  headpad:{
      height:50,
      width:50,
      borderRadius:10,
      backgroundColor:'#fff',
      justifyContent:'center',
      alignItems:'center'
  },
  headerText:{
      textAlign:'center',
      fontSize:18,
      fontWeight:'bold',
      color:'#fff',
      top:10,
      right:20
  },
  inputView: {
    top: 20,
    backgroundColor: '#FFFF',
    borderRadius: 10,
    width: '100%',
    height: 45,
    marginBottom: 20,
  },
  TextInput: {
    height: 40,
    flex: 1,
    paddingRight: 20,
    marginLeft: 60,
    bottom: 10,
    fontSize:15,
    fontWeight:'bold'
  },
  loginBtn: {
    width: '100%',
    borderRadius: 25,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    backgroundColor: '#0BCCD8',
  },
  loginText:{
    fontSize:17,
    fontWeight:'bold',
    color:'#fff'
  },
  logo:{
    height:400,
    width:'100%',
    resizeMode:'contain'
  },
})