import { Image, View } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from "react";

const Onloading = ({ navigation }: any) => {
    useEffect(() => {
        const timeout = setTimeout(async () => {
            const token = await AsyncStorage.getItem('token');
            const role = await AsyncStorage.getItem("role");
            console.log("TOKEN =", token);
            console.log("ROLE =", role);

            if (token && role) {
                if (role === "member") {
                    navigation.replace("MemberTabs");
                } else {
                    navigation.replace("MainTabs");
                }
            } else {
                navigation.replace("Login");
            }
        }, 2000);

        return () => clearTimeout(timeout);
    }, [navigation]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image style={{ width: 250, height: 250 }} source={require('../assets/images/logo.jpg')}></Image>
        </View>
    );
}
export default Onloading;