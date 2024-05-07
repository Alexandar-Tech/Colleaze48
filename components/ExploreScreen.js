import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image,ScrollView,ActivityIndicator,Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';  
import Calendar from './TimeTable/Calendar';
import { API_CIRCULAR_COLLEGE } from '../APILIST/ApiList';
import axios from 'axios';

export function ExploreScreen({route,navigation}) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Months are zero-based
  const day = today.getDate();

  const todayDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  const [selectedDate, setSelectedDate] = useState(todayDate);  
  const screenHeight = Dimensions.get('screen').height;
  const token = route['params']['HomeData']['data']['token']
  const org_id = route['params']['HomeData']['data']['org'][0]['id']
  const API_URL = API_CIRCULAR_COLLEGE

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.post(API_URL,{
          "date" : selectedDate,
          "org_id" : org_id
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
            setData(null);
            setLoading(false)
        });
    }, [selectedDate]);
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
                            <Text style={styles.headerText}>Circular/Announcements</Text>
                        </View> 
                        <View style={[styles.headpad,{opacity:0}]}>                        
                        </View>         
                    </View>
                    <Calendar onSelectDate={setSelectedDate} selected={selectedDate}/>
                </View>
                <ScrollView style={{flex:1}}>
                  <View style={{padding:20}}>
                    {
                      loading?(
                        <View>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>):(
                              <View>
                                {
                                  data?(
                                    <View>
                                    {
                                       data['data'].map((item,index)=>(
                                        <TouchableOpacity onPress={()=>navigation.navigate('CircularDetails',{
                                          IdVal : item.id,
                                          token:token
                                        })} key={item.id}>
                                          <View style={styles.boxcss}>
                                            <View style={{flexDirection:'row',justifyContent:'space-between',margin:10}}>
                                              <View>
                                                <Image style={styles.miclogo} source={require('../assets/profile/mic_circular.png')} />
                                              </View>
                                              <View style={{width:'70%'}}>
                                                <Text style={{fontSize:15,fontWeight:'600'}}>{item.subject}</Text>
                                                <View style={{flexDirection:'row',justifyContent:'space-around',top:10}}>
                                                  <Text style={{fontSize:10,fontWeight:'bold',color:'#1D2F59'}}>{item.date_formatted}</Text>
                                                  <Text style={{fontSize:10,fontWeight:'bold',color:'#329AD6',textDecorationLine:'underline',}}>View Details</Text>
                                                </View>
                                              </View>
                                            </View>
                                          </View>
                                        </TouchableOpacity>                                
                                       ))
                                    }
                                    </View>
                                  ):(
                                    <View style={{justifyContent:'center',alignItems:'center',flex:1,marginTop:screenHeight/3}}>
                                      <Text style={{fontSize:20,fontWeight:'bold',color:'red'}}>No Data Found</Text>                                    
                                  </View>
                                  )
                                }
                                </View>
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
  fittotext:{
    flexDirection:'row',
    justifyContent:'space-between',
},
headerPad:{
    height:230,
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    backgroundColor:'#1D2F59',
},
headpadCss:{
    flexDirection:'row',
    marginTop:60,
    justifyContent:'space-between',
    paddingHorizontal:10,
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
    fontSize:17,
    fontWeight:'bold',
    color:'#fff',
    top:10,
},
logo:{
    height:20,
    width:20
},
boxcss:{
  flex:1,
  width:'100%',
  backgroundColor:'#fff',
  margin:10,
  borderRadius:20,
  borderWidth:1,
  borderColor:'#0BCCD8',
  alignSelf:'center',
  paddingBottom:20
},
miclogo:{
  height:100,
  width:100,
  resizeMode:'contain'
},
});