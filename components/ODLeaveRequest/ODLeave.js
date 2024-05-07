import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity,StyleSheet,ScrollView,Alert,ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconMA from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { Dropdown } from 'react-native-element-dropdown';
import { API_LEAVE_REQUEST,API_LEAVEODTYPE } from '../../APILIST/ApiList';
import * as DocumentPicker from 'expo-document-picker';
import { ButtonGroup } from '@rneui/themed';
import axios from 'axios';

const ODRequest = ({route,navigation}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
    const [value, setValue] = useState('leave');
    const LeaveData = route['params']['LoginData']['data']
    const token = LeaveData['token']
    const [description,setDescription] = useState(null);
    const [formData, setFormData] = useState(new FormData());
    const [loading, setLoading] = useState(false);
    const [loadingUpload, setLoadingUpload] = useState(false);
    const user_id = LeaveData['user_detail']['user_id']
    const org_id = LeaveData['org'][0]['id']
    const [chosenDateFrom, setChosenDateFrom] = useState(new Date());
    const [chosenDate, setChosenDate] = useState(new Date());
    const [markedDates, setMarkedDates] = useState({})
    const [data, setData] = useState(null);

    let result = null
    let empty_data = []

    const getLeavetype = (typeval) =>{
      axios.post(API_LEAVEODTYPE,{
        "type" : typeval,
        "org_id" : org_id
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
          setData(error.response.data);
          setLoading(true)
      });
    }

    useEffect(() => 
    {
      getLeavetype('od')
    },[]);
      


    const LeaveRequestAPIFunc = (value) =>{
      setSelectedIndex(value);
        if(value){
          getLeavetype('leave')

        }else{
          getLeavetype('od')
        }
    }

    

    const pickDocument = async () => {        
        try {
          result = await DocumentPicker.getDocumentAsync({
            type: '*/*', // You can specify the file types you want to allow here
            copyToCacheDirectory: false, // Whether to copy the file to the cache directory
          });
    
          if (result.type === 'success') {
            console.log('Document picked:', result);
          }
        } catch (error) {
          console.error('Error picking document:', error);
        }
      };

      const handleSubmit = async () => {
        setLoadingUpload(true)
        // Create a new FormData object
        if(result !=  null){
            formData.append('file', {
                uri: result.uri,
                type: result.mimeType, // Adjust the MIME type accordingly
                name: result.name,
            })
        }
    
        // Add data to the FormData object
        formData.append('user_id', user_id);
        formData.append('org_id', org_id);
        formData.append('type', value);
        formData.append('from_date', chosenDateFrom.toISOString().split('T')[0]);
        formData.append('to_date', chosenDate.toISOString().split('T')[0]);
        formData.append('reason', description);
        const response = await fetch(API_LEAVE_REQUEST, {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`,
            },
          });
          setLoadingUpload(false)
          if(response.status == 200){
            Alert.alert('Upload Successfully');
          }

      };

      const DropdownComponent = (valuePass) => {
        
        const [isFocus, setIsFocus] = useState(false);
        const name = valuePass.name

      
        const renderLabel = () => {
          if (value || isFocus) {
            return (
              <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                
              </Text>
            );
          }
          return null;
        };
      
        return (
          <View style={styles.containerdrp}>
            {renderLabel()}
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={valuePass.dropDownData}
              search
              maxHeight={300}
              labelField= 'name'
              valueField= 'id'
              placeholder={!isFocus ? name : '...'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {                
                setValue(item.id);
                setIsFocus(false);
              }}
            />      
          </View>
        );
      };
  const CalendarOD = () => {  
  return (
      <View style={styles.container}>
        <Calendar
            minDate={chosenDateFrom.toISOString().split("T")[0]}
            markingType={'period'}
            markedDates={markedDates}
            disableAllTouchEventsForDisabledDays={true}
            disableArrowLeft={true}
            disableArrowRight={true}
            // theme={{
            //   backgroundColor: '#ffffff',
            //   calendarBackground: '#ffffff',
            //   textSectionTitleColor: '#b6c1cd',
            //   selectedDayBackgroundColor: '#00adf5',
            //   selectedDayTextColor: '#ffffff',
            //   todayTextColor: '#00adf5',
            //   dayTextColor: '#2d4150',
            // }}
        />
      </View>
    );
  };

  const DatePickerExample = () => {
    
    const [showDatePicker, setShowDatePicker] = useState(false);
  
    const handleDateChange = (event, selectedDate) => {
      setShowDatePicker(false);
  
      if (selectedDate) {
        setChosenDateFrom(selectedDate);
      }
    };
  
    const showDatepicker = () => {
      setShowDatePicker(true);
    };
  
    return (
      <TouchableOpacity onPress={showDatepicker} style={[styles.headpad,{height:50,width:'48%',borderRadius:10}]}>
        <Text style={{ fontSize: 13,fontWeight:'bold',color:'#1D2F59' }}>
            From Date
        </Text>
            <Text style={{ fontSize: 13,fontWeight:'bold',color:'#1D2F59' }}>                
                {chosenDateFrom.toDateString()}
            </Text>  
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={chosenDateFrom}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}
      </TouchableOpacity>
    );
  };

  const getDaysBetweenDates = (startDate, endDate) => {
    // Parse the dates
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    // Calculate the difference in milliseconds
    const differenceMs = end - start;
  
    // Convert milliseconds to days
    const daysDifference = differenceMs / (1000 * 60 * 60 * 24);
  
    // Round the result to get the number of whole days
    return Math.round(daysDifference);
  };

  const DatePickerToDate = () => {
    
    const [showDatePicker, setShowDatePicker] = useState(false);

  
    const handleDateChange = (event, selectedDate) => {
      setShowDatePicker(false);  
      const startDate = chosenDateFrom.toISOString().split("T")[0];
      const endDate = selectedDate.toISOString().split("T")[0];

      const daysBetween = getDaysBetweenDates(startDate, endDate);

      if (selectedDate) {
        setChosenDate(selectedDate);
      if(daysBetween == 0){
        let markdict = {[startDate]: {
          color: '#0BCCD8'
        }}       
        setMarkedDates(markdict)
      }else{         
          let markdict = {[startDate]: {
            startingDay: true,color: '#0BCCD8'
          }}
          for(let i=1;i<=daysBetween;i++){ 
            markdict[[moment(startDate).add(i, 'days').format('YYYY-MM-DD')]]={
              color: '#0BCCD8'
            }
          }
          markdict[[endDate]] = {
            endingDay: true,color: '#0BCCD8'
          }
          setMarkedDates(markdict)
        }

      }
      
    };
  
    const showDatepicker = () => {
      setShowDatePicker(true);
    };
  
    return (
      <TouchableOpacity onPress={showDatepicker} style={[styles.headpad,{height:50,width:'48%',borderRadius:10}]}>
        <Text style={{ fontSize: 13,fontWeight:'bold',color:'#1D2F59' }}>
            To Date
        </Text>
            <Text style={{ fontSize: 13,fontWeight:'bold',color:'#1D2F59' }}>                
                {chosenDate.toDateString()}
            </Text>
  
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={chosenDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex:1}}>
        <StatusBar style="auto" />
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
                            <Text style={{fontSize:20,fontWeight:'bold',color:'#fff',top:10}}>On Duty/Leave Request</Text>
                        </View> 
                        <View></View>           
                    </View>
                </View>                
        <View style={{height:10}}></View>
        <ScrollView style={{ flex: 1 }}>
            <View style={{paddingBottom:20,paddingRight:20,paddingLeft:20}}>
                {
                    loading?(
                        <View style={{justifyContent:'center',alignItems:'center',marginTop:200,}}>
                            <ActivityIndicator size="large" color="#00ff00" />
                        </View>
                    ):(
                        <View>
                          <View style={{width:'100%'}}>
                            <ButtonGroup
                              buttons={['On Duty', 'Leave']}
                              selectedIndex={selectedIndex}
                              onPress={(value) => {
                                LeaveRequestAPIFunc(value)
                              }}
                              containerStyle={{ height:50,borderRadius:10,backgroundColor:'#CEF5F7',borderColor:'#CEF5F7',right:10,width:'100%',borderWidth:0}}
                              textStyle={{fontSize:15,fontWeight:'bold',fontFamily:'circular'}}
                            /> 
                          </View>
                          <View style={{marginTop:10}}>
                            {
                              data?<DropdownComponent name={'Select Leave type'} dropDownData={data.data} />:<DropdownComponent name={'Select Leave type'} dropDownData={empty_data} />
                            }
                            
                          </View>
                            <View style={{flexDirection:'row',justifyContent:'space-around'}}>                                
                                <DatePickerExample />                                
                                <DatePickerToDate />                                                              
                            </View>
                            <View style={styles.calendarView}>
                                <View style={{flexDirection:'row',justifyContent:'space-between',margin:10}}>
                                    <IconMA name="calendar-clock" size={30}/>
                                    <Text style={styles.textcss}>Select Date</Text>
                                    <View style={styles.datebox}>
                                        <Text style={styles.fonttext}>{chosenDateFrom.toDateString().split(' ')[1]+' '+chosenDateFrom.toDateString().split(' ')[3] }</Text>   
                                    </View>
                                </View>                              

                                <CalendarOD />
                            </View>
                            <View style={styles.inputbox}>
                                <TextInput style={styles.TextInput} 
                                placeholder='Type Reason Here'
                                multiline={true}
                                onChangeText={(text)=>setDescription(text)}
                                />
                            </View>
                            <TouchableOpacity style={styles.headpad} onPress={()=>pickDocument()}>
                                <Text style={{fontWeight:'bold'}}>Upload Proof</Text>
                                <View style={[styles.headpad,{backgroundColor:'#1D2F59',height:30,width:100}]}>                                    
                                    <Text style={{color:'#fff',fontWeight:'bold'}}>Upload</Text>                                   
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>handleSubmit()}>
                                <View style={styles.SubmitBtn}>
                                    {
                                        loadingUpload?<ActivityIndicator size="large" color="red" />:<Text style={{color:'#fff',fontWeight:'bold',fontSize:18}}>Submit</Text>
                                    }                                    
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                }
                </View>
        </ScrollView>
      
      </LinearGradient>
    </View>
  );
};

export default ODRequest;

const styles = StyleSheet.create({
    fonttext:{
        fontSize: 13,
        fontWeight:'bold',
        color:'#1D2F59'
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
        height:150,
        width:'100%',
        backgroundColor:'#fff',
        alignSelf:'center',
        borderRadius:20,
        margin:10,   
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderColor:"#0BCCD8",
    },
    textcss:{
        fontSize:18,
        fontWeight:'bold',
        color:'#1D2F59'
    },
    headerpad:{
        height:150,
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
      container: {
        width:'100%',
      },
      containerdrp: {
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
      TextInput: {
        height: 40,
        flex: 1,
        padding:10,
        textAlignVertical:'top',
        fontSize:13,
        fontWeight:'bold'
      },
      inputbox:{
        minHeight:130,
        width:'100%',
        backgroundColor:'#fff',
        margin:20,
        borderRadius:10,
        alignSelf:'center',
        borderWidth:1,
        borderColor:"#0BCCD8",
    },
    calendarView:{
        alignSelf:'center',
        margin:10,
        width:'100%',
        flex:1,
        backgroundColor:'#fff',
        borderRadius:20,
        paddingBottom:20
    },
    datebox:{
        width:100,
        borderRadius:10,
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center'
    }
})