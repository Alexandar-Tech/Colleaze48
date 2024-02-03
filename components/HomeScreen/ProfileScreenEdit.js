import React from 'react';
import { View, Platform, Text, StyleSheet,TouchableOpacity,Image,ScrollView,TextInput,KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

export function ProfileScreenEdit({route,navigation}) {
    const ProfileData = route['params']['ProfileDatas']
    const org_type = ProfileData['org'][0]['type']
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
                            <View >
            
                            </View>
           
                    </View>
                    <View>
                        <Image style={styles.imgCss} source={require('../../assets/profile/Mask_gr_profile.png')} />
                        <View style={styles.boxcss}>
                            <Text style={[styles.textcss,{fontSize:14}]}>Roll No :{ProfileData.student_detail.roll_no}</Text>
                        </View>
                    </View>
                    <Text style={[styles.textcss,{textAlign:'center',fontSize:25,color:'#1D2F59'}]}> {ProfileData.user_detail.name}</Text>
                    <View style={styles.padBox}>
                        <View>
                            <Text style={styles.boxtextcss}>Department</Text>
                            <Text style={[styles.boxtextcss,{fontSize:16}]}>{org_type == 'college'?ProfileData.student_detail.year_and_section.department.name:ProfileData.student_detail.standard.name}</Text>
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
            </View>
            <View style={{height:20}}>

            </View>
            <ScrollView style={{ flex: 1, }}>
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
                            <Text style={styles.fontcss}>{ProfileData.user_detail.father_name}</Text>
                            <Text style={styles.fontcss}>{ProfileData.user_detail.mother_name}</Text>
                            <Text style={styles.fontcss}>{ProfileData.user_detail.dob_string}</Text>
                            <Text style={styles.fontcss}>{ProfileData.user_detail.blood_group}</Text>
                            <Text style={styles.fontcss}>{ProfileData.user_detail.religion.name}</Text>
                            <Text style={styles.fontcss}>{ProfileData.user_detail.cast.name}</Text>
                        </View>
                    </View>
                    <Text style={{fontSize:25,fontWeight:'bold',margin:10,top:10,color:'#1D2F59'}}>Contact Info</Text>
                    <View style={styles.bocgreyCss}>
                        <View style={{width:'50%',padding:10}}>
                            <Text style={[styles.fontcss,{paddingVertical:2,fontSize:13}]}>Phone No</Text>
                            <Text style={[styles.fontcss,{paddingVertical:2}]}>(044) 123 4567</Text>
                        </View>
                        <View style={{width:'50%',padding:10}}>
                            <Text style={[styles.fontcss,{paddingVertical:2,fontSize:13}]}>Mobile No</Text>
                            {/* <Text style={[styles.fontcss,{paddingVertical:2}]}>{ProfileData.phone_no}</Text> */}
                            <View style={styles.inner}>
                                    <TextInput
                                    placeholder={ProfileData.phone_no}
                                    placeholderTextColor={'#1D2F59'}
                                    style={[styles.input,{paddingVertical:1,left:50}]}
                                    />
                                </View>
                        </View>
                    </View>
                    <View style={styles.bocgreyCss}>
                        <View>
                            <Text style={[styles.fontcss,{paddingVertical:2,top:10,fontSize:13,right:50}]}>Email</Text>
                            
                            <KeyboardAvoidingView
                                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                style={{flex:1}}
                                >
                                <View style={styles.inner}>
                                    <TextInput
                                    placeholder={ProfileData.email}
                                    placeholderTextColor={'#1D2F59'}
                                    style={styles.input}
                                    />
                                </View>
                            </KeyboardAvoidingView>
                        </View>
                    </View>
                    <View style={styles.bocgreyCss}>
                    <View>
                            <Text style={[styles.fontcss,{paddingVertical:2,top:10,fontSize:13}]}>Residential Address</Text>
                            <Text style={[styles.fontcss,{paddingVertical:2,top:10,width:280}]}>{ProfileData.user_detail.address}</Text>
                        </View>

                    </View>
                    <View style={styles.submitBtn}>
                        <Text style={[styles.textcss,{fontSize:20}]}>Submit</Text>
                    </View>
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
        height:80,
        width:'95%',
        backgroundColor:'#CEF5F7',
        borderRadius:20,
        margin:10,
        flexDirection:'row',
        justifyContent:'space-around'
    },
    fontcss:{
        fontSize:16,
        fontWeight:'bold',
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
        height:400,
        backgroundColor:'#CEF5F7'
    },
    headerPad:{
        height:200,
        borderRadius:20,
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
        right:50       
      },
      input: {
        height: 60,
        marginBottom: 20,
        fontSize:15,
        color:'#1D2F59',
        fontWeight:'bold'
      },

})