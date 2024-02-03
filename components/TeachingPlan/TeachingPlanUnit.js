import React, { useEffect, useState } from 'react';
import { View, Text,TouchableOpacity,StyleSheet,ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import DropdownComponent from '../Attendance/DropDownComponent';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { API_TEACHINGPLANUNIT } from '../../APILIST/ApiList';


function TeachingPlanUnit({ route,navigation }) {
    const unit_data = route['params']['unitData']
    const subName = route['params']['subName']
    const teacherName = route['params']['teacherName']

    const token = route['params']['token']
    const API_URL = API_TEACHINGPLANUNIT
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.post(API_URL,
        {
            "syllabus_detail_id" : 1
        }

        ,{
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
                        <Text style={styles.headerText}>{subName}</Text>
                    </View>
                    <View>
                    </View>           
                </View>
                <View style={{height:30,width:130,backgroundColor:'#fff',alignSelf:'center',alignItems:'center',justifyContent:'center',borderRadius:20}}>
                    <Text style={{fontSize:15,fontWeight:'bold',color:'#1D2F59'}}>{teacherName}</Text>
                </View>
                <View style={{flex:1,minHeight:240,width:'90%',backgroundColor:'#329AD6',alignSelf:'center',alignItems:'center',borderRadius:20,margin:10}}>
                    <View style={{flex:1,width:'90%',backgroundColor:'#fff',margin:10,borderRadius:10,padding:10}}>
                        <Text style={{fontWeight:'bold'}}>{unit_data.unit}</Text>
                    </View>
                    <Text style={{color:'#fff',alignSelf:'flex-start',fontSize:15,fontWeight:'bold',margin:5}}>Introduction</Text>
                    <Text style={{fontSize:15,fontWeight:'bold',padding:5,margin:5}}>{unit_data.syllabus}</Text>
                </View>
                
                
            </View>
            <View style={{height:150}}></View>
            
            <ScrollView style={{flex:1}}>
                <View style={{padding:20}}>                   
                    <View>
                        <DropdownComponent name={'Frequently Asked Quations'} />
                    </View>
                    {
                        loading?(
                            <View>
                                <ActivityIndicator size="large" color="#0000ff" />
                            </View>
                        ):(
                            <View>
                                {
                                    data['data'].map((item,index)=>(
                                        <View>
                                            {
                                                item.map((val,itemindex)=>(
                                                    <View>
                                                        <View style={{height:150,width:'100%',alignSelf:'center',backgroundColor:'#fff',borderWidth:1,borderRadius:10,borderColor:'#0BCCD8',margin:10}}>
                                                            <Text style={{fontSize:16,fontWeight:'bold',padding:10,color:'#1D2F59'}}>{index+1}.{itemindex+1}_{val.sub_topic_name}</Text>
                                                            <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                                                                <View style={[styles.referBox,{backgroundColor:'#329AD6',}]}>
                                                                    <Text style={styles.textcss}>Refer Video</Text>
                                                                </View>
                                                                <View style={[styles.referBox,{backgroundColor:'#0BCCD8'}]}>
                                                                <Text style={styles.textcss}>Refer Text Books</Text>
                                                                </View>
                                                            </View>
                                                            <View style={[styles.referBox,{backgroundColor:'#fff',margin:10,width:'90%',borderWidth:1,borderColor:'#0BCCD8',}]}>
                                                                <Text style={[styles.textcss,{color:'#1D2F59'}]}>Lecture Notes</Text>
                                                            </View>
                                                            
                                                        </View>
                                                
                                                    </View>
                                                ))
                                            }
                                            
                                        </View>
                                    ))
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
export default TeachingPlanUnit;

const styles = StyleSheet.create({
    headerpad:{
        maxHeight:250,
        backgroundColor:'#1D2F59',
        borderRadius:20,
        flex:1
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
        fontSize:17,
        fontWeight:'bold',
        color:'#fff',
        top:10,
        right:20
    },
    referBox:{
        height:40,
        width:'45%',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center'
    },
    textcss:{
        color:'#fff',
        fontWeight:'bold'
    }

})