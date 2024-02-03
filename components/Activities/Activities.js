import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';
import ComingSoon from '../ComingSoon/ComingSoon';

export function Activites({navigation}) {
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
                                <Text style={styles.headerText}>My Activites</Text>
                            </View>
                            <View style={[styles.headpad,{opacity:0}]}></View>
                        </View>
                    </View>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{padding:20}}>
                            <View style={{justifyContent:'center',alignItems:'center',marginTop:200}}>
                                <ComingSoon />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </LinearGradient>
        </>
    )
}

const styles = StyleSheet.create({
    boxpad:{
        top:20,
        height:450,
        width:'90%',
        backgroundColor:'#fff',
        alignSelf:'center',
        borderRadius:20
    },
    textcss:{
        padding:10,
        fontSize:15,
        color:'black',
        fontWeight:"bold"
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
})