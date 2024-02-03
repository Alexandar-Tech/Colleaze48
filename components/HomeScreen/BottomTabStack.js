import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
    Text,
  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFA from 'react-native-vector-icons/Feather';
import IconEA from 'react-native-vector-icons/EvilIcons';

import { ExploreScreen } from '../ExploreScreen';
import HomeMenu from './HomeMenu';
import ClassTimeTable from '../TimeTable/ClassTimeTable';
import MainAttendance from '../Attendance/MainAttendance';
import ExamTimeTable from '../TimeTable/ExamTimeTable';
import Complaint from '../Complaint';
import InstitutionInfo from '../InstitutionInfo';
import { EducationalLoan } from '../EducationalLoan/EducationalLoan';
import MainAssignment from '../Assignment/MainAssignment';
import TopicAssignment from '../Assignment/TopicAssignment';
import UploadAssignment from '../Assignment/UploadAssignmet';
import Fees from '../Fees/Fees';
import Gallery from '../Gallery/Gallery';
import { ProfileScreen } from './ProfileScreen';
import { ProfileScreenEdit } from './ProfileScreenEdit';
import { CircularDetails } from './CircularDetails';
import MainTeachingPlan from '../TeachingPlan/MainTeachingPlan';
import TeachingPlanUnit from '../TeachingPlan/TeachingPlanUnit';
import MySchedule from '../MySchedule/MySchedule';
import MainServiceRequest from '../ServiceRequest/MainServiceRequest';
import ServiceRequest from '../ServiceRequest/ServiceRequest';
import ODRequest from '../ODLeaveRequest/ODLeave';
import TrackStatus from '../ODLeaveRequest/TrackStatus';
import { MyPerformance } from '../Performance/MyPerformance';
import MainAssessment from '../Assessment/MainAssessment';
import { Event } from '../Events/Event';
import { LectureNotes } from '../TimeTable/LectureNotes';
import MainScholarship from '../Scholarship/MainScholarship';
import ScholarshipHomePage from '../Scholarship/SchoalrshipHomepage';
import AssignmentFilter from '../Assignment/AssignmentFilter';
import { Activites } from '../Activities/Activities';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = ({route}) => {
    return (
      <Stack.Navigator
        initialRouteName="HomeMenu"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeMenu" component={HomeMenu} options={{headerShown:false}} initialParams={{HomeData:route['params']['HomeData']}}/>
        <Stack.Screen name="ClassTimeTable" component={ClassTimeTable} options={{headerShown:false}}/>
        <Stack.Screen name="MainAttendance" component={MainAttendance} options={{headerShown:false}}/>
        <Stack.Screen name="ExamTimeTable" component={ExamTimeTable} options={{headerShown:false}}/>
        <Stack.Screen name="Complaint" component={Complaint} options={{headerShown:false}} initialParams={{HomeData:route['params']['HomeData']}}/>
        <Stack.Screen name="InstitutionInfo" component={InstitutionInfo} options={{headerShown:false}} initialParams={{HomeData:route['params']['HomeData']}}/>
        <Stack.Screen name="EducationalLoan" component={EducationalLoan} options={{headerShown:false}}/>
        <Stack.Screen name="Fees" component={Fees} options={{headerShown:false}}/>
        <Stack.Screen name="MainAssignment" component={MainAssignment} options={{headerShown:false}}/>
        <Stack.Screen name="UploadAssignment" component={UploadAssignment} options={{headerShown:false}}/>
        <Stack.Screen name="TopicAssignment" component={TopicAssignment} options={{headerShown:false}}/>
        <Stack.Screen name="Gallery" component={Gallery} options={{headerShown:false}} initialParams={{HomeData:route['params']['HomeData']}}/>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown:false}}/>
        <Stack.Screen name="ProfileScreenEdit" component={ProfileScreenEdit} options={{headerShown:false}}/>
        <Stack.Screen name="CircularDetails" component={CircularDetails} options={{headerShown:false}} initialParams={{HomeData:route['params']['HomeData']}}/>
        <Stack.Screen name="MainTeachingPlan" component={MainTeachingPlan} options={{headerShown:false}}/>
        <Stack.Screen name="TeachingPlanUnit" component={TeachingPlanUnit} options={{headerShown:false}}/>
        <Stack.Screen name="MySchedule" component={MySchedule} options={{headerShown:false}}/>
        <Stack.Screen name="MainServiceRequest" component={MainServiceRequest} options={{headerShown:false}}/>
        <Stack.Screen name="ServiceRequest" component={ServiceRequest} options={{headerShown:false}}/>
        <Stack.Screen name="ODRequest" component={ODRequest} options={{headerShown:false}}/>
        <Stack.Screen name="TrackStatus" component={TrackStatus} options={{headerShown:false}}/>
        <Stack.Screen name="MyPerformance" component={MyPerformance} options={{headerShown:false}}/>
        <Stack.Screen name="MainAssessment" component={MainAssessment} options={{headerShown:false}}/>
        <Stack.Screen name="Event" component={Event} options={{headerShown:false}}/>
        <Stack.Screen name="LectureNotes" component={LectureNotes} options={{headerShown:false}}/>
        <Stack.Screen name="MainScholarship" component={MainScholarship} options={{headerShown:false}} initialParams={{HomeData:route['params']['HomeData']}}/> 
        <Stack.Screen name="ScholarshipHomePage" component={ScholarshipHomePage} options={{headerShown:false}} initialParams={{HomeData:route['params']['HomeData']}}/> 
        <Stack.Screen name="AssignmentFilter" component={AssignmentFilter} options={{headerShown:false}} initialParams={{HomeData:route['params']['HomeData']}}/> 
        <Stack.Screen name="Activites" component={Activites} options={{headerShown:false}} initialParams={{HomeData:route['params']['HomeData']}}/> 
      </Stack.Navigator>
    );
  };
  


const BottomTabStack = ({route,navigation}) => {  
    return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle:{
            backgroundColor:'#1D2F59',
        },
        tabBarLabel: ({ focused }) => {
            let label;
  
            if (route.name === 'HomeStack') {
              label = focused ? 'Home' : 'Home'; // Customize label for Screen1
            } else if (route.name === 'Circular') {
              label = focused ? 'Circular' : 'Circular'; // Customize label for Screen2
            }else{
                label = focused?'Profile': 'Profile';
            }
  
            return <Text style={{ color: focused ? '#fff' : 'gray' }}>{label}</Text>;
          },
        tabBarIcon: ({ focused, color, size }) => {
            let iconName = "ios-home";
            if(route.name === 'HomeStack') {
                iconName = 'ios-home'; 
                return <Icon name={'dashboard'} size={size} color={color} />;

            }
            else if (route.name === 'Circular') {
                iconName = 'ios-list';
                return <IconFA name={'message-circle'} size={size} color={color} />;
            } else if (route.name === 'Profile') {
                iconName = 'ios-call';
                return <IconEA name={'user'} size={40} color={color} />;
            }

            
        },               

    })} initialRouteName='HomeStack'
        
        >
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{headerShown: false}}
          initialParams={{HomeData:route['params']["HomeData"]}}
        />
        <Tab.Screen
          name="Circular"
          component={ExploreScreen}
          options={{headerShown: false}}
          initialParams={{HomeData:route['params']['HomeData']}}
        />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}} initialParams={{HomeData:route['params']['HomeData']}}/>
      </Tab.Navigator>
    );
  }

export default BottomTabStack