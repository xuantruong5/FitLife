import React, { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const MemberLogin = ({ navigation }: any) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        navigation.navigate("MemberTabs");
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.circleOne} />
            <View style={styles.circleTwo} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.header}>
                    <View style={styles.logoBox}>
                        <Ionicons name="barbell-outline" size={34} color="#7C3AED" />
                    </View>

                    <Text style={styles.title}>FitLife Member</Text>
                    <Text style={styles.subTitle}>
                        Đăng nhập để theo dõi lịch tập và tiến độ của bạn
                    </Text>
                </View>

                <View style={styles.loginCard}>
                    <Text style={styles.cardTitle}>Đăng nhập</Text>
                    <Text style={styles.cardSubTitle}>Chào mừng bạn quay lại</Text>

                    <Text style={styles.label}>Email</Text>
                    <View style={styles.inputBox}>
                        <Ionicons name="mail-outline" size={21} color="#A78BFA" />

                        <TextInput
                            placeholder="Nhập email của bạn"
                            placeholderTextColor="#A7AFBF"
                            style={styles.input}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChangeText={setEmail}
                            value={email}
                        />
                    </View>

                    <Text style={styles.label}>Mật khẩu</Text>
                    <View style={styles.inputBox}>
                        <Ionicons name="lock-closed-outline" size={21} color="#A78BFA" />

                        <TextInput
                            placeholder="Nhập mật khẩu"
                            placeholderTextColor="#A7AFBF"
                            style={styles.input}
                            secureTextEntry={isShowPassword}
                            onChangeText={setPassword}
                            value={password}
                        />

                        <TouchableOpacity onPress={() => setIsShowPassword(!isShowPassword)}>
                            <Ionicons
                                name={isShowPassword ? "eye-off-outline" : "eye-outline"}
                                size={21}
                                color="#94A3B8"
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.optionRow}>
                        <TouchableOpacity
                            style={[
                                styles.checkBox,
                                isChecked && styles.checkBoxActive,
                            ]}
                            onPress={() => setIsChecked(!isChecked)}
                        >
                            {isChecked && (
                                <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                            )}
                        </TouchableOpacity>

                        <Text style={styles.rememberText}>Ghi nhớ đăng nhập</Text>

                        <TouchableOpacity
                            style={styles.forgotBtn}
                            onPress={() => navigation.navigate("MemberForgotPassword")}
                        >
                            <Text style={styles.forgotText}>Quên mật khẩu?</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.loginBtn}
                        activeOpacity={0.85}
                        onPress={handleLogin}
                    >
                        <Text style={styles.loginText}>ĐĂNG NHẬP</Text>
                    </TouchableOpacity>

                    <View style={styles.lineRow}>
                        <View style={styles.line} />
                        <Text style={styles.orText}>Hoặc đăng nhập với</Text>
                        <View style={styles.line} />
                    </View>

                    <View style={styles.socialRow}>
                        <TouchableOpacity style={styles.socialBtn}>
                            <Image
                                source={require("../../assets/images/google.png")}
                                style={styles.socialIcon}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.socialBtn}>
                            <Image
                                source={require("../../assets/images/apple.png")}
                                style={styles.socialIcon}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.socialBtn}>
                            <Image
                                source={require("../../assets/images/facebook.png")}
                                style={styles.socialIcon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.registerRow}>
                    <Text style={styles.registerText}>Chưa có tài khoản?</Text>

                    <TouchableOpacity onPress={() => navigation.navigate("MemberRegister")}>
                        <Text style={styles.registerLink}> Đăng ký</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F8FC",
    },

    circleOne: {
        position: "absolute",
        top: -80,
        right: -70,
        width: 210,
        height: 210,
        borderRadius: 105,
        backgroundColor: "#E9D5FF",
        opacity: 0.75,
    },

    circleTwo: {
        position: "absolute",
        bottom: -90,
        left: -70,
        width: 230,
        height: 230,
        borderRadius: 115,
        backgroundColor: "#DBEAFE",
        opacity: 0.9,
    },

    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: wp("6%"),
        paddingTop: hp("4%"),
        paddingBottom: hp("5%"),
        justifyContent: "center",
    },

    header: {
        alignItems: "center",
        marginBottom: hp("3%"),
    },

    logoBox: {
        width: 78,
        height: 78,
        borderRadius: 26,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 15,
        marginBottom: hp("1.8%"),
    },

    title: {
        fontSize: wp("7%"),
        fontWeight: "900",
        color: "#1E293B",
    },

    subTitle: {
        width: "85%",
        marginTop: hp("0.8%"),
        fontSize: wp("3.5%"),
        color: "#94A3B8",
        textAlign: "center",
        lineHeight: 21,
        fontWeight: "600",
    },

    loginCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 28,
        padding: wp("5%"),
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 18,
    },

    cardTitle: {
        fontSize: wp("5.8%"),
        fontWeight: "900",
        color: "#1E293B",
    },

    cardSubTitle: {
        marginTop: 4,
        fontSize: wp("3.4%"),
        color: "#94A3B8",
        fontWeight: "600",
        marginBottom: hp("2%"),
    },

    label: {
        fontSize: wp("3.2%"),
        color: "#64748B",
        fontWeight: "800",
        marginBottom: hp("0.7%"),
        marginTop: hp("1%"),
    },

    inputBox: {
        height: hp("6.7%"),
        backgroundColor: "#F8FAFC",
        borderRadius: 18,
        paddingHorizontal: wp("4%"),
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#EEF2F7",
    },

    input: {
        flex: 1,
        marginLeft: wp("2.5%"),
        fontSize: wp("3.8%"),
        color: "#1E293B",
        fontWeight: "600",
    },

    optionRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: hp("1.8%"),
    },

    checkBox: {
        width: 21,
        height: 21,
        borderRadius: 7,
        borderWidth: 1.5,
        borderColor: "#A78BFA",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
    },

    checkBoxActive: {
        backgroundColor: "#A78BFA",
    },

    rememberText: {
        color: "#64748B",
        fontSize: wp("3.2%"),
        fontWeight: "600",
    },

    forgotBtn: {
        marginLeft: "auto",
    },

    forgotText: {
        color: "#8B5CF6",
        fontSize: wp("3.2%"),
        fontWeight: "800",
    },

    loginBtn: {
        height: hp("6.8%"),
        borderRadius: 20,
        backgroundColor: "#C4B5FD",
        justifyContent: "center",
        alignItems: "center",
        marginTop: hp("3%"),
        elevation: 4,
        shadowColor: "#A78BFA",
        shadowOpacity: 0.35,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 12,
    },

    loginText: {
        color: "#FFFFFF",
        fontSize: wp("3.8%"),
        fontWeight: "900",
        letterSpacing: 0.8,
    },

    lineRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: hp("2.8%"),
    },

    line: {
        flex: 1,
        height: 1,
        backgroundColor: "#E5E7EB",
    },

    orText: {
        marginHorizontal: wp("3%"),
        color: "#94A3B8",
        fontSize: wp("3.1%"),
        fontWeight: "700",
    },

    socialRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: hp("2%"),
    },

    socialBtn: {
        width: wp("17%"),
        height: hp("6%"),
        borderRadius: 18,
        backgroundColor: "#F8FAFC",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: wp("1.5%"),
        borderWidth: 1,
        borderColor: "#EEF2F7",
    },

    socialIcon: {
        width: 25,
        height: 25,
        resizeMode: "contain",
    },

    registerRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: hp("3%"),
    },

    registerText: {
        color: "#64748B",
        fontSize: wp("3.5%"),
        fontWeight: "600",
    },

    registerLink: {
        color: "#8B5CF6",
        fontSize: wp("3.5%"),
        fontWeight: "900",
    },
});

export default MemberLogin;