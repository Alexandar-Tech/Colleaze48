import React, { useState,useEffect } from 'react';
import { View, Button, Text, StyleSheet, ScrollView,Image, TouchableOpacity,ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import { API_INSTITUTE } from '../APILIST/ApiList';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';


function InstitutionInfo({ route,navigation }) {
    const InstituteData = route['params']['HomeData']['data']
    const org_id = InstituteData['org'][0]['id']
    const token = InstituteData['token']
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [fontsLoaded] = useFonts({
        'circular': require('../assets/fonts/circular-std-medium-500.ttf'),
      });

    useEffect(() => {
        axios.post(API_INSTITUTE,{
          "institute_id" : org_id
        },
        {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => {
            setData(response.data);
            setLoading(false)
        })
        .catch(error => {
            setData(error.response.data);
            
        });
    }, []);


    return (
        <View style={{flex:1,backgroundColor:'#fff'}}>
                <View style={styles.headerPad}>
                    <View style={styles.headpadCss}>
                        <TouchableOpacity onPress={()=>navigation.goBack()}>
                            <View style={styles.headpad}>
                                <Icon name="chevron-left" size={30}/>
                            </View>
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.headerText}>Institute Information</Text>
                        </View>
                        <View>
                        </View>           
                    </View>
                </View>
                {
                    loading?(
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        {data?<Text style={[styles.textcss,{fontSize:16,color:'red'}]}>{data.msg}</Text>:<ActivityIndicator size="large" color="#0000ff" />}
                    </View>
                    ):(
                        <View style={{flex:1}}>
                            
                            <ScrollView style={{flex:1}}>
                                <View style={{padding:20,backgroundColor:'#fff'}}>
                                    <View>
                                        <Image style={styles.logo} source={require('../assets/Institution/Mam_logoo.png')} />
                                    </View>
                                    <Text style={[fontsLoaded?[styles.fontfamilyCss,{fontSize:20}]:styles.textcss]}>Institution Info.</Text>
                                    <View style={styles.boxcss}>
                                        <Text style={fontsLoaded?[styles.fontfamilyCss,{fontSize:14}]:[styles.textcss,{fontSize:16,opacity:0.5}]}>Institute Name</Text>
                                        <Text style={fontsLoaded?[styles.fontfamilyCss,{fontSize:16}]:[styles.textcss,{fontSize:17}]}>{data.data['name']}</Text>
                                    </View>
                                    <View style={[styles.boxcss,{flex:1}]}>
                                        <Text style={fontsLoaded?[styles.fontfamilyCss,{fontSize:14}]:[styles.textcss,{fontSize:16,opacity:0.5}]}>Institute Location</Text>
                                        <Text style={fontsLoaded?[styles.fontfamilyCss,{fontSize:16}]:[styles.textcss,{fontSize:16}]}>{data.data.user_detail.address}</Text>
                                    </View>
                                    <View style={[styles.boxcss,{flex:1}]}>
                                        <View style={{paddingVertical:10}}>
                                            <Text style={fontsLoaded?[styles.fontfamilyCss,{fontSize:14}]:[styles.textcss,{fontSize:16,opacity:0.5}]}>Phone No.</Text>
                                            {data.data.phone?<Text style={fontsLoaded?[styles.fontfamilyCss,{fontSize:17}]:[styles.textcss,{fontSize:15}]}>{data.data.phone}</Text>:<Text style={fontsLoaded?[styles.fontfamilyCss,{fontSize:17}]:[styles.textcss,{fontSize:15}]}>Number Not Found</Text>}
                                        </View>
                                        <Text style={fontsLoaded?[styles.fontfamilyCss,{fontSize:14}]:[styles.textcss,{fontSize:16,opacity:0.5}]}>Email ID</Text>
                                        <Text style={fontsLoaded?[styles.fontfamilyCss,{fontSize:17}]:[styles.textcss,{fontSize:16}]}>{data.data.email}</Text>
                                    </View>
                                    {/* <View style={{flexDirection:'row'}}>
                                        <View style={[styles.compliantbox,{backgroundColor:'#EA5D5D'}]}>
                                            <Text style={[styles.textcss,{fontSize:15,color:'#fff'}]}>Complaints</Text>
                                        </View>
                                        <View style={[styles.compliantbox,{backgroundColor:'#0BCCD8'}]}>
                                            <Text style={[styles.textcss,{fontSize:15,color:'#fff'}]}>Give Feedback</Text>
                                        </View>
                                    </View> */}
                                </View>
                            </ScrollView>
                    </View>

                    )
                }
    </View>
    );
  }

  export default InstitutionInfo;


  const styles = StyleSheet.create({
    compliantbox:{
        height:50,
        width:'48%',
        borderRadius:10,
        margin:5,
        justifyContent:'center',
        alignItems:'center'        
    },
    boxcss:{
        minHeight:90,
        width:'100%',
        borderWidth:1,
        borderColor:'#0BCCD8',
        borderRadius:20,
        margin:10,
        alignSelf:'center',
        padding:20
    },
    textcss:{
        fontSize:22,
        fontWeight:'bold',
        color:'#1D2F59'
    },
    headerPad:{
        height:150,
       borderBottomLeftRadius:20,
       borderBottomRightRadius:20,
       backgroundColor:'#1D2F59',
    },
    headpadCss:{
        flexDirection:'row',
        marginTop:60,
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
        fontSize:20,
        fontWeight:'bold',
        color:'#fff',
        top:10,
    },
    logo:{
        height:100,
        width:200,
        resizeMode:'contain'
    },
    fontfamilyCss:{
        fontFamily:'circular',
        textAlign:'justify',
        margin:5,
        color:'#1D2F59'
    },
  })