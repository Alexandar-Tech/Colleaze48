import React, { useEffect, useState } from 'react';
import { View, Text,TouchableOpacity,StyleSheet,Image } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

function TopicAssignment({ route,navigation }) {
    const topicData = route['params']
    return(
        <View style={{backgroundColor:'#FBFCFC',flex:1}}>
            <View style={styles.headerpad}>
                <View style={{flexDirection:'row',marginTop:60,paddingHorizontal:10,columnGap:70}}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <View style={styles.backpad}>
                        <Icon name="chevron-left" size={30}/>
                    </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>Assignment</Text>
                    </View>            
                </View>
                <View style={styles.topicVal}>                    
                    <Text style={[styles.fontcss,{fontSize:20}]}>{topicData.Sub_data.subject.name}</Text>
                    <Text style={[styles.fontcss,{fontSize:15}]}>Due On : {topicData.Sub_data.last_submit_date_format}<Text style={{color:'red'}}>({topicData.Sub_data.day_left})</Text></Text>
                    <View style={[styles.topBox,{marginTop:35}]}>
                        <Text style={{fontSize:15,color:'#8BF9FF',fontWeight:'bold'}}>Staff :{topicData.Sub_data.subject.teacher.user.user_detail.name}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.uploadTopic}>
                <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                    <View style={{bottom:20}}>
                        <Image style={styles.logo} source={require('../../assets/Assignment/notebook_1.png')} />                        
                    </View>
                    <View style={{margin:10}}>
                        <Text style={[styles.textcss,{}]}>Topic</Text>
                        <Text style={[styles.textcss,{color:'#329AD6'}]}>{topicData.Sub_data.teaching_plan_detail.sub_topic_name}</Text>
                        <View style={{paddingVertical:20}}>
                            <Text style={styles.textcss}>Description</Text>
                            <Text style={[styles.textcss,{width:220,fontSize:13}]}>{topicData.Sub_data.teaching_plan_detail.description}</Text>
                        </View>
                    </View>                   
                </View>

            </View>
            <TouchableOpacity style={styles.submitBtn} onPress={()=>navigation.navigate('UploadAssignment',{
                token:route['params']['token']
            })}>
                <Text style={styles.btnCss}>Upload Assignment</Text>
            </TouchableOpacity>

        </View>
    )
}

export default TopicAssignment
const styles = StyleSheet.create({
    btnCss:{
        fontSize:20,
        fontWeight:'bold',
        color:'#fff'
    },
    topicVal:{
        height:150,
        width:'90%',
        backgroundColor:'#DDFAF8',
        margin:20,
        borderRadius:20,
        alignItems:'center'
    },
    submitBtn:{
        height:60,
        borderRadius:20,
        backgroundColor:'#0BCCD8',
        width:'90%',
        margin:20,
        top:120,
        justifyContent:'center',
        alignItems:'center'
    },
    uploadTopic:{
        height:200,
        borderRadius:20,
        backgroundColor:'#BDC3C7',
        width:'90%',
        margin:20,
        top:50,
    },
    topBox:{
        height:40,
        width:170,
        backgroundColor:'#1D2F59',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    },
    logo: {
        height: 140,
        width: 160,
        resizeMode: 'center',
      },
      textcss:{
        fontSize:15,
        fontWeight:'bold',
        color:'#1D2F59'
      },
      fontcss:{
        color:'#1D2F59',
        fontWeight:'bold',
        margin:10
      },
      headerpad:{
        height:230,
        borderRadius:30,
        backgroundColor:'#1D2F59',
      },
      backpad:{
        height:50,
        width:50,
        borderRadius:10,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center'
      },

})