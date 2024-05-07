import React, { useState,useEffect } from 'react';
import { View, Button, Text, StyleSheet, ActivityIndicator,Image, TouchableOpacity,ScrollView,Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { LinearGradient } from 'expo-linear-gradient';
import { Dropdown } from 'react-native-element-dropdown';
import { API_GALLERY,API_URL,API_GETACADEMICYEAR } from '../../APILIST/ApiList';
import axios from 'axios';

function Gallery({ route,navigation }) {
    const screenHeight = Dimensions.get('screen').height;
    const GalleryData = route['params']['HomeData']['data']
    const token = GalleryData['token']
    const [value, setValue] = useState(null);
    const [dropId, setDropId] = useState(null);
    const org_id = GalleryData['org'][0]['id']
    const [selectedTab, setSelectedTab] = useState(0);

    const [data, setData] = useState(null);
    const [galleryDataVal, setGalleryDataVal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data when the component mounts
        axios.post(API_GETACADEMICYEAR)
        .then(response => {
            setData(response.data);
            setLoading(false)
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    const DropdownComponent = (valueData) => {
        
        const [isFocus, setIsFocus] = useState(false);
        const name = valueData.name
        const dropData = valueData.dropdownData['data']
        let label_name = "academic_year"
      
        return (
          <View style={styles.container}>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={dropData}
              search
              maxHeight={300}
              labelField= {label_name}
              valueField={label_name}
              placeholder={!isFocus ? name : '...'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.academic_year);
                setDropId(item.id)
                setIsFocus(false);
              }}
            />            
          </View>
        );
      };    

    useEffect(() => { 
        if (value) {
          axios.post(API_GALLERY,{
            "org_id" : org_id,
            "academic_year_id":dropId
          },{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
          })
            .then(response => {
                setGalleryDataVal(response.data);
            })
            .catch(error => {
                setGalleryDataVal(null)
            });
        }
      }, [value]);

    const tabs = [
        { id: 0, title: 'All', content: 'Content for All'},
        { id: 1, title: 'Videos', content: 'Content for Videos' },
        { id: 2, title: 'Images', content: 'Content for Images' },
        { id: 3, title: 'Documents', content: 'Content for Documents' },
        { id: 4, title: 'Links', content: 'Content for Links' },
    ];

    const All = () =>{
        return(
            <View>                
                <Images />
            </View>
        )
    }
    const Video = () =>{
        return(
            <View style={{justifyContent:'center',alignItems:'center',margin:10}}>
                <Text style={{fontSize:20,fontWeight:'bold',}}>No Data</Text>
            </View>
        )
    }
    const Images = () =>{
        return(
            <View>
                
                {
                    galleryDataVal?
                    (
                        <View>
                            {
                                <View>
                                    {
                                        galleryDataVal['data']?(
                                            galleryDataVal['data'].map((item,index)=>(
                                                <View>
                                                    {
                                                       item.category==['Image']?(
                                                        <View style={styles.boxGallery}>
                                                            <View style={{width:100,justifyContent:'center'}}>
                                                                <Image source={{uri:API_URL+item.image}} style={{height:100,width:100,marginTop:10,resizeMode:'contain'}}  />
                                                            </View>
                                                            <View style={{width:200}}>
                                                                <Text style={[styles.textcss,{fontSize:18}]}>{item.name}</Text>
                                                                <Text style={[styles.textcss,{fontSize:15}]}>Subject : <Text style={{color:'#0BCCD8'}}>{item.subject}</Text></Text>
                                                                <Text style={[styles.textcss,{fontSize:15}]}>{item.activity_description}</Text>
                                                                <View style={styles.fittotext}>
                                                                    <Text style={[styles.textcss,{fontSize:15,opacity:0.5}]}>360 KB</Text>
                                                                    <Text style={[styles.textcss,{fontSize:15,opacity:0.5}]}>Pages</Text>
                                                                </View>
                                                                
                                                            </View>
                                                        </View>
                                                       ):
                                                       null
                                                    }                                    
                                                </View>                                    
                                            ))
                                        ):(
                                            <View style={{justifyContent:'center',alignItems:'center',flex:1,marginTop:screenHeight/3.5}}>
                                                <Text style={{fontSize:20,fontWeight:'bold',color:'red'}}>{galleryDataVal.msg}</Text>                                    
                                            </View>
                                        )
                                    }
                                </View>
                                
                            }
                        </View>
                    ):(
                        <View style={{justifyContent:'center',alignItems:'center',flex:1,marginTop:screenHeight/3}}>
                            <Text style={{fontSize:20,fontWeight:'bold',color:'red'}}>No Data Found</Text>                                    
                        </View>
                    )
                }
            </View>   
        )
    }
    const Documents = () =>{
        return(
            <View style={{justifyContent:'center',alignItems:'center',margin:10}}>
                <Text style={{fontSize:20,fontWeight:'bold',}}>Documnets Data</Text>
            </View>
        )
    }
    const Links = () =>{
        return(
            <View style={{justifyContent:'center',alignItems:'center',margin:10}}>
                <Text style={{fontSize:20,fontWeight:'bold',}}>Links Data</Text>
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
                            <Text style={styles.headerText}>Gallery</Text>
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
                                        <Text style={styles.tabText}>{tab.title}</Text>
                                    </View>                                
                                </TouchableOpacity>
                            ))}
                            </View>
                        </ScrollView>
                    </View>
                    {
                        loading?(
                            <View>
                                <ActivityIndicator size="large" color="#0000ff" />
                            </View>
                        ):(
                            <View>
                                {
                                    data?(
                                        <View style={{marginRight:20,top:20,marginLeft:20}}>
                                            <DropdownComponent name={'Academic Year 2022-23'}  dropdownData={data}/>
                                        </View>
                                    ):null
                                }
                            
                            </View>
                        )
                    }
                </View>
                <ScrollView style={{flex:1}}>
                    <View style={{padding:20}}>
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

export default Gallery;

const styles = StyleSheet.create({
    smalbox:{
        height:40,
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
        justifyContent:'space-between',
    },
    headerPad:{
        height:230,
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
      boxGallery:{
        flex:1,
        width:'100%',
        backgroundColor:'#fff',
        borderWidth:1,
        borderRadius:20,
        margin:10,
        alignSelf:'center',
        borderColor:'#0BCCD8',
        flexDirection:'row',
        justifyContent:'space-evenly',
        minHeight:150
      },
      textcss:{
        fontWeight:'bold',
        padding:5,
        color:'#1D2F59'
      },
      container: {
        backgroundColor: 'white',
        borderRadius:10,
        padding:4,
        borderColor:'#0BCCD8',
        borderWidth:1,
      },
      placeholderStyle: {
        fontSize: 16,
        fontWeight:'bold'
      },
      selectedTextStyle: {
        fontSize: 16,
        fontWeight:'bold'
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
      dropdown: {
        height: 50,
        paddingHorizontal: 8,
      },
})