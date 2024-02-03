import React, { useEffect, useState } from 'react';
import { View, Text,TouchableOpacity,StyleSheet,Image } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { Dropdown } from 'react-native-element-dropdown';
import { API_ASSIGNMENTSUBJECT,API_ASSIGNMENTTOPICS } from '../../APILIST/ApiList';
import axios from 'axios';

function UploadAssignment({ route,navigation }) {
  const token = route['params']['token']
  const [subjectData, setSubjectData] = useState(null);
  const [topicData, setTopicData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subLoading, setSubLoading] = useState(true);

    const dataItem = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ];

    useEffect(() => { 
      axios.post(API_ASSIGNMENTSUBJECT,{
        "section_id" : 19
        },{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })
          .then(response => {
            setSubjectData(response.data);
            setSubLoading(false)
          })
          .catch(error => {
            console.log(error)
          });
    }, []);

    // useEffect(() => { 
    //   axios.post(API_ASSIGNMENTTOPICS,{
    //       "section_id" : 19,
    //       "subject_id" : 1,
    //       "user_id" : 119
    //     },{
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${token}`,
    //       },
    //     })
    //       .then(response => {
    //         setSubjectData(response.data);
    //         setLoading(false)
    //       })
    //       .catch(error => {
    //         console.log(error)
    //       });
    // }, []);

    const DropdownComponent = (props) => {
        const [value, setValue] = useState(null);
        const [isFocus, setIsFocus] = useState(false);
    
        return (
          <View>
            {
              subLoading?null:(
                <View style={styles.container}>
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={dataItem}
                  search
                  maxHeight={300}
                  labelField= 'label'
                  valueField= 'value'
                  placeholder={!isFocus ? 'Select Subject' : '...'}
                  searchPlaceholder="Search..."
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                  }}
                />
                </View>
              )
            }
            
            
          </View>
        );
      }; 
      
      
      const DropdownComponentAssignment = (props) => {
        const [value, setValue] = useState(null);
        const [isFocus, setIsFocus] = useState(false);      
        return (
          <View style={styles.container}>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={dataItem}
              search
              maxHeight={300}
              labelField= 'label'
              valueField= 'value'
              placeholder={!isFocus ? 'Select Assignment' : '...'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setIsFocus(false);
              }}
            />
            
          </View>
        );
      };

    return(
        <View>
            <View style={styles.headerpad}>
                <View style={{flexDirection:'row',marginTop:60,paddingHorizontal:10,columnGap:50}}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <View style={styles.backpad}>
                        <Icon name="chevron-left" size={30}/>
                    </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>Upload Assignment</Text>
                    </View>            
                </View>
            </View>
            <View style={{margin:10,marginRight:20,marginLeft:20}}>
                <DropdownComponent />
            </View>
            <View style={{margin:10,marginRight:20,marginLeft:20}}>
                <DropdownComponentAssignment />
            </View>
            <View style={styles.boxcss}>
                <Text style={[styles.textcss]}>Upload Assignment</Text>
                <View style={styles.boxpad}>
                    <Text style={{color:'#fff',fontSize:20,fontWeight:'bold'}}> Upload</Text>
                </View>
                
            </View>
        </View>
    )


}
export default UploadAssignment;
const styles = StyleSheet.create({
    boxpad:{
        top:10,
        height:50,
        width:150,
        backgroundColor:'#1D2F59',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    },
    textcss:{
        fontSize:20,
        fontWeight:'bold',
        color:'#1D2F59'
    },
    boxcss:{
        height:150,
        width:'90%',
        borderWidth:1,
        borderRadius:10,
        borderColor:'#0BCCD8',
        margin:20,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center'
    },
    headerpad:{
        height:150,
        borderRadius:30,
        backgroundColor:'#1D2F59',
      },
      backpad:{
        height:50,
        width:50,
        borderRadius:10,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center'
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
})