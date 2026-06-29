import React, { useState } from "react";
import {Alert,ScrollView,StyleSheet,Text,TextInput,TouchableOpacity,View,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import {widthPercentageToDP as wp,heightPercentageToDP as hp,} from "react-native-responsive-screen";

const MemberChangePassword = ({ navigation }: any) => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showNewPassword, setShowNewPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);

    const handleResetPassword = () => {
        if (!email || !newPassword || !confirmPassword) {
            Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin");
            return;
        }

        if (newPassword.length < 8) {
            Alert.alert("Thông báo", "Mật khẩu mới phải có ít nhất 8 ký tự");
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert("Thông báo", "Mật khẩu xác nhận không khớp");
            return;
        }

        Alert.alert("Thành công", "Đổi mật khẩu thành công", [
            {
                text: "OK",
                onPress: () => navigation.goBack(),
            },
        ]);
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

                    <Text style={styles.headerTitle}>Đổi mật khẩu</Text>

                    <View style={{ width: 42 }} />
                </View>

                <View style={styles.iconCenter}>
                    <View style={styles.shieldBox}>
                        <Ionicons name="shield-outline" size={34} color="#A78BFA" />
                    </View>

                    <Text style={styles.description}>
                        Nhập email tài khoản và mật khẩu mới để đặt lại mật khẩu.
                    </Text>
                </View>

                <View style={styles.formCard}>
                    <Text style={styles.label}>Email tài khoản</Text>
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

                    <Text style={styles.label}>Mật khẩu mới</Text>
                    <View style={styles.inputBox}>
                        <Ionicons name="lock-closed-outline" size={20} color="#A7AFBF" />

                        <TextInput
                            placeholder="Nhập mật khẩu mới"
                            placeholderTextColor="#A7AFBF"
                            style={styles.input}
                            secureTextEntry={showNewPassword}
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />

                        <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                            <Ionicons
                                name={showNewPassword ? "eye-off-outline" : "eye-outline"}
                                size={20}
                                color="#A7AFBF"
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Xác nhận mật khẩu mới</Text>
                    <View style={styles.inputBox}>
                        <Ionicons name="lock-closed-outline" size={20} color="#A7AFBF" />

                        <TextInput
                            placeholder="Nhập lại mật khẩu mới"
                            placeholderTextColor="#A7AFBF"
                            style={styles.input}
                            secureTextEntry={showConfirmPassword}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />

                        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                            <Ionicons
                                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                                size={20}
                                color="#A7AFBF"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.tipCard}>
                    <View style={styles.tipHeader}>
                        <Ionicons name="shield-checkmark-outline" size={18} color="#A78BFA" />
                        <Text style={styles.tipTitle}>Gợi ý bảo mật</Text>
                    </View>

                    <Text style={styles.tipText}>• Tối thiểu 8 ký tự</Text>
                    <Text style={styles.tipText}>• Kết hợp chữ hoa, chữ thường và số</Text>
                    <Text style={styles.tipText}>• Không dùng thông tin cá nhân</Text>
                    <Text style={styles.tipText}>• Mật khẩu nên được đổi định kỳ</Text>
                </View>

                <TouchableOpacity
                    style={styles.resetBtn}
                    activeOpacity={0.85}
                    onPress={handleResetPassword}
                >
                    <Text style={styles.resetText}>Đổi mật khẩu</Text>
                </TouchableOpacity>
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
        marginBottom: hp("4%"),
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

    iconCenter: {
        alignItems: "center",
        marginBottom: hp("3%"),
    },

    shieldBox: {
        width: 72,
        height: 72,
        borderRadius: 28,
        backgroundColor: "#F4EDFF",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: hp("2%"),
    },

    description: {
        width: "82%",
        textAlign: "center",
        color: "#94A3B8",
        fontSize: wp("3.4%"),
        lineHeight: 21,
        fontWeight: "600",
    },

    formCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 28,
        padding: wp("5%"),
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 18,
    },

    label: {
        fontSize: wp("3.1%"),
        color: "#64748B",
        fontWeight: "800",
        marginBottom: hp("0.7%"),
        marginTop: hp("1%"),
    },

    inputBox: {
        height: hp("6.6%"),
        backgroundColor: "#F8FAFC",
        borderRadius: 18,
        paddingHorizontal: wp("4%"),
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#EEF2F7",
        marginBottom: hp("1%"),
    },

    input: {
        flex: 1,
        marginLeft: wp("2.5%"),
        fontSize: wp("3.7%"),
        color: "#1E293B",
        fontWeight: "600",
    },

    tipCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 22,
        padding: wp("4%"),
        marginTop: hp("2%"),
        elevation: 4,
    },

    tipHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: hp("0.8%"),
    },

    tipTitle: {
        marginLeft: 6,
        fontSize: wp("3.5%"),
        color: "#A78BFA",
        fontWeight: "900",
    },

    tipText: {
        color: "#94A3B8",
        fontSize: wp("3.1%"),
        lineHeight: 20,
        fontWeight: "600",
        marginLeft: wp("6%"),
    },

    resetBtn: {
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

    resetText: {
        color: "#FFFFFF",
        fontSize: wp("3.8%"),
        fontWeight: "900",
    },
});

export default MemberChangePassword;