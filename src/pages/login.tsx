import React, { useState } from "react";
import { Alert, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiFitlife from "../general/api";


// GoogleSignin.configure({
//     webClientId: '303952483583-2k3av4gg4o62ckbf2dkm89jd65u1p6ms.apps.googleusercontent.com', // Replace with your actual webClientId
//     offlineAccess: true, // Optional: Request refresh token for offline access
// });

GoogleSignin.configure();

const Login = ({ navigation }: any) => {
    const [isChecked, setIsChecked] = useState(false);
    const [is_show, setIsShow] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [loginType, setLoginType] = useState<'member' | 'trainer'>('member'); // phân loại đăng nhập 


    const signInWithGoogle = async () => {
        if (isSigningIn == true) return;
        setIsSigningIn(true);
        try {
            console.log("1. Start Google Sign In");
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            console.log("2. Play Services OK");
            const userInfo = await GoogleSignin.signIn();
            console.log("3. userInfo =", JSON.stringify(userInfo, null, 2));

            if (userInfo && userInfo.type == "success") {
                console.log("4. Google login success");
                var user = userInfo.data.user;
                console.log("5. User =", user);

                try {
                    const res = await apiFitlife.post('/login-google', user);
                    console.log("API =", res.data);
                    console.log("6. API Response =", JSON.stringify(res.data, null, 2));
                    if (res.data.status == true) {
                        console.log("7. Save token");
                        var message = res.data.message;
                        var token = res.data.token;
                        await AsyncStorage.setItem('token', token);
                        await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
                        console.log("8. Navigate");
                        Alert.alert(message, "", [
                            { text: "OK", onPress: () => navigation.navigate('MemberTabs') }
                        ]);
                    }
                } catch (error) {


                    Alert.alert("Error logging in with Google");
                }

            }
        } catch (error: any) {
            console.log("========== API ERROR ==========");
            console.log("Status:", error?.response?.status);
            console.log("Data:", JSON.stringify(error?.response?.data, null, 2));
            console.log("Message:", error?.message);
            console.log("Full Error:", error);

            Alert.alert(
                "Google Login Error",
                error?.response?.data?.message || error?.message || "Unknown error"
            );
            console.log('Google sign-in error code:', error.code);
            console.log('Google sign-in error message:', error.message);
        } finally {
            setIsSigningIn(false);
        }
    }



    // const handleLogin = async () => {
    //     var payload = {
    //         email: email,
    //         password: password,
    //     };
    //     const api =  loginType === "member" ? "/login" : "/trainer/login";


    // try {
    //         const response = await apiFitlife.post(api, payload);
    //         var message = response.data.message;
    //         const  user = response.data.user;
    //         var token = response.data.token;
    //         var status = response.data.status;
    //         if (status) {
    //             // Lưu token hoặc thông tin người dùng nếu cần
    //             await AsyncStorage.setItem('token', token);
    //             await AsyncStorage.setItem("user", JSON.stringify(user));
    //             await AsyncStorage.setItem("role", loginType);
    //             // await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    //             console.log("USER DATA", response.data.user);

    //             Alert.alert(message, "", [
    //                 { text: "OK", onPress: () =>  navigation.replace( loginType === "member" ? "MemberTabs" : "MainTabs" ),
    //             },
    //             ]);
    //         } else {
    //             Alert.alert(message);
    //         }
    //     } catch (error: any) {
    //         const message = error?.data?.message || "Đăng nhập thất bại";
    //         Alert.alert(message);
    //         const listErrors = error?.data?.errors;
    //         if (listErrors) {
    //             const listFor = Object.fromEntries(
    //                 Object.entries(listErrors).map(([k, v]: any) => [k, Array.isArray(v) ? v[0] : String(v)])
    //             );
    //         }
    //     }
    // };
    const handleLogin = async () => {
        const payload = {
            email,
            password,
        };

        try {
            // Thử đăng nhập Member trước
            let response = await apiFitlife.post("/login", payload);

            if (response.data.status) {
                await AsyncStorage.setItem("token", response.data.token);
                await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
                await AsyncStorage.setItem("role", "member");


                Alert.alert(response.data.message, "", [
                    {
                        text: "OK",
                        onPress: () => navigation.replace("MemberTabs"),
                    },
                ]);
                return;
            }

            // Nếu Member thất bại thì thử Trainer
            response = await apiFitlife.post("/trainer/login", payload);

            if (response.data.status) {
                await AsyncStorage.setItem("token", response.data.token);
                await AsyncStorage.setItem("user", JSON.stringify(response.data.trainer));
                await AsyncStorage.setItem("role", "trainer");

                Alert.alert(response.data.message, "", [
                    {
                        text: "OK",
                        onPress: () => navigation.replace("MainTabs"),
                    },
                ]);
                return;
            }

            Alert.alert("Đăng nhập thất bại");
        } catch (error: any) {
            console.log("LOGIN ERROR:", error?.response?.data);
            console.log("STATUS:", error?.response?.status);
            console.log("MESSAGE:", error?.message);
            Alert.alert(error?.data?.message || "Đăng nhập thất bại");
        }
    };



    return (

        <ImageBackground
            source={require('../assets/images/anhlogin.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >

            <View style={styles.overlay}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.bodyContainer}>

                        <View style={styles.headerContainer}>
                            <Text style={styles.textWelcomeBack}>Welcome Back!</Text>
                            <Text style={styles.textSubGym}>Ready to crush your goals?</Text>
                        </View>

                        <View style={[styles.textInput, { marginTop: 40 }]}>
                            <Ionicons name="person" size={24} color="#BBB" />
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor="#666"
                                style={styles.inputStyle}
                                onChangeText={setEmail}
                                value={email}
                            />
                        </View>

                        <View style={styles.textInput}>
                            <Ionicons name="lock-closed" size={24} color="#BBB" />
                            <TextInput
                                placeholder="Password"
                                placeholderTextColor="#666"
                                style={styles.inputStyle}
                                secureTextEntry={is_show}
                                onChangeText={setPassword}
                                value={password}
                            />
                            <TouchableOpacity onPress={() => setIsShow(!is_show)}>
                                <Ionicons name={is_show ? "eye-off" : "eye"} size={24} color="#BBB" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.rowActions}>
                            <TouchableOpacity
                                onPress={() => setIsChecked(!isChecked)}
                                style={[styles.nutremmember, isChecked && styles.nutremmemberActive]}
                            >
                                {isChecked && <Ionicons name="checkmark" size={14} color="#121212" />}
                            </TouchableOpacity>
                            <Text style={styles.labelRemember}>Remember me</Text>

                            <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={() => navigation.navigate('ForgotPassWord')}>
                                <Text style={styles.textforgot}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.buttonContainer} onPress={() => handleLogin()}>
                            <Text style={styles.buttonText}>LOGIN</Text>
                        </TouchableOpacity>

                        <View style={styles.bottomContainer}>
                            <Text style={styles.orText}>Or Continue With</Text>

                            <View style={styles.bottomBodyContainer}>
                                <TouchableOpacity style={styles.socialButton} onPress={signInWithGoogle}>
                                    <Image style={styles.bottomItemImage} source={require('../assets/images/google.png')} />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.socialButton}>
                                    <Image style={styles.bottomItemImage} source={require('../assets/images/apple.png')} />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.socialButton}>
                                    <Image style={styles.bottomItemImage} source={require('../assets/images/facebook.png')} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.textCloseContainer}>
                                <Text style={styles.bottomText}>Create An Account?</Text>
                                <TouchableOpacity onPress={() => navigation.navigate("MemberRegister")}>
                                    <Text style={styles.signUpText}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </SafeAreaView>
            </View>
        </ImageBackground>
    );
};

export default Login;

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(18, 18, 18, 0.65)',
    },
    container: {
        flex: 1,
    },
    bodyContainer: {
        flex: 1,
        marginHorizontal: 24,
        justifyContent: 'center',
    },
    headerContainer: {
        marginBottom: 10,
        alignItems: 'center'
    },
    textWelcomeBack: {
        fontSize: 38,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    textSubGym: {
        fontSize: 16,
        color: '#CCCCCC',
        marginTop: 5,
        textAlign: 'center',
    },
    textInput: {
        marginTop: 18,
        backgroundColor: 'rgba(30, 30, 30, 0.85)',
        borderColor: '#333333',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    inputStyle: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 16,
    },
    rowActions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    nutremmember: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#A3FF12',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
        borderRadius: 6,
    },
    nutremmemberActive: {
        backgroundColor: '#A3FF12',
    },
    labelRemember: {
        fontSize: 14,
        color: '#BBBBBB',
    },
    textforgot: {
        color: '#A3FF12',
        fontWeight: '700',
        fontSize: 14,
    },
    buttonContainer: {
        marginTop: 35,
        backgroundColor: '#A3FF12',
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#A3FF12',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '900',
        color: '#121212',
        letterSpacing: 1,
    },
    bottomContainer: {
        alignItems: 'center',
        marginTop: 40,
    },
    orText: {
        fontSize: 14,
        color: '#AAAAAA',
        fontWeight: '600',
    },
    bottomBodyContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        gap: 15,
    },
    socialButton: {
        width: 75,
        height: 55,
        backgroundColor: 'rgba(30, 30, 30, 0.85)',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#2A2A2A',
    },
    bottomItemImage: {
        width: 26,
        height: 26,
        resizeMode: 'contain',
    },
    textCloseContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 35,
    },
    bottomText: {
        fontSize: 14,
        color: '#BBBBBB',
    },
    signUpText: {
        fontSize: 14,
        marginLeft: 5,
        color: '#A3FF12',
        fontWeight: '700',
        textDecorationLine: "underline",
    },
});