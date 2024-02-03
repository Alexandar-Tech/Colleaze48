import React, { useEffect, useState } from 'react';
import { View, Text,TouchableOpacity,StyleSheet,ActivityIndicator,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import { API_MAINSCHOLARSHIP } from '../../APILIST/ApiList';
import ComingSoon from '../ComingSoon/ComingSoon';

function MainScholarship({ route,navigation }) {
    
    const ScholarData = route['params']['HomeData']['data']
    const token = ScholarData['token']

    const API_URL = API_MAINSCHOLARSHIP
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState(null);
    const [schid, setSchId] = useState(null);

    useEffect(() => {
        axios.post(API_URL,{},
        {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => {
            setData(response.data);
            // setLoading(false)
        })
        .catch(error => {
            setData(null);
        });
    }, []);

    const DropdownComponent = (props) => {
        const [isFocus, setIsFocus] = useState(false);
        const name = props.name
      
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
          <View style={styles.container}>
            {renderLabel()}
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data['data']}
              search
              maxHeight={300}
              labelField= 'name'
              valueField= 'name'
              placeholder={!isFocus ? name : '...'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.name);
                setSchId(item.id)
                setIsFocus(false);
              }}
            />      
          </View>
        );
      };    


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
                            <View style={{justifyContent:'center',alignItems:'center',marginTop:200}}>
                                <ComingSoon />
                            </View>                            
                        ):(
                            <View>
                            {
                                data?(
                                    <View>
                                        <Text style={styles.textcss}>Select Scholarship Type</Text>
                                        <View style={{margin:10,width:'100%',alignSelf:'center'}}>                                        
                                            <DropdownComponent  name={'Scholarship Type'}/>
                                        </View>
                                        <TouchableOpacity onPress={()=>navigation.navigate('ScholarshipHomePage',{
                                            schid : schid
                                        })}>
                                            <View style={{height:50,width:'90%',backgroundColor:'#0BCCD8',margin:20,borderRadius:20,alignSelf:'center',alignItems:'center',justifyContent:'center'}}>
                                                <Text style={{fontWeight:'bold',color:'#fff',fontSize:16}}>Submit</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                ):null
                            }
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
export default MainScholarship;

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
          fontWeight:'bold'
      },

})