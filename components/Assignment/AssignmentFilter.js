import React, { useEffect, useState } from 'react';
import { Image,View, ScrollView, Text,TouchableOpacity,ActivityIndicator,StyleSheet } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Entypo';

function AssignmentFilter({ route,navigation }) {

    return(
        <View style={{ flex: 1 }}>
            <View style={styles.headerPad}>
            <View style={styles.headpadCss}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                <View style={styles.headpad}>
                    <Icon name="chevron-left" size={30}/>
                </View>
                </TouchableOpacity>
                <View>
                    <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold',color:'#fff'}}>Assignment</Text>
                </View>       
            </View> 
        </View>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ padding: 20 }}>
                </View>
            </ScrollView>
        </View>
    )
}
export default AssignmentFilter;

const styles = StyleSheet.create({
    fittotext:{
      flexDirection:'row',
      justifyContent:'space-between',
  },
  headerPad:{
      height:200,
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
  });