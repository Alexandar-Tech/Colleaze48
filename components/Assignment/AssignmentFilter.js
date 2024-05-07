import React, { useEffect, useState } from 'react';
import { Image,View, ScrollView, Text,TouchableOpacity,ActivityIndicator,StyleSheet } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Entypo';
import { Calendar } from 'react-native-calendars';
import { LinearGradient } from 'expo-linear-gradient';
import { RadioButton } from 'react-native-paper';

function AssignmentFilter({ route,navigation }) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-based
    const day = today.getDate();
  
    const todayDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;    
    const [selectedDate, setSelectedDate] = useState(todayDate);
    const [checked, setChecked] = useState(1);

    const handleDateSelect = (date) => {
      // Handle the selected date
      setSelectedDate(date.dateString);
    };

    const handleRadioChange = (value) => {
        setChecked(value);
      };

    return(
        <View style={{ flex: 1 }}>
            <LinearGradient
            colors={['skyblue', 'white']}
            style={{flex:1}}
            >
            <View style={styles.headerPad}>
                <View style={styles.headpadCss}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <View style={styles.headpad}>
                        <Icon name="chevron-left" size={30}/>
                    </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold',color:'#fff',top:10}}>Filter</Text>
                    </View> 
                    <View style={[styles.headpad,{opacity:0}]}>
                    </View>      
                </View> 
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ padding: 10 }}>
                    <View style={styles.boxcss}>
                        <View style={styles.fittotext}>                                        
                            <Text style={styles.textcss}>Set Date Range</Text>
                            <View style={{height:30,width:100,borderRadius:10,borderWidth:1,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize:14,color:'#1D2F59',fontWeight:'900'}}>Dec 21</Text>   
                            </View>
                        </View>
                        <Calendar
                            onDayPress={handleDateSelect}
                            markedDates={{ [selectedDate]: { selected: true, disableTouchEvent: true, selectedColor: 'blue' } }}
                        />
                    </View>
                    <View style={[styles.boxcss]}>
                        <RadioButton.Group onValueChange={handleRadioChange} value={checked}>                                
                            <View style={styles.radioCss}>
                                <Text style={styles.radioText}>English</Text>
                                <RadioButton value={1} />
                            </View>
                            <View style={styles.radioCss}>
                                <Text style={styles.radioText}>Hindi</Text>
                                <RadioButton value={2} />
                            </View>
                            <View style={styles.radioCss}>
                                <Text style={styles.radioText}>Maths</Text>
                                <RadioButton value={3} />
                            </View>
                            <View style={styles.radioCss}>
                                <Text style={styles.radioText}>Science</Text>
                                <RadioButton value={4} />
                            </View>
                            <View style={styles.radioCss}>
                                <Text style={styles.radioText}>Social Science</Text>
                                <RadioButton value={5} />
                            </View>
                            <View style={styles.radioCss}>
                                <Text style={styles.radioText}>Sanskrit</Text>
                                <RadioButton value={6} />
                            </View>                                            
                        </RadioButton.Group>
                    </View>
                    <TouchableOpacity style={styles.submitBtn}>
                        <Text style={[styles.textcss,{color:'#fff'}]}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            </LinearGradient>
        </View>
    )
}
export default AssignmentFilter;

const styles = StyleSheet.create({
    fittotext:{
      flexDirection:'row',
      justifyContent:'space-between',
      margin:10
  },
  headerPad:{
      height:150,
      borderBottomStartRadius:20,
      borderBottomEndRadius:20,
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
  textcss:{
    padding:5,
    fontSize:20,
    fontWeight:'900',
    color:'#1D2F59'
},
  boxcss:{
    width:'95%',
    backgroundColor:'#fff',
    flex:1,
    borderRadius:20,
    borderWidth:2,
    borderColor:'#0BCCD8',
    margin:10,
    paddingBottom:10
  },
  radioCss:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginLeft:20,
    marginRight:20,
    marginTop:10
  },
  radioText:{
    fontWeight:'bold',
    fontSize:15,
    paddingVertical:10
  },
  submitBtn:{
    height:50,
    width:'90%',
    backgroundColor:'#0BCCD8',
    borderRadius:10,
    margin:20,
    justifyContent:'center',
    alignItems:'center'
    },
  });