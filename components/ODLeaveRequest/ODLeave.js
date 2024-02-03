import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,StyleSheet,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconMA from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import DropdownComponent from '../Attendance/DropDownComponent';
import CalendarOD from './CalendersOD';
import ComingSoon from '../ComingSoon/ComingSoon';


const ODRequest = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  return (
    <View style={{flex:1}}>
        <LinearGradient
            colors={['skyblue', 'white']}
            style={{flex:1}}>
                <View style={styles.headerpad}>
                    <View style={{flexDirection:'row',marginTop:60,paddingHorizontal:10,justifyContent:'space-between'}}>
                        <TouchableOpacity onPress={()=>navigation.goBack()}>
                            <View style={styles.backpad}>
                                <Icon name="chevron-left" size={30}/>
                            </View>
                        </TouchableOpacity>
                        <View>
                            <Text style={{fontSize:20,fontWeight:'bold',color:'#fff',top:10}}>On Duty/Leave Request</Text>
                        </View> 
                        <View></View>           
                    </View>
                </View>                
        <View style={{height:10}}></View>
        <ScrollView style={{ flex: 1 }}>
            <View style={{padding:20}}>
                {
                    loading?(
                        <View style={{justifyContent:'center',alignItems:'center',marginTop:200}}>
                            <ComingSoon />
                        </View>
                    ):(
                        <View>
                            <DropdownComponent name={'Select Leave type'}/>
                            <View style={{marginTop:10,height:400,width:'100%',backgroundColor:'#fff',borderRadius:20}}>
                                <View style={{flexDirection:'row',justifyContent:'space-between',margin:10}}>
                                    <IconMA name="calendar-clock" size={30}/>
                                    <Text style={styles.textcss}>Select Date</Text>
                                    <View style={{height:30,width:100,borderRadius:10,borderWidth:1,alignItems:'center',justifyContent:'center'}}>
                                        <Text>Dec 21</Text>   
                                    </View>

                                </View>
                                <CalendarOD />
                            </View>
                            <View style={styles.headpad}>
                                <Text style={{fontWeight:'bold'}}>Upload Proof</Text>
                                <View style={[styles.headpad,{backgroundColor:'#1D2F59',height:30,width:100}]}>
                                    <Text style={{color:'#fff',fontWeight:'bold'}}>Upload</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={()=>navigation.navigate('TrackStatus')}>
                                <View style={styles.SubmitBtn}>
                                    <Text style={{color:'#fff',fontWeight:'bold',fontSize:18}}>Submit</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                }
                </View>
        </ScrollView>
      
      </LinearGradient>
    </View>
  );
};

export default ODRequest;

const styles = StyleSheet.create({
    SubmitBtn:{
        height:50,
        width:'90%',
        backgroundColor:'#0BCCD8',
        margin:30,
        alignSelf:'center',
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'

    },
    headpad:{
        height:150,
        width:'100%',
        backgroundColor:'#fff',
        alignSelf:'center',
        borderRadius:20,
        margin:10,   
        alignItems:'center',
        justifyContent:'center'
    },
    textcss:{
        fontSize:18,
        fontWeight:'bold',
        color:'#1D2F59'
    },
    headerpad:{
        height:150,
        borderRadius:30,
        backgroundColor:'#1D2F59',
      },
      backpad:{
        height:50,
        width:50,
        left:10,
        borderRadius:10,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center'
      },
      RadioCss:{
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent:'space-between'
      },
      RadioTextCss:{
        fontSize:15,
        fontWeight:'bold',
        color:'#1D2F59'
      },
      TextInput: {
        height: 40,
        flex: 1,
        paddingRight: 20,
        textAlignVertical:'top'
      },
})