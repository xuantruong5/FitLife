import React, { useState } from "react";
import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Login = ({ navigation }: any) => {
    const [isChecked, setIsChecked] = useState(false);
    const [is_show, setIsShow] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>LOGIN</Text>
                        </TouchableOpacity>

                        <View style={styles.bottomContainer}>
                            <Text style={styles.orText}>Or Continue With</Text>
                            
                            <View style={styles.bottomBodyContainer}>
                                <TouchableOpacity style={styles.socialButton}>
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
                                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
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