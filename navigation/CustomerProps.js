import { useNavigation } from '@react-navigation/native';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
  } from 'react-native';

const CustomDrawerContent = (props) => {
    const navigation = useNavigation();
    return (
      <DrawerContentScrollView {...props}>
        <View style={{backgroundColor:'#1D2F59',height:200,borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
            <Image style={styles.logo} source={require('../assets/Mask_group.png')} />
            <Text style={styles.textcss}>Aro Infant</Text>
            <Text style={[styles.textcss,{fontSize:14}]}>aroinfantraj@yopmail.com</Text>
        </View>
        <View style={{backgroundColor:'#CEF5F7',height:120}}>
          <View style={[styles.fittotext,{marginRight:10,marginLeft:10}]}>
            <TouchableOpacity onPress={()=>navigation.navigate('EducationalLoan')}>
              <View style={styles.box}>
                <Image style={{height:40,width:40,}} source={require('../assets/Library/book_1.png')} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('MainScholarship')}>
              <View style={styles.box}>
                <Image style={{height:40,width:40,}} source={require('../assets/Home_mvp/money_1.png')} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Gallery')}>
              <View style={styles.box}>
                <Image style={{height:40,width:40,}} source={require('../assets/Home_mvp/balloons_1.png')} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.fittotext,{marginRight:10}]}>
            <Text style={{textAlign:'center',fontSize:12,fontWeight:'bold',color:'#1D2F59',width:70,marginLeft:20}}>Educational Loan</Text>
            <Text style={{fontSize:12,fontWeight:'bold',color:'#1D2F59',marginRight:20}}>Scholarship</Text>
            <Text style={{fontSize:12,fontWeight:'bold',color:'#1D2F59',marginRight:10}}>Gallery</Text>
          </View>
                
        </View>
        <DrawerItemList {...props} />
        <DrawerItem label="Complaint" onPress={()=>navigation.navigate('Complaint')} />
        <DrawerItem label="InstitutionInfo" onPress={()=>navigation.navigate('InstitutionInfo')} />
        <DrawerItem label="Logout" onPress={() => navigation.navigate('LoginScreen')} />
        <View style={{alignItems:'center'}}>
          <Text style={{fontSize:17,fontWeight:'bold',top:30}}>Powered By</Text>
          <Image style={{height:100,width:100,resizeMode:'contain'}} source={require('../assets/EducationalLoan/drawer_col.png')} />
  
        </View>
      </DrawerContentScrollView>
    );
  }

  export default CustomDrawerContent
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo:{
        margin:20,
        height:80,
        width:80
    },
    textcss:{
        color:'#fff',
        fontSize:20,
        fontWeight:'bold',
        paddingHorizontal:20,
        paddingVertical:5
    },
    fittotext:{
        justifyContent:'space-between',
        flexDirection:'row'
    },
    box:{
        height:60,
        width:60,
        borderRadius:10,
        backgroundColor:'#fff',
        margin:10,
        justifyContent:'center',
        alignItems:'center'
  
    }
  });