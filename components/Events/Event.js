import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ScrollView,ActivityIndicator,Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import { API_EVENT } from '../../APILIST/ApiList';

export function Event({route,navigation}) {
    const token = route['params']['LoginData']['data']['token']
    const org_id = route['params']['LoginData']['data']['org'][0]['id']
    const API_URL = API_EVENT

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.post(API_URL,{
            'org_id':org_id
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
                                <Text style={styles.headerText}>Event</Text>
                            </View>
                            <View style={[styles.headpad,{opacity:0}]}></View>
                        </View>
                    </View>
                    <ScrollView style={{flex:1}}>
                        <View style={{padding:20}}>
                            {
                                loading?(
                                    <View>
                                        {
                                            data?(<View style={{justifyContent:'center',alignItems:'center',flex:1,marginTop:200}}>
                                                <Text style={{fontSize:18,fontWeight:'bold',color:'red'}}>{data.msg}</Text>
                                                </View>):<ActivityIndicator size="large" color="#0000ff" />
                                        }
                                        
                                    </View>
                                ):(<View>
                                    {
                                        data['data'].map((item,index)=>(
                                            <View key={item.id}>
                                                <View style={{flexDirection:'row',alignSelf:'center'}}>
                                                    <View style={{width:'100%',backgroundColor:'#fff',borderRadius:20,margin:10}}>
                                                    <Image source={require('../../assets/side_menu/Banner.png')} style={{height:80,width:'95%',margin:10,alignSelf:'center',opacity:0.5}}  />
                                                    <View style={{flexDirection:'row'}}>
                                                        <View style={{height:30,width:150,backgroundColor:'#1D2F59',borderRadius:10,alignItems:'center',justifyContent:'center',margin:5}}>
                                                            <Text style={{fontSize:15,fontWeight:'bold',color:'#fff'}}>{item.event_date_formatted}</Text>
                                                        </View>
                                                        {index == 0?(
                                                            <View style={{height:30,width:100,backgroundColor:'#FFC700',borderRadius:10,alignItems:'center',justifyContent:'center',margin:5}}>
                                                                <Text style={{fontSize:15,fontWeight:'bold',color:'#1D2F59'}}>Latest</Text>
                                                            </View>):null
                                                        }
                                                    </View>
                                                        
                                                        <Text style={{fontSize:13,fontWeight:'bold',color:'#1D2F59',padding:5}}>{item.event_name}</Text>
                                                        <Text style={{fontSize:13,fontWeight:'bold',color:'#1D2F59',padding:5}}>{item.description}</Text>
                                                    </View>                                                    
                                                </View>                                                
                                            </View>
                                        ))
                                    }
                                    
                                    </View>)
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
      fontSize:18,
      fontWeight:'bold',
      color:'#fff',
      top:10,
      right:20
  },
})