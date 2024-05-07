import React, {  useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  LogBox
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Dropdown } from 'react-native-element-dropdown';




const HomepageLogin = () => {
    const data = [];

      const DropdownComponent = (props) => {
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
              data={data}
              search
              maxHeight={300}
              labelField= 'label'
              valueField= 'value'
              placeholder={!isFocus ? '' : '...'}
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
        <>
            <View style={{backgroundColor:'#313955',height:'100%'}}>
                <Image style={styles.logo} source={require('../assets/splash_header_image.png')} />
                <View>
                    <Text style={styles.fontcss}>Phone Number</Text>
                    <View style={styles.LoginPadding}>
                        <View style={styles.fixToText}>
                            <View style={{width:'30%'}}>
                                <DropdownComponent />                                
                                
                            </View>
                            <View style={{width:'70%',alignItems:'center'}}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Phone Number"
                                placeholderTextColor="#003f5c"
                            />
                                {/* <Text style={{fontSize:16,color:'#313955',fontWeight:'bold'}}>8754297039</Text> */}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}

export default function HomepageLoginScreen() {
    return (
      <View>
        <HomepageLogin />
      </View>
    );
  }


  const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius:10,
    borderColor:'#fff',
    borderWidth:1
  },
  fontcss:{
    fontSize:16,
    fontWeight:'bold',
    color:'#fff',
    padding:15
  },
  button: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:'100%',
    margin:10
  },
  LoginPadding: {
    backgroundColor: '#ffff',
    borderRadius: 20,
    height:50,
    width:'90%',
    alignSelf:'center'
  },
  logo: {
    height:'60%',
    width:'100%'

  },
  inputView: {
    top: 20,
    left: 40,
    backgroundColor: '#FFFF',
    borderRadius: 10,
    width: '80%',
    height: 45,
    marginBottom: 20,
  },
  TextInput: {
    height: 40,
    flex: 1,
    paddingRight: 20,
    marginLeft: 60,
    bottom: 10,
  },

  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    backgroundColor: '#0BCCD8',
  },
  dropdown: {
    height: 30,
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
});