import React,{useState} from 'react';
import { View, Button, Text, StyleSheet,TouchableOpacity,Image,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconFE from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import ComingSoon from '../ComingSoon/ComingSoon';

export function EducationalLoan({props: any,navigation}) {
    const [loading, setLoading] = useState(true);
    return(
        <LinearGradient
            colors={['skyblue', 'white']}
            style={{flex:1}}>
            <View style={{ flex: 1}}>
                <View style={styles.headerPad}>
                    <View style={styles.headpadCss}>
                        <TouchableOpacity onPress={()=>navigation.goBack()}>
                            <View style={styles.headpad}>
                                <Icon name="chevron-left" size={30}/>
                            </View>
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.headerText}>Educational loan request</Text>
                        </View>
                        <View>
                        </View>           
                    </View>
                </View>
                <ScrollView style={{ flex: 1, }}>
                    <View style={{ padding: 20 }}>
                        {
                            loading?(
                                <View style={{justifyContent:'center',alignItems:'center',marginTop:200}}>
                                    <ComingSoon />
                                </View>
                              ):(
                                <View>
                                    <View style={styles.boxpadd}>
                                        <View style={{flexDirection:'row',margin:5,justifyContent:'space-evenly'}}>
                                            <Text style={[styles.textcss,{right:40}]}>First Name</Text>
                                            <Text style={styles.textcss}>Last Name</Text>
                                        </View>
                                        <View style={[styles.fittotext,{margin:5}]}>
                                            <View style={{width:'48%',height:50,backgroundColor:'#fff',borderWidth:1,borderRadius:10,borderColor:'#0BCCD8'}}></View>
                                            <View style={{width:'48%',height:50,backgroundColor:'#fff',borderWidth:1,borderRadius:10,borderColor:'#0BCCD8'}}></View>
                                        </View>
                                        <View style={{flexDirection:'row',margin:5,justifyContent:'space-evenly'}}>
                                            <Text style={[styles.textcss,{right:30}]}>Date Of Birth</Text>
                                            <Text style={styles.textcss}>Mobile Number</Text>
                                        </View>
                                        <View style={[styles.fittotext,{margin:5}]}>
                                            <View style={{width:'48%',height:50,backgroundColor:'#fff',borderWidth:1,borderRadius:10,borderColor:'#0BCCD8'}}></View>
                                            <View style={{width:'48%',height:50,backgroundColor:'#fff',borderWidth:1,borderRadius:10,borderColor:'#0BCCD8'}}></View>
                                        </View>
                                        <View style={{margin:5}}>
                                            <Text style={[styles.textcss,{margin:5}]}>Mail ID</Text>
                                            <View style={{width:'100%',height:40,backgroundColor:'#fff',borderWidth:1,borderRadius:10,borderColor:'#0BCCD8'}}></View>
                                        </View>
                                        <View style={{flexDirection:'row',margin:5,justifyContent:'space-evenly'}}>
                                            <Text style={[styles.textcss,{right:20}]}>Father Name</Text>
                                            <Text style={[styles.textcss,{left:20}]}>Father’s Occupation</Text>
                                        </View>
                                        <View style={[styles.fittotext,{margin:5}]}>
                                            <View style={{width:'48%',height:50,backgroundColor:'#fff',borderWidth:1,borderRadius:10,borderColor:'#0BCCD8'}}></View>
                                            <View style={{width:'48%',height:50,backgroundColor:'#fff',borderWidth:1,borderRadius:10,borderColor:'#0BCCD8'}}></View>
                                        </View>
                                        <View style={{flexDirection:'row',margin:5,justifyContent:'space-evenly'}}>
                                            <Text style={[styles.textcss,{right:20}]}>Mother Name</Text>
                                            <Text style={[styles.textcss,{left:20}]}>Mother’s Occupation</Text>
                                        </View>
                                        <View style={[styles.fittotext,{margin:5}]}>
                                            <View style={{width:'48%',height:50,backgroundColor:'#fff',borderWidth:1,borderRadius:10,borderColor:'#0BCCD8'}}></View>
                                            <View style={{width:'48%',height:50,backgroundColor:'#fff',borderWidth:1,borderRadius:10,borderColor:'#0BCCD8'}}></View>
                                        </View>
                                        <View style={{margin:5}}>
                                            <Text style={[styles.textcss,{margin:5}]}>Parent Aadhar Card</Text>
                                            <View style={{width:'100%',height:40,backgroundColor:'#fff',borderWidth:1,borderRadius:10,borderColor:'#0BCCD8'}}></View>
                                        </View>
                                        <View style={{alignSelf:'center',margin:10,width:'90%',height:150,backgroundColor:'#fff',borderWidth:1,borderRadius:10,borderColor:'#0BCCD8',justifyContent:'center',alignItems:'center'}}>
                                            <Image style={styles.logo} source={require('../../assets/EducationalLoan/edu_attach.png')} />
                                            <Text style={[styles.textcss,{margin:5,color:'#1D2F59'}]}>Add Attachment</Text>
                                        </View>
                                        <View style={{margin:5}}>
                                            <Text style={[styles.textcss,{margin:5}]}>Parent Pan Card</Text>
                                            <View style={{width:'100%',height:40,backgroundColor:'#fff',borderWidth:1,borderRadius:10,borderColor:'#0BCCD8'}}></View>
                                        </View>
                                        <View style={{alignSelf:'center',margin:10,width:'90%',height:150,backgroundColor:'#fff',borderWidth:1,borderRadius:10,borderColor:'#0BCCD8',justifyContent:'center',alignItems:'center'}}>
                                            <Image style={styles.logo} source={require('../../assets/EducationalLoan/edu_attach.png')} />
                                            <Text style={[styles.textcss,{margin:5,color:'#1D2F59'}]}>Add Attachment</Text>
                                        </View>
                                        <View style={{margin:5}}>
                                            <Text style={[styles.textcss,{margin:5,color:'#1D2F59'}]}>Parent Bank Details</Text>
                                            <Text style={[styles.textcss,{margin:5}]}>Account Details</Text>
                                            <View style={{width:'100%',height:40,backgroundColor:'#fff',borderWidth:1,borderRadius:10,borderColor:'#0BCCD8'}}></View>
                                        </View>
                                        <View style={{margin:5}}>
                                            <Text style={[styles.textcss,{margin:5}]}>Bank</Text>
                                            <View style={{width:'100%',height:40,backgroundColor:'#fff',borderWidth:1,borderRadius:10,borderColor:'#0BCCD8'}}></View>
                                        </View>
                                        <View style={{flexDirection:'row',margin:5,}}>
                                            <Text style={[styles.textcss,{}]}>Branch</Text>
                                            <Text style={[styles.textcss,{left:140}]}>IFSC</Text>
                                        </View>
                                        <View style={[styles.fittotext,{margin:5}]}>
                                            <View style={{width:'48%',height:50,backgroundColor:'#fff',borderWidth:1,borderRadius:10,borderColor:'#0BCCD8'}}></View>
                                            <View style={{width:'48%',height:50,backgroundColor:'#fff',borderWidth:1,borderRadius:10,borderColor:'#0BCCD8'}}></View>
                                        </View>
                                        <View style={{margin:5}}>
                                            <Text style={[styles.textcss,{margin:5}]}>Account Holder Name</Text>
                                            <View style={{width:'100%',height:40,backgroundColor:'#fff',borderWidth:1,borderRadius:10,borderColor:'#0BCCD8'}}></View>
                                        </View>
                                    </View>
                                    <View style={styles.submitBtn}>
                                        <Text style={[styles.textcss,{color:'#fff',fontSize:18}]}>Submit</Text>
                                    </View>

                                </View>
                              )
                        }
                    </View>
                </ScrollView>
            </View>
        </LinearGradient>
    )

}

const styles = StyleSheet.create({
    submitBtn:{
        height:50,
        width:'80%',
        backgroundColor:'#0BCCD8',
        alignSelf:'center',
        margin:10,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center'
    },
    logo:{
        height:60,
        width:60
    },
    textcss:{
        color:'#313955',
        fontSize:16,
        fontWeight:'bold'
    },
    fittotext:{
        flexDirection:'row',
        justifyContent:'space-between',
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
    boxpadd:{
        borderRadius:20,
        opacity:0.7,
        height:1350,
        width:'100%',
        backgroundColor:'#F4F5F7',
        borderWidth:1,
        borderColor:'#0BCCD8'
    }
})

