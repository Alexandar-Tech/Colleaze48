import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ScrollView,Image,ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconAN from 'react-native-vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';

function TrackStatus({ route,navigation }) {
    const [selectedTab, setSelectedTab] = useState(0);
    const [checkData,setCheckData] = useState(false);   

    const tabs = [
        { id: 0, title: 'Leave Request'}
    ];

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

    const Bonafide = () =>{
        return(
            <View>
                <Text style={{fontSize:20,fontWeight:'bold',}}>Bonafide Certificate</Text>
                <View style={{flexDirection:'row',columnGap:20,paddingRight:10,paddingTop:10}}>
                    {!checkData?
                    <IconAN name="checkcircle" size={20} color={'#0BCCD8'}/>:(
                    <View style={{height:20,width:20,borderRadius:20,backgroundColor:'#fff'}}>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <ActivityIndicator size="small" color="#0000ff" />
                        </View>
                        
                    </View>)
                    }
                    <Text style={styles.textcss}> Request Received</Text>
                </View>
                <VerticalDottedLine />
                <View style={{flexDirection:'row',columnGap:20,paddingRight:10,paddingTop:10}}>
                    <IconAN name="checkcircle" size={20} color={'#0BCCD8'}/>
                    <Text style={styles.textcss}> Approved by Class Advisor</Text>
                </View>
                <VerticalDottedLine />
                <View style={{flexDirection:'row',columnGap:20,paddingRight:10,paddingTop:10}}>
                    {checkData?
                    <IconAN name="checkcircle" size={20} color={'#0BCCD8'}/>:(
                    <View style={{height:20,width:20,borderRadius:20,backgroundColor:'#fff'}}>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <ActivityIndicator size="small" color="#0000ff" />
                        </View>
                        
                    </View>)
                    }
                    <Text style={styles.textcss}>Approved by HOD</Text>
                </View>
                <VerticalDottedLine />
                <View style={{flexDirection:'row',columnGap:20,paddingRight:10,paddingTop:10}}>
                    {checkData?
                    <IconAN name="checkcircle" size={20} color={'#0BCCD8'}/>:(
                    <View style={{height:20,width:20,borderRadius:20,backgroundColor:'#fff'}}>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            
                        </View>
                        
                    </View>)
                    }
                    <Text style={styles.textcss}>Approved by Principal</Text>
                </View>
                <VerticalDottedLine />
                <View style={{flexDirection:'row',columnGap:20,paddingRight:10,paddingTop:10}}>
                    {checkData?
                    <IconAN name="checkcircle" size={20} color={'#0BCCD8'}/>:(
                    <View style={{height:20,width:20,borderRadius:20,backgroundColor:'#fff'}}>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            
                        </View>
                        
                    </View>)
                    }
                    <Text style={styles.textcss}>Certificate Generated</Text>
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
                            <Text style={styles.headerText}>Track Status</Text>
                        </View>
                        <View></View>          
                    </View>
                    <View style={{flex:1}}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={styles.tabsContainer}>
                            {tabs.map((tab) => (
                                <TouchableOpacity
                                key={tab.id}
                                style={[styles.tab, selectedTab === tab.id ]}
                                onPress={() => handleTabPress(tab.id)}
                                >
                                    <View style={[styles.smalbox,selectedTab === tab.id && styles.activeTab]}>
                                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                            <View style={{top:40}}>
                                                <Text style={[styles.tabText,{padding:10}]}>{tab.title}</Text>
                                                <Text style={[styles.tabText,{padding:10,fontSize:12}]}>Status<Text style={{color:'#FFB800'}}>Request approved by HOD</Text></Text>
                                            </View>
                                            <View>
                                                <Image source={require('../../assets/service_req/service_img.png')} style={{height:140,width:70,resizeMode:'contain'}}  />
                                            </View>
                                        </View>
                                        
                                    </View>                                
                                </TouchableOpacity>
                            ))}
                            </View>
                        </ScrollView>
                    </View>
                   
                </View>
                <ScrollView style={{flex:1}}>
                    <View style={{padding:20}}>
                         <View style={styles.contentContainer}>
                         {tabs[selectedTab].id == 0?(
                            <View>
                                <Bonafide />
                                </View>
                         ):null}
                         {tabs[selectedTab].id == 1?(
                            <View>
                                <Video />
                                </View>
                         ):null}
                         {tabs[selectedTab].id == 2?(
                            <View>
                                <Images />
                                </View>
                         ):null}
                         {tabs[selectedTab].id == 3?(
                            <View>
                                <Documents />
                                </View>
                         ):null}
                         {tabs[selectedTab].id == 4?(
                            <View>
                                <Links />
                                </View>
                         ):null}

                        </View>
                    </View>
                </ScrollView>

                </View>
        </LinearGradient>
        </>
    )
}

export default TrackStatus;

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