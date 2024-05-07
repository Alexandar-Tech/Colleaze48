import React, { useState } from 'react';
import { View, TouchableOpacity,Text,ActivityIndicator,Alert,StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { API_UPLOAD_ASSIGNMENT } from '../../APILIST/ApiList';

const FilePickerExample = (route) => {
    const token = route['data']['token']
    const user_id = route['data']['userid']
    const teachingplan_id = route['data']['Sub_data']['teaching_plan_detail']['id']
    const clg_section_id = route['data']['Sub_data']['clg_section_id']
    const [isDocumentPicking, setDocumentPicking] = useState(false);
    const formData = new FormData();
    const [loading, setLoading] = useState(false);
  
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

      if (result.type == 'success') {
        formData.append('file', {
            uri: result.uri,
            type: result.mimeType, // Adjust the MIME type accordingly
            name: result.name,
        });

        formData.append('user_id',user_id)
        formData.append('teaching_plan_detail_id',teachingplan_id)
        formData.append('clg_section_id',clg_section_id)

        const response = await fetch(API_UPLOAD_ASSIGNMENT, {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`,
              // Add any additional headers as needed
            },
          });
          setLoading(false)
          if(response.status == 200){
            Alert.alert('Upload Successfully');
          }
          
        // Handle the picked file
      } else {
        setLoading(false)
        Alert.alert('Document picking cancelled');
      }
    } catch (err) {
      setLoading(false)
    } finally {
      setDocumentPicking(false);
      setLoading(false)
    }
  };

  return (
    <View>
        {
            loading?(
                <View style={styles.container}>
                {/* Your custom loader view */}
                <View style={styles.customLoader}>
                  <ActivityIndicator size="large" color="#00ff00" />
                  {/* You can add additional custom components or text here */}
                </View>
              </View>
            ):(
                <TouchableOpacity onPress={pickDocument} style={{height:40,width:130,backgroundColor:'#1D2F59',borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontWeight:'900',color:'#fff',fontSize:16}}>Upload</Text>
                </TouchableOpacity>
            )
        }
        
      {/* <Button title="Pick a Document" onPress={pickDocument}  /> */}
    </View>
  );
};

export default FilePickerExample;

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    customLoader: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      borderRadius: 10,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
