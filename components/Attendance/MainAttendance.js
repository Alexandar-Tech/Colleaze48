import React, { useEffect, useState,useRef } from 'react';
import { View,StyleSheet,TouchableOpacity,Text,ScrollView,ActivityIndicator,Dimensions,} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import Modal from "react-native-modal";
import {Calendar} from 'react-native-calendars';
import { LinearGradient } from 'expo-linear-gradient';
import { API_ATTENDANCEMONTH,API_ATTENDANCEMONTHWISEOUNT,API_GETACADEMICYEAR,API_MONTHWISECOUNTCOLLEGE,
  API_ATTENDANCEMONTHWISECOLLEGE,API_ATTENDANCEPERIODCOLLEGE,API_ATTENDANCEPERIOD } from '../../APILIST/ApiList';

const screenHeight = Dimensions.get('screen').height;

function MainAttendance({ route,navigation }) {
  const MainAttendanceData = route['params']['LoginData']['data']
    const token = MainAttendanceData['token']
    const user_id = MainAttendanceData['user_detail']['user_id']
    const org_type = MainAttendanceData['org'][0]['type']

    const API_URL = API_GETACADEMICYEAR
    let API_ENDPOINT = API_ATTENDANCEMONTHWISEOUNT
    let API_ATTENDANCE = API_ATTENDANCEMONTH  
    let API_PERIOD = API_ATTENDANCEPERIOD

    if(org_type=='college'){
        API_ENDPOINT = API_MONTHWISECOUNTCOLLEGE
        API_ATTENDANCE = API_ATTENDANCEMONTHWISECOLLEGE
        API_PERIOD = API_ATTENDANCEPERIODCOLLEGE
    }

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [secondLoading, setSecondLoading] = useState(true);
    const [secondData, setSecondData] = useState(null);
    const [value, setValue] = useState(null);
    const [valueID, setValueID] = useState(4);
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [stuPer,setStuPer] = useState(0);
    const [selectedDate, setSelectedDate] = useState('2024-1-01');
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [attendancePeriod,setAttendancePeriod] = useState(null);
    const [markedDates, setMarkedDates] = useState({
    });

    const AttendanceToggle = async (day) =>{
      setIsVisibleModal(true)

      const resp = await fetch(API_ATTENDANCEPERIODCOLLEGE,{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({    
        "user_id" : user_id,
        "attendance_date" : day.dateString 
        }),
  
      })    
      const response = await resp.json();
      setAttendancePeriod(response);
     }


    const toggleModal = (item) => {
      const Month = {'Jan':'01','Feb':'02','Mar':'03','Apr':'04','May':'05','Jun':'06','Jul':'07','Aug':'08','Sep':'09','Oct':'10','Nov':'11','Dec':'12'}
      setIsVisible(!isVisible);
      setSelectedMonth(item['name'])
      let curr_month = '2024-'+Month[item['name']]+'-1'
      let month_detail = '2024-'+Month[item['name']]
      setSelectedDate(curr_month)
      axios.post(API_ATTENDANCE,{
        "user_id" : user_id,
        "month" : month_detail
      },{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
      })
      .then(response => { 
        let val_data = response.data
        let length_val_data = val_data['data']['absent']
        let length_val_data_leave = val_data['data']['leave']
        // let length_val_data_present = val_data['data']['present']
        let markdict = {}
        let valZero = null
        for(let i=1;i<=31;i++){       
          valZero = ('0' + i).slice(-2)
          if(length_val_data.includes(i)){
            markdict['2024-'+Month[item['name']]+'-'+valZero] = { selected: true, marked: true, selectedColor: '#EA5D5D' }     
          }
          else if(length_val_data_leave.includes(i)){ 
            markdict['2024-'+Month[item['name']]+'-'+valZero] = { selected: true, marked: true, selectedColor: '#329AD6' }
          }
          else{
            markdict['2024-'+Month[item['name']]+'-'+valZero] = { selected: true, marked: true, selectedColor: '#0BCCD8' }
          }
        } 
        setMarkedDates(markdict)     
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      }); 
    };
    
    const DropdownComponent = (valueData) => {        
        const [isFocus, setIsFocus] = useState(false);
        let name = valueData.name
        const dropData = valueData.dropdownData['data']
        let label_name = "academic_year"
            
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
              labelField= {label_name}
              valueField={label_name}
              placeholder={!isFocus ? name : '...'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.academic_year);
                setValueID(item.id)
                setIsFocus(false);
              }}
            />            
          </View>
        );
      };  

    
        useEffect(() => {
            // Fetch data when the component mounts
            axios.post(API_URL)
            .then(response => {
                setData(response.data);           
                setLoading(false)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        }, []);
    
        useEffect(() => {

              axios.post(API_ENDPOINT,{
                "user_id" : user_id,
                "academic_year_id" : valueID
              },{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                  },
              })
                .then(response => {
                  setSecondData(response.data);
                  setStuPer(response.data.present_percentage);
                  setSecondLoading(false)
                })
                .catch(error => {
                  setSecondLoading(true)
                  setSecondData(error.response.data);
                  setStuPer(0)
                });
            
          }, [valueID]);
  return (
    
    <View style={{ flex: 1 }}> 
        <Modal
            isVisible={isVisible}
            style={styles.modelcontainer}
            onBackdropPress={() => setIsVisible(false)}
            swipeDirection={['down']}
            onSwipeComplete={() => setIsVisible(false)}
            >
              <View style={styles.modelView}>
                <View style={styles.fittocontent}>
                  <Text style={{fontSize:20,color:'#1D2F59',fontWeight:'bold'}}>Attendance</Text>
                  <View style={{height:30,width:100,borderWidth:1,borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontSize:15,color:'#1D2F59',fontWeight:'bold'}}>{selectedMonth}</Text>
                  </View>
                </View>
                <View style={{}}>
                <Calendar
                        onDayPress={(day) => 
                          AttendanceToggle(day)
                        } 
                        current={selectedDate}                     
                        markedDates={markedDates}
                />
                </View>                
              </View>
        </Modal>
        <Modal
            isVisible={isVisibleModal}
            style={{flex:1}}
            onBackdropPress={() => setIsVisibleModal(false)}
            >
              <View style={styles.modelViewattendance}>
                <LinearGradient
                    colors={['skyblue', 'white']}
                    style={{flex:1}}>
                  <View style={{height:120,backgroundColor:'#1D2F59',borderBottomLeftRadius:20,borderBottomRightRadius:20}}>
                    <View style={{flexDirection:'row',marginTop:30,paddingHorizontal:10,justifyContent:'space-between'}}>
                        <TouchableOpacity onPress={() => setIsVisibleModal(false)}>
                        <View style={styles.headpad}>
                            <Icon name="chevron-left" size={30}/>
                        </View>
                        </TouchableOpacity>
                        <View>
                          <Text style={{fontSize:20,fontWeight:'bold',color:'#fff',top:10}}>Attendance</Text>
                        </View>
                        <View style={[styles.headpad,{opacity:0}]}></View>
                      </View>
                  </View>
                  <ScrollView style={{ flex: 1 }}>
                      <View style={{ padding: 20 }}>
                        {
                          attendancePeriod?(
                            <View>
                              {
                                attendancePeriod.data?(
                                  <View>
                                    <View style={{width:'100%',flex:1,backgroundColor:'#fff',borderRadius:10}}>
                                      <Text style={{padding:20,fontSize:18,fontWeight:'bold',color:'#1D2F59'}}>Morning</Text>
                                      {
                                        attendancePeriod.data.morning.map((item,index)=>(
                                            <View style={[styles.smallBox,item.type=='absent'?{backgroundColor:"#EA5D5D"}:null]} key={index}>
                                              <Text style={styles.fontCss}>{item.time}</Text>
                                            </View>
                                        ))
                                      }
                                    
                                      <Text style={{padding:20,fontSize:18,fontWeight:'bold',color:'#1D2F59'}}>Afternoon</Text>
                                      {
                                        attendancePeriod.data.afternoon.map((item,index)=>(
                                            <View style={[styles.smallBox,item.type=='absent'?{backgroundColor:"#EA5D5D"}:null]} key={index}>
                                              <Text style={styles.fontCss}>{item.time}</Text>
                                            </View>                                            
                                        ))
                                      }
                                      <View style={styles.fittocontent}>
                                        <Text style={{fontWeight:'bold',color:'#1D2F59'}}>Present</Text>
                                        <Text style={{fontWeight:'bold',color:'#1D2F59'}}>Absent</Text>
                                        <Text style={{fontWeight:'bold',color:'#1D2F59'}}>Leave</Text>
                                        <Text style={{fontWeight:'bold',color:'#1D2F59'}}>On Duty</Text>
                                      </View>
                                      <View style={styles.fittocontent}>
                                        <View style={{height:30,width:'20%',backgroundColor:'#0BCCD8',borderRadius:10,}}>                              
                                        </View>
                                        <View style={{height:30,width:'20%',backgroundColor:'#EA5D5D',borderRadius:10,}}>                              
                                        </View>
                                        <View style={{height:30,width:'20%',backgroundColor:'#329AD6',borderRadius:10,}}>                              
                                        </View>
                                        <View style={{height:30,width:'20%',backgroundColor:'#FFB800',borderRadius:10,}}>                              
                                        </View>                            
                                      </View>                                            
                                    </View>
                                  </View>

                                ):(<View style={{justifyContent:'center',alignItems:'center',marginTop:screenHeight/3}}>
                                <Text style={{fontSize:20,fontWeight:'bold',color:'red'}}>{attendancePeriod.msg}</Text>
                                </View>)
                              }                              
                            </View>
                          ):null
                        }
                        
                      </View>
                  </ScrollView>
                  </LinearGradient>
              </View>
        </Modal>     
        {
            loading?(
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
            ):(
              <View style={{ flex: 1 }}>
                  <View style={styles.headerpad}>
                      <View style={{flexDirection:'row',marginTop:60,justifyContent:'space-between',paddingHorizontal:10}}>
                          <TouchableOpacity onPress={()=>navigation.goBack()}>
                          <View style={[styles.headpad]}>
                              <Icon name="chevron-left" size={30}/>
                          </View>
                          </TouchableOpacity>
                          <View>
                            <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold',color:'#fff'}}>Attendance</Text>
                          </View>
                          <View style={[styles.headpad]}>
                            <Text style={{fontSize:13,fontWeight:'bold'}}>{stuPer} %</Text>
                          </View>
                      </View>
                      {
                        data.data.map((item,index)=>(
                          <View key={index}>
                            {
                              item.is_current_year == 'yes'?(
                                <View style={{margin:20,width:'90%',top:20}}>
                                    <DropdownComponent name={item.academic_year} dropdownData={data}/>
                                </View>
                              ):null
                            }
                            </View>
                        ))
                      }
                                  
                  </View>
                  <ScrollView style={{ flex: 1 }}>
                    <View style={{ padding: 20 }}>
                      {
                        !secondLoading?(
                        <View >
                                <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                                    <Text></Text>
                                    <Text style={styles.textcss}>Present</Text>
                                    <Text style={styles.textcss}>Absent</Text>
                                    <Text style={styles.textcss}>Leave</Text>
                                    <Text></Text>
                                </View>
                                {secondData['data'].map((item,index) => (
                                  <TouchableOpacity key={index} onPress={()=>toggleModal(item)}>
                                    <View style={styles.headereLabelbox} key={index}>
                                        <Text style={[styles.textcss,{left:20,width:30}]}>{item.name}</Text>
                                        <View style={styles.box}>
                                            <Text style={[styles.textcss,{color:'#0BCCD8'}]}>{item.Present}</Text>
                                        </View>
                                        <View style={[styles.box,{backgroundColor:'#FFEEEE'}]}>
                                            <Text style={[styles.textcss,{color:'#EA5D5D'}]}>{item.Absent}</Text>
                                        </View>
                                        <View style={styles.box}>
                                            <Text style={[styles.textcss,{color:'#329AD6'}]}>{item.Leave}</Text>
                                        </View>
                                        <View style={[styles.box,{backgroundColor:'#fff'}]}>
                                            <Icon name="chevron-right" size={20}/>
                                        </View>                                                                            
                                    </View>
                                  </TouchableOpacity>
                                
                                ))}
                                <View style={styles.submitBtn}>
                                    <Text style={[styles.textcss,{color:'#fff'}]}>Apply for Leave</Text>
                                </View>                          
                        </View>
                          ):(
                            <View style={{justifyContent:'center',alignItems:'center',flex:1,marginTop:screenHeight/3}}>
                                {secondData?<Text style={{fontSize:20,fontWeight:'bold',color:'red'}}>{secondData.msg}</Text>:<ActivityIndicator size="large" color="#0000ff" />}
                            </View>
                          )
                      }
                    </View>
                
                  </ScrollView>
              </View>
              
            )
        }
    </View>
  );
}

export default MainAttendance

const styles = StyleSheet.create({
    headerpad:{
        height:180,
        backgroundColor:'#1D2F59',
        borderBottomRightRadius:20,
        borderBottomLeftRadius:20
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
        textcss:{
            fontSize:15,
            fontWeight:'bold'
        },  
        box:{
            width:40,
            height:40,
            backgroundColor:'#CEF5F7',
            justifyContent:'center',
            alignItems:'center',
            borderRadius:10
        },
        submitBtn:{
            height:50,
            width:'90%',
            backgroundColor:'#0BCCD8',
            borderRadius:10,
            margin:20,
            justifyContent:'center',
            alignItems:'center'
        },
        headereLabelbox:{
            height:40,
            width:'100%',
            backgroundColor:'#fff',
            borderRadius:10,
            marginTop:15,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between'
        },
        scrollview: {
            flexGrow: 1,
          },
          modelView:{
            backgroundColor: 'white', 
            padding: 16,
            borderTopRightRadius:20,
            borderTopLeftRadius:20,
            borderWidth:2,
            borderColor:'#0BCCD8'
          },
          modelViewattendance:{
            backgroundColor: 'white',   
            borderWidth:2,
            borderColor:'#0BCCD8',
            flex:1
          },
          modelcontainer:{
            margin: 0,
            justifyContent:'flex-end'
          },
          fittocontent:{
            flexDirection:'row',
            justifyContent:'space-between',
            margin:10
          },
          fontCss:{
            fontWeight:'bold',
            color:'#fff'
          },
          smallBox:{
            height:50,
            borderRadius:20,
            alignItems:'center',
            justifyContent:'center',
            margin:10,
            backgroundColor:'#0BCCD8'
          },
          headpad:{
            height:50,
            width:50,
            borderRadius:10,
            backgroundColor:'#fff',
            justifyContent:'center',
            alignItems:'center'
          }

    })