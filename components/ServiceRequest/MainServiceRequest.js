import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity,StyleSheet,ScrollView,ActivityIndicator,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
import { LinearGradient } from 'expo-linear-gradient';
import { RadioButton } from 'react-native-paper';
import { API_SERVICE_REQUEST,API_SERVICE_TYPE } from '../../APILIST/ApiList';
import axios from 'axios';

const MainServiceRequest = ({route,navigation}) => {
  const ComplaintData = route['params']['LoginData']['data']
  const token = ComplaintData['token']
  const [checked, setChecked] = useState(1);
  const user_id = ComplaintData['user_detail']['user_id']
  const clg_section_id =  ComplaintData['student_detail']['clg_section_id']
  const org_id = ComplaintData['org'][0]['id']
  const [description,setDescription] = useState(null);
  const [data, setData] = useState(null);
  const [typeData, setTypeData] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleRadioChange = (value) => {
    setChecked(value);
  };

    useEffect(() => {
    axios.post(API_SERVICE_TYPE,{
        "org_id" : org_id
    },
    {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        },
    })
    .then(response => {
        setTypeData(response.data);
        setChecked(response.data.data[0].id)
        setLoading(false)
    })
    .catch(error => {
        setTypeData(null);
    });
}, []);

const UploadCompliant = async () => {
    const resp = await fetch(API_SERVICE_REQUEST,{
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        "user_id" : user_id,
        "org_id" : org_id,
        "clg_section_id" : clg_section_id,
        "service_request_type_id" : checked,
        "description" : description 
      }),

    })    
    const response = await resp.json();
    if(response.statusCode == 200){
        Alert.alert(response.msg)
        navigation.navigate('ServiceRequest',{
            Data:ComplaintData
        })
    }
    else{
        Alert.alert(response.msg)
    }

    setData(response)
  };

  return (
    <View style={{flex:1}}>
        <LinearGradient
            colors={['skyblue', 'white']}
            style={{flex:1}}
            >
                <View style={styles.headerpad}>
                    <View style={styles.headpadCss}>
                        <TouchableOpacity onPress={()=>navigation.goBack()}>
                            <View style={styles.headpad}>
                                <Icon name="chevron-left" size={30}/>
                            </View>
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.headerText}>Service Request</Text>
                        </View>
                        <TouchableOpacity onPress={()=>navigation.navigate('ServiceRequest',{
                            Data:ComplaintData
                        })}>
                            <View style={[styles.headpad,{}]}>
                                <Icon name="add-to-list" size={25}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.boxpad}>
                        <RadioButton.Group onValueChange={handleRadioChange} value={checked}>
                            {
                                typeData==null?(
                                    <View>
                                        <ActivityIndicator size="large" color="#0000ff" />
                                    </View>
                                ):(
                                    <View>
                                        {
                                             typeData['data'].map((item,index)=>(
                                                <View style={{flexDirection:'row',justifyContent:'space-between'}} key={index}>
                                                    <Text style={{fontWeight:'bold',fontSize:15,paddingVertical:10}}>{item.name}</Text>
                                                    <RadioButton value={item.id} />
                                                </View>
                                             ))

                                        }
                                    
                                    </View>
                                )
                            }
                        </RadioButton.Group>                   
                    </View>
                </View>
                <View style={{marginTop:130,marginLeft:20}}>
                    <Text style={[styles.textcss,{color:'#1D2F59'}]}>Enter Requested for</Text>
                </View>
                <View style={styles.inputbox}>
                    <TextInput style={styles.TextInput} 
                    
                    multiline={true}
                    onChangeText={(text)=>setDescription(text)}
                    />
                </View>
                <TouchableOpacity style={styles.SubmitBtn} onPress={()=>UploadCompliant()}>
                    <Text style={styles.textcss}>Submit</Text>
                </TouchableOpacity>
                
      
      </LinearGradient>
    </View>
  );
};

export default MainServiceRequest;

const styles = StyleSheet.create({
    inputbox:{
        minHeight:130,
        width:'90%',
        backgroundColor:'#fff',
        marginLeft:20,
        marginTop:10,
        borderRadius:10,
        borderWidth:1,
        borderColor:"#0BCCD8"
    },
    SubmitBtn:{
        height:50,
        width:'90%',
        backgroundColor:'#0BCCD8',
        margin:30,
        alignSelf:'center',
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'
    },
    headpad:{
        height:50,
        width:50,
        borderRadius:10,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center'
    },
    boxpad:{
        borderColor:"#0BCCD8",
        borderWidth:1,
        width:'90%',
        backgroundColor:'#fff',
        alignSelf:'center',
        borderRadius:15,
        margin:10,
        top:20,
        padding:20    
    },
    textcss:{
        fontSize:18,
        fontWeight:'bold',
        color:'#fff'
    },
    headerpad:{
        flex:1,
        maxHeight:250,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
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
      RadioCss:{
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent:'space-between'
      },
      RadioTextCss:{
        fontSize:15,
        fontWeight:'bold',
        color:'#1D2F59'
      },
      TextInput: {
        height: 40,
        flex: 1,
        padding:10,
        textAlignVertical:'top',
        fontSize:13,
        fontWeight:'bold'
      },
      headpadCss:{
        flexDirection:'row',
        marginTop:60,
        justifyContent:'space-between',
        paddingHorizontal:10,
        margin:10
    },
    headerText:{
        fontSize:20,
        fontWeight:'bold',
        color:'#fff',
        top:10,
    },
})