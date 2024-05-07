import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ScrollView,Image,ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconAN from 'react-native-vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import { API_SERVICE_GETLIST } from '../../APILIST/ApiList';
import axios from 'axios';

function ServiceRequest({ route,navigation }) {
    const serviceData = route['params']['Data']
    const serviceDataTypes = route['params']['Datatypes']
    const token = serviceData['token']

    const [selectedTab, setSelectedTab] = useState(null);
    const [selectedName, setSelectedName] = useState(null);
    const user_id = serviceData['user_detail']['user_id']    
    const org_id = serviceData['org'][0]['id']  
    
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.post(API_SERVICE_GETLIST,{
            "user_id" : user_id,
            "org_id" : org_id
        },
        {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => {
            setData(response.data);
            setSelectedTab(response.data.data[0].service_request_type.id)
            setSelectedName(response.data.data[0].service_request_type.name)
            setLoading(false)
        })
        .catch(error => {
            setData(null);
        });
    }, []);

    let dataTabs = []

    if(data){
        dataTabs = data.data
    }

    const VerticalDottedLine = () => {
        return (
          <View style={{
            borderLeftWidth: 1,
            borderLeftColor: '#0BCCD8',
            borderStyle: 'dotted',
            // Adjust the height as needed
            marginLeft: 10, // Adjust spacing
            height:10,
            marginTop:5
          }} />
        );
      };     

    const BottomScreen = () =>{
        return(
            <View>
                
                {
                    data && selectedName?(
                        <View>
                            <Text style={{fontSize:20,fontWeight:'bold',}}>{selectedName}</Text>
                            {
                        data.service_status[selectedName].status_name.map((item,index)=>(
                            <View key={index}>                                
                                <View style={{flexDirection:'row',columnGap:20,paddingRight:10,paddingTop:10}} key={index}>
                                    {data.service_status[selectedName].status[index]?
                                    (
                                        <View key={index}>
                                            {
                                                data.service_status[selectedName].status[index] == 2?(
                                                    <View style={{height:20,width:20,borderRadius:20,backgroundColor:'#fff'}}>
                                                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                                            <ActivityIndicator size="small" color="#0000ff" />
                                                        </View>                                                        
                                                    </View>
                                                ):
                                                <IconAN name="checkcircle" size={20} color={'#0BCCD8'}/>
                                            }
                                            
                                        </View>
                                    )
                                    :(
                                        <View style={{height:20,width:20,borderRadius:20,backgroundColor:'#fff'}}>
                                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>                                                
                                            </View>                                            
                                        </View>                                                                         
                                    )
                                    }
                                    <Text style={styles.textcss}> {item}</Text>
                                </View>
                                <VerticalDottedLine />
                            </View>
                        ))
                    }
                    </View>
                    ):<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator size="small" color="#0000ff" />
                </View>
                }
            </View>
        )
    }
    
    const handleTabPress = (tabId,tabName) => {
        setSelectedTab(tabId);     
        setSelectedName(tabName)  
      };


    return(
        <>
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
                            <Text style={styles.headerText}>Track Status</Text>
                        </View>
                        <View></View>          
                    </View>
                    <View style={{flex:1}}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={styles.tabsContainer}>
                                {
                                    dataTabs?
                                    (dataTabs.map((tab) => (
                                        <TouchableOpacity
                                        key={tab.service_request_type.id}
                                        style={[styles.tab, selectedTab === tab.service_request_type.id ]}
                                        onPress={() => handleTabPress(tab.service_request_type.id,tab.service_request_type.name)}
                                        >
                                            <View style={[styles.smalbox,selectedTab === tab.service_request_type.id && styles.activeTab]}>
                                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                                    <View>                                            
                                                        <View style={{height:30,width:130,borderWidth:1,borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                                                            <Text style={{fontWeight:'bold',fontSize:13}}>Ref No: {tab.reference_number}</Text>
                                                        </View>
                                                        <Text style={[styles.tabText,{padding:10}]}>{tab.service_request_type.name}</Text>
                                                        <Text style={[styles.tabText,{color:'#329AD6',fontSize:18,padding:4}]}> {tab.master_status}</Text>
                                                        <Text style={[styles.tabText,{padding:10,fontSize:12}]}>{tab.service_request_status_history.service_request_status.name}</Text>
                                                    </View>
                                                    <View>
                                                        <Image source={require('../../assets/service_req/service_img.png')} style={{height:140,width:100,resizeMode:'contain'}}  />
                                                    </View>
                                                </View>
                                                
                                            </View>                                
                                        </TouchableOpacity>
                                    ))):null
                                }
                            
                            </View>
                        </ScrollView>
                    </View>
                   
                </View>
                <ScrollView style={{flex:1}}>
                    <View style={{padding:20}}>

                         <View style={styles.contentContainer}>
                            <BottomScreen />
                        </View>
                    </View>
                </ScrollView>

                </View>
        </LinearGradient>
        </>
    )
}

export default ServiceRequest;

const styles = StyleSheet.create({
    textcss:{
        color:'#1D2F59',
        fontSize:16,
        fontWeight:'bold',
    },
    smalbox:{
        height:150,
        width:280,
        backgroundColor:'#fff',
        borderWidth:0.5,
        borderRadius:10,
        margin:10,
        borderColor:'#329AD6',
        padding:10,
    },
    fittotext:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    headerPad:{
        height:300,
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
    logo:{
        height:20,
        width:20
    },
    tabsContainer: {
        flexDirection: 'row',
        // borderBottomWidth: 1,
        // borderBottomColor: 'lightgray',
      },
      tab: {
        
      },
      activeTab: {
        borderBottomWidth: 2,
        // backgroundColor:'#329AD6'
      },
      tabText: {
        fontSize: 16,
        color:'#1D2F59',
        fontWeight:'bold'
      },
      contentContainer: {
        flex: 1,
      },
})