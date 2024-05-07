import React, { useEffect, useState } from 'react';
import { View, Alert, Text, StyleSheet,  ScrollView,TouchableOpacity,ActivityIndicator,TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { ButtonGroup } from '@rneui/themed';
import { API_COMPLIANT_UPLOAD } from '../APILIST/ApiList';
import Modal from "react-native-modal";
import { LinearGradient } from 'expo-linear-gradient';
import IconANT from 'react-native-vector-icons/AntDesign';
import * as DocumentPicker from 'expo-document-picker';

function Complaint({ route,navigation }) {
    const ComplaintData = route['params']['HomeData']['data']
    const token = ComplaintData['token']
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selected,setSelected] = useState(1);
    const [description,setDescription] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const user_id = ComplaintData['user_detail']['user_id']
    const org_id = ComplaintData['org'][0]['id']
    const clg_section_id =  ComplaintData['student_detail']['clg_section_id']
    const academic_year_id=  ComplaintData['student_detail']['academic_year_id']
    const [isDocumentPicking, setDocumentPicking] = useState(false);
    const formData = new FormData();

    const pickDocument = async () => {
        try {
            if (isDocumentPicking) {
              console.log('Another document picking operation is already in progress.');
              return;
            }
            setDocumentPicking(true);
            const result = await DocumentPicker.getDocumentAsync({
              type: 'application/pdf', // Specify the MIME type or use 'application/*' for any type
            });
            setLoading(true)
            if (result.type === 'success') {
              formData.append('file', {
                  uri: result.uri,
                  type: result.mimeType, // Adjust the MIME type accordingly
                  name: result.name,
              });
            }
        }catch (err) {
            console.error('Error picking document:', err);
            setLoading(false)
          } finally {
            setDocumentPicking(false);
            setLoading(false)
          }
   
    }


    const UploadCompliant = async () => {

        try {
            formData.append('user_id',user_id)
            formData.append('org_id',org_id)
            formData.append('type',selected)
            formData.append('description',description)
            formData.append('clg_section_id',clg_section_id)
    
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
                Alert.alert('Submit Successfully');
              }
          } catch (err) {
            console.log('Error picking document:', err);
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
                    <View>
                        <Text style={styles.headerText}>Suggestion/Grievances</Text>
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
                            <View style={{height:120,width:'100%',borderWidth:1,borderColor:'#0BCCD8',shadowOpacity:2,alignItems:'center',justifyContent:'center',borderRadius:20}}>
                        <Text style={{alignSelf:'flex-start',fontSize:16,fontWeight:'bold',padding:10}}>Choose Type</Text>
                        <ButtonGroup
                            buttons={['Complaints', 'Give Feedback']}
                            selectedIndex={selected}
                            onPress={(value) => {
                                setSelected(value);
                            }}
                            containerStyle={{ borderRadius:10,height:50 }}
                            textStyle={{fontSize:16,fontWeight:'bold'}}
                            buttonStyle={{margin:3,borderBottomEndRadius:10,borderBottomStartRadius:10,borderTopStartRadius:10,borderTopEndRadius:10,}}
                        />
                    </View>
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
                    <View style={{marginTop:20,height:160,width:'100%',borderWidth:1,borderColor:'#0BCCD8',shadowOpacity:2,alignItems:'center',justifyContent:'center',borderRadius:20}}>
                        <Text style={{fontSize:17,color:'#1D2F59',fontWeight:'bold',padding:10}}>Upload Attachment</Text>
                        <TouchableOpacity style={{height:30,width:100,backgroundColor:'#1D2F59',borderRadius:20,justifyContent:'center',alignItems:'center'}} onPress={()=>pickDocument()}>
                            <Text style={{fontSize:15,color:'#fff',fontWeight:'bold'}}>Upload</Text>
                        </TouchableOpacity>
                    </View>
                        <TouchableOpacity style={[styles.compliantbox,{backgroundColor:'#0BCCD8',width:'90%',margin:20,alignSelf:'center',borderRadius:20,}]} onPress={()=>UploadCompliant()}>
                        <Text style={[styles.textcss,{fontSize:18,color:'#fff'}]}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                    )
                    }
                    
                </View>
            </ScrollView>
      </View>
    );
  }

  export default Complaint;


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
  })