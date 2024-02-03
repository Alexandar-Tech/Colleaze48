import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  ScrollView,
  SafeAreaView,
  BackHandler,
  Alert

} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconMA from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from "react-native-modal";
import { useFocusEffect } from '@react-navigation/native';

const HomeMenu = ({ route,navigation }) =>{
    
  const HomeData = route['params']['HomeData'] 
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const ShowModal = (val) => {
    setIsVisible(!isVisible);
    if(val == 1){
        navigation.navigate('ClassTimeTable',{
            LoginData:HomeData
        })        
    }
    else{
        navigation.navigate('ExamTimeTable',{
            LoginData:HomeData
        })
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
       
       Alert.alert('Hold on!', 'Are you sure you want to go back?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => navigation.goBack()},
        ]);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );


  

  return (
    <SafeAreaView style={styles.container}>
        
            <Modal
            isVisible={isVisible}
            style={styles.modelcontainer}
            onBackdropPress={() => setIsVisible(false)}
            swipeDirection={['down']}
            onSwipeComplete={() => setIsVisible(false)}
            >
            <View style={styles.modelView}>
                <Text style={{fontSize:20,color:'#1D2F59',fontWeight:'bold',textAlign:'center'}}>Time Table Schedule</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',margin:30}}>
                <TouchableOpacity onPress={()=>ShowModal('1')}>
                    <View style={styles.TimetableBox}>
                        <LinearGradient
                        colors={['skyblue', 'white']}
                        style={{height:120,borderRadius:20}}>
                            <Image style={{height:50,width:50,alignSelf:'center',top:10}} source={require('../../assets/TimeTable/planning.png')}  />
                            <Text style={styles.textmodalcss}>Class TIme-Table</Text>
                        </LinearGradient>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>ShowModal('2')}>
                    <View style={styles.TimetableBox}>
                        <LinearGradient
                        colors={['skyblue', 'white']}
                        style={{height:120,borderRadius:20}}>
                            <Image style={{height:50,width:50,alignSelf:'center',top:10}} source={require('../../assets/TimeTable/calendar.png')}  />
                            <Text style={styles.textmodalcss}>Exam TIme-Table</Text>
                        </LinearGradient>
                    </View>
                </TouchableOpacity>
            </View>
            </View>
        </Modal>
    <ScrollView>
        <View style={[styles.fixToText,{marginTop:30}]}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <View style={[styles.box,{backgroundColor:'#1D2F59'}]}>            
                    <Icon name="menu" color='#fff' size={25}/>            
                </View>
            </TouchableOpacity>
            <View>
                <Image style={styles.logo} source={require('../../assets/Institution/Mam_logoo.png')}  />
            </View>
            <View style={[styles.box,{borderWidth:0.4,backgroundColor:'#fff'}]}>
                <IconMA name="search" color='black' size={25} />
            </View>
            <View style={[styles.box,{borderWidth:0.4,backgroundColor:'#fff'}]}>
                <IconMA name="notifications-none" color='black' size={20} />
            </View>            
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',margin:15}}>
            <Text style={styles.catText}>Hi, {HomeData.data.user_detail.name}</Text>
            <View style={{flexDirection:'row',columnGap:5}}>
                <Icon name="location-pin" size={20}/>
                <Text style={styles.catText}>Trichy</Text>
                <IconMA name="keyboard-arrow-down" size={20} style={{top:5}}/>
            </View>
        </View>
        <View style={{height:300,borderRadius:10}}>
            <LinearGradient
                colors={['skyblue', 'white']}
                style={{height:300}}
                start={{x:0.5,y:1}}
                end={{x:1,y:1}}
                >                    
                    <Image source={require('../../assets/side_menu/Banner.png')} style={{height:180,width:'95%',margin:10}}  />
                    <View style={styles.fixToText}>
                        <TouchableOpacity onPress={() => navigation.navigate('MainAttendance',{
                            LoginData:HomeData
                        })}>
                            <View style={styles.boxshadow}>
                                <Image source={require('../../assets/Home_mvp/balloons_1.png')} style={styles.imgstyle}  />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('MainTeachingPlan',{
                            LoginData:HomeData
                        })}>
                            <View style={styles.boxshadow}>
                                <Image source={require('../../assets/Home_mvp/calendar.png')} style={styles.imgstyle}  />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('MySchedule',{
                            LoginData:HomeData
                        })}>
                        <View style={styles.boxshadow}>
                            <Image source={require('../../assets/Home_mvp/money_1.png')} style={styles.imgstyle}  />
                        </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.fixToText}>
                        <Text style={styles.textcss}>Attendance</Text>
                        <Text style={styles.textcss}>Teaching Plan</Text>
                        <Text style={styles.textcss}>My Schedule</Text>
                    </View>                    
            </LinearGradient>
        </View>
        <View>
            <Text style={[styles.textcss,{fontSize:20,left:30}]}>My Academics</Text>
        </View>
        <View style={{padding:10}}>
        <View style={[styles.fixToText,{marginTop:15}]}>
            
            <TouchableOpacity onPress={()=>toggleModal()}>
                <View style={styles.boxgrey}>
                    <View style={styles.circlecss}>
                        <Image source={require('../../assets/Home_mvp/time_manage.png')} style={styles.imgstyle}  />
                    </View>
                    <Text style={[styles.textcss,{textAlign:'center'}]}>Time Table</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Fees',{
                            LoginData:HomeData
                        })}>
                <View style={styles.boxgrey} >
                    <View style={styles.circlecss}>
                        <Image source={require('../../assets/Home_mvp/money_1.png')} style={styles.imgstyle}  />
                    </View>
                    <Text style={[styles.textcss,{textAlign:'center'}]}>Fees</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('MainAssignment',{
                            LoginData:HomeData
                        })}>
                <View style={styles.boxgrey}>
                    <View style={styles.circlecss}>
                        <Image source={require('../../assets/Home_mvp/money_1.png')} style={styles.imgstyle}  />
                    </View>
                    <Text style={[styles.textcss,{textAlign:'center'}]}>Assignments</Text>
                </View> 
            </TouchableOpacity>                       
        </View>
        <View style={[styles.fixToText,{marginTop:15}]}>
            <TouchableOpacity onPress={() => navigation.navigate('MainAssessment',{
                            LoginData:HomeData
                        })}>
                <View style={styles.boxgrey}>
                    <View style={styles.circlecss}>
                        <Image source={require('../../assets/Home_mvp/money_1.png')} style={styles.imgstyle}  />
                    </View>
                    <Text style={[styles.textcss,{textAlign:'center'}]}>Assessment & Report</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ODRequest',{
                            LoginData:HomeData
                        })}>
                <View style={styles.boxgrey}>
                    <View style={styles.circlecss}>
                        <Image source={require('../../assets/Home_mvp/money_1.png')} style={styles.imgstyle}  />
                    </View>
                    <Text style={[styles.textcss,{textAlign:'center'}]}>OD / Leave</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('MainServiceRequest',{
                            LoginData:HomeData
                        })}>
                    <View style={styles.boxgrey}>
                        <View style={styles.circlecss}>
                            <Image source={require('../../assets/side_menu/books.png')} style={styles.imgstyle}  />
                        </View>
                        <Text style={[styles.textcss,{textAlign:'center'}]}>Service Request</Text>
                    </View> 
            </TouchableOpacity>                       
        </View>
        <View style={[styles.fixToText,{marginTop:15}]}>
            <TouchableOpacity onPress={() => navigation.navigate('MyPerformance',{
                            LoginData:HomeData
                        })}>
            <View style={styles.boxgrey}>
                <View style={styles.circlecss}>
                    <Image source={require('../../assets/Home_mvp/money_1.png')} style={styles.imgstyle}  />
                </View>
                <Text style={[styles.textcss,{textAlign:'center'}]}>My Performance</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Activites',{
                            LoginData:HomeData
                        })}>
            <View style={styles.boxgrey}>
                <View style={styles.circlecss}>
                    <Image source={require('../../assets/Home_mvp/money_1.png')} style={styles.imgstyle}  />
                </View>
                <Text style={[styles.textcss,{textAlign:'center'}]}>My Activities</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Event',{
                            LoginData:HomeData
                        })}>
                <View style={styles.boxgrey}>
                    <View style={styles.circlecss}>
                        <Image source={require('../../assets/Home_mvp/money_1.png')} style={styles.imgstyle}  />
                    </View>
                    <Text style={[styles.textcss,{textAlign:'center'}]}>Events</Text>
                </View> 
            </TouchableOpacity>                       
        </View>
        </View>                

    </ScrollView>
    </SafeAreaView>
  );
}

export default HomeMenu;

const styles = StyleSheet.create({
    boxgrey:{
        height:100,
        width:120,
        backgroundColor:'#CFF5F7',
        borderRadius:10,
        margin:10
    },
    circlecss:{
        height:50,
        width:50,
        borderRadius:30,
        backgroundColor:'#fff',
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        bottom:20
    },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imgcss: {
    height: 180,
    width: Dimensions.get('window').width,
  },
  container: {
    backgroundColor: '#FFFFFF',
    flex:1
  },
  logo: {
    height: 80,
    width: 140,
    resizeMode: 'contain'  
},
  catText: {
    fontSize: 20,
    color: '#1D2F59',
    fontWeight: 'bold',
  },
  box:{
    height:40,
    width:40,
    borderRadius:10,
    top:20,
    justifyContent:'center',
    alignItems:'center'
  },
  boxshadow:{
    height:60,
    width:60,
    borderRadius:10,
    backgroundColor:'#fff',
    marginRight:10,
    alignItems:'center',
    justifyContent:'center'
  },
  textcss:{
    fontSize:15,
    fontWeight:'bold',
    color:'#1D2F59'
  },
  imgstyle:{
    height:30,
    width:30
  },
  modelcontainer:{
    margin: 0,
    justifyContent:'flex-end'
  },
  modelView:{
    backgroundColor: 'white', 
    padding: 16,
    height:300,
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
    borderWidth:2,
    borderColor:'#0BCCD8'
  },
  TimetableBox:{
    height:120,
    width:120,
    backgroundColor:'#fff',
    borderWidth:0.5,
    borderRadius:20,
    borderColor:'#0BCCD8',
  },
  textmodalcss:{
    textAlign:'center',
    width:80,
    top:20,
    alignSelf:'center',
    fontSize:15,
    fontWeight:'bold',
    color:'#1D2F59'
  }
});
