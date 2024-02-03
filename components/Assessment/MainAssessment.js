import React, { useState,useEffect } from 'react';
import { ActivityIndicator,View, Text, StyleSheet, TouchableOpacity,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { LinearGradient } from 'expo-linear-gradient';
import { ButtonGroup } from '@rneui/themed';
import axios from 'axios';
import { API_ASSESSMENT } from '../../APILIST/ApiList';

function MainAssessment({ route,navigation }) {
    const MainAssessmentData = route['params']['LoginData']['data']
    const token = MainAssessmentData['token']
    const org_id = MainAssessmentData['org'][0]['id']
    const org_type = MainAssessmentData['org'][0]['type']    

    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedTerm, setSelectedTerm] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedIndexCollege, setSelectedIndexCollege] = useState(0);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    let tabs = []

    if(org_type=='college'){
        tabs = [
            { id: 0, title: '1st Semester ', content: '(2019-20)'},
            { id: 1, title: '2nd Semester', content: '(2019-20)' },
            { id: 2, title: '3rd Semester', content: '(2019-20)' },
            { id: 3, title: '4th Semester', content: '(2019-20)' },
            { id: 4, title: '5th Semester', content: '(2019-20)' },
            { id: 5, title: '6th Semester', content: '(2019-20)'},
            { id: 6, title: '7th Semester', content: '(2019-20)' },
            { id: 7, title: '8th Semester', content: '(2019-20)' },    
        ];
    }
    else{
        tabs = [
            { id: 0, title: 'Class 1st', content: '(2019-20)'},
            { id: 1, title: 'Class 2nd', content: '(2019-20)' },
            { id: 2, title: 'Class 3rd', content: '(2019-20)' },
            { id: 3, title: 'Class 4th', content: '(2019-20)' },
            { id: 4, title: 'Class 5th', content: '(2019-20)' },
            { id: 5, title: 'Class 6th', content: '(2019-20)'},
            { id: 6, title: 'Class 7th', content: '(2019-20)' },
            { id: 7, title: 'Class 8th', content: '(2019-20)' },
            { id: 8, title: 'Class 9th', content: '(2019-20)' },
            { id: 9, title: 'Class 10th', content: '(2019-20)' },
            { id: 10, title: 'Class 11th', content: '(2019-20)' },
            { id: 11, title: 'Class 12th', content: '(2019-20)' },
    
        ];
    }

    useEffect(() => { 
        axios.post(API_ASSESSMENT,{
            "user_id" : 153,
            "org_id": 151,
            "academic_year" : "2023-2024"  
        },{
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
            console.log(error)
          });
    }, []);



    const terms = [
        {id:0,title:'Term 1'},
        {id:1,title:'Term 2'},
        {id:2,title:'Term 3'}
    ]

    const All = () =>{
        return(
            <View>
                <Text style={{fontSize:20,fontWeight:'bold',padding:10}}>Academic</Text>
                {
                    org_type!='college'?(
                        <View>
                        <View style={{flexDirection:'row',margin:10,right:10}}>
                            {terms.map((tab) => (
                                <TouchableOpacity
                                key={tab.id}
                                style={[styles.tab, selectedTerm === tab.id ]}
                                onPress={() => handleTermPress(tab.id)}
                                >
                                    <View style={[styles.smalbox1,selectedTerm === tab.id && styles.activeTab]}>
                                        <Text style={[selectedTerm === tab.id && styles.activeTitle,{fontWeight:'bold'}]}>{tab.title}</Text>                               
                                    </View>                              
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View style={styles.boxpad}>
                        <Text style={{padding:10,fontSize:16,fontWeight:'bold',color:'#329AD6'}}>Cycle Test</Text>
                        <View style={styles.insideboxpad}>
                            <View style={{height:40,width:'95%',backgroundColor:'#1D2F59',borderRadius:10,alignSelf:'center',flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:10}}>
                                <Text style={[styles.headerTitle,{width:120}]}>Sub</Text>
                                <Text style={styles.headerTitle}>Mid Term</Text>
                                <Text style={styles.headerTitle}>Quarterly</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <Text style={[styles.letterfont,{width:120}]}>English</Text>
                                <Text style={styles.letterfont}>96</Text>
                                <Text style={styles.letterfont}>96</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <Text style={[styles.letterfont,{width:120}]}>Hindi</Text>
                                <Text style={styles.letterfont}>96</Text>
                                <Text style={styles.letterfont}>96</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <Text style={[styles.letterfont,{width:120}]}>Mathematics</Text>
                                <Text style={styles.letterfont}>96</Text>
                                <Text style={styles.letterfont}>96</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <Text style={[styles.letterfont,{width:120}]}>Science</Text>
                                <Text style={styles.letterfont}>96</Text>
                                <Text style={styles.letterfont}>96</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <Text style={[styles.letterfont,{width:120}]}>Social Science</Text>
                                <Text style={styles.letterfont}>96</Text>
                                <Text style={styles.letterfont}>96</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <Text style={[styles.letterfont,{width:120}]}>Sanskrit</Text>
                                <Text style={styles.letterfont}>96</Text>
                                <Text style={styles.letterfont}>96</Text>
                            </View>
                        </View>
                    </View>
                    </View>
                    ):
                    (
                        <View>
                            <ButtonGroup
                                buttons={['Intenal Task', 'University Exams']}
                                selectedIndex={selectedIndexCollege}
                                onPress={(value) => {
                                setSelectedIndexCollege(value);
                                }}
                                containerStyle={{ borderRadius:10,height:50,width:'100%',alignSelf:'center' }}
                                textStyle={{fontSize:12,fontWeight:'bold'}}
                                buttonStyle={{margin:3,borderBottomEndRadius:10,borderBottomStartRadius:10,borderTopStartRadius:10,borderTopEndRadius:10}}
                            />
                            <View style={styles.boxpad}>
                                {
                                    !selectedIndexCollege?(
                                        data?(                                            
                                        <View>
                                            <Text style={{padding:10,fontSize:16,fontWeight:'bold',color:'#329AD6'}}>Cycle Test</Text>
                                            <View style={styles.insideboxpad}>
                                                <View style={{flex:1,width:'95%',backgroundColor:'#1D2F59',borderRadius:10,alignSelf:'center',flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:10}}>
                                                    <Text style={[styles.headerTitle,{width:150}]}>Sub</Text>
                                                    {
                                                        data['data']['student_mark'].map((item,index)=>(
                                                            <View>
                                                                <Text style={[styles.headerTitle,{width:80}]}>{item.examType}</Text>                                                                
                                                            </View>                                                                                                                  
                                                        ))
                                                    } 
                                                </View>
                                                <View>

                                                    {
                                                        data['data']['student_mark'][0]['marks'].map((item,index)=>(
                                                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                                                <Text style={[styles.letterfont,{width:150}]}>{item.college_subject.name}</Text>
                                                                <Text style={[styles.letterfont,{marginRight:10}]}>{item.marks}</Text>
                                                                <Text style={[styles.letterfont,{marginRight:30}]}>{data['data']['student_mark'][1]['marks'][index]['marks']}</Text>
                                                            </View>                                                                                                                 
                                                        ))
                                                    }
                                                </View>
                                                
                                            </View>
                                        </View>):null
                                    ):(
                                        <View>
                                            <Text style={{padding:10,fontSize:16,fontWeight:'bold',color:'#329AD6',marginLeft:10}}>Exam Marks</Text>
                                            <View style={styles.insideboxpad}>
                                                <View style={{height:40,width:'95%',backgroundColor:'#1D2F59',borderRadius:10,alignSelf:'center',flexDirection:'row',justifyContent:'space-between',margin:10}}>
                                                    <Text style={[styles.headerTitle,{marginLeft:10}]}>Sub</Text>
                                                    <Text style={[styles.headerTitle,{marginRight:10}]}>Marks</Text>
                                                </View>
                                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                                    <Text style={[styles.letterfont,{marginLeft:10}]}>English</Text>
                                                    <Text style={[styles.letterfont,{marginRight:30}]}>96</Text>
                                                </View>
                                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                                    <Text style={[styles.letterfont,{marginLeft:10}]}>Hindi</Text>
                                                    <Text style={[styles.letterfont,{marginRight:30}]}>96</Text>
                                                    
                                                </View>
                                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                                    <Text style={[styles.letterfont,{marginLeft:10}]}>Mathematics</Text>
                                                    <Text style={[styles.letterfont,{marginRight:30}]}>96</Text>
                                                    
                                                </View>
                                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                                    <Text style={[styles.letterfont,{marginLeft:10}]}>Science</Text>
                                                    <Text style={[styles.letterfont,{marginRight:30}]}>96</Text>
                                                    
                                                </View>
                                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                                    <Text style={[styles.letterfont,{marginLeft:10}]}>Social Science</Text>
                                                    <Text style={[styles.letterfont,{marginRight:30}]}>96</Text>
                                                    
                                                </View>
                                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                                    <Text style={[styles.letterfont,{marginLeft:10}]}>Sanskrit</Text>
                                                    <Text style={[styles.letterfont,{marginRight:30}]}>96</Text>                                                    
                                                </View>
                                            </View>
                                        </View>
                                    )
                                }
                                
                            </View>
                    </View>
                    )
                }               
                <Text style={{fontSize:20,fontWeight:'bold',padding:10}}>Disciplinary Proceedings</Text>
                <View style={[styles.insideboxpad,{height:120,width:'100%'}]}>
                    {
                        <View>
                            {
                                data.data.student_decipline?(
                                    <View>
                                        {
                                            data.data.student_decipline.map((item,index)=>(
                                                <View>
                                                    <Text style={styles.fontcss}>{item.disciplinary_proceeding}</Text>
                                                </View>
                                            ))
        
                                        }                                        
                                </View>
                                ):null

                            }
                        
                        </View>
                        
                    }
                    
                </View>
                <ButtonGroup
                    buttons={['Sports Achievements', 'Extracurricular Achievements']}
                    selectedIndex={selectedIndex}
                    onPress={(value) => {
                    setSelectedIndex(value);
                    }}
                    containerStyle={{ borderRadius:10,height:50,width:'100%',alignSelf:'center' }}
                    textStyle={{fontSize:12,fontWeight:'bold'}}
                    buttonStyle={{margin:3,borderBottomEndRadius:10,borderBottomStartRadius:10,borderTopStartRadius:10,borderTopEndRadius:10}}
                />
                
                    {
                        !selectedIndex?(
                            <View style={[styles.insideboxpad,{height:120,width:'100%'}]}>
                                {
                                    data.data.student_sports_achievements.map((item,index)=>(
                                        <Text style={styles.fontcss}>{item.achievements}</Text>
                                    ))
                                }
                            </View>
                        ):(
                            <View style={[styles.insideboxpad,{height:120,width:'100%'}]}>
                               {
                                    data.data.student_extra_curricular_achievements.map((item,index)=>(
                                        <Text style={styles.fontcss}>{item.achievements}</Text>
                                    ))
                                }
                            </View>
                        )                        

                    }

                <Text style={{fontSize:20,fontWeight:'bold',padding:10}}>Remarks by Teacher</Text>
                <View style={[styles.insideboxpad,{height:120,width:'100%',backgroundColor:'#CEF5F7',height:150}]}>
                    <Text style={styles.fontcss}>“Thanks for a fantastic year at school this year! It’s been awesome to see every one grow and develop so much and our community has come together so wonderfully with all of our exciting new projects and activities. Hope you all have a fantastic summer - and looking forward to seeing back in the fall.”</Text>
                    <Text style={{textAlign:'right',fontWeight:'bold',color:'#329AD6'}}>- Denui Tenota</Text>
                </View>

                
            </View>
        )
    }
    

    const handleTabPress = (tabId) => {
        setSelectedTab(tabId);       
      };

      const handleTermPress = (tabId) => {
        setSelectedTerm(tabId);       
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
                            <Text style={styles.headerText}>Student Report</Text>
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
                                        <Text style={[styles.tabText,{fontSize:12}]}>{tab.content}</Text>
                                        
                                    </View>                              
                                </TouchableOpacity>
                            ))}
                            </View>
                        </ScrollView>
                         
                    </View>
                    
                </View>
                <ScrollView style={{flex:1}}>
                    <View style={{padding:20}}>
                        {
                            loading?(
                                <View>
                                    <ActivityIndicator size="large" color="#0000ff" />
                                </View>
                            ):
                            (
                                data?(
                                <View>
                                    <View style={{height:100,width:'100%',backgroundColor:'#fff',alignSelf:'center',borderRadius:10,margin:0.5}}>
                                        <View style={{flexDirection:'row',justifyContent:'space-around',margin:10}}>
                                            <View style={{padding:20}}>
                                                <Text style={{fontSize:20,fontWeight:'bold',color:'#1D2F59'}}>Attendance</Text>
                                            </View>
                                            <View style={{height:80,width:100,backgroundColor:'#CEF5F7',alignItems:'center',justifyContent:'center',borderRadius:10}}>
                                                <Text style={{fontSize:14,fontWeight:'bold',color:'#1D2F59'}}>{data.data.attendance}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <All />
                                </View>):
                                (
                                    <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
                                        <Text style={{fontSize:18,fontWeight:'bold',color:'red'}}>No Data Found</Text>
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

export default MainAssessment;

const styles = StyleSheet.create({
    fontcss:{
        margin:10,
        fontSize:13,
        fontWeight:'bold'
    },
    activeTitle:{
        fontSize:16,
        color:'#fff',
        fontWeight:'bold'
    },
    smalbox1:{
        height:50,
        width:90,
        backgroundColor:'#CEF5F7',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginRight:10,
        marginLeft:10,
    },
    smalbox:{
        height:50,
        width:100,
        backgroundColor:'#273746',
        borderWidth:0.5,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginRight:10,
        marginLeft:10,
        borderColor:'#273746'
    },
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
        backgroundColor:'#329AD6'
      },
      tabText: {
        fontSize: 14,
        color:'#fff',
        fontWeight:'bold'
      },
      contentContainer: {
        flex: 1,
      },
      headerTitle:{
        padding:10,
        fontSize:13,
        fontWeight:'bold',
        color:'#fff'
      },
      letterfont:{
        padding:10,
        fontSize:13,
        fontWeight:'bold',
        color:'#1D2F59',
      },
      boxpad:{
        flex:1,
        width:'100%',
        alignSelf:'center',
        backgroundColor:'#fff',
        borderRadius:20,
        borderWidth:1,
        borderColor:'#0BCCD8'
      },
      insideboxpad:{
        flex:1,
        width:'95%',
        alignSelf:'center',
        backgroundColor:'#fff',
        borderRadius:10,
        borderWidth:1,
        borderColor:'#0BCCD8',
        margin:10
      },
})