import React, {  useState } from 'react';
import { View, Platform, Text, StyleSheet,TouchableOpacity,Image,ScrollView,TextInput,KeyboardAvoidingView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import { API_UPLOAD_STUDENT } from '../../APILIST/ApiList';

export function ProfileScreenEdit({route,navigation}) {
    const ProfileNewData = route['params']['ProfileNewData']
    const ProfileData = route['params']['ProfileDatas']
    const token = route['params']['ProfileToken']
    const org_type = ProfileData['org'][0]['type']
    const user_id = ProfileData['user_detail']['user_id']
    const [inputValues, setInputValues] = useState([]);

    const handleInputChange = (key, value) => {
        setInputValues((prevData) => {
            const newData = { ...prevData };      
            newData[key] = value;      
            return newData;
          });
      };

    const UploadStudent = async () => {
        if(inputValues.length == 0){
            Alert.alert("Changes Cant Found")
        }
        inputValues['user_id'] = user_id
        const resp = await fetch(API_UPLOAD_STUDENT,{
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(inputValues)    
        })    
        const response = await resp.json();
        if(response.success == 1)
        {
            Alert.alert(response.msg)
            // navigation.navigate('ProfileScreen')
        }
      };

    return (
        <>
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
                        <View style={[styles.headpad,{opacity:0}]}>            
                        </View>
                    </View>
                    <View>
                        <Image style={styles.imgCss} source={require('../../assets/profile/Mask_gr_profile.png')} />
                        <View style={styles.boxcss}>
                            <Text style={[styles.textcss,{fontSize:14}]}>Roll No :{ProfileData.student_detail.roll_no}</Text>
                        </View>
                    </View>
                    <Text style={[styles.textcss,{textAlign:'center',fontSize:22,color:'#1D2F59',bottom:10}]}> {ProfileData.user_detail.name}</Text>
                    <View style={[styles.padBox,{bottom:5}]}>
                        <View>
                            <Text style={styles.boxtextcss}>Department</Text>
                            <Text style={[styles.boxtextcss,{fontSize:14}]}>{org_type == 'college'?ProfileData.student_detail.year_and_section.department.name:ProfileData.student_detail.standard.name}</Text>
                        </View>
                        <View
                            style={{
                                borderLeftColor: 'black',
                                borderLeftWidth: 1,
                                height: 40, 
                                marginHorizontal: 10,
                                opacity:0.3
                            }}
                        />
                        <View>
                            <Text style={styles.boxtextcss}>Staff ID</Text>
                            <Text style={[styles.boxtextcss,{fontSize:14}]}>024563102</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{height:20}}>

            </View>
            <ScrollView style={{ flex: 1, }}>
                <View style={{ padding: 20 }}>
                    <Text style={{fontSize:25,fontWeight:'bold',margin:10,color:'#1D2F59'}}>Personal Info.</Text>
                    <View style={{marginLeft:10,marginRight:10,flexDirection:'row',justifyContent:'space-around'}}>
                        <View>
                            <Text style={[styles.fontcss,{opacity:0.5}]}>My Father</Text>
                            <Text style={[styles.fontcss,{opacity:0.5}]}>My Mother</Text>
                            <Text style={[styles.fontcss,{opacity:0.5}]}>My DOB</Text>
                            <Text style={[styles.fontcss,{opacity:0.5}]}>Blood Group</Text>
                            <Text style={[styles.fontcss,{opacity:0.5}]}>Community</Text>
                            <Text style={[styles.fontcss,{opacity:0.5}]}>Religion</Text>
                        </View>
                        <View>                            
                            <TextInput
                                placeholder={ProfileData.user_detail.father_name}
                                placeholderTextColor={'#1D2F59'}
                                style={styles.input}
                                onChangeText={(text)=>handleInputChange('father_name',text)}
                            />
                            <TextInput
                                placeholder={ProfileData.user_detail.mother_name}
                                placeholderTextColor={'#1D2F59'}
                                style={styles.input}
                                onChangeText={(text)=>handleInputChange('mother_name',text)}
                            />
                            <TextInput
                                placeholder={ProfileData.user_detail.dob_string}
                                placeholderTextColor={'#1D2F59'}
                                style={styles.input}
                                onChangeText={(text)=>handleInputChange('dob_string',text)}
                            />
                            <TextInput
                                placeholder={ProfileData.user_detail.blood_group}
                                placeholderTextColor={'#1D2F59'}
                                style={styles.input}
                                onChangeText={(text)=>handleInputChange('blood_group',text)}
                            />
                            {
                                ProfileData.user_detail.religion?(
                                    <TextInput
                                        placeholder={ProfileData.user_detail.religion.name}
                                        placeholderTextColor={'#1D2F59'}
                                        style={styles.input}
                                        onChangeText={(text)=>handleInputChange('religion_name',text)}
                                    />
                                ):<TextInput
                                    placeholder='Religion Name'
                                    placeholderTextColor={'#1D2F59'}
                                    style={styles.input}
                                    onChangeText={(text)=>handleInputChange('religion_name',text)}
                                     />
                            }
                            {
                                ProfileData.user_detail.cast?(
                                    <TextInput
                                        placeholder={ProfileData.user_detail.cast.name}
                                        placeholderTextColor={'#1D2F59'}
                                        style={styles.input}
                                        onChangeText={(text)=>handleInputChange('religion_name',text)}
                                    />
                                ):<TextInput
                                    placeholder='Cast Name'
                                    placeholderTextColor={'#1D2F59'}
                                    style={styles.input}
                                    onChangeText={(text)=>handleInputChange('religion_name',text)}
                                     />
                            }
                           
                        </View>
                    </View>
                    <Text style={{fontSize:25,fontWeight:'bold',margin:10,color:'#1D2F59'}}>Contact Info</Text>
                    <View style={styles.bocgreyCss}>
                        <View>
                            <Text style={[styles.fontcss,{paddingVertical:2,fontSize:13}]}>Mobile No</Text>
                            <View style={styles.inner}>
                                    <TextInput
                                    placeholder={ProfileData.phone_no}
                                    placeholderTextColor={'#1D2F59'}
                                    style={[styles.input]}
                                    onChangeText={(text)=>handleInputChange('phone_no',text)}
                                    />
                                </View>
                        </View>
                    </View>
                    <View style={styles.bocgreyCss}>
                        <View>
                            <Text style={[styles.fontcss,{paddingVertical:2,fontSize:13,}]}>Email</Text>
                            
                            <KeyboardAvoidingView
                                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                style={{flex:1}}
                                >
                                <View style={styles.inner}>
                                    <TextInput
                                        placeholder={ProfileData.email}
                                        placeholderTextColor={'#1D2F59'}
                                        style={styles.input}
                                        onChangeText={(text)=>handleInputChange('email',text)}
                                    />
                                </View>
                            </KeyboardAvoidingView>
                        </View>
                    </View>
                    <View style={styles.bocgreyCss}>
                    <View>

                            <Text style={[styles.fontcss,{paddingVertical:2,fontSize:13}]}>Residential Address</Text>
                            <KeyboardAvoidingView
                                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                style={{flex:1}}
                                >
                                <View style={[styles.inner]}>
                                    <TextInput
                                        placeholder={ProfileData.user_detail.address}
                                        placeholderTextColor={'#1D2F59'}
                                        style={styles.input}
                                        onChangeText={(text)=>handleInputChange('address',text)}
                                    />
                                </View>
                            </KeyboardAvoidingView>
                        </View>

                    </View>
                    <TouchableOpacity style={styles.submitBtn} onPress={()=>UploadStudent()}>
                        <Text style={[styles.textcss,{fontSize:20}]}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>

        </>
    );
}


const styles = StyleSheet.create({
    submitBtn:{
        height:50,
        width:'80%',
        backgroundColor:'#0BCCD8',
        borderRadius:20,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center'
    },
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
        fontWeight:'bold',
        paddingVertical:10,
        color:'#1D2F59'

    },
    padBox:{
        height:70,
        width:'90%',
        backgroundColor:'#fff',
        alignSelf:'center',
        borderRadius:20,
        flexDirection:'row',
        justifyContent:'space-between',
        padding:20,
        borderWidth:1,
        borderColor:'#0BCCD8'
    },
    boxtextcss:{
        fontSize:12,
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
        height:30,
        width:120,
        backgroundColor:'#329AD6',
        alignSelf:'center',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        bottom:10
    },
    backGroundCss:{
        height:370,
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
    inner: {
        flex: 1,
        justifyContent: 'center',     
      },
      input: {
        height: 40,
        fontSize:15,
        color:'#1D2F59',
        fontWeight:'bold'
      },

})