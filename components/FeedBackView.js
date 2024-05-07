import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,StyleSheet,ScrollView,Alert,ActivityIndicator,Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';
import IconAN from 'react-native-vector-icons/AntDesign';
import { useFonts } from 'expo-font';
import { RadioButton } from 'react-native-paper';

const FeedBackView = ({route,navigation}) => {
    const [loading,setLoading] = useState(false)
    const [checkedOne, setCheckedOne] = useState(1);
    const [checkedTwo, setCheckedTwo] = useState(2);
    const [checkedThree, setCheckedThree] = useState(3);
    const [checkedFour, setCheckedFour] = useState(4);
    const [checkedFive, setCheckedFive] = useState(4);

    

    const [fontsLoaded] = useFonts({
        'circular': require('../assets/fonts/circular-std-medium-500.ttf'),
      });

    const handleRadioChangeOne = (value) => {
        setCheckedOne(value);
    };
    const handleRadioChangeTwo = (value) => {
        setCheckedTwo(value);
    };
    const handleRadioChangethree = (value) => {
        setCheckedThree(value);
    };
    const handleRadioChangeFour = (value) => {
        setCheckedFour(value);
    };
    const handleRadioChangeFive = (value) => {
        setCheckedFive(value);
    };
          
    
    let data = [
        {'val':1,'status':true,'description':'How would you rate the effectiveness of the teaching methods used by each subject instructor?'},
        {'val':2,'status':false,'description':'Were the subject materials presented in a clear and understandable manner?'},
        {'val':3,'status':true,'description':'Did the instructors provide enough opportunity for student interaction and engagement during classes?'},
        {'val':4,'status':false,'description':'Were the instructors available and approachable for questions and assistance outside of class hours?'},
        {'val':5,'status':true,'description':'How well did the instructors manage their time during lectures or discussions?'}
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
                                                <TouchableOpacity style={styles.feedbox} key={index}>
                                                    <View style={{flexDirection:'row',width:'90%',marginRight:10,marginLeft:10,marginTop:10,columnGap:10,alignItems:'center'}}>
                                                        <Text style={[fontsLoaded?styles.fontfamilyCss:styles.fontCss]}>{item.description}</Text>
                                                        {
                                                            item.status?(
                                                                <IconAN name="checkcircle" size={20} color={'#0BCCD8'}/>
                                                            ):(
                                                                <View style={{height:20,width:20,borderRadius:20,backgroundColor:'#329AD6'}}>
                                                                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                                                        <ActivityIndicator size="small" color="#0000ff" />
                                                                    </View>                                                        
                                                                </View>
                                                            )
                                                        }

                                                    </View>
                                                    <View>
                                                        {
                                                            item.val == 1?(
                                                                <View>
                                                                    <RadioButton.Group onValueChange={handleRadioChangeOne} value={checkedOne}>                                
                                                                        <View style={styles.radioCss}>
                                                                            <RadioButton value={1} />
                                                                            <Text style={styles.radioText}>Poor</Text>
                                                                            <RadioButton value={2} />                                                                            
                                                                            <Text style={styles.radioText}>Average</Text>
                                                                            <RadioButton value={3} />
                                                                            <Text style={styles.radioText}>Good</Text>
                                                                            <RadioButton value={4} />
                                                                            <Text style={styles.radioText}>Excellent</Text> 
                                                                            
                                                                        </View>

                                                                    </RadioButton.Group>
                                                                </View>
                                                            ):null
                                                        }
                                                    </View>     
                                                    <View>
                                                        {
                                                            item.val == 2?(
                                                                <View>
                                                                    <RadioButton.Group onValueChange={handleRadioChangeTwo} value={checkedTwo}>                                
                                                                        <View style={styles.radioCss}>
                                                                            <RadioButton value={1} />
                                                                            <Text style={styles.radioText}>Poor</Text>
                                                                            <RadioButton value={2} />                                                                            
                                                                            <Text style={styles.radioText}>Average</Text>
                                                                            <RadioButton value={3} />
                                                                            <Text style={styles.radioText}>Good</Text>
                                                                            <RadioButton value={4} />
                                                                            <Text style={styles.radioText}>Excellent</Text> 
                                                                            
                                                                        </View>

                                                                    </RadioButton.Group>
                                                                </View>
                                                            ):null
                                                        }
                                                    </View>
                                                    <View>
                                                        {
                                                            item.val == 3?(
                                                                <View>
                                                                    <RadioButton.Group onValueChange={handleRadioChangethree} value={checkedThree}>                                
                                                                        <View style={styles.radioCss}>
                                                                            <RadioButton value={1} />
                                                                            <Text style={styles.radioText}>Poor</Text>
                                                                            <RadioButton value={2} />                                                                            
                                                                            <Text style={styles.radioText}>Average</Text>
                                                                            <RadioButton value={3} />
                                                                            <Text style={styles.radioText}>Good</Text>
                                                                            <RadioButton value={4} />
                                                                            <Text style={styles.radioText}>Excellent</Text> 
                                                                            
                                                                        </View>

                                                                    </RadioButton.Group>
                                                                </View>
                                                            ):null
                                                        }
                                                    </View>
                                                    <View>
                                                        {
                                                            item.val == 4?(
                                                                <View>
                                                                    <RadioButton.Group onValueChange={handleRadioChangeFour} value={checkedFour}>                                
                                                                        <View style={styles.radioCss}>
                                                                            <RadioButton value={1} />
                                                                            <Text style={styles.radioText}>Poor</Text>
                                                                            <RadioButton value={2} />                                                                            
                                                                            <Text style={styles.radioText}>Average</Text>
                                                                            <RadioButton value={3} />
                                                                            <Text style={styles.radioText}>Good</Text>
                                                                            <RadioButton value={4} />
                                                                            <Text style={styles.radioText}>Excellent</Text> 
                                                                            
                                                                        </View>

                                                                    </RadioButton.Group>
                                                                </View>
                                                            ):null
                                                        }
                                                    </View>
                                                    <View>
                                                        {
                                                            item.val == 5?(
                                                                <View>
                                                                    <RadioButton.Group onValueChange={handleRadioChangeFive} value={checkedFive}>                                
                                                                        <View style={styles.radioCss}>
                                                                            <RadioButton value={1} />
                                                                            <Text style={styles.radioText}>Poor</Text>
                                                                            <RadioButton value={2} />                                                                            
                                                                            <Text style={styles.radioText}>Average</Text>
                                                                            <RadioButton value={3} />
                                                                            <Text style={styles.radioText}>Good</Text>
                                                                            <RadioButton value={4} />
                                                                            <Text style={styles.radioText}>Excellent</Text> 
                                                                            
                                                                        </View>

                                                                    </RadioButton.Group>
                                                                </View>
                                                            ):null
                                                        }
                                                    </View>                                              
                                                                                              
                                                 </TouchableOpacity>
                                            ))
                                        } 
                                        <TouchableOpacity style={styles.submitBtn} onPress={()=>navigation.navigate('Feedback')}>
                                            <Text style={[styles.textcss,{color:'#fff'}]}>Submit</Text>
                                        </TouchableOpacity>                                     
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


export default FeedBackView;

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
        flex:1,
        // flex: 1,
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        // alignItems: 'flex-start' // if you want to fill rows left to right
      },
      item: {
        // width: '45%', // is 50% of container width
        // alignItems:'center',
        // marginTop:20,
        // marginRight:5,
        // marginLeft:5
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
    feedbox:{
        minHeight:80,
        width:'100%',
        margin:10,
        flex:1,
        borderRadius:10,
        backgroundColor:'#fff',
        alignSelf:'center'
    },
    fontfamilyCss:{
        fontFamily:'circular',
        textAlign:'justify',
        width:'90%',
        fontSize:16
    },
    fontCss:{
        textAlign:'justify',
        width:'90%',
        fontWeight:'bold',
        fontSize:16
    },
    radioText:{
        fontWeight:'bold',
        fontSize:12,
        paddingVertical:10
      },
      radioCss:{
        flexDirection:'row',
        justifyContent:'space-between',
        margin:10
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
        textcss:{
            padding:5,
            fontSize:20,
            fontWeight:'900',
            color:'#1D2F59'
        },
})