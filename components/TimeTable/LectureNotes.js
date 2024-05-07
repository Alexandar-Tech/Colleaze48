import React, { useState, } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ScrollView,ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';

export function LectureNotes({route,navigation}) {
    const route_data = route['params']['classData']
    const [loading, setLoading] = useState(false);    

    return(
        <>
        <LinearGradient
            colors={['skyblue', 'white']}
            style={{flex:1}}
           >
                <View style={{ flex: 1}}>
                    <View style={styles.headerPad}>
                        <View style={styles.headpadCss}>
                            <TouchableOpacity onPress={()=>navigation.goBack()}>
                                <View style={styles.headpad}>
                                    <Icon name="chevron-left" size={30}/>
                                </View>
                            </TouchableOpacity>
                            <View>
                                <Text style={styles.headerText}>Lecture Notes</Text>
                            </View>
                            <View></View>
                        </View>
                        <View style={{width:'90%',backgroundColor:'#329AD6',alignSelf:'center',borderRadius:20,}}>
                            <View style={{width:'90%',backgroundColor:'#fff',alignSelf:'center',margin:10,borderRadius:10,padding:10}}>
                                <Text style={{fontWeight:'bold'}}>Subject Title</Text>
                                <Text style={{fontWeight:'bold',fontSize:18,color:'#0BCCD8'}}>{route_data.subject.name}</Text>
                            </View>
                            <View style={{padding:10}}>
                                <Text style={{color:'#fff',fontWeight:'bold'}}>Unit - 1</Text>
                                <Text style={{color:'#fff',fontWeight:'bold'}}>Grammer</Text>
                            </View>
                            <View style={{padding:10}}>
                                <Text style={{color:'#fff',fontWeight:'bold'}}>Topic Name</Text>
                                <Text style={{color:'#fff',fontWeight:'bold'}}>Tense</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{height:80}}></View>
                    <ScrollView style={{flex:1}}>
                        <View style={{padding:20}}>
                            {
                                loading?(
                                    <View>
                                        <ActivityIndicator size="large" color="#0000ff" />
                                    </View>
                                ):(<View> 
                                    <Text style={{fontSize:18,color:'#1D2F59',fontWeight:'bold'}}>Lesson Learn</Text>
                                    <View style={styles.smallbox}>
                                        <View style={styles.circle}>
                                            <Text style={{color:'#fff',fontWeight:'bold'}}>1</Text>
                                        </View>
                                        <View>
                                            <Text style={{color:'#1D2F59',fontWeight:'bold'}}>Objective</Text>
                                        </View>                                        
                                    </View>
                                    <View style={styles.smallbox}>
                                        <View style={styles.circle}>
                                            <Text style={{color:'#fff',fontWeight:'bold'}}>1</Text>
                                        </View>
                                        <View>
                                            <Text style={{color:'#1D2F59',fontWeight:'bold'}}>Objective</Text>
                                        </View>                                        
                                    </View>
                                    <View style={styles.smallbox}>
                                        <View style={styles.circle}>
                                            <Text style={{color:'#fff',fontWeight:'bold'}}>1</Text>
                                        </View>
                                        <View>
                                            <Text style={{color:'#1D2F59',fontWeight:'bold'}}>Objective</Text>
                                        </View>                                        
                                    </View>
                                    <View style={styles.smallbox}>
                                        <View style={styles.circle}>
                                            <Text style={{color:'#fff',fontWeight:'bold'}}>1</Text>
                                        </View>
                                        <View>
                                            <Text style={{color:'#1D2F59',fontWeight:'bold'}}>Objective</Text>
                                        </View>                                        
                                    </View>
                                    <View style={styles.smallbox}>
                                        <View style={styles.circle}>
                                            <Text style={{color:'#fff',fontWeight:'bold'}}>1</Text>
                                        </View>
                                        <View>
                                            <Text style={{color:'#1D2F59',fontWeight:'bold'}}>Objective</Text>
                                        </View>                                        
                                    </View>
                                    <View style={styles.smallbox}>
                                        <View style={styles.circle}>
                                            <Text style={{color:'#fff',fontWeight:'bold'}}>1</Text>
                                        </View>
                                        <View>
                                            <Text style={{color:'#1D2F59',fontWeight:'bold'}}>Objective</Text>
                                        </View>                                        
                                    </View>                               
                                    </View>)
                            }
                                    
                        </View>
                    </ScrollView>
                </View>
            </LinearGradient>
        </>
    )
}

const styles = StyleSheet.create({
    circle:{
        height:30,
        width:30,
        borderRadius:20,
        backgroundColor:'#0BCCD8',
        alignItems:'center',
        justifyContent:'center'
    },
    smallbox:{
        height:50,
        width:'95%',
        backgroundColor:'#fff',
        margin:10,
        borderRadius:10,
        borderWidth:1,
        borderColor:'#0BCCD8',
        flexDirection:'row',
        alignItems:'center',
        padding:10,
        columnGap:40
    },
  headerPad:{
      height:250,
      borderRadius:20,
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
      fontSize:18,
      fontWeight:'bold',
      color:'#fff',
      top:10,
      right:20
  },
})