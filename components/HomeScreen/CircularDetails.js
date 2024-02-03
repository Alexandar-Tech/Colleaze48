import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image,ScrollView,ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';
import { API_CIRCULAR_DETAIL_COLLEGE } from '../../APILIST/ApiList';
import axios from 'axios';

export function CircularDetails({route,navigation}) {
    const IdVal = route['params']['IdVal']
    const token = route['params']['token']
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.post(API_CIRCULAR_DETAIL_COLLEGE,{
            "circular_id" : IdVal
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
                                <Text style={styles.headerText}>Circular Details</Text>
                            </View>
                            <View></View>
                        </View>
                    </View>
                    <ScrollView style={{flex:1}}>
                        <View style={{padding:20}}>
                            {
                                loading?(
                                    <View>
                                        <ActivityIndicator size="large" color="#0000ff" />
                                    </View>
                                ):(
                                    
                                    <View>
                                        <View style={styles.fittotext}>
                                            <Text style={styles.textcss}>CIRCULAR- {data.data.reference_no}</Text>
                                            <Text style={styles.textcss}>Date: - {data.data.detail_date_formatted}</Text>
                                        </View>
                                        <View style={{minHeight:200,flex:1,width:'95%',backgroundColor:'#fff',borderRadius:20,borderWidth:1,borderColor:'#0BCCD8',padding:20,margin:10}}>
                                            <Text style={{fontSize:15,fontWeight:'bold',color:'#1D2F59',lineHeight: 25}}>Sub:{data.data.subject}</Text>
                                            <Text style={{fontSize:12,fontWeight:'bold',color:'#1D2F59',lineHeight: 25}}>{data.data.description}</Text>

                                        </View>
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
    textcss:{
        fontSize:15,
        color:'black',
        fontWeight:"bold"
    },
    fittotext:{
      flexDirection:'row',
      justifyContent:'space-between',
  },
  headerPad:{
      height:150,
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
})