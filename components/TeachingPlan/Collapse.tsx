import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

type AccordionItemPros = PropsWithChildren<{
  title: string;
}>;

function AccordionItem({ children, title }: AccordionItemPros): JSX.Element {
  const [ expanded, setExpanded ] = useState(false);

  function toggleItem() {
    setExpanded(!expanded);
  }

  const body = <View style={styles.accordBody}>{ children }</View>;

  return (
    <View style={styles.accordContainer}>
      <TouchableOpacity style={expanded?[styles.accordHeader,{backgroundColor:'#0BCCD8',borderTopLeftRadius:10,borderTopRightRadius:10}]:[styles.accordHeader,{borderRadius:10}]} onPress={ toggleItem }>
        <Text style={expanded?[styles.accordTitle,{color:'#fff'}]:[styles.accordTitle,{}]}>{ title }</Text>
        <Icon name={ expanded ? 'chevron-up' : 'chevron-down' }
              size={20} color="#eee" />
      </TouchableOpacity>
      { expanded && body }
    </View>
  );
}

function COllapse(valData:any): JSX.Element {
  const val_data = valData.val
  const token = valData.token
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}>
            {
                val_data?
                (
                    <View>
                        {/* {
                            val_data['data'].map((item:any) =>(
                                <View key={item.id}>
                                    <AccordionItem title={item.subject.name}>
                                        {
                                          item['syllabus_details'].map((unitData:any,index:any) =>(
                                            <TouchableOpacity onPress={()=>navigation.navigate('TeachingPlanUnit',{
                                              unitData:unitData,
                                              subName:item.subject.name,
                                              teacherName:item.subject.teacher,
                                              token:token,
                                              syllabus_details:unitData.id
                                            })} key={index}>
                                                <View style={{margin:10,flex:1}} key={index}>
                                                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                                        <Text style={{fontSize:14,fontWeight:'bold'}}>{unitData.unit}</Text>
                                                        <Icon name={'angle-right'} size={20}  />
                                                    </View>                                                
                                                    <View style={{borderBottomWidth:1,marginTop:5,opacity:0.2}}></View>
                                                </View>
                                            </TouchableOpacity>
                                          )                                       
                                          )
                                        }
                                    </AccordionItem>
                                </View>
                            ))
                        } */}
                        {
                          val_data['data'].map((item:any,index:any) =>(
                            <View key={item.id}>
                              {
                                item['syllabus_details'].map((unitData:any,index:any) =>(
                                  <TouchableOpacity onPress={()=>navigation.navigate('TeachingPlanUnit',{
                                    unitData:unitData,
                                    subName:item.college_subject.name,
                                    teacherName:item.college_subject.teacher,
                                    token:token,
                                    syllabus_details:unitData.id
                                  })} key={index}>
                                  <View style={{margin:10,flex:1,backgroundColor:'#fff',minHeight:50,justifyContent:'center',borderRadius:10}} key={index}>
                                      <View style={{flexDirection:'row',justifyContent:'space-between',padding:5}}>
                                          <Text style={{fontSize:13,fontWeight:'bold'}}>{unitData.unit}</Text>
                                          <Icon name={'angle-right'} size={20}  />
                                      </View>                                            
                                      {/* <View style={{borderBottomWidth:1,marginTop:5,opacity:0.2}}></View> */}
                                  </View>
                                  </TouchableOpacity>

                                ))
                              }
                            </View>
                            
                          ))
                        }
                        

                    </View>
                ):null
            }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,        
      },
      accordContainer: {
        paddingBottom: 4,        
      },
      accordHeader: {
        padding: 12,
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginRight:10,
        marginLeft:10,
      },
      accordTitle: {
        fontSize: 16,
        fontWeight:'bold'
      },
      accordBody: {
        padding: 12,
        backgroundColor:'#fff',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        marginRight:10,
        marginLeft:10,
        borderWidth:1,
        borderColor:"#0BCCD8",
        flex:1
      },
      textSmall: {
        fontSize: 16
      },
      seperator: {
        height: 12
      }
});

export default COllapse;