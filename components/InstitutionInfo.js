import React, { useState,useEffect } from 'react';
import { View, Button, Text, StyleSheet, ScrollView,Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import axios from 'axios';

function InstitutionInfo({ route,navigation }) {
    const InstituteData = route['params']['HomeData']['data']
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
            <ScrollView style={{flex:1}}>
                <View style={{padding:20,backgroundColor:'#fff'}}>
                    <View>
                        <Image style={styles.logo} source={require('../assets/Institution/Mam_logoo.png')} />
                    </View>
                    <Text style={styles.textcss}>Institution Info.</Text>
                    <View style={styles.boxcss}>
                        <Text style={[styles.textcss,{fontSize:16,opacity:0.5}]}>Institute Name</Text>
                        <Text style={[styles.textcss,{fontSize:17}]}>{InstituteData.org[0]['name']}</Text>
                    </View>
                    <View style={[styles.boxcss,{height:110}]}>
                        <Text style={[styles.textcss,{fontSize:16,opacity:0.5}]}>Institute Location</Text>
                        <Text style={[styles.textcss,{fontSize:16}]}>Trichy - Channai Trunk Road Siruganur, Triruchirappalli, Tamil Nadu - 621 105</Text>
                    </View>
                    <View style={[styles.boxcss,{height:150}]}>
                        <View style={{paddingVertical:10}}>
                            <Text style={[styles.textcss,{fontSize:16,opacity:0.5}]}>Phone No.</Text>
                            <Text style={[styles.textcss,{fontSize:16}]}>{InstituteData.org[0]['phone_code']} {InstituteData.org[0]['phone_no']}</Text>
                        </View>
                        <Text style={[styles.textcss,{fontSize:16,opacity:0.5}]}>Email ID</Text>
                        <Text style={[styles.textcss,{fontSize:16}]}>{InstituteData.org[0]['email']}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <View style={[styles.compliantbox,{backgroundColor:'#EA5D5D'}]}>
                            <Text style={[styles.textcss,{fontSize:15,color:'#fff'}]}>Complaints</Text>
                        </View>
                        <View style={[styles.compliantbox,{backgroundColor:'#0BCCD8'}]}>
                            <Text style={[styles.textcss,{fontSize:15,color:'#fff'}]}>Give Feedback</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
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
        height:90,
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
  })