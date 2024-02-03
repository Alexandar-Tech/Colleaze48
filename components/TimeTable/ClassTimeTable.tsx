import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity,StyleSheet,ScrollView,ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
import Calendar from './Calendar';
import axios from 'axios';
import { API_CLASSTIMETABLE,API_CLASSTIMETABLECOLLEGE } from '../../APILIST/ApiList';

const ClassTimeTable = ({route,navigation}) => {
    const screenHeight = Dimensions.get('screen').height;
    const ClassTimeTableData = route['params']['LoginData']['data']
    const token = ClassTimeTableData['token']
    const org_type = ClassTimeTableData['org'][0]['type']
    let section_id =  null
    let user_data ={}
    
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);


    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-based
    const day = today.getDate();

    const todayDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    const [selectedDate, setSelectedDate] = useState(todayDate);
    let strDate = new Date(selectedDate);
    let numDate = strDate.getDay()

    let API_URL = API_CLASSTIMETABLE
    if(org_type=='college'){
        API_URL = API_CLASSTIMETABLECOLLEGE;
        section_id = ClassTimeTableData['student_detail']['clg_section_id']
        user_data = {
            "clg_section_id" : section_id,
            "day" : numDate
        }
    }
    else{
        section_id = ClassTimeTableData['student_detail']['section_id']
        user_data ={
            "section_id" : section_id,
            "day" : numDate
        }
    }      

    useEffect(() => {
        axios.post(API_URL,user_data,
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

    }, [numDate]);

  return (
    <View style={{flex:1}}>
        <View style={styles.headerpad}>
            <View style={{flexDirection:'row',marginTop:60,paddingHorizontal:10,columnGap:60}}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <View style={styles.backpad}>
                        <Icon name="chevron-left" size={30}/>
                    </View>
                </TouchableOpacity>
                <View>
                    <Text style={{fontSize:20,fontWeight:'bold',color:'#fff',top:10}}>Class Time-Table</Text>
                </View>            
            </View>
            <Calendar onSelectDate={setSelectedDate} selected={selectedDate} />
        </View>
        <ScrollView style={{ flex: 1 }}>
            <View style={{padding:20}}>
                {
                    loading?(
                        <View>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                    ):(
                        <View>
                            {
                                <View>
                                    {
                                        data?(

                                           
                                                data['data'].map((item:any,index:any)=>(
                                                    <View key={index}>
                                                        
                                                        <View>
                                                            {
                                                                item.subject == null?(
                                                                    <View style={{flexDirection:'row',margin:10}}>
                                                                        <Text style={styles.textcss}>lunch</Text>
                                                                    </View>
                                                                ):(
                                                                    <TouchableOpacity onPress={()=>navigation.navigate('LectureNotes',{
                                                                        classData:item
                                                                    })}>
                                                                    <View style={styles.boxpad} >
                                                                        <View style={[styles.fittoText,{margin:10}]}>
                                                                            <Text style={styles.textcss}>{item.subject.name}</Text>
                                                                            <View style={{height:30,width:100,backgroundColor:'#1D2F59',borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                                                                                <Text style={{color:'#fff',fontWeight:'bold'}}>{item.start_time}-{item.end_time}</Text>
                                                                            </View>
                                                                        </View>
                                                                        <View style={{height:25,width:100,backgroundColor:'#fff',borderRadius:10,alignItems:'center',justifyContent:'center',borderWidth:1,marginLeft:10}}>
                                                                            <Text style={{fontWeight:'bold'}}>{item.teacher.user.user_detail.name}</Text>  
                                                                        </View>
                                                                        <View style={[styles.fittoText,{margin:10}]}>
                                                                            <Text style={{fontWeight:'bold'}}>unit 1: <Text style={{color:'#329AD6'}}>Grammer</Text></Text>
                                                                            <Text style={{fontWeight:'bold'}}>Topic _ <Text style={{color:'#329AD6'}}>Tense</Text></Text>
                                                                        </View>
                                                                        <View style={[styles.fittoText,{margin:10}]}>
                                                                            <View style={{height:40,width:'45%',backgroundColor:'#329AD6',borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                                                                                <Text style={{color:'#fff',fontWeight:'bold',fontSize:13}}>Lecture Notes</Text>
                                                                            </View>
                                                                            <View style={{height:40,width:'45%',backgroundColor:'#0BCCD8',borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                                                                                <Text style={{color:'#fff',fontWeight:'bold',textAlign:'center',fontSize:13}}>Refer Text Books and Videos</Text>
                                                                            </View>
                                                                        </View>
                                                                        
                                                                    </View>
                                                                    </TouchableOpacity>
                                                                )
                                                            }
                                                        </View>
                                                        
                                                    </View>
                                                ))
                                            
                                        ):(
                                            <View style={{alignItems:'center',marginTop:screenHeight/3}}>
                                                <Text style={{fontSize:20,fontWeight:'bold',color:'red'}}>No Data Found</Text>
                                            </View>
                                        )
                                    }
                                </View>
                            }                            
                        </View>
                    )
                }
                
            </View>
        </ScrollView>

    </View>

  );
};

export default ClassTimeTable;

const styles = StyleSheet.create({
    textcss:{
        fontSize:16,
        fontWeight:'bold',
        color:'#1D2F59',
        
    },
    headerpad:{
        height:220,
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
      boxpad:{
        flex:1,
        width:'100%',
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:'#0BCCD8',
        margin:10,
        alignSelf:'center',
        borderRadius:10
      },
      fittoText:{
        justifyContent:'space-between',
        flexDirection:'row'
      }
})
