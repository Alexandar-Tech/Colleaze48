import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, Switch,Image, TouchableOpacity,ScrollView,ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { LinearGradient } from 'expo-linear-gradient';
import { API_GET_FEES } from '../../APILIST/ApiList';
import axios from 'axios';

function Fees({ route,navigation }) {
    const FeesData = route['params']['LoginData']['data']
    const token = FeesData['token']
    const user_id = FeesData['user_detail']['user_id']
    const [selectedTab, setSelectedTab] = useState(0);
    const [isEnabled, setIsEnabled] = useState(false);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const toggleSwitch = () => {
        setIsEnabled((previousState) => !previousState);
    };

    const tabs = [
        { id: 0, title: 'All', content: 'Content for All',},
        { id: 1, title: 'Overdue', content: 'Content for Videos' },
        // { id: 2, title: 'Paid', content: 'Content for Images' },
        { id: 2, title: 'Paid', content: 'Content for Images' },
    ];


    let user_data = {
        "user_id" : user_id,
    }
    useEffect(() => {
        axios.post(API_GET_FEES,user_data,
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
    }, []);

    const All = () =>{
        return(
            <View>
                <View>
                    <Upcoming />
                </View>
                <View>
                    <Video />
                </View>
                {/* <View>
                    <Images />
                </View> */}
            </View>
        )
    }
    const Video = () =>{

        return(
            <View>
            {
                data["data"]["overdue"].map((item,index)=>(
                    <View style={{flex:1,margin:15}} key={index}>
                        <View style={{height:220,width:'100%',backgroundColor:'#fff',borderRadius:20}}>
                        <View style={styles.fittotext}>
                                <View style={styles.feestypebox}>
                                    <Text style={[styles.feestypetext,,{fontSize:14}]}>{item.fees_assigning_details.fee_master.name}</Text>
                                </View>
                                <View style={[styles.feestypebox,{borderColor:'red',backgroundColor:'#fff',borderWidth:1}]}>
                                    <Text style={{fontSize:14,fontWeight:'bold',color:'red'}}>Overdue</Text>
                                </View>
                                <View>
                                    <Text style={[styles.feestypetext,,{fontSize:14}]}>₹ {item.amount}</Text>
                                    <Text style={[styles.feestypetext,,{fontSize:10}]}>Second</Text>
                                </View>
                            </View>
                            <View style={{padding:10}}>
                                <Text style={[styles.feestypetext,{fontSize:18,opacity:0.5}]}>Tutuion Fee for SEM-1</Text>
                                <Text style={[styles.feestypetext,,{fontSize:15}]}>Due: {item.date_left.split("(")[0]} <Text style={{color:'red'}}> ({item.date_left.split('(')[1]}</Text></Text>
                            </View>
                            <View style={{height:50,width:'90%',backgroundColor:'#CDF5F7',margin:10,alignSelf:'center',borderRadius:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:10}}>
                                <Text style={{fontSize:12,fontWeight:'bold',color:'#1D2F59'}}>First Paid: 12 Jun 2022</Text>
                                <Text style={{fontSize:12,fontWeight:'bold',color:'#00C3AC'}}>₹ 15,000</Text>
                                <Text style={{fontSize:12,fontWeight:'bold',color:'#1D2F59',textDecorationLine:'underline'}}>Invoice</Text>
                            </View>
                            <View style={{marginRight:20,marginLeft:20,borderRadius:10,height:50,width:'90%',backgroundColor:'#0BCCD8',borderWidth:1,borderColor:'#0BCCD8',justifyContent:'space-around',padding:10,flexDirection:'row',alignItems:'center'}}>
                                <Text style={{fontSize:20,color:'#fff',fontWeight:'bold'}}>Pay Now</Text>
                            </View>
                        </View>
                    </View>
                ))

            }
            </View>
            
        )
    }
    const Upcoming = () =>{
        return(
            <View>
            {
                data["data"]["upcomming"].map((item,index)=>(
                    <View style={{flex:1,margin:15}} key={index}>
                        <View style={{width:'100%',backgroundColor:'#fff',borderRadius:20,paddingBottom:20}}>
                            <View style={styles.fittotext}>
                                <View style={styles.feestypebox}>
                                    <Text style={[styles.feestypetext,,{fontSize:14}]}>{item.fees_assigning_details.fee_master.name}</Text>
                                </View>
                                <View style={[styles.feestypebox,{borderColor:'#F19F00',backgroundColor:'#fff',borderWidth:1}]}>
                                    <Text style={{fontSize:14,fontWeight:'bold',color:'#F19F00'}}>Upcoming</Text>
                                </View>
                                <View>
                                    <Text style={[styles.feestypetext,,{fontSize:14}]}>₹ {item.amount}</Text>
                                    <Text style={[styles.feestypetext,,{fontSize:10}]}>Second</Text>
                                </View>
                            </View>
                            <View style={{padding:10}}>
                                <Text style={[styles.feestypetext,{fontSize:18,opacity:0.5}]}>Tutuion Fee for SEM-1</Text>
                                <Text style={[styles.feestypetext,,{fontSize:15}]}>Due: {item.date_left.split("(")[0]} <Text style={{color:'#F19F00'}}> ({item.date_left.split('(')[1]}</Text></Text>
                            </View>
                        </View>
                    </View>
                ))

            }
            </View>
        )
    }
    const Images = () =>{
        return(
            <View style={{flex:1,margin:15}}>
                <View style={{height:230,width:'100%',backgroundColor:'#fff',borderRadius:20}}>
                <View style={{flexDirection:'row',marginTop:20,padding:10,columnGap:20}}>
                        <View style={{height:30,width:100,backgroundColor:'#DCF2FF',borderRadius:20,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:14,fontWeight:'bold',color:'#1D2F59'}}>Tution</Text>
                        </View>
                        <View style={{height:30,width:100,backgroundColor:'#fff',borderWidth:1,borderColor:'#00C3AC',borderRadius:20,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:14,fontWeight:'bold',color:'#00C3AC'}}>Paid</Text>
                        </View>
                    </View>
                    <Text style={{fontSize:18,fontWeight:'bold',color:'#1D2F59',opacity:0.5,left:20}}>Tutuion Fee for SEM-1</Text>
                    <View style={{height:50,width:'90%',backgroundColor:'#CDF5F7',margin:10,alignSelf:'center',borderRadius:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:10}}>
                        <Text style={{fontSize:12,fontWeight:'bold',color:'#1D2F59'}}>First Paid: 12 Jun 2022</Text>
                        <Text style={{fontSize:12,fontWeight:'bold',color:'#00C3AC'}}>₹ 15,000</Text>
                        <Text style={{fontSize:12,fontWeight:'bold',color:'#1D2F59',textDecorationLine:'underline'}}>Invoice</Text>
                    </View>
                    <View style={{height:50,width:'90%',backgroundColor:'#CDF5F7',margin:10,alignSelf:'center',borderRadius:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:10}}>
                        <Text style={{fontSize:12,fontWeight:'bold',color:'#1D2F59'}}>First Paid: 12 Jun 2022</Text>
                        <Text style={{fontSize:12,fontWeight:'bold',color:'#00C3AC'}}>₹ 15,000</Text>
                        <Text style={{fontSize:12,fontWeight:'bold',color:'#1D2F59',textDecorationLine:'underline'}}>Invoice</Text>
                    </View>
                </View>
            </View>
        )
    }

    const handleTabPress = (tabId) => {
        setSelectedTab(tabId);       
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
                            <Text style={styles.headerText}>Billing</Text>
                        </View>
                        <View>
                        </View>          
                    </View>
                    <View style={{flex:1}}>
                        <View style={{borderRadius:20,margin:20,height:50,width:'90%',backgroundColor:'#fff',borderWidth:1,borderColor:'#0BCCD8',justifyContent:'space-around',padding:10,flexDirection:'row',bottom:10}}>
                            <Image source={require('../../assets/profile/bill_1.png')} style={{height:30,width:30,resizeMode:'contain'}}/>
                            <Text style={{fontSize:18,color:'#1D2F59',fontWeight:'bold'}}>Bill Reminder is {isEnabled ? "ON" : "OFF"}</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        
                        </View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{bottom:20,left:20}}>
                                <View style={styles.tabsContainer}>
                                {tabs.map((tab) => (
                                    <TouchableOpacity
                                        key={tab.id}
                                        style={[styles.tab, selectedTab === tab.id ]}
                                        onPress={() => handleTabPress(tab.id)}
                                    >
                                        <View style={[styles.smalbox,selectedTab === tab.id && styles.activeTab]}>
                                            <Text style={styles.tabText}>{tab.title}</Text>
                                        </View>                                
                                    </TouchableOpacity>
                                ))}
                                </View>
                            </ScrollView>
                            <View style={{marginRight:20,marginLeft:20,borderRadius:20,height:50,width:'90%',backgroundColor:'#fff',borderWidth:1,borderColor:'#0BCCD8',justifyContent:'space-around',padding:10,top:15,flexDirection:'row',alignItems:'center'}}>
                                <Text style={{fontSize:15,color:'#1D2F59',fontWeight:'bold'}}>Overall Pending Fee Due</Text>
                                {
                                    !loading?<Text style={{fontSize:15,color:'#329AD6',fontWeight:'bold'}}>₹ {data.data.upcomming_total}</Text>:
                                    <Text style={{fontSize:15,color:'#329AD6',fontWeight:'bold'}}>:-</Text>
                                }
                            </View>
                    </View>
                    
                </View>
                <View style={{height:15}}>

                </View>
                
                <ScrollView style={{flex:1}}>
                    <View style={{paddingBottom:20}}>
                        {
                            !loading?(
                                <View style={styles.contentContainer}>
                                    {tabs[selectedTab].id == 0?(
                                        <View>
                                            <All />
                                        </View>
                                    ):null}
                                    {tabs[selectedTab].id == 1?(
                                        <View>
                                            <Video />
                                        </View>
                                    ):null}
                                    {/* {tabs[selectedTab].id == 2?(
                                        <View>
                                            <Images />
                                        </View>
                                    ):null} */}
                                    {tabs[selectedTab].id == 2?(
                                        <View>
                                            <Upcoming />
                                        </View>
                                    ):null}
                                </View>
                            ):(
                                <View>
                                    {
                                        data?(<View style={{justifyContent:'center',alignItems:'center',flex:1,marginTop:200}}>
                                            <Text style={{fontSize:18,fontWeight:'bold',color:'red'}}>{data.msg}</Text>
                                            </View>):<ActivityIndicator size="large" color="#0000ff" />
                                    }                                        
                                </View>
                            )
                        }
                         {/* Display content based on selected tab */}
                         
                    </View>
                </ScrollView>

                </View>
        </LinearGradient>
        </>
    )
}

export default Fees;

const styles = StyleSheet.create({
    smalbox:{
        height:50,
        width:100,
        backgroundColor:'#273746',
        borderWidth:0.5,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        margin:10,
        borderColor:'#273746'
    },
    fittotext:{
        flexDirection:'row',
        justifyContent:'space-evenly'
        ,marginTop:20
    },
    headerPad:{
        height:320,
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
    logo:{
        height:20,
        width:20
    },
    tabsContainer: {
        flexDirection: 'row',
      },
      tab: {
        
      },
      activeTab: {
        borderBottomWidth: 2,
        backgroundColor:'#329AD6'
      },
      tabText: {
        fontSize: 16,
        color:'#fff',
        fontWeight:'bold'
      },
      contentContainer: {
        flex: 1,
      },
      feestypebox:{
        height:30,
        width:100,
        backgroundColor:'#DCF2FF',
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center'
      },
      feestypetext:{
        fontWeight:'bold',
        color:'#1D2F59'
      }
})