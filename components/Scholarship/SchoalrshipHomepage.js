import React, { useEffect, useState } from 'react';
import { View, Text,TouchableOpacity,StyleSheet,ActivityIndicator,ScrollView,TextInput,Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconFA from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { API_VIEWSTUDENT,API_FIELD } from '../../APILIST/ApiList';

type AccordionItemPros = PropsWithChildren<{
  title: string;
}>;




function AccordionItem({ children, title }: AccordionItemPros): JSX.Element {
    const [ expanded, setExpanded ] = useState(false);

    const [isEnabled, setIsEnabled] = useState(false);
  
    function toggleItem() {
      setExpanded(!expanded);
      setIsEnabled((previousState) => !previousState);
    }    
    const body = <View style={styles.accordBody}>{ children }</View>;  
    return (
      <View style={styles.accordContainer}>
        <TouchableOpacity style={expanded?[styles.accordHeader,{backgroundColor:'#0BCCD8',borderTopLeftRadius:10,borderTopRightRadius:10}]:[styles.accordHeader,{borderRadius:10}]} onPress={ toggleItem }>
          <Text style={expanded?[styles.accordTitle,{color:'#fff'}]:[styles.accordTitle,{}]}>{ title }</Text>
          {
            title=='Correspondence Address'?(<TouchableOpacity onPress={toggleItem} style={{}}>
              <IconFA name={isEnabled?'toggle-on':'toggle-off'} size={25} color={isEnabled?null:'#1D2F59'}/>
            </TouchableOpacity>):<Icon name={ expanded ? 'chevron-up' : 'chevron-down' } size={20} color="#eee" />
          }
          
        </TouchableOpacity>
        { expanded && body }
      </View>
    );
  }

function ScholarshipHomePage({ route,navigation }) {
    const ScholarData = route['params']['HomeData']['data']
    const token = ScholarData['token']
    const org_id = ScholarData['org'][0]['id']
    const schType =route['params']['schid']

    const API_URL = API_FIELD
    const API_TOKEN = API_VIEWSTUDENT

    const [data, setData] = useState(null);
    const [dataValue, setDataValue] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const [isFirstGradute, setIsFirstGradute] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isOrphan, setIsOrphan] = useState(false);
    const [isAddress, setIsAddress] = useState(false);
    const [isRenewal, setIsRenewal] = useState(false);    

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    let label_data = ''

    
    const toggleSwitchFirstGradute = () => {
      setIsFirstGradute((previousState) => !previousState);
  };
  const toggleSwitchDisabled = () => {
        setIsDisabled((previousState) => !previousState);
    };
    const toggleSwitchOrphan = () => {
      setIsOrphan((previousState) => !previousState);
    };
    const toggleSwitchAddress = () => {
      setIsAddress((previousState) => !previousState);
    };
    const toggleSwitchRenewal = () => {
      setIsRenewal((previousState) => !previousState);
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
      };
    
      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showDatepicker = () => {
        showMode('date');
      };
    
      const showTimepicker = () => {
        showMode('time');
      };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };

      const handleConfirm = (date) => {
        // Do something with the selected date
        setSelectedDate(date.toISOString()); // or format the date as per your requirements
        hideDatePicker();
      };

    

    useEffect(() => {
        axios.post(API_URL,{
            "org_id" : org_id,
            "scholarship_type_id" : schType
        },
        {
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
            setData(null);
        });
    }, []);

    useEffect(() => {
        if(data){
            axios.post(API_TOKEN,{
                "scholarship_id":1
            },
            {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                },
            })
            .then(response => {
                setDataValue(response.data);
                setLoading(false)
            })
            .catch(error => {
                setData(null);
            });
        }        
    }, [data]);


       


    return(
        <>
        <LinearGradient
            colors={['skyblue', 'white']}
            style={{flex:1}}>
        <View style={{flex:1}}>
            <View style={styles.headerpad}>
                <View style={styles.headpadCss}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <View style={styles.headpad}>
                            <Icon name="chevron-left" size={30}/>
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.headerText}>Scholarship Detail</Text>
                    </View>
                    <View style={[styles.headpad,{opacity:0}]}></View>
                </View>
                
            </View>
            <ScrollView style={{flex:1}}>
                <View style={{padding:20}}>
                    {
                        loading?(
                            <View>
                                <ActivityIndicator size="large" color="#0000ff" />
                            </View>                            
                        ):(
                            <View>
                            {
                                data?(
                                    <View>
                                      {
                                        
                                        data['data'].map((item,index)=>(
                                            
                                            <View key={item.id}>
                                                <AccordionItem title={item.title} key={item.id}>
                                                    {
                                                        
                                                        item['label'].map((label,lbindex) =>(
                                                            
                                                            dataValue?(
                                                            <View key={lbindex}>
                                                                <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                                                                  <Text style={label[1]=='radio'?[styles.textcss,{padding:18}]:[styles.textcss,{}]}>{label[0]}</Text>
                                                                  {
                                                                    label[1]=='radio' && label[0]=='Is First Graduate' ?(
                                                                    <TouchableOpacity onPress={toggleSwitchFirstGradute} style={{top:20}}>
                                                                      <IconFA name={isFirstGradute?'toggle-on':'toggle-off'} size={25} color={!isFirstGradute?null:'#0BCCD8'}/>
                                                                    </TouchableOpacity>):null
                                                                  }
                                                                  {
                                                                    label[1]=='radio' && label[0]=='Are You an Orphan?' ?(
                                                                    <TouchableOpacity onPress={toggleSwitchOrphan} style={{top:20}}>
                                                                      <IconFA name={isOrphan?'toggle-on':'toggle-off'} size={25} color={!isOrphan?'#1D2F59':'#0BCCD8'}/>
                                                                    </TouchableOpacity>):null
                                                                  }
                                                                  {
                                                                    label[1]=='radio' && label[0]=='Is Disabled?' ?(
                                                                    <TouchableOpacity onPress={toggleSwitchDisabled} style={{top:20}}>
                                                                      <IconFA name={isDisabled?'toggle-on':'toggle-off'} size={25} color={!isDisabled?null:'#0BCCD8'}/>
                                                                    </TouchableOpacity>):null
                                                                  }
                                                                  {
                                                                    label[1]=='radio' && label[0]=='Same as Permanent Address' ?(
                                                                    <TouchableOpacity onPress={toggleSwitchAddress} style={{top:20}}>
                                                                      <IconFA name={isAddress?'toggle-on':'toggle-off'} size={25} color={!isAddress?null:'#0BCCD8'}/>
                                                                    </TouchableOpacity>):null
                                                                  }
                                                                  {
                                                                    label[1]=='radio' && label[0]=='Is Renewal' ?(
                                                                    <TouchableOpacity onPress={toggleSwitchRenewal} style={{top:20}}>
                                                                      <IconFA name={isRenewal?'toggle-on':'toggle-off'} size={25} color={!isRenewal?null:'#0BCCD8'}/>
                                                                    </TouchableOpacity>):null
                                                                  }
                                                                  
                                                                </View>
                                                                
                                                                {
                                                                    label[1]=='text'?(
                                                                        <View style={styles.textBox}>
                                                                            {
                                                                              label[0]=='Student Name'? <Text>{dataValue['data']['user']['user_detail']['name']}</Text>:null 
                                                                            }
                                                                            {
                                                                              label[0]=='Gender'? <Text>{dataValue['data']['user']['user_detail']['gender']}</Text>:null 
                                                                            }
                                                                            {
                                                                              label[0]=='Mail ID'? <Text>{dataValue['data']['user']['email']}</Text>:null 
                                                                            }
                                                                            {
                                                                              label[0]=='Community'? <Text>{dataValue['data']['user']['user_detail']['community']['name']}</Text>:null 
                                                                            } 
                                                                            {
                                                                              label[0]=='Religion'? <Text>{dataValue['data']['user']['user_detail']['religion']['name']}</Text>:null 
                                                                            }
                                                                            {
                                                                              label[0]=='Father/Guardian Name'? <Text>{dataValue['data']['user']['user_detail']['father_name']}</Text>:null 
                                                                            }
                                                                            {
                                                                              label[0]=="Father's Occupation"? <Text>{dataValue['data']['user']['user_detail']['father_occupation']}</Text>:null 
                                                                            }
                                                                            {
                                                                              label[0]=="Mother's Name"? <Text>{dataValue['data']['user']['user_detail']['mother_name']}</Text>:null 
                                                                            }
                                                                            {
                                                                              label[0]=="Mother's Occupation"? <Text>{dataValue['data']['user']['user_detail']['mother_occupation']}</Text>:null 
                                                                            }
                                                                            {
                                                                              label[0]=="Address with Door Number"? <Text>{dataValue['data']['user_address_details']['address']}</Text>:null 
                                                                            }
                                                                            {
                                                                              label[0]=="Country"? <Text>{dataValue['data']['user_address_details']['country']['name']}</Text>:null 
                                                                            } 
                                                                            {
                                                                              label[0]=="State"? <Text>{dataValue['data']['user_address_details']['state']['name']}</Text>:null 
                                                                            }
                                                                            {
                                                                              label[0]=="City"? <Text>{dataValue['data']['user_address_details']['city']['name']}</Text>:null 
                                                                            } 
                                                                            {
                                                                              label[0]=="Pincode"? <Text>{dataValue['data']['user_address_details']['pincode']}</Text>:null 
                                                                            }
                                                                            {
                                                                              label[0]=="District"? <Text>{dataValue['data']['user_address_details']['city']['name']}</Text>:null 
                                                                            }
                                                                            
                                                                            {
                                                                              label[0]=="Institution Name"? <Text>{dataValue['data']['organisation']['name']}</Text>:null 
                                                                            }
                                                                            {
                                                                              label[0]=="Academic Year"? <Text>{dataValue['data']['organisation']['email']}</Text>:null 
                                                                            }    
                                                                            
                                                                        </View>
                                                                    ):null
                                                                }
                                                                
                                                                {
                                                                    label[1]=='input'?(                                                                        
                                                                          <View>
                                                                            {
                                                                              !isAddress?(
                                                                                <View style={styles.inputView}>
                                                                                {
                                                                                  label[0]=="Country"? (
                                                                                    <TextInput
                                                                                      style={styles.TextInput}
                                                                                      placeholder={label[0]}
                                                                                      placeholderTextColor="#003f5c"
                                                                                      // onChangeText={text=>setEmail(text)}                                                                                
                                                                                  />
                                                                                  ):null
                                                                                } 
                                                                                {
                                                                                  label[0]=="Address With Door Number" ? (
                                                                                    <TextInput
                                                                                      style={styles.TextInput}
                                                                                      placeholder={label[0]}
                                                                                      placeholderTextColor="#003f5c"
                                                                                      // onChangeText={text=>setEmail(text)}                                                                                
                                                                                  />
                                                                                  ):null 
                                                                                }
                                                                                {
                                                                                  label[0]=="State" ? (
                                                                                    <TextInput
                                                                                      style={styles.TextInput}
                                                                                      placeholder={label[0]}
                                                                                      placeholderTextColor="#003f5c"
                                                                                      // onChangeText={text=>setEmail(text)}                                                                                
                                                                                  />
                                                                                  ):null 
                                                                                }
                                                                                {
                                                                                  label[0]=="City" ? (
                                                                                    <TextInput
                                                                                      style={styles.TextInput}
                                                                                      placeholder={label[0]}
                                                                                      placeholderTextColor="#003f5c"
                                                                                      // onChangeText={text=>setEmail(text)}                                                                                
                                                                                  />
                                                                                  ):null 
                                                                                }

                                                                                {
                                                                                  label[0]=="Pincode" ? (
                                                                                    <TextInput
                                                                                      style={styles.TextInput}
                                                                                      placeholder={label[0]}
                                                                                      placeholderTextColor="#003f5c"
                                                                                      // onChangeText={text=>setEmail(text)}                                                                                
                                                                                  />
                                                                                  ):null 
                                                                                }
                                                                                {
                                                                                  label[0]=="District" ? (
                                                                                    <TextInput
                                                                                      style={styles.TextInput}
                                                                                      placeholder={label[0]}
                                                                                      placeholderTextColor="#003f5c"
                                                                                      // onChangeText={text=>setEmail(text)}                                                                                
                                                                                  />
                                                                                  ):null 
                                                                                }

                                                                              </View>):(
                                                                                <View style={[styles.inputView,{justifyContent:'center',alignItems:'center'}]}>
                                                                                   {
                                                                                      label[0]=="Address With Door Number"? <Text>{dataValue['data']['user_address_details']['address']}</Text>:null 
                                                                                    }
                                                                                    {
                                                                                      label[0]=="Country"? <Text>{dataValue['data']['user_address_details']['country']['name']}</Text>:null 
                                                                                    } 
                                                                                    {
                                                                                      label[0]=="State"? <Text>{dataValue['data']['user_address_details']['state']['name']}</Text>:null 
                                                                                    }
                                                                                    {
                                                                                      label[0]=="City"? <Text>{dataValue['data']['user_address_details']['city']['name']}</Text>:null 
                                                                                    } 
                                                                                    {
                                                                                      label[0]=="Pincode"? <Text>{dataValue['data']['user_address_details']['pincode']}</Text>:null 
                                                                                    }
                                                                                    {
                                                                                      label[0]=="District"? <Text>{dataValue['data']['user_address_details']['city']['name']}</Text>:null 
                                                                                    }
                                                                                  </View>
                                                                              )
                                                                            }
                                                                                                                                                   
                                                                              
                                                                            </View>
                                                                                                                                                           
                                                                    ):null
                                                                     
                                                                }

                                                                {
                                                                    label[1]=='date'?(
                                                                        <View style={styles.textBox}>
                                                                            
                                                                        </View>                                                                       
                                                                    ):null
                                                                }
                                                                {/* {
                                                                    label[1]=='radio' && label[0]=='Is First Graduate'?(
                                                                        <View style={{bottom:30}}>
                                                                            <Switch
                                                                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                                                                thumbColor={isFirstGradute ? "#f5dd4b" : "#f4f3f4"}
                                                                                ios_backgroundColor="#3e3e3e"
                                                                                onValueChange={toggleSwitchFirstGradute}
                                                                                value={isFirstGradute}
                                                                            />
                                                                            
                                                                        </View>                                                                       
                                                                    ):null
                                                                }
                                                                {
                                                                    label[1]=='radio' && label[0]=='Is Disabled?'?(
                                                                        <View style={{bottom:30}}>
                                                                            <Switch
                                                                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                                                                thumbColor={isDisabled ? "#f5dd4b" : "#f4f3f4"}
                                                                                ios_backgroundColor="#3e3e3e"
                                                                                onValueChange={toggleSwitchDisabled}
                                                                                value={isDisabled}
                                                                            />
                                                                            
                                                                        </View>                                                                       
                                                                    ):null
                                                                }
                                                                {
                                                                    label[1]=='radio' && label[0]=='Are You an Orphan?'?(
                                                                        <View style={{bottom:30}}>
                                                                            <Switch
                                                                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                                                                thumbColor={isOrphan ? "#f5dd4b" : "#f4f3f4"}
                                                                                ios_backgroundColor="#3e3e3e"
                                                                                onValueChange={toggleSwitchOrphan}
                                                                                value={isOrphan}
                                                                            />
                                                                            
                                                                        </View>                                                                       
                                                                    ):null
                                                                } */}
                                                            </View>):null
                                                        ))
                                                    }
                                                    
                                                </AccordionItem>
                                            </View>
                                        ))
                                      }  
                                    </View>
                                ):null
                            }
                            <View style={{height:50,width:'90%',backgroundColor:'#0BCCD8',margin:20,borderRadius:10,alignItems:'center',alignSelf:'center',justifyContent:'center'}}>
                              <Text style={{fontSize:17,fontWeight:'bold',color:'#fff'}}>Submit</Text>
                            </View>
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
export default ScholarshipHomePage;

const styles = StyleSheet.create({
    headerpad:{
        height:150,
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
    container: {
        backgroundColor: 'white',
        borderRadius:10,
        padding:4,
        borderColor:'#0BCCD8',
        borderWidth:1
      },
      dropdown: {
        height: 40,
        paddingHorizontal: 8,
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        zIndex: 999,
        fontSize: 14,
        fontWeight:'bold'
      },
      placeholderStyle: {
        fontSize: 16,
        fontWeight:'bold'
      },
      selectedTextStyle: {
        fontSize: 16,
        fontWeight:'bold'
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
      textcss:{
          fontSize:15,
          fontWeight:'bold',
          padding:10
      },
      container: {
        flex: 1,        
      },
      accordContainer: {
        paddingBottom: 4,        
      },
      accordHeader: {
        padding: 12,
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginRight:10,
        marginLeft:10,
        marginTop:10
      },
      accordTitle: {
        fontSize: 16,
        fontWeight:'bold',
      },
      accordBody: {
        padding: 12,
        backgroundColor:'#fff',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        marginRight:10,
        marginLeft:10,
        borderWidth:1,
        borderColor:"#0BCCD8"
      },
      textSmall: {
        fontSize: 16
      },
      seperator: {
        height: 12
      },
      textBox:{
        height:40,
        width:'100%',
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:'#0BCCD8',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center'
      },
      inputView: {
        backgroundColor: '#FFFF',
        borderRadius: 10,
        width: '100%',
        height: 45,
        marginBottom: 20,
        borderWidth:1,
        borderColor:"#0BCCD8",
      },
      TextInput: {
        height: 40,
        flex: 1,
        paddingRight: 20,
        marginLeft: 20,
      },
      button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
      },
})