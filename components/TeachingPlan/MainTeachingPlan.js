import React, { useEffect, useState } from 'react';
import { View, Text,TouchableOpacity,StyleSheet,ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import Collapse from './Collapse';
import axios from 'axios';
import { API_TEACHINGPLAN,API_TEACHINGPLANCOLLEGE,API_GETSEMESTER,API_GETUNITSUBJECTCOLLEGE,API_GETSUBJECTCOLLEGE } from '../../APILIST/ApiList';
import { Dropdown } from 'react-native-element-dropdown';

function MainTeachingPlan({ route,navigation}) {
    const TeachingData = route['params']['LoginData']['data']
    let clg_section_id = TeachingData['student_detail']['clg_section_id']
    let college_subject_id = 0    
    if(route['params']['clg_section_id']){
        clg_section_id = route['params']['clg_section_id']   
    }
    if(route['params']['college_subject_id']){
        college_subject_id = route['params']['college_subject_id']
    }
    const [valueSubject, setValueSubject] = useState(0);
    // console.log(valueSubject,college_subject_id)
    const token = TeachingData['token']
    const user_id = TeachingData['user_detail']['user_id']
    const semester_id =  TeachingData['student_detail']['semester_id']
    const [valueID, setValueID] = useState(semester_id);
    
    const [value, setValue] = useState(null);
    const [valueSub, setValueSub] = useState(null);
    
    const DropdownComponentSemester = (valueData) => {        
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
              valueField= 'name'
              placeholder={!isFocus ? name : '...'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.name);
                setValueID(item.id)
                setIsFocus(false);
              }}
            />      
          </View>
        );
      };

      const DropdownComponentSubject = (valueData) => {        
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
              valueField= 'name'
              placeholder={!isFocus ? name : '...'}
              searchPlaceholder="Search..."
              value={valueSub}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValueSub(item.name);
                setValueSubject(item.id)
                setIsFocus(false);
              }}
            />      
          </View>
        );
      };


    // let API_URL = API_TEACHINGPLAN;
    // let user_data ={
    //     "standard_id" : TeachingData['student_detail']['standard_id']
    // }
    // if(org_type=='college'){
    //     API_URL = API_TEACHINGPLANCOLLEGE;
    //     user_data={
    //         "clg_section_id" : TeachingData['student_detail']['clg_section_id'],
    //         "semester_id" : valueID
    //     }
    // }   

    // const [data, setData] = useState(null);
    const [semData, setSemData] = useState(null);
    const [subData, setSubData] = useState(null);
    const [unitData, setUnitData] = useState(null);
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
            setSemData(response.data);
        })
        .catch(error => {
            setSemData(null)
        });
    }, []);


    useEffect(() => {
        // Fetch data when the component mounts
        axios.post(API_GETUNITSUBJECTCOLLEGE,{
            "clg_section_id" : clg_section_id,           
            "college_subject_id" : valueSubject
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => {
            setUnitData(response.data);
            setLoading(false)
        })
        .catch(error => {
            setUnitData(null)
        });
    }, [valueSubject]);

    useEffect(() => {
        // Fetch data when the component mounts
        axios.post(API_GETSUBJECTCOLLEGE,{
            "clg_section_id" : clg_section_id,
            "semester_id" : valueID
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => {
            setSubData(response.data);
        })
        .catch(error => {
            setSubData(null)
        });
    }, [valueID]);

    


    return(
        <>
        <LinearGradient
            colors={['skyblue', 'white']}
            style={{flex:1}}
            >
        <View style={{flex:1}}>
            <View style={styles.headerpad}>
                <View style={styles.headpadCss}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <View style={styles.headpad}>
                            <Icon name="chevron-left" size={30}/>
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.headerText}>Teaching Plan</Text>
                    </View>
                    <View style={[styles.headpad,{opacity:0}]} >
                    </View>           
                </View>
                {
                    semData != null?(
                            <View style={{width:'90%',alignSelf:'center',borderRadius:10,backgroundColor:'#fff'}}>
                                <View style={{margin:10}}>
                                    <DropdownComponentSemester name={semData.data[0].name} dropdownData={semData}/>
                                </View>
                                {
                                    subData?(
                                        <View style={{margin:10}}>
                                            <DropdownComponentSubject name={'Select Subject'} dropdownData={subData}/>
                                        </View> 
                                    ):null
                                }
                                                               
                            </View>
                            
                    ):null
                }
                
            </View>
            <View style={{height:50}}></View>
            <ScrollView style={{flex:1}}>
                <View style={{padding:20}}>
                    {
                        loading?(
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                {unitData?<Text style={[styles.textcss,{fontSize:16,color:'red'}]}>{unitData.msg}</Text>:<Text style={{fontSize:18,fontWeight:'bold',color:'#1D2F59'}}>Please Select Subject</Text>}
                            </View>                         
                        ):(
                            <View>                                
                                {
                                    subData.data.length == 0?(
                                        <View style={{alignItems:'center',margin:30}}>
                                            <Text style={{fontSize:20,fontWeight:'bold',color:'red'}}>Subject Not Found</Text>                                    
                                        </View>
                                    ):(
                                        <View style={{bottom:20}}>
                                            {
                                                unitData.data.length != 0?(
                                                    <View>
                                                        <Text style={{fontSize:18,color:'#1D2F59',fontWeight:'bold',margin:10,top:10}}>UNITS</Text>
                                                        <Collapse val={unitData} token={token}/>                                            
                                                    </View>
                                                ):(
                                                    <View style={{alignItems:'center',margin:30}}>
                                                        <Text style={{fontSize:20,fontWeight:'bold',color:'red'}}>Unit Data Not Found</Text>                                    
                                                    </View>
                                                )
                                                    }
                                                    </View>
                                                )
                                            }
                                
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
export default MainTeachingPlan;

const styles = StyleSheet.create({
    headerpad:{
        height:220,
        backgroundColor:'#1D2F59',
        borderBottomEndRadius:20,
        borderBottomStartRadius:20,
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
      container: {
        backgroundColor: 'white',
        borderRadius:10,
        padding:4,
        borderWidth:1,
        opacity:0.5
      },

})