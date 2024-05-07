import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity,StyleSheet,ScrollView,Alert,ActivityIndicator } from 'react-native';
import Modal from "react-native-modal";
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';
import IconMA from 'react-native-vector-icons/MaterialCommunityIcons';
import { API_NOTIFICATIONTYPE,API_NOTIFICATION,API_NOTIFICATIONREAD } from '../../APILIST/ApiList';
import axios from 'axios';
import { useFonts } from 'expo-font';

const Notification = ({route,navigation}) => {
  const [isVisible, setIsVisible] = useState(false);
  const InstituteData = route['params']['HomeData']['data']
  const org_id = InstituteData['org'][0]['id']
  const user_id = InstituteData['user_detail']['user_id']
  const clg_section_id =  InstituteData['student_detail']['clg_section_id']
  const token = InstituteData['token']
  const [data, setData] = useState(null);
  const [notificationType, setNotificationType] = useState(null);
  const [loading, setLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    'circular': require('../../assets/fonts/circular-std-medium-500.ttf'),
  });
  
  useEffect(() => {
    axios.post(API_NOTIFICATIONTYPE,{
        'org_id':org_id
    },
    {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        },
    })
    .then(response => {
        setNotificationType(response.data);
    })
    .catch(error => {
        setNotificationType(error.response.data);
        });
    }, []);


    getReadNotification = (notifyid) =>{
      axios.post(API_NOTIFICATIONREAD,{
        "notification_id":notifyid,
        "user_id":user_id
      },
        {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => {     
            let userdata={
              "org_id":org_id,
              "clg_section_id":clg_section_id,
              "user_id" : user_id, 
            }
            getNotifivationData(userdata)      
        })
        .catch(error => {
          console.log(error)
        });
    }

    getNotifivationData = (userdata) =>{

      axios.post(API_NOTIFICATION,userdata,
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
        });
    }

    useEffect(() => {
      let userdata={
        "org_id":org_id,
        "clg_section_id":clg_section_id,
        "user_id" : user_id, 
      }
      getNotifivationData(userdata)      
    }, []);



const toggleNotification = (type) =>{
  setIsVisible(false)
  let userdata={
    "org_id":org_id,
    "clg_section_id":clg_section_id,
    "user_id" : user_id,
    "type":type
  }
  getNotifivationData(userdata) 
}

const toggleCloseVisible = () =>{
  setIsVisible(false)
  let userdata={
    "org_id":org_id,
    "clg_section_id":clg_section_id,
    "user_id" : user_id,
  }
  getNotifivationData(userdata) 
}


const toggleFilter = () =>{
  setIsVisible(true)
}
    return(
        <LinearGradient
            colors={['skyblue', 'white']}
            style={{flex:1}}>
              <Modal
                  isVisible={isVisible}
                  style={styles.modelcontainer}
                  onBackdropPress={() => setIsVisible(false)}
                  swipeDirection={['down']}
                  onSwipeComplete={() => setIsVisible(false)}
                  >                  
                    
                    <View style={styles.modelView}>
                      <Text style={{alignSelf:'center',fontSize:18,fontWeight:'bold',color:'black'}}>Filter</Text>
                      {
                        notificationType?(
                        notificationType.success ==1?(
                          <View>
                            {
                                notificationType.data.map((item,index)=>(
                                  <TouchableOpacity key={index} style={{margin:10}} onPress={()=>toggleNotification(item.type)}>
                                    <Text style={styles.notifytypetext}>{item.type}</Text>
                                    <View
                                      style={{
                                        borderBottomColor: '#1D2F59',
                                        borderBottomWidth: StyleSheet.hairlineWidth,
                                        opacity:0.5,
                                        width:'100%'
                                      }}
                                    />
                                  </TouchableOpacity>
                                ))

                            }
                            <TouchableOpacity style={styles.closeBtnCss} onPress={()=>toggleCloseVisible()}>
                              <Text style={styles.fontcss}>Close</Text>
                            </TouchableOpacity>                            
                          </View>
                        ):null):null
                      }                     
                                      
                    </View>
              </Modal>
            <View style={styles.headerpad}>
                <View style={styles.headpadCss}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <View style={styles.backpad}>
                            <Icon name="chevron-left" size={30}/>
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={{fontSize:20,fontWeight:'bold',color:'#fff',top:10}}>Notifications</Text>
                    </View> 
                    <TouchableOpacity onPress={()=>toggleFilter()}>
                        <View style={styles.backpad}>
                            <IconMA name="filter" size={30} />
                        </View>
                    </TouchableOpacity>          
                </View>
            </View>
            <ScrollView style={{ flex: 1 }}>
              <View style={{padding:20}}>
                {
                  loading?(
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        {data?<Text style={[styles.textcss,{fontSize:16,color:'red'}]}>{data.msg}</Text>:<ActivityIndicator size="large" color="#0000ff" />}
                    </View>
                  ):(
                    <View>
                       
                      {
                        data?(  
                        data.data.map((item,index)=>(
                          <TouchableOpacity style={styles.NotifyBox} key={index} onPress={()=>getReadNotification(item.id)}>
                            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10,marginLeft:10,marginRight:10}}>
                              <Text style={[fontsLoaded?[styles.fontfamilyCss,{fontWeight:'bold',textTransform: 'capitalize'}]:styles.textcss]}>
                                {item.title}
                              </Text>
                              {
                                !item.notification_details_count?(<View style={styles.unreadBox}>
                                <Text style={styles.fontcss}>unread</Text>
                              </View>):null
                              }
                              
                            </View>
                            <View
                                style={{
                                  borderBottomColor: '#1D2F59',
                                  borderBottomWidth: StyleSheet.hairlineWidth,
                                  opacity:0.5,
                                  marginLeft:20,
                                  marginRight:20                                  
                                }}
                              />
                              <View>
                                <Text style={[fontsLoaded?[styles.fontfamilyCss,{color:'#1D2F59',lineHeight: 20}]:styles.textcss]}>{item.description}</Text>
                              </View>
                              <Text style={[styles.textcss,{opacity:0.5}]}>{item.date}</Text>
                          </TouchableOpacity>
                        )
                        )
                        ):null
                      }
                    </View>                   
                )
                }
              </View>
            </ScrollView>
        </LinearGradient>
    )
}

export default Notification;

const styles = StyleSheet.create({
  notifytypetext:{
    fontWeight:'bold',
    color:'#1D2F59',
    fontSize:17,
    alignSelf:'center',
    margin:5
  },
  textcss:{
    margin:10,
    fontWeight:'bold',
    color:'#1D2F59',
    fontSize:14
  },
  fontcss:{
    fontSize:14,
    color:'#fff',
    fontWeight:'bold',
  },
  unreadBox:{
    height:25,
    width:80,
    backgroundColor:'#329AD6',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10    
  },
  NotifyBox:{
    flex:1,
    width:'100%',
    backgroundColor:'#fff',
    borderRadius:20,
    margin:10,
    paddingBottom:10,
    minHeight:100,
    borderWidth:1,
    borderColor:'#0BCCD8',
    shadowColor: '#0BCCD8',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 10,
    shadowRadius: 10,
  },
    modelView:{
        backgroundColor: '#CEF5F7', 
        padding: 16,
        borderWidth:2,
        borderColor:'#0BCCD8',
        borderRadius:20,
        height:300,
      },
      fittocontent:{
        flexDirection:'row',
        justifyContent:'space-between',
        margin:10
      },
      fontCss:{
        fontWeight:'bold',
        color:'red',
        fontSize:18
      },
      headerpad:{
        height:150,
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
      headpadCss:{
        flexDirection:'row',
        marginTop:60,
        paddingHorizontal:10,
        justifyContent:'space-between',
        margin:10
      },
      modelcontainer:{
        margin: 0,
        justifyContent:'flex-end'
      },
      fontfamilyCss:{
        fontFamily:'circular',
        textAlign:'justify',
        fontSize:14,
        margin:10
    },
    fontNormalCss:{
        textAlign:'justify',
        fontWeight:'bold',
        fontSize:14
    },
    closeBtnCss:{
      height:50,
      width:200,
      backgroundColor:'#329AD6',
      borderRadius:20,
      alignSelf:'center',
      alignItems:'center',
      justifyContent:'center',
      margin:20
    },
})