import React, { useState,useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity,StyleSheet,ScrollView,ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
import DropdownComponent from '../Attendance/DropDownComponent';
import axios from 'axios';
import { API_EXAMTIMETABLE,API_EXAMTIMETABLECOLLEGE } from '../../APILIST/ApiList';

const ExamTimeTable = ({route,navigation}) => {
    const ExamTimeTableData = route['params']['LoginData']['data']
    const token = ExamTimeTableData['token']
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const org_type = ExamTimeTableData['org'][0]['type']
    let section_id =  null
    let user_data ={}
    let API_URL = API_EXAMTIMETABLE
    if(org_type=='college'){
        API_URL = API_EXAMTIMETABLECOLLEGE;
        section_id = ExamTimeTableData['student_detail']['clg_section_id']
        user_data = {
            "clg_section_id" : section_id,
        }
    }
    else{
      section_id = ExamTimeTableData['student_detail']['section_id']
      const org_id = ExamTimeTableData['org'][0]['id']
      const standard_d =  ExamTimeTableData['student_detail']['standard_id']
       user_data ={
        "org_id" : org_id ,
        "standard_id" : standard_d,   
        "section_id" : section_id
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
    }, []);

  return (
    <View style={{flex:1}}>
        <View style={styles.headerpad}>
            <View style={{flexDirection:'row',marginTop:60,paddingHorizontal:10,columnGap:90}}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <View style={styles.backpad}>
                        <Icon name="chevron-left" size={30}/>
                    </View>
                </TouchableOpacity>
                <View>
                    <Text style={{fontSize:20,fontWeight:'bold',color:'#fff',top:10}}>Exams</Text>
                </View>            
            </View>
            <View style={{margin:20}}>
                <DropdownComponent name={'Select Semester'}/>
            </View>
            
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
                                data['data'].map((item:any,index:any)=>(
                                    <View style={styles.boxpad} key={index}>
                                        <View style={{flexDirection:'row',justifyContent:'space-between',margin:10}}>
                                            <Text style={{fontWeight:'bold',fontSize:16,color:'#1D2F59'}}>{item.subject.name}</Text>
                                            <View>
                                                <Text style={{fontWeight:'bold',fontSize:16,color:'#1D2F59'}}>4215</Text>
                                                <Text style={{fontWeight:'bold',fontSize:13,color:'#1D2F59',opacity:0.7}}>Room No</Text>
                                            </View>
                                        </View>
                                        <Text style={{fontWeight:'bold',fontSize:17,color:'#1D2F59',padding:10}}>
                                            {item.exam_date_time_app_format}
                                        </Text>
                                        <View style={{height:40,width:'90%',backgroundColor:'#CDF5F7',alignSelf:'center',borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                                            <Text style={{fontWeight:'bold',fontSize:14,color:'#1D2F59',padding:10}}>{item.time_left}</Text>
                                        </View>
                                    </View>
                                ))
                            }
                            
                        </View>
                    )
                }
            </View>

        </ScrollView>

    </View>

  );
};

export default ExamTimeTable;

const styles = StyleSheet.create({
    textcss:{
        fontSize:25,
        fontWeight:'bold',
        color:'#1D2F59'
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
        height:160,
        width:'90%',
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:'#0BCCD8',
        margin:10,
        alignSelf:'center',
        borderRadius:10
      }
})
