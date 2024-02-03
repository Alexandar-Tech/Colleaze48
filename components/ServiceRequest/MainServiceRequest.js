import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity,StyleSheet,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
import { LinearGradient } from 'expo-linear-gradient';
import { RadioButton } from 'react-native-paper';
import { API_SERVICE_REQUEST,API_SERVICE_TYPE } from '../../APILIST/ApiList';
import axios from 'axios';

const MainServiceRequest = ({route,navigation}) => {
  const ComplaintData = route['params']['LoginData']['data']
  const token = ComplaintData['token']
  const [checked, setChecked] = useState(1);
//   const [otherschecked, setOthersChecked] = useState('idcard');
  const user_id = ComplaintData['user_detail']['user_id']
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
        setLoading(false)
    })
    .catch(error => {
        setData(null);
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
        "clg_section_id" : 9,
        "type" : checked,
        "description" : description 
      }),

    })    
    const response = await resp.json();
    setData(response)
  };

  return (
    <View style={{flex:1}}>
        <LinearGradient
            colors={['skyblue', 'white']}
            style={{flex:1}}
            >
                <View style={styles.headerpad}>
                    <View style={{flexDirection:'row',marginTop:60,paddingHorizontal:10,justifyContent:'space-between'}}>
                        <TouchableOpacity onPress={()=>navigation.goBack()}>
                            <View style={styles.backpad}>
                                <Icon name="chevron-left" size={30}/>
                            </View>
                        </TouchableOpacity>
                        <View>
                            <Text style={{fontSize:20,fontWeight:'bold',color:'#fff',top:10}}>Service Request</Text>
                        </View> 
                        <View></View>           
                    </View>
                <View style={[styles.headpad,{flex:1,minHeight:200}]}>
                    <RadioButton.Group onValueChange={(value) => handleRadioChange(value)} value={checked}>
                        {
                            loading?(
                                <View>
                                    <ActivityIndicator size="large" color="#0000ff" />
                                </View>
                            ):(
                                <View>
                                    {
                                        typeData?(
                                            <View>
                                                {
                                                    typeData.data.map((item,index)=>(
                                                        <View style={styles.RadioCss}>
                                                            <Text style={styles.RadioTextCss}>{item.name}</Text>                                                            
                                                            <RadioButton value={item.id} />
                                                        </View>
                                                        
                                                        
                                                    ))
                                                }
                                                
                                            </View>

                                        ):null
                                    }
                                </View>
                            
                            )
                        }

                    </RadioButton.Group>
                </View>
        </View>
        <View style={{height:10}}></View>
        <ScrollView style={{ flex: 1 }}>
            <View style={{padding:20,paddingVertical:80}}> 
                <View style={[styles.headpad,{height:120,width:'100%'}]}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Type Reason Here"
                        placeholderTextColor="#003f5c"
                        multiline={true}  
                        onChangeText={text=>setDescription(text)}
                    />
                </View>
                      
                <TouchableOpacity onPress={()=>UploadCompliant()}>
                    <View style={styles.SubmitBtn}>
                        <Text style={{fontSize:18,color:'#fff',fontWeight:'bold'}}>Send Request</Text>                    
                    </View>
                </TouchableOpacity> 
            </View>
        </ScrollView>
      
      </LinearGradient>
    </View>
  );
};

export default MainServiceRequest;

const styles = StyleSheet.create({
    SubmitBtn:{
        top:200,
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
        width:'90%',
        backgroundColor:'#fff',
        alignSelf:'center',
        borderRadius:20,
        margin:10,
        top:20,
        padding:20    
    },
    textcss:{
        fontSize:25,
        fontWeight:'bold',
        color:'#1D2F59'
    },
    headerpad:{
        flex:1,
        maxHeight:250,
        borderRadius:30,
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
        paddingRight: 20,
        textAlignVertical:'top'
      },
})