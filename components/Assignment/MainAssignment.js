import React, { useEffect, useState } from 'react';
import { Image,View, ScrollView, Text,TouchableOpacity,ActivityIndicator,StyleSheet } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Entypo';
import { ButtonGroup } from '@rneui/themed';
import { API_ASSIGNMENT,API_ASSIGNMENT_COLLEGE } from '../../APILIST/ApiList';
import { LinearGradient } from 'expo-linear-gradient';

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

const MainAssignment = ({route,navigation}) => {
    const AssignData = route['params']['LoginData']['data']
    const token = AssignData['token']
    const org_id = AssignData['org'][0]['id']
    const standard_d =  AssignData['student_detail']['standard_id']
    const section_id =  AssignData['student_detail']['section_id']
    const user_id =  AssignData['user_detail']['user_id']
    const org_type = AssignData['org'][0]['type']
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const colors = ['#3A72A0', '#689698', '#0BCCD8',];  

    let API_URL = API_ASSIGNMENT;
    let user_data ={
      "org_id" : org_id ,
      "standard_id" : standard_d,   
      "section_id" : section_id,
      "user_id" : user_id,
    }
    if(org_type=='college'){
        API_URL = API_ASSIGNMENT_COLLEGE;
        user_data={
          "org_id" : org_id ,
          "clg_section_id" : AssignData['student_detail']['clg_section_id'],
          "user_id" : user_id,
        }
    }
    

    useEffect(() => {
          axios.post(API_URL,user_data,{
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
              console.log(error.response.data)
              setData(error.response.data);
            });
      }, []);    
  return (
    <View style={{ flex: 1 }}>
            <LinearGradient
            colors={['skyblue', 'white']}
            style={{flex:1}}>
      {/* Header */}
      <View style={styles.headerPad}>
          <View style={styles.headpadCss}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
              <View style={styles.headpad}>
                <Icon name="chevron-left" size={30}/>
              </View>
            </TouchableOpacity>
            <View>
              <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold',color:'#fff'}}>Assignment</Text>
            </View>
            <TouchableOpacity style={styles.headpad} onPress={()=>navigation.navigate('AssignmentFilter')}>
            <Image style={styles.logo} source={require('../../assets/EducationalLoan/Vector.png')} />
            </TouchableOpacity>            
          </View>
          <ButtonGroup
                buttons={['Pending Assignment', 'Submitted Assignment']}
                selectedIndex={selectedIndex}
                onPress={(value) => {
                    setSelectedIndex(value);
                }}
                containerStyle={{ borderRadius:10,height:50,marginTop:20 }}
                textStyle={{fontSize:14,fontWeight:'bold'}}
                buttonStyle={{margin:3,borderBottomEndRadius:10,borderBottomStartRadius:10,borderTopStartRadius:10,borderTopEndRadius:10}}
            /> 
        </View>

      {/* Middle Scrollable Content */}

      <ScrollView style={{ flex: 1 }}>
        {/* Content goes here */}
        <View style={{ padding: 20 }}>
        
          {
            loading?
                (
                  <View style={{flex:1}}>
                        {
                          data?(
                            <View style={{alignItems:'center'}}>
                              <Text style={{fontSize:15,fontWeight:'bold',color:'red'}}>{data.msg}</Text>
                              </View>
                          ):<ActivityIndicator size="large" color="#0000ff" />
                        }
                    </View>
                ):(<View>
                  {                    
                      !selectedIndex?(     
                        data['data']['pending_assignment'].length == 0?(
                          <View style={{alignItems:'center',margin:30}}>
                            <Text style={{fontSize:16,color:'red',fontWeight:'bold'}}>Pending Assignment Not Found</Text>
                          </View>
                        ):(                                
                          data['data']['pending_assignment'].map((item,index) => (
                              <View style={{flexDirection:'row',justifyContent:'space-between'}} key={item.id}>
                                  <View style={{marginTop:15}}>
                                      <Text style={{fontSize:16,fontWeight:'bold',color:'#1D2F59',width:40,textAlign:'center'}}>{item.day_left}</Text>
                                      <VerticalDottedLine />
                                  </View>
                                  <TouchableOpacity style={{width:'100%'}} onPress={()=>navigation.navigate('TopicAssignment',{
                                      Sub_data:item,
                                      token:token,
                                      userid:user_id,
                                  })}>
                                      <View style={{height:130,width:'85%',backgroundColor:colors[index%3],margin:10,borderRadius:20,}}>
                                          <View style={{margin:15}}>
                                          <Text style={{fontSize:20,fontWeight:'bold',color:'#FFFFFF'}}>{item.subject.name}</Text>
                                          <Text style={{fontSize:15,fontWeight:'bold',color:'#FFFFFF'}}>{item.teaching_plan_detail.sub_topic_name}</Text>
                                          </View>
                                          <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                                            {
                                              item.subject.teacher?(
                                                <View style={{height:30,width:120,backgroundColor:'#1D2F59',borderRadius:10,margin:10,alignItems:'center',justifyContent:'center'}}>
                                                  <Text style={{fontSize:12,fontWeight:'bold',color:'#8BF9FF'}}>{item.subject.teacher.user.user_detail.name}</Text>
                                              </View>
                                              ):(
                                                <View style={{height:30,width:120,borderRadius:10,margin:10}}>
                                              </View>)
                                            }
                                              
                                              <View style={{margin:10,top:5}}>
                                                  <Text style={{fontSize:13,fontWeight:'bold',color:'#fff'}}>maximum_mark : {item.maximum_mark}</Text>
                                              </View>
                                          </View>
                                      </View>
                                  </TouchableOpacity>
                              </View>
                          )))):(    
                            data['data']['submited_assignment'].length == 0?(
                              <View style={{alignItems:'center',margin:30}}>
                                <Text style={{fontSize:16,color:'red',fontWeight:'bold'}}>Sumitted Assignment Not Found</Text>
                              </View>
                            ):(    
                                                         
                              data['data']['submited_assignment'].map((item,index) => (
                                  <View style={{flexDirection:'row',justifyContent:'space-between'}} key={item.id}>
                                      <View style={{marginTop:15}}>
                                          <Text style={{fontSize:12,fontWeight:'bold',color:'#1D2F59',width:70,}}>{item.last_submit_date}</Text>
                                          <VerticalDottedLine />
                                      </View>
                                      <View style={{height:120,width:'78%',backgroundColor:colors[index%3],margin:10,borderRadius:20,}}>
                                          <View style={{margin:15}}>
                                          <Text style={{fontSize:20,fontWeight:'bold',color:'#FFFFFF'}}>{item.subject.name}</Text>
                                          <Text style={{fontSize:15,fontWeight:'bold',color:'#FFFFFF'}}>{item.teaching_plan_detail.sub_topic_name}</Text>
                                          </View>
                                          <View style={{margin:15}}>
                                              <Text style={{fontSize:15,fontWeight:'bold',color:'#FFFFFF'}}>Marks Obtained : {item['student_assignment'][0]['mark_obtained']?<Text>{item['student_assignment'][0]['mark_obtained']}/{item.maximum_mark}</Text>:<Text>-</Text>}</Text>
                                          </View>
                                          
                                      </View>
                                  </View>
                              ))))}
                  </View>)
          }
          {/* Add more content as needed */}
          
        </View>
        
      </ScrollView>
      </LinearGradient>

      {/* Footer */}
    </View>
  );
};

export default MainAssignment;

const styles = StyleSheet.create({
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
    fontSize:17,
    fontWeight:'bold',
    color:'#fff',
    top:10,
},
logo:{
    height:20,
    width:20
},
boxcss:{
  height:150,
  width:'100%',
  backgroundColor:'#fff',
  margin:10,
  borderRadius:20,
  borderWidth:1,
  borderColor:'#0BCCD8',
  alignSelf:'center'
},
miclogo:{
  height:100,
  width:100,
  resizeMode:'contain'
},
});
