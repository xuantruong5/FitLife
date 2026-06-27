import React, { useState } from "react";
import {
    Alert,
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

const MemberForgotPassword = ({ navigation }: any) => {
    const [email, setEmail] = useState("an.nguyen@gmail.com");

    const handleSendResetLink = () => {
        if (!email) {
            Alert.alert("Thông báo", "Vui lòng nhập email đã đăng ký");
            return;
        }

        Alert.alert(
            "Thành công",
            "Liên kết đặt lại mật khẩu đã được gửi đến email của bạn",
            [
                {
                    text: "OK",
                    onPress: () => navigation.goBack(),
                },
            ]
        );
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
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={22} color="#1E293B" />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Quên mật khẩu</Text>

                    <View style={{ width: 42 }} />
                </View>

                <View style={styles.content}>
                    <View style={styles.mailIconBox}>
                        <Ionicons name="mail-outline" size={38} color="#A78BFA" />
                    </View>

                    <Text style={styles.title}>Đặt lại mật khẩu</Text>

                    <Text style={styles.description}>
                        Nhập email đã đăng ký. Chúng tôi sẽ gửi liên kết đặt lại mật khẩu cho bạn.
                    </Text>

                    <View style={styles.formCard}>
                        <View style={styles.inputBox}>
                            <Ionicons name="mail-outline" size={20} color="#A7AFBF" />

                            <TextInput
                                placeholder="Nhập email của bạn"
                                placeholderTextColor="#A7AFBF"
                                style={styles.input}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.sendBtn}
                            activeOpacity={0.85}
                            onPress={handleSendResetLink}
                        >
                            <Text style={styles.sendText}>Gửi link đặt lại mật khẩu</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.backLoginBtn}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back-outline" size={16} color="#8B5CF6" />
                        <Text style={styles.backLoginText}>Quay lại đăng nhập</Text>
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
        paddingTop: hp("2%"),
        paddingBottom: hp("5%"),
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    backBtn: {
        width: 42,
        height: 42,
        borderRadius: 14,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        elevation: 4,
    },

    headerTitle: {
        fontSize: wp("5%"),
        color: "#1E293B",
        fontWeight: "900",
    },

    content: {
        flex: 1,
        alignItems: "center",
        marginTop: hp("9%"),
    },

    mailIconBox: {
        width: 82,
        height: 82,
        borderRadius: 32,
        backgroundColor: "#F4EDFF",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: hp("2.2%"),
        elevation: 3,
    },

    title: {
        fontSize: wp("5.3%"),
        fontWeight: "900",
        color: "#1E293B",
        marginBottom: hp("1%"),
    },

    description: {
        width: "85%",
        textAlign: "center",
        color: "#94A3B8",
        fontSize: wp("3.4%"),
        lineHeight: 21,
        fontWeight: "600",
        marginBottom: hp("4%"),
    },

    formCard: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 28,
        padding: wp("5%"),
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 18,
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
        fontSize: wp("3.7%"),
        color: "#1E293B",
        fontWeight: "700",
    },

    sendBtn: {
        height: hp("6.8%"),
        borderRadius: 18,
        backgroundColor: "#C4B5FD",
        justifyContent: "center",
        alignItems: "center",
        marginTop: hp("2.5%"),
        elevation: 4,
        shadowColor: "#A78BFA",
        shadowOpacity: 0.35,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 12,
    },

    sendText: {
        color: "#FFFFFF",
        fontSize: wp("3.7%"),
        fontWeight: "900",
    },

    backLoginBtn: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: hp("3%"),
    },

    backLoginText: {
        color: "#8B5CF6",
        fontSize: wp("3.4%"),
        fontWeight: "800",
        marginLeft: 5,
    },
});

export default MemberForgotPassword;