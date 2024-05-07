import React, { useState,useEffect } from 'react';
import { View, Button, Text, StyleSheet,TouchableOpacity,Image,ScrollView,ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconFE from 'react-native-vector-icons/Feather';
import axios from 'axios';
import { API_VIEW_STUDENT } from '../../APILIST/ApiList';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function ProfileScreen({route,navigation}) {
    const [asyncData, setAsyncData] = useState(null);
    async function getData() {
        const AsyncDataVal = await AsyncStorage.getItem('token'); 
        setAsyncData(JSON.parse(AsyncDataVal))      
      }
    
      useEffect(() => {
        getData();

      }, []);

    const ProfileData = route['params']['HomeData']['data']
    const org_type = ProfileData['org'][0]['type']
    const [data, setData] = useState(null);
    
    const [loading, setLoading] = useState(true);
    const user_id = ProfileData['user_detail']['user_id']
    const token = ProfileData['token']
    useEffect(() => {
        axios.post(API_VIEW_STUDENT,{
            "user_id" : user_id
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
            setData(error.response.data);
            setLoading(false)
        });
    }, []);

    return (
        <>
        {
            asyncData == null?null:
            (            
                <View style={{ flex: 1,backgroundColor:'#fff' }}>
                    <View style={styles.backGroundCss}>
                        <View style={styles.headerPad}>
                            <View style={styles.headpadCss}>
                                <TouchableOpacity onPress={()=>navigation.goBack()}>
                                    <View style={styles.headpad}>
                                        <Icon name="chevron-left" size={30}/>
                                    </View>
                                </TouchableOpacity>
                                <View>
                                    <Text style={styles.headerText}>My Profile</Text>
                                </View>
                                <TouchableOpacity onPress={()=>navigation.navigate('ProfileScreenEdit',{
                                    ProfileNewData:asyncData.data,
                                    ProfileDatas:ProfileData,
                                    ProfileToken :token
                                })}>
                                    <View style={styles.headpad}>
                                        <IconFE name="edit" size={25}/>
                                    </View>
                                </TouchableOpacity>            
                            </View>
                            {
                                data?(
                                    <View>
                                        <Image style={styles.imgCss} source={require('../../assets/profile/Mask_gr_profile.png')} />
                                        <View style={styles.boxcss}>
                                            <Text style={[styles.textcss,{fontSize:13}]}>Roll No :{data.data.student_detail.roll_no}</Text>
                                        </View>
                                        <Text style={[styles.textcss,{textAlign:'center',fontSize:25,color:'#1D2F59'}]}> {data.data.user_detail.name}</Text>
                                        <View style={styles.padBox}>
                                            <View>
                                                <Text style={styles.boxtextcss}>Department</Text>
                                                <Text style={[styles.boxtextcss,{fontSize:16}]}>{org_type == 'college'?data.data.student_detail.year_and_section.department.name:data.data.student_detail.standard.name}</Text>
                                            </View>
                                            <View
                                                    style={{
                                                        borderLeftColor: 'black',
                                                        borderLeftWidth: 1,
                                                        height: 40, // Adjust height as needed
                                                        marginHorizontal: 10, // Adjust horizontal margin as needed
                                                        opacity:0.3
                                                    }}
                                                />
                                            <View>
                                                <Text style={styles.boxtextcss}>Staff ID</Text>
                                                <Text style={[styles.boxtextcss,{fontSize:16}]}>024563102</Text>
                                            </View>
                                        </View>
                                        
                                    </View>
                                    

                                ):null
                            }
                        </View>
                    </View>
                    <View style={{paddingTop:35}}>
                    </View>
                    {
                        data?(
                            <ScrollView style={{ flex: 1,}}>
                                
                                    <View style={{ padding: 20 }}>
                                        <Text style={{fontSize:25,fontWeight:'bold',margin:10,top:10,color:'#1D2F59'}}>Personal Info.</Text>
                                        <View style={{margin:10,flexDirection:'row',justifyContent:'space-around'}}>
                                            <View>
                                                <Text style={[styles.fontcss,{opacity:0.5}]}>My Father</Text>
                                                <Text style={[styles.fontcss,{opacity:0.5}]}>My Mother</Text>
                                                <Text style={[styles.fontcss,{opacity:0.5}]}>My DOB</Text>
                                                <Text style={[styles.fontcss,{opacity:0.5}]}>Blood Group</Text>
                                                <Text style={[styles.fontcss,{opacity:0.5}]}>Community</Text>
                                                <Text style={[styles.fontcss,{opacity:0.5}]}>Religion</Text>

                                            </View>
                                            <View>
                                                <Text style={styles.fontcss}>{data.data.user_detail.father_name}</Text>
                                                <Text style={styles.fontcss}>{data.data.user_detail.mother_name}</Text>
                                                <Text style={styles.fontcss}>{data.data.user_detail.dob_string}</Text>
                                                <Text style={styles.fontcss}>{data.data.user_detail.blood_group}</Text>
                                                {
                                                    data.data.user_detail.religion?<Text style={styles.fontcss}>{data.data.user_detail.religion.name}</Text>:null
                                                }
                                                {
                                                    data.data.user_detail.religion?<Text style={styles.fontcss}>{data.data.user_detail.cast.name}</Text>:null
                                                }
                                                
                                            </View>
                                        </View>
                                        <Text style={{fontSize:25,fontWeight:'bold',margin:10,top:10,color:'#1D2F59'}}>Contact Info</Text>
                                        <View style={styles.bocgreyCss}>
                                            <View>
                                                <Text style={[styles.fontcss,{paddingVertical:2,fontSize:13}]}>Mobile No</Text>
                                                <Text style={[styles.fontcss,{paddingVertical:2,fontSize:13}]}>{data.data.phone_no}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.bocgreyCss}>
                                            <View>
                                                <Text style={[styles.fontcss,{paddingVertical:2,fontSize:13}]}>Email</Text>
                                                <Text style={[styles.fontcss,{paddingVertical:2}]}>{data.data.email}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.bocgreyCss}>
                                        <View>
                                                <Text style={[styles.fontcss,{paddingVertical:2,fontSize:13}]}>Residential Address</Text>
                                                <Text style={[styles.fontcss,{paddingVertical:2,width:280}]}>{data.data.user_detail.address}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </ScrollView>
                        ):(
                            <View style={{flex:1,alignItems:'center'}}>
                                <ActivityIndicator size="large" color="#0000ff" />
                            </View>
                        )
                    }
                </View>
            )
            }
        </>
    );
}


const styles = StyleSheet.create({
    bocgreyCss:{
        width:'95%',
        backgroundColor:'#CEF5F7',
        borderRadius:20,
        margin:10,
        flex:1,
        minHeight:80,
        padding:20
    },
    fontcss:{
        fontSize:16,
        paddingVertical:10,
        color:'#1D2F59'
    },
    padBox:{
        height:80,
        width:'90%',
        backgroundColor:'#fff',
        margin:10,
        alignSelf:'center',
        borderRadius:20,
        flexDirection:'row',
        justifyContent:'space-between',
        padding:20,
        borderWidth:1,
        borderColor:'#0BCCD8'
    },
    boxtextcss:{
        fontSize:14,
        fontWeight:'bold',
        color:'#1D2F59',
        width:180
    },
    textcss:{
        fontSize:18,
        fontWeight:'bold',
        color:'#fff'
    },
    imgCss:{
        height:150,
        width:150,
        alignSelf:'center'
    },
    boxcss:{
        padding:10,
        backgroundColor:'#329AD6',
        alignSelf:'center',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        bottom:10
    },
    backGroundCss:{
        height:400,
        backgroundColor:'#CEF5F7'
    },
    headerPad:{
        height:200,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
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
        fontSize:20,
        fontWeight:'bold',
        color:'#fff',
        top:10,
    },

})