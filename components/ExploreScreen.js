import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image,ScrollView,ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';  
import Calendar from './TimeTable/Calendar';
import { API_CIRCULAR_COLLEGE } from '../APILIST/ApiList';
import axios from 'axios';

export function ExploreScreen({route,navigation}) {
  const [selectedDate, setSelectedDate] = useState(null);
  const token = route['params']['HomeData']['data']['token']
  const API_URL = API_CIRCULAR_COLLEGE

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.post(API_URL,{
          "date" : "2024-01-31",
          "org_id" : 151
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
                            <Text style={styles.headerText}>Circular/Announcements</Text>
                        </View>
                        <TouchableOpacity onPress={()=>navigation.goBack()}>
                            <View style={styles.headpad}>
                            <Image style={styles.logo} source={require('../assets/EducationalLoan/Vector.png')} />
                            </View>
                        </TouchableOpacity>           
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
                                            <View style={{flexDirection:'row',justifyContent:'space-between',margin:20}}>
                                              <View>
                                                <Image style={styles.miclogo} source={require('../assets/profile/mic_circular.png')} />
                                              </View>
                                              <View style={{width:'70%'}}>
                                                <Text style={{fontSize:16,fontWeight:'bold'}}>{item.subject}</Text>
                                                <View style={{flexDirection:'row',justifyContent:'space-between',top:50}}>
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
                              

                                  ):null
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
    borderRadius:20,
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
  height:150,
  width:'100%',
  backgroundColor:'#fff',
  margin:10,
  borderRadius:20,
  borderWidth:1,
  borderColor:'#0BCCD8',
  alignSelf:'center'
},
miclogo:{
  height:100,
  width:100,
  resizeMode:'contain'
},
});