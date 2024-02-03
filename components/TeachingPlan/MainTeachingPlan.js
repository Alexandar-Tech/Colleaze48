import React, { useEffect, useState } from 'react';
import { View, Text,TouchableOpacity,StyleSheet,ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import DropdownComponent from '../Attendance/DropDownComponent';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import Collapse from './Collapse';
import axios from 'axios';
import { API_TEACHINGPLAN,API_TEACHINGPLANCOLLEGE } from '../../APILIST/ApiList';

function MainTeachingPlan({ route,navigation }) {
    const TeachingData = route['params']['LoginData']['data']
    const token = TeachingData['token']
    const org_type = TeachingData['org'][0]['type']
    // const standard_d =  TeachingData['student_detail']['standard_id']


    let API_URL = API_TEACHINGPLAN;
    let user_data ={
        "standard_id" : TeachingData['student_detail']['standard_id']
    }
    if(org_type=='college'){
        API_URL = API_TEACHINGPLANCOLLEGE;
        user_data={
            "clg_section_id" : TeachingData['student_detail']['clg_section_id'],
        }
    }   

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

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
            console.log(error)
        setData(null);
        });
    }, []);

    return(
        <>
        <LinearGradient
            colors={['skyblue', 'white']}
            style={{flex:1}}
            >
        <View style={{flex:1}}>
            <View style={styles.headerpad}>
                <View style={styles.headpadCss}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <View style={styles.headpad}>
                            <Icon name="chevron-left" size={30}/>
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.headerText}>Teaching Plan</Text>
                    </View>
                    <View>
                    </View>           
                </View>
                <View style={{height:150,width:'90%',backgroundColor:'#fff',borderRadius:20,alignSelf:'center',top:20}}>
                    <View style={{margin:10}}>
                        <DropdownComponent name={'Select Semester'}/>
                    </View>
                    <View style={{margin:10}}>
                        <DropdownComponent name={'Select Subject'}/>
                    </View>
                </View>
            </View>
            <ScrollView style={{flex:1}}>
                <View style={{padding:20,paddingVertical:80}}>
                    {
                        loading?(
                            <View>
                                <ActivityIndicator size="large" color="#0000ff" />
                            </View>                            
                        ):(
                            <View>
                                <Text style={{fontSize:18,color:'#1D2F59',fontWeight:'bold'}}>Lesson Plan</Text>
                                <Collapse val={data} token={token}/>
                            </View>                            
                        )
                    }
                    
                </View>
            </ScrollView>

        </View>
        </LinearGradient>
        </>
    )

}
export default MainTeachingPlan;

const styles = StyleSheet.create({
    headerpad:{
        height:220,
        backgroundColor:'#1D2F59',
        borderRadius:20
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

})