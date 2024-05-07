import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,StyleSheet,ScrollView,Alert,ActivityIndicator,Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';
import IconFO from 'react-native-vector-icons/Fontisto';

const Feedback = ({route,navigation}) => {
    const [loading,setLoading] = useState(false)
    let data = [
        {'name':'Engineering Maths'},
        {'name':'Engineering Physics'},
        {'name':'Engineering Chemestry'},
        {'name':'Engineering Science'},
        {'name':'EVS'},
        {'name':'English'},
        {'name':'EPL ILB'},
        {'name':'Practical'},
    ]
    return(
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
                    <View style={{width:300}}>
                        <Text style={styles.headerText}>Feedback</Text>
                    </View>
                    <View>
                    </View>           
                </View>
            </View>
            <ScrollView style={{flex:1}}>
                <View style={{padding:20}}>
                    {
                        loading?(
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <ActivityIndicator size="large" color="#0000ff" />
                            </View>
                        ):(
                            
                                data?(
                                    <View style={styles.container}>
                                        {
                                            data.map((item,index)=>(
                                                <TouchableOpacity style={styles.item} key={index} onPress={()=>navigation.navigate('FeedBackView')}>
                                                    <Text style={styles.textcss}>{item.name}</Text>
                                                    <View>
                                                        <Image style={styles.imgCss} source={require('../assets/profile/Mask_gr_profile.png')} />
                                                    </View>                                            
                                                 </TouchableOpacity>
                                            ))
                                        }                                       
                                    </View>
                                ):(
                                    <View style={{flex:1,alignItems:'center',marginTop:100}}>
                                        <Text style={{fontWeight:'bold',color:'red'}}>No Data Found</Text>
                                    </View>
                                )
                           
                        )
                        
                    }

                </View>
            </ScrollView>

        </LinearGradient>
    )
}


export default Feedback;

const styles = StyleSheet.create({
    headerPad:{
        height:120,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        backgroundColor:'#1D2F59',
    },
    headpadCss:{
        flexDirection:'row',
        marginTop:40,
        justifyContent:'space-around',
        paddingHorizontal:10,
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
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start' // if you want to fill rows left to right
      },
      item: {
        width: '45%', // is 50% of container width
        alignItems:'center',
        marginTop:20,
        marginRight:5,
        marginLeft:5
      },
      textcss:{
        fontSize:13,
        fontWeight:'bold',
        color:'#1D2F59'
      },
      imgCss:{
        height:80,
        width:80,
        alignSelf:'center',
        margin:5
    },
})