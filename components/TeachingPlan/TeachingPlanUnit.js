import React, { useEffect, useState,useCallback, useRef  } from 'react';
import { View, Text,TouchableOpacity,StyleSheet,ActivityIndicator,Linking,Alert,Button,Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import DropdownComponent from '../Attendance/DropDownComponent';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { API_TEACHINGPLANUNIT,API_URL } from '../../APILIST/ApiList';
import Modal from "react-native-modal";
import YoutubePlayer from "react-native-youtube-iframe";
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';

function TeachingPlanUnit({ route,navigation }) {
    const screenWidth = Dimensions.get('screen').width;
    const [isVisible, setIsVisible] = useState(false);
    const unit_data = route['params']['unitData']
    const subName = route['params']['subName']
    const syllabus_details = route['params']['syllabus_details']
    const teacherName = route['params']['teacherName']

    const token = route['params']['token']
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);    
    const [playing, setPlaying] = useState(false);
    const [videoLink, setVideoLink] = useState(null);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
        setPlaying(false);
        Alert.alert("video has finished playing!");
        }
    }, []);

    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
        
    }, []);

    const toggleModal = useCallback((videolink) => {
        console.log(videolink)
        if(videolink == null){
            Alert.alert('Video link null!')
        }else{
            setIsVisible((prev) => !prev);
            setVideoLink(videolink.split('=')[1])
        }
        
    }, []);

    const downloadFromUrl = async (lecture_notes) => {
        if(lecture_notes == null){
            Alert.alert('Lecture Notes null!')
            return
        }
        const filename = lecture_notes.split('/')[1]
        const result = await FileSystem.downloadAsync(
          API_URL+'lecture_notes/',
          FileSystem.documentDirectory + filename
        );
    
        save(result.uri, filename, result.headers["Content-Type"]);
      };


      const save = async (uri, filename, mimetype) => {
        if (Platform.OS === "android") {
          const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
          if (permissions.granted) {
            const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
            await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
              .then(async (uri) => {
                await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
                Alert.alert('Download Successful !!')
              })
              .catch(e => console.log(e));
          } 
        } else {
          shareAsync(uri);
        }
      };

    const openBrowser = async (url) => {
        if(!url){
            Alert.alert(`Cannot open URL`);
        }       
        // Open the URL in the default web browser
        const supported = await Linking.canOpenURL(url);     
    
        if (supported) {
          await Linking.openURL(url);
        }else{
            Alert.alert(`Please Mention Correct URl !!`);
        }
    }

    useEffect(() => {
        axios.post(API_TEACHINGPLANUNIT,
        {
            "syllabus_detail_id" : syllabus_details
        }
        ,{
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

    return(
        <>
        <LinearGradient
            colors={['skyblue', 'white']}
            style={{flex:1}}
           >
            <Modal
            isVisible={isVisible}
            onBackdropPress={() => setIsVisible(false)}
            swipeDirection={['down']}
            onSwipeComplete={() => setIsVisible(false)}
            >
              <View style={styles.modelView}>
                <View style={styles.container}>
                    <YoutubePlayer
                        height={200}
                        play={playing}
                        videoId={videoLink}
                        onChangeState={onStateChange}
                    />
                    <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
                </View>
                
              </View>
        </Modal>
        <View style={{flex:1}}>
            <View style={styles.headerpad}>
                <View style={styles.headpadCss}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <View style={styles.headpad}>
                            <Icon name="chevron-left" size={30}/>
                        </View>
                    </TouchableOpacity>
                    <View style={{width:'60%'}}>
                        <Text style={styles.headerText}>{subName}</Text>
                    </View>
                    <View style={[styles.headpad,{opacity:0}]}>
                    </View>           
                </View>
                {
                    teacherName?(
                        <View style={{height:30,width:130,backgroundColor:'#fff',alignSelf:'center',alignItems:'center',justifyContent:'center',borderRadius:20}}>
                            <Text style={{fontSize:15,fontWeight:'bold',color:'#1D2F59'}}>{teacherName.user.user_detail.name}</Text>
                        </View>
                    ):null
                }
                
                <View style={{position:'absolute',marginTop:150}}>
                    <View style={{height:200,width:screenWidth-20,backgroundColor:'#329AD6',alignSelf:'center',borderRadius:20,margin:10}}>
                        <ScrollView>
                            <View style={{padding:20}}>
                                <View style={{width:'90%',backgroundColor:'#fff',margin:10,borderRadius:10,padding:10}}>
                                    <Text style={{fontWeight:'bold'}}>{unit_data.unit}</Text>
                                </View>
                                <View>
                                    <Text style={{color:'#fff',alignSelf:'flex-start',fontSize:15,fontWeight:'bold'}}>Introduction</Text>
                                    <Text style={{fontSize:15,fontWeight:'bold',padding:5}}>{unit_data.syllabus}</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
                
                
            </View>
            <View style={{height:120}}></View>
            
            <ScrollView style={{flex:1}}>
                <View style={{padding:20}}>                   
                    <View>
                        <DropdownComponent name={'Frequently Asked Questions'} />
                    </View>
                    {
                        loading?(
                            <View>
                                <ActivityIndicator size="large" color="#0000ff" />
                            </View>
                        ):(
                            
                            data['success'] == 1?(
                                <View>
                                {
                                    data['data'].map((item,index)=>(
                                        <View key={index}>
                                            {
                                                item.map((val,itemindex)=>(
                                                    <View key={itemindex}>
                                                        <View style={{width:'100%',alignSelf:'center',backgroundColor:'#fff',borderWidth:1,borderRadius:10,borderColor:'#0BCCD8',margin:10}}>
                                                            <Text style={{fontSize:16,fontWeight:'bold',padding:10,color:'#1D2F59'}}>{index+1}.{itemindex+1}_{val.sub_topic_name}</Text>
                                                            <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                                                                <TouchableOpacity style={[styles.referBox,{backgroundColor:'#329AD6'}]} onPress={()=>toggleModal(val.video_link)}>
                                                                    <Text style={styles.textcss}>Refer Video</Text>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity style={[styles.referBox,{backgroundColor:'#0BCCD8'}]} onPress={()=>openBrowser(val.text_book)}>
                                                                    <Text style={styles.textcss}>Refer Text Book</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                            <TouchableOpacity style={[styles.referBox,{backgroundColor:'#fff',margin:10,width:'90%',borderWidth:1,borderColor:'#0BCCD8',}]} onPress={()=>downloadFromUrl(val.lecture_notes)}>
                                                                <Text style={[styles.textcss,{color:'#1D2F59'}]}>Lecture Notes</Text>
                                                            </TouchableOpacity>                                                            
                                                        </View>                                                
                                                    </View>
                                                ))
                                            }                                            
                                        </View>
                                    ))
                                }
                            </View>
                            ):(
                                <View style={{alignItems:'center',margin:30}}>
                                    <Text style={{fontSize:20,fontWeight:'bold',color:'red'}}>No Data Found</Text>                                    
                                </View>
                            )
                        )
                    }
                </View>
            </ScrollView>

        </View>
        </LinearGradient>
        </>
    )

}
export default TeachingPlanUnit;

const styles = StyleSheet.create({
    headerpad:{
        maxHeight:250,
        backgroundColor:'#1D2F59',
        borderBottomEndRadius:20,
        borderBottomStartRadius:20,
        flex:1
    },
    headpadCss:{
        flexDirection:'row',
        marginTop:60,
        justifyContent:'space-evenly',
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
        fontSize:17,
        fontWeight:'bold',
        color:'#fff',
        top:10,
        textAlign:'center'
    },
    referBox:{
        height:40,
        width:'45%',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center'
    },
    textcss:{
        color:'#fff',
        fontWeight:'bold'
    },
    modelView:{
        backgroundColor: 'white', 
        padding: 16,
        borderRadius:20,
        borderWidth:2,
        borderColor:'#0BCCD8',        
        height:280       
      },
      container: {
        flex: 1,
      },
      video: {
        alignSelf: 'center',
        width: '100%',
        height: 200,
      },
      buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },

})