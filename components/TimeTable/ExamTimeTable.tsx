import React, { useState,useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity,StyleSheet,ScrollView,ActivityIndicator,Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { API_EXAMTIMETABLE,API_EXAMTIMETABLECOLLEGE,API_GETSEMESTER } from '../../APILIST/ApiList';
import { Dropdown } from 'react-native-element-dropdown';

const screenHeight = Dimensions.get('screen').height;

const ExamTimeTable = ({route,navigation}) => {
    const [value, setValue] = useState(1);
    const ExamTimeTableData = route['params']['LoginData']['data']
    const token = ExamTimeTableData['token']
    const [data, setData] = useState(null);
    const [semData, setSemData] = useState(null);
    const [loading, setLoading] = useState(true);

    const DropdownComponent = (valueData:any) => {
        
        const [isFocus, setIsFocus] = useState(false);
        const dropData = valueData.dropdownData['data']
        const name = valueData.name      
        return (
          <View style={styles.container}>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={dropData}
              search
              maxHeight={300}
              labelField= 'name'
              valueField= 'id'
              placeholder={!isFocus ? name : '...'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.id);
                setIsFocus(false);
              }}
            />      
          </View>
        );
      };

    

    const org_type = ExamTimeTableData['org'][0]['type']
    let section_id =  null
    const user_id = ExamTimeTableData['user_detail']['user_id']
    let user_data ={}
    let API_URL = API_EXAMTIMETABLE
    if(org_type=='college'){
        API_URL = API_EXAMTIMETABLECOLLEGE;
        section_id = ExamTimeTableData['student_detail']['clg_section_id']
        user_data = {
            "clg_section_id" : section_id,
            "semester_id" : value
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
        // Fetch data when the component mounts
        axios.post(API_GETSEMESTER,{
            "user_id" : user_id,
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => {
            setSemData(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

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
            setData(error.response.data);
            setLoading(false)
        });
    }, [value]);

  return (
    <View style={{flex:1}}>
        <LinearGradient
                    colors={['skyblue', 'white']}
                    style={{flex:1}}>
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
            {
                semData?(
                    <View style={{margin:20}}>
                        <DropdownComponent name={'Select Semester'} dropdownData={semData}/>
                    </View>
                ):null
            }
            
            
        </View>       
        
        <ScrollView style={{ flex: 1 }}>
            <View style={{padding:20}}>
            {
                    data == null?(
                        <View>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                    ):(
                        data['success'] == 1?(
                            <View>
                            {
                                data['data'].map((item:any,index:any)=>(
                                    <View style={styles.boxpad} key={index}>
                                        <View style={{flexDirection:'row',justifyContent:'space-between',margin:10}}>
                                            <Text style={{fontWeight:'bold',fontSize:16,color:'#1D2F59',width:"80%"}}>{item.subject.name}</Text>
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
                        ):(
                            <View style={{alignItems:'center',marginTop:screenHeight/3.5}}>
                                <Text style={{fontSize:20,fontWeight:'bold',color:'red'}}>{data.msg}</Text>                                    
                            </View>
                        )
                        
                    )
                }
            </View>
            </ScrollView>
            </LinearGradient>

        

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
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
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
        width:'100%',
        backgroundColor:'#fff',
        margin:10,
        alignSelf:'center',
        borderRadius:10
      },
      container: {
        backgroundColor: 'white',
        borderRadius:10,
        padding:4,
        borderColor:'#0BCCD8',
        borderWidth:1
      },
      dropdown: {
        height: 40,
        paddingHorizontal: 8,
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        zIndex: 999,
        fontSize: 14,
        fontWeight:'bold'
      },
      placeholderStyle: {
        fontSize: 16,
        fontWeight:'bold'
      },
      selectedTextStyle: {
        fontSize: 16,
        fontWeight:'bold'
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
})
