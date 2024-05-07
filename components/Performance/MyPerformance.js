import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ScrollView,Dimensions,ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';
// import DropdownComponent from '../Attendance/DropDownComponent';
import { API_ATTENDANCEPERCENTAGECOLLEGE,API_GETSEMESTER } from '../../APILIST/ApiList';
// import { StackedBarChart } from 'react-native-chart-kit';
import { BarChart } from 'react-native-gifted-charts';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';

const screenWidth = Dimensions.get('window').width;



export function MyPerformance({route,navigation}) {
    const [value, setValue] = useState(1);
      const DropdownComponent = (valueData) => {        
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
    
    const PerformanceData = route['params']['LoginData']['data']
    const token = PerformanceData['token']
    const academic_year_id=  PerformanceData['student_detail']['academic_year_id']
    const user_id = PerformanceData['user_detail']['user_id']
    const [apiData, setApiData] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

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
            setData(response.data);
            setLoading(false)
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    useEffect(() => {
        axios.post(API_ATTENDANCEPERCENTAGECOLLEGE,{
            "user_id" : user_id,
            "semester_id" : value
        },
        {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => {
            setApiData(response.data);
            setLoading(false)
        })
        .catch(error => {
            setApiData(null);
        });
    }, [value]);
    
    return(
        <>
        <LinearGradient
            colors={['skyblue', 'white']}
            style={{flex:1}}>
                <View style={{ flex: 1}}>
                    {
                        data == null?(
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <ActivityIndicator size="large" color="#0000ff" />
                            </View>
                        ):(
                            <View style={styles.headerPad}>
                        <View style={styles.headpadCss}>
                            <TouchableOpacity onPress={()=>navigation.goBack()}>
                                <View style={styles.headpad}>
                                    <Icon name="chevron-left" size={30}/>
                                </View>
                            </TouchableOpacity>
                            <View>
                                <Text style={styles.headerText}>My Performance</Text>
                            </View>
                            <View style={[styles.headpad,{opacity:0}]}></View>
                        </View>
                            
                        <View style={styles.boxpad}>
                            <View style={{margin:10}}>
                                <DropdownComponent name={'Select Semester'} dropdownData={data}/>
                            </View>
                            {
                                apiData == null?(
                                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                        <Text style={{fontSize:16,color:'red',fontWeight:'bold'}}>Attendance Not Marked</Text>
                                    </View>
                                ):(
                                    <View>
                                        <View>
                                            <Text style={styles.textcss}>Overall Attendance 2022-23</Text> 
                                        </View>                                
                                        <BarChart 
                                        yAxisLabelSuffix ='%'
                                        width={250}
                                        height={240}
                                        barWidth={40}
                                        noOfSections={5}
                                        barBorderRadius={2}
                                        xAxisIndicesWidth={100}                                
                                        maxValue={100}
                                        sideWidth={10}
                                        isAnimated
                                        
                                        data={
                                            [{'value': apiData.data.present,label: 'Present',frontColor: '#0088EA',
                                            sideColor: '#0088EA',
                                            topColor: '#0088EA',
                                            topLabelComponent: () => (
                                                <Text style={{color: '#0088EA', fontSize: 18,right:10}}>{apiData.data.present}</Text>
                                              ),
                                            }, 
                                            {'value': apiData.data.absent,label: 'Absent',frontColor: '#F55A5A',
                                            sideColor: '#F55A5A',
                                            topColor: '#F55A5A',
                                            topLabelComponent: () => (
                                                <Text style={{color: '#F55A5A', fontSize: 18,right:10}}>{apiData.data.absent}</Text>
                                              ),
                                            }, 
                                            {'value': apiData.data.leave,label: 'Leave',frontColor: '#FFB800',
                                            sideColor: '#FFB800',
                                            topColor: '#FFB800',
                                            topLabelComponent: () => (
                                                <Text style={{color: '#FFB800', fontSize: 18,right:10}}>{apiData.data.leave}</Text>
                                              ),                                    
                                            }]
                                        } isThreeD/>
                                </View>
                                )
                            }
                               
                        </View>
                    </View>
                        )
                    }  
                </View>
            </LinearGradient>
        </>
    )
}

const styles = StyleSheet.create({
    boxpad:{
        top:20,
        height:400,
        width:'90%',
        backgroundColor:'#fff',
        alignSelf:'center',
        borderRadius:20,
        borderWidth:1,
        borderColor:'#0BCCD8'
    },
    textcss:{
        padding:10,
        fontSize:20,
        color:'#1D2F59',
        fontWeight:'900'
    },
  headerPad:{
      height:200,
      backgroundColor:'#1D2F59',
      borderBottomLeftRadius:20,
      borderBottomRightRadius:20
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#fff'
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