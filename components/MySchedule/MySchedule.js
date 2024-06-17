import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity,StyleSheet,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
import Calendar from '../TimeTable/Calendar';
import { LinearGradient } from 'expo-linear-gradient';
import ComingSoon from '../ComingSoon/ComingSoon';

const MySchedule = ({navigation}) => {
  
  const colors = ['#3A72A0', '#689698', '#0BCCD8',]; 
  const [loading, setLoading] = useState(false);
  const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-based
    const day = today.getDate();

    const todayDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    const [selectedDate, setSelectedDate] = useState(todayDate);

  const temp_data = [
    {
    "id":1,
    "name":"Event",
    "Topic_name" : "Topic : Stress Management",
    "teachername" :"Alex Bell",
    "Meet_Type":"Google",
    "start_time":'7.00',
    "End_time":'10.00'
  },
  {
    "id":2,
    "name":"Mid term Exam",
    "Topic_name" : "Subject : Manufacturing Technology",
    "teachername" :"Alex Bell",
    "Meet_Type":"Google",
    "start_time":'7.00',
    "End_time":'10.00'
  },
  {
    "id":3,
    "name":"Event",
    "Topic_name" : "Topic : Future Technologies",
    "teachername" :"Alex Bell",
    "Meet_Type":"Google",
    "start_time":'7.00',
    "End_time":'10.00'
  },
  {
    "id":4,
    "name":"Assignment",
    "Topic_name" : "Subject : Manufacturing Technology",
    "teachername" :"Alex Bell",
    "Meet_Type":"Google",
    "start_time":'7.00',
    "End_time":'10.00'
  },
]

  const VerticalDottedLine = () => {
    return (
      <View style={{
        borderLeftWidth: 1,
        borderLeftColor: '#0BCCD8',
        borderStyle: 'dotted',
        // Adjust the height as needed
        marginRight: 10, // Adjust spacing
        marginLeft: 20, // Adjust spacing
        height:80,
        marginTop:5
      }} />
    );
  };  

  return (
    <View style={{flex:1}}>
        <LinearGradient
            colors={['skyblue', 'white']}
            style={{flex:1}}>
        <View style={styles.headerpad}>
            <View style={{flexDirection:'row',marginTop:60,paddingHorizontal:10,justifyContent:'space-between'}}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <View style={styles.backpad}>
                        <Icon name="chevron-left" size={30}/>
                    </View>
                </TouchableOpacity>
                <View>
                    <Text style={{fontSize:20,fontWeight:'bold',color:'#fff',top:10}}>My Schedule</Text>
                </View> 
                <View></View>           
            </View>
            <Calendar onSelectDate={setSelectedDate} selected={selectedDate} />
        </View>
        <ScrollView style={{ flex: 1 }}>
            <View style={{padding:20}}>
              {
                loading?(
                  <View style={{justifyContent:'center',alignItems:'center',marginTop:200}}>
                      <ComingSoon />
                  </View>
                ):(
                  <View>
                    <Text style={styles.textcss}>Today</Text>
                      {
                        temp_data?(
                        temp_data.map((item,index)=>(
                        <View style={{flexDirection:'row',justifyContent:'space-between'}} key={item.id}>
                            <View style={{marginTop:15}}>
                                <Text style={{fontSize:12,fontWeight:'bold',color:'#1D2F59',width:40,textAlign:'center'}}>{item.start_time}</Text>
                                <Text style={{fontSize:12,fontWeight:'bold',color:'#1D2F59',width:40,textAlign:'center'}}>{item.End_time}</Text>
                                <VerticalDottedLine />
                            </View>
                            <TouchableOpacity style={{width:'100%'}}>
                                <View style={{height:130,width:'85%',backgroundColor:colors[index%3],margin:10,borderRadius:20,}}>
                                    <View style={{margin:15}}>
                                    <Text style={{fontSize:20,fontWeight:'bold',color:'#FFFFFF'}}>{item.name}</Text>
                                    <Text style={{fontSize:14,fontWeight:'bold',color:'#FFFFFF'}}>{item.Topic_name}</Text>
                                    </View>
                                    <View style={{flexDirection:'row',justifyContent:'space-between',margin:20}}>
                                          <Text style={{fontSize:15,fontWeight:'bold',color:'#8BF9FF'}}>{item.teachername}</Text>
                                          <Text style={{fontSize:13,fontWeight:'bold',color:'#fff'}}>{item.Meet_Type}</Text>                                              
                                    </View>
                                </View>
                            </TouchableOpacity>
                          </View>))

                    ):null
                }                    

                  </View>
                )
              }
                
                
                
            </View>
        </ScrollView>
        </LinearGradient>
    </View>

  );
};

export default MySchedule;

const styles = StyleSheet.create({
    textcss:{
        fontSize:25,
        fontWeight:'bold',
        color:'#1D2F59'
    },
    headerpad:{
        height:220,
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
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
})
