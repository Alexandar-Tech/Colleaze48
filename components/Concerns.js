import React, { useEffect, useState } from 'react';
import { View, Alert, Text, StyleSheet,  ScrollView,TouchableOpacity,ActivityIndicator,TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { API_COMPLIANT_UPLOAD } from '../APILIST/ApiList';
import Modal from "react-native-modal";
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import IconANT from 'react-native-vector-icons/AntDesign';
import * as DocumentPicker from 'expo-document-picker';
import DropdownComponent from './Attendance/DropDownComponent';
import { Dropdown } from 'react-native-element-dropdown';
import { API_CONCERNTYPE,API_CONCERNSUBTYPE } from '../APILIST/ApiList';

function Concerns({ route,navigation }) {
    const ComplaintData = route['params']['HomeData']['data']
    const token = ComplaintData['token']
    const [data, setData] = useState(null);
    const [dataConcern, setDataConcern] = useState(null);
    const [dataSubConcern, setDataSubConcern] = useState(null);
    const [dataConcernLoading, setDataConcernLoading] = useState(true);
    const [dataSubConcernLoading, setDataSubConcernLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [selected,setSelected] = useState(1);
    const [description,setDescription] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const user_id = ComplaintData['user_detail']['user_id']
    const org_id = ComplaintData['org'][0]['id']
    const clg_section_id =  ComplaintData['student_detail']['clg_section_id']
    const academic_year_id=  ComplaintData['student_detail']['academic_year_id']
    const [isDocumentPicking, setDocumentPicking] = useState(false);
    
    const [valueID, setValueID] = useState(1);
    const [value, setValue] = useState(null);
    let result = null
    let empty_data = []

    useEffect(() => { 
        axios.post(API_CONCERNTYPE,{
            "org_id" : org_id
        },{
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
        })
          .then(response => {
            setDataConcern(response.data);
            setDataConcernLoading(false)
          })
          .catch(error => {
            setDataConcernLoading(true)
          });
    }, []);

    useEffect(() => { 
            axios.post(API_CONCERNSUBTYPE,{
                "concern_type_id" : value
            },{
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                },
            })
              .then(response => {
                setDataSubConcern(response.data);
                setDataSubConcernLoading(false)
              })
              .catch(error => {
                setDataSubConcernLoading(true)
            });
    }, [value]);


    const DropdownComponentConcern = (valueData) => {        
        const [isFocus, setIsFocus] = useState(false);
        let name = valueData.name
        const dropData = valueData.dropdownData
            
        return (
          <View style={styles.container}>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={dropData}
              search
              maxHeight={300}
              labelField= 'name'
              valueField='id'
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

      const DropdownComponentSubConcern = (valueData) => {        
        const [isFocus, setIsFocus] = useState(false);
        const dropData = valueData.dropdownData
        let name = valueData.name           
        return (
          <View style={styles.container}>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={dropData}
              search
              maxHeight={300}
              labelField= 'name'
              valueField='id'
              placeholder={!isFocus ? name : '...'}
              searchPlaceholder="Search..."
              value={valueID}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValueID(item.id);
                setIsFocus(false);
              }}
            />            
          </View>
        );
      };      

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


    const UploadCompliant = async () => {
        setLoadingUpload(true)  
        const formData = new FormData();
    
        if (result !=  null) {
          formData.append('file', {
              uri: result.uri,
              type: result.mimeType, // Adjust the MIME type accordingly
              name: result.name,
          });
        }
          formData.append('user_id',user_id)
          formData.append('org_id',org_id)
          formData.append('type',1)
          formData.append('description',description)
          formData.append('clg_section_id',clg_section_id)
          formData.append('concern_type_id',value)
          formData.append('concern_sub_type_id',valueID)
          const response = await fetch(API_COMPLIANT_UPLOAD, {
              method: 'POST',
              body: formData,
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
                // Add any additional headers as needed
              },
            });
            if(response.status == 200){                
              Alert.alert('Upload Successfully !!');
            }else{
              setLoadingUpload(false)
              Alert.alert('Failed to Upload !!');
            }
    };

    return (
        <View style={{flex:1}}>
            <Modal
            isVisible={isVisible}
            style={styles.modelcontainer}
            onBackdropPress={() => setIsVisible(false)}
            swipeDirection={['down']}
            onSwipeComplete={() => setIsVisible(false)}
            >
              <View>
                      <LinearGradient
                          colors={['skyblue', 'white']}
                          style={styles.modelView}
                          >
                            <TouchableOpacity style={{alignSelf:'flex-end',right:20}} onPress={()=>setIsVisible(false)}>
                              <IconANT name="closecircle" color='red' size={25} />
                            </TouchableOpacity>
                            {
                                data?(
                                    <Text style={{fontSize:16,fontWeight:'bold',color:'red',alignSelf:'center',marginTop:50}}>{data.msg}</Text>
                                )
                                :null
                            }                        
                              
                    </LinearGradient> 
                  </View>
        </Modal>
            <View style={styles.headerPad}>
                <View style={styles.headpadCss}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <View style={styles.headpad}>
                            <Icon name="chevron-left" size={30}/>
                        </View>
                    </TouchableOpacity>
                    <View style={{width:300}}>
                        <Text style={styles.headerText}>Concerns</Text>
                    </View>
                    <View>
                    </View>           
                </View>
            </View>
            <ScrollView style={{flex:1,backgroundColor:'#fff'}}>
                <View style={{padding:20}}>
                    {
                        loading?(<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>):(
                        <View>
                            {
                                !dataConcernLoading?(
                                    <View>
                                        <DropdownComponentConcern name={'Raise a Concern'} dropdownData={dataConcern.data}/>
                                    </View>
                                ):(
                                  <View>
                                        <DropdownComponentConcern name={'Raise a Concern'} dropdownData={empty_data}/>
                                    </View>
                                )
                            }
                            {
                                !dataSubConcernLoading?(
                                    <View style={{marginTop:20}}>
                                        <DropdownComponentSubConcern name={'Concern type'} dropdownData={dataSubConcern.data}/>
                                    </View>
                                ):(
                                  <View style={{marginTop:20}}>
                                  <DropdownComponentConcern name={'Concern type'} dropdownData={empty_data}/>
                              </View>
                                )
                            }
                            
                            
                            
                            
                    <Text style={{fontSize:16,fontWeight:'bold',padding:10,color:'#1D2F59'}}>Description</Text>
                    <View style={styles.textinputbox}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Enter Description"
                        placeholderTextColor="#003f5c"
                        multiline={true}  
                        onChangeText={(text)=>setDescription(text)}                      
                    />

                    </View>
                    <View style={{marginTop:20,height:130,width:'100%',borderWidth:1,borderColor:'#0BCCD8',shadowOpacity:2,alignItems:'center',justifyContent:'center',borderRadius:20}}>
                        <Text style={{fontSize:17,color:'#1D2F59',fontWeight:'bold',padding:10}}>Upload Attachment</Text>
                        <TouchableOpacity style={{height:30,width:100,backgroundColor:'#1D2F59',borderRadius:20,justifyContent:'center',alignItems:'center'}} onPress={()=>pickDocument()}>
                          <Text style={{fontSize:15,color:'#fff',fontWeight:'bold'}}>Upload</Text>
                        </TouchableOpacity>
                    </View>
                        <TouchableOpacity style={[styles.compliantbox,{backgroundColor:'#0BCCD8',width:'90%',margin:20,alignSelf:'center',borderRadius:20,}]} onPress={()=>UploadCompliant()}>
                          {
                              loadingUpload?<ActivityIndicator size="small" color="#0000ff" />:<Text style={[styles.textcss,{fontSize:18,color:'#fff'}]}>Submit</Text>
                          }
                        </TouchableOpacity>
                    </View>
                    )
                    }
                    
                </View>
            </ScrollView>
      </View>
    );
  }

  export default Concerns;


  const styles = StyleSheet.create({
    compliantbox:{
        height:50,
        width:'40%',
        borderRadius:10,
        margin:5,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#EA5D5D'        
    },
    boxcss:{
        height:90,
        width:'100%',
        borderWidth:1,
        borderColor:'#0BCCD8',
        borderRadius:20,
        margin:10,
        alignSelf:'center',
        padding:20
    },
    textcss:{
        fontSize:22,
        fontWeight:'bold',
        color:'#1D2F59'
    },
    headerPad:{
        height:150,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        backgroundColor:'#1D2F59',
    },
    headpadCss:{
        flexDirection:'row',
        marginTop:60,
        justifyContent:'space-around',
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
        right:20
    },
    logo:{
        height:100,
        width:200,
        resizeMode:'contain'
    },
    textinputbox:{
        backgroundColor: '#FFFF',
        borderRadius: 10,
        width: '100%',
        borderWidth:1,
        borderColor:'#0BCCD8',
        minHeight:200,
        flex:1,
        textAlign:'justify',
        
    },
    TextInput: {
        flex: 1,
        textAlignVertical:'top',
        padding:10,
        fontSize:14,
        fontWeight:'bold'
      },
      modelcontainer:{
        margin:20,
        justifyContent:'center'
      },
      modelView:{
        backgroundColor: 'white', 
        padding: 16,
        height:180,
        borderRadius:20,
        borderWidth:2,
        borderColor:'#0BCCD8',
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