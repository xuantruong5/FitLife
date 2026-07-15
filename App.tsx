import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, createNavigationContainerRef } from "@react-navigation/native";
import { Alert, Animated } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomePage from "./src/pages/HomePage";
import { notificationEmitter } from "./src/general/notification";
import Login from "./src/pages/login";
import Onloading from "./src/pages/on_loading";
import Attendance from "./src/pages/AttendancePage";
import Calendar from "./src/pages/CalendarPage";
import MembersPage from "./src/pages/MembersPage";
import Progress from "./src/pages/ProgressPage";
import MemberDetails from "./src/pages/MemberDetails";
import TrainerIncome from "./src/pages/TrainerIncome";
import ChangeSchedule from "./src/pages/ChangeSchedule";
import MemberHome from "./src/pages/Member/MemberHome";
import MemberProgress from "./src/pages/Member/MemberProgress";
import MemberTrainer from "./src/pages/Member/MemberTrainer";
import MemberProfile from "./src/pages/Member/MemberProfile";
import MemberTrainerDetail from "./src/pages/Member/MemberTrainerDetail";
import MemberLogin from "./src/pages/Member/MemberLogin";
import MemberForgotPassword from "./src/pages/Member/MemberForgotPassword";
import MemberRegister from "./src/pages/Member/MemberRegister";
import MemberEditProfile from "./src/pages/Member/MemberEditProfile";
import MemberChangePassword from "./src/pages/Member/MemberChangePassword";
import Workout from "./src/pages/WorkoutSessions";
import CreateSchedule from "./src/pages/CreateSchedule";
import EditSchedule from "./src/pages/EditSchedule";
import Test from "./src/pages/test";
import Profile from "./src/pages/Profile";
import MemberPackage from "./src/pages/Member/MemberPackage";
import MemberBooking from "./src/pages/Member/MemberBooking";
import selectPackage from "./src/pages/Member/SelectPackage";
import selecttrainer from "./src/pages/Member/SelectTrainer";
import confirmBooking from "./src/pages/Member/ConfirmBooking";
import payment from "./src/pages/Member/Payment";
import BookingSuccess from "./src/pages/Member/BookingSuccess";
import MemberSchedule from "./src/pages/Member/MemberSchedule";
import ScheduleDetail from "./src/pages/Member/ScheduleDetail";
import MemberTrainerNotes from "./src/pages/Member/MemberTrainerNotes";
import CurrentTrainer from "./src/pages/Member/CurrentTrainer";
import MemberChangeSchedule from "./src/pages/Member/MemberChangeSchedule";
import TrainerEditProfile from "./src/pages/TrainerEditProfile";
import TrainerChangePassword from "./src/pages/TrainerChangePassword";
import TrainerTeachingHistory from "./src/pages/TrainerTeachingHistory";
import StoreScheduleMember from "./src/pages/StoreScheduleMember";



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const navigationRef = createNavigationContainerRef();


function AnimatIcon({ name_icon, focused, color, size }: { name_icon: string; focused: boolean; color: string; size: number }) {
  const scaleIcon = new Animated.Value(focused ? 1.2 : 1);
  React.useEffect(() => {
    Animated.spring(scaleIcon, {
      toValue: focused ? 1.2 : 1,
      useNativeDriver: true,
    }).start();
  }, [focused]);
  return (
    <Animated.View style={{ transform: [{ scale: scaleIcon }] }}>
      <Ionicons name={name_icon} size={size} color={color} />
    </Animated.View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let name_icon = "";
          if (route.name === "Home") name_icon = focused ? "home" : "home-outline";
          else if (route.name === "Login") name_icon = focused ? "heart-sharp" : "heart-outline";
          else if (route.name === "ScanQR") name_icon = focused ? "scan-circle" : "scan";
          else if (route.name === "ChatBot") name_icon = focused ? "chatbubbles" : "chatbubbles-outline";
          else if (route.name === "Profile") name_icon = focused ? "person-circle-sharp" : "people-outline";
          return (
            <AnimatIcon
              name_icon={name_icon}
              focused={focused}
              color={color}
              size={size}
            />
          );
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold"
        }
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="tao lich" component={StoreScheduleMember} />
      {/* <Tab.Screen name="ScanQR" component={ScanQR} />
      <Tab.Screen name="ChatBot" component={ChatBot} /> */}
      <Tab.Screen name="Profile" component={Profile} />

    </Tab.Navigator>

  );
}

function MemberTabs() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let name_icon = "";
        if (route.name === "Home") name_icon = focused ? "home" : "home-outline";
        else if (route.name === "Trainer") name_icon = focused ? "people-sharp" : "people-outline";
        else if (route.name === "Calendar") name_icon = focused ? "calendar" : "calendar-outline";
        else if (route.name === "ChatBot") name_icon = focused ? "chatbubbles" : "chatbubbles-outline";
        else if (route.name === "Profile") name_icon = focused ? "person-circle-sharp" : "person-outline";
        return (
          <AnimatIcon
            name_icon={name_icon}
            focused={focused}
            color={color}
            size={size}
          />
        );
      },
      tabBarActiveTintColor: "black",
      tabBarInactiveTintColor: "gray",
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: "bold"
      }
    })}>
      <Tab.Screen name= "Home" component={MemberHome} />
      <Tab.Screen name="Trainer" component={CurrentTrainer} />
      <Tab.Screen name="Calendar" component={MemberSchedule} />
      <Tab.Screen name="Profile" component={MemberProfile} />
    </Tab.Navigator>
  );
}


const App = () => {
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);
  useEffect(() => {
    const sub = (payload: any) => {
      const { type, message } = payload;
      if (type === "auth") {
        Alert.alert("Authentication Error", message);
        navigationRef.navigate("Login" as never);
      }
    }
    notificationEmitter.on("thong_bao", sub);

    return () => {
      notificationEmitter.off("thong_bao", sub);
    };
  }, []);
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        if (pendingRoute) {
          navigationRef.navigate(pendingRoute as never);
          setPendingRoute(null);
        }
      }}
    >
      <Stack.Navigator
        initialRouteName="OnLoading"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="MemberTabs" component={MemberTabs} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="OnLoading" component={Onloading} />
        <Stack.Screen name="Attendance" component={Attendance} />
        <Stack.Screen name="Calendar" component={Calendar} />
        <Stack.Screen name="MembersPage" component={MembersPage} />
        <Stack.Screen name="Progress" component={Progress} />
        <Stack.Screen name="MemberDetails" component={MemberDetails} />
        <Stack.Screen name="TrainerIncome" component={TrainerIncome} />
        <Stack.Screen name="ChangeSchedule" component={ChangeSchedule} />
        <Stack.Screen name="MemberProgress" component={MemberProgress} />
        <Stack.Screen name="MemberTrainerDetail" component={MemberTrainerDetail} />
        <Stack.Screen name="MemberLogin" component={MemberLogin} />
        <Stack.Screen name="MemberForgotPassword" component={MemberForgotPassword} />
        <Stack.Screen name="MemberRegister" component={MemberRegister} />
        <Stack.Screen name="MemberEditProfile" component={MemberEditProfile} />
        <Stack.Screen name="MemberChangePassword" component={MemberChangePassword} />
        <Stack.Screen name="Workout" component={Workout} />
        <Stack.Screen name="CreateSchedule" component={CreateSchedule} />
        <Stack.Screen name="EditSchedule" component={EditSchedule} />
        <Stack.Screen name="MemberPackage" component={MemberPackage}/>
        <Stack.Screen name="MemberBooking" component={MemberBooking}/>
        <Stack.Screen name="selectPackage" component={selectPackage} /> 
        <Stack.Screen name="selecttrainer" component={selecttrainer}/>
        <Stack.Screen name="confirmBooking" component={confirmBooking}/>
        <Stack.Screen name="payment" component={payment}/>
        <Stack.Screen name="BookingSuccess" component={BookingSuccess}/>
        <Stack.Screen name="ScheduleDetail" component={ScheduleDetail}/>
        <Stack.Screen name="MemberTrainerNotes" component={MemberTrainerNotes}/>
        <Stack.Screen name="MemberTrainer" component={MemberTrainer}/>
        <Stack.Screen name="MemberChangeSchedule" component={MemberChangeSchedule}/> 
        <Stack.Screen name="TrainerEditProfile" component={TrainerEditProfile}/>
        <Stack.Screen name="TrainerChangePassword" component={TrainerChangePassword}/>
        <Stack.Screen name="TrainerTeachingHistory" component={TrainerTeachingHistory}/>
        <Stack.Screen name="Test" component={Test} />
        

      </Stack.Navigator>

    </NavigationContainer>
  )
}





export default App;
