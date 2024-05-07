import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,StyleSheet,ScrollView,Alert,ActivityIndicator } from 'react-native';
import Modal from "react-native-modal";

const AlertBox = (valBool) => {
    console.log(valBool['valBool'])
    const [isVisibleModal, setIsVisibleModal] = useState(valBool['valBool']);
    return(
        <View>
            <Modal
            isVisible={isVisibleModal}
            style={styles.modelcontainer}
            onBackdropPress={() => setIsVisibleModal(false)}
            swipeDirection={['down']}
            onSwipeComplete={() => setIsVisibleModal(false)}
            >
                <View style={styles.modelView}>
                    <Text style={styles.fontCss}>No Data Found</Text>              
                </View>
            </Modal>
        </View>
    )

}

export default AlertBox;

const styles = StyleSheet.create({
    modelView:{
        backgroundColor: 'white', 
        padding: 16,
        borderWidth:2,
        borderColor:'#0BCCD8',
        borderRadius:20,
        height:180,
        alignItems:'center',
        justifyContent:'center'
      },
      modelViewattendance:{
        backgroundColor: 'white',   
        borderWidth:2,
        borderColor:'#0BCCD8',
        flex:1
      },
      modelcontainer:{
        margin:20,
        justifyContent:'center'
      },
      fittocontent:{
        flexDirection:'row',
        justifyContent:'space-between',
        margin:10
      },
      fontCss:{
        fontWeight:'bold',
        color:'red',
        fontSize:18
      },
})