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

const TrainerChangePassword = ({ navigation }: any) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChangePassword = () => {
        if (
            !currentPassword.trim() ||
            !newPassword.trim() ||
            !confirmPassword.trim()
        ) {
            Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin");
            return;
        }

        if (newPassword.length < 8) {
            Alert.alert(
                "Thông báo",
                "Mật khẩu mới phải có ít nhất 8 ký tự"
            );
            return;
        }

        if (newPassword === currentPassword) {
            Alert.alert(
                "Thông báo",
                "Mật khẩu mới không được trùng với mật khẩu hiện tại"
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert(
                "Thông báo",
                "Xác nhận mật khẩu mới không khớp"
            );
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
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={22}
                            color="#1E293B"
                        />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>
                        Thay đổi mật khẩu
                    </Text>

                    <View style={{ width: 42 }} />
                </View>

                <View style={styles.iconSection}>
                    <View style={styles.shieldBox}>
                        <Ionicons
                            name="shield-checkmark-outline"
                            size={36}
                            color="#38BDF8"
                        />
                    </View>

                    <Text style={styles.description}>
                        Mật khẩu mới phải có ít nhất 8 ký tự và không
                        được trùng với mật khẩu hiện tại.
                    </Text>
                </View>

                <View style={styles.formCard}>
                    <Text style={styles.label}>Mật khẩu hiện tại</Text>

                    <View style={styles.inputBox}>
                        <Ionicons
                            name="lock-closed-outline"
                            size={20}
                            color="#A7AFBF"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Nhập mật khẩu hiện tại"
                            placeholderTextColor="#A7AFBF"
                            secureTextEntry={!showCurrentPassword}
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                        />

                        <TouchableOpacity
                            onPress={() =>
                                setShowCurrentPassword(
                                    !showCurrentPassword
                                )
                            }
                        >
                            <Ionicons
                                name={
                                    showCurrentPassword
                                        ? "eye-outline"
                                        : "eye-off-outline"
                                }
                                size={20}
                                color="#A7AFBF"
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Mật khẩu mới</Text>

                    <View style={styles.inputBox}>
                        <Ionicons
                            name="lock-closed-outline"
                            size={20}
                            color="#A7AFBF"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Nhập mật khẩu mới"
                            placeholderTextColor="#A7AFBF"
                            secureTextEntry={!showNewPassword}
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />

                        <TouchableOpacity
                            onPress={() =>
                                setShowNewPassword(!showNewPassword)
                            }
                        >
                            <Ionicons
                                name={
                                    showNewPassword
                                        ? "eye-outline"
                                        : "eye-off-outline"
                                }
                                size={20}
                                color="#A7AFBF"
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>
                        Xác nhận mật khẩu mới
                    </Text>

                    <View style={styles.inputBox}>
                        <Ionicons
                            name="lock-closed-outline"
                            size={20}
                            color="#A7AFBF"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Nhập lại mật khẩu mới"
                            placeholderTextColor="#A7AFBF"
                            secureTextEntry={!showConfirmPassword}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />

                        <TouchableOpacity
                            onPress={() =>
                                setShowConfirmPassword(
                                    !showConfirmPassword
                                )
                            }
                        >
                            <Ionicons
                                name={
                                    showConfirmPassword
                                        ? "eye-outline"
                                        : "eye-off-outline"
                                }
                                size={20}
                                color="#A7AFBF"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.securityCard}>
                    <View style={styles.securityHeader}>
                        <Ionicons
                            name="shield-outline"
                            size={18}
                            color="#38BDF8"
                        />

                        <Text style={styles.securityTitle}>
                            Gợi ý bảo mật
                        </Text>
                    </View>

                    <Text style={styles.securityText}>
                        • Tối thiểu 8 ký tự
                    </Text>

                    <Text style={styles.securityText}>
                        • Kết hợp chữ hoa, chữ thường và số
                    </Text>

                    <Text style={styles.securityText}>
                        • Không sử dụng thông tin cá nhân
                    </Text>

                    <Text style={styles.securityText}>
                        • Không chia sẻ mật khẩu với người khác
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.changeButton}
                    activeOpacity={0.85}
                    onPress={handleChangePassword}
                >
                    <Text style={styles.changeButtonText}>
                        Đổi mật khẩu
                    </Text>
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
        backgroundColor: "#DDF4FF",
        opacity: 0.8,
    },

    circleTwo: {
        position: "absolute",
        bottom: -90,
        left: -70,
        width: 230,
        height: 230,
        borderRadius: 115,
        backgroundColor: "#EAF8FF",
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

    backButton: {
        width: 42,
        height: 42,
        borderRadius: 14,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        elevation: 4,
    },

    headerTitle: {
        color: "#1E293B",
        fontSize: wp("4.8%"),
        fontWeight: "900",
    },

    iconSection: {
        alignItems: "center",
        marginBottom: hp("3%"),
    },

    shieldBox: {
        width: 76,
        height: 76,
        borderRadius: 28,
        backgroundColor: "#EAF8FF",
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
    },

    description: {
        width: "86%",
        color: "#94A3B8",
        fontSize: wp("3.3%"),
        fontWeight: "600",
        textAlign: "center",
        lineHeight: 21,
        marginTop: hp("2%"),
    },

    formCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 26,
        padding: wp("5%"),
        elevation: 4,
        shadowColor: "#000000",
        shadowOpacity: 0.07,
        shadowRadius: 14,
        shadowOffset: {
            width: 0,
            height: 7,
        },
    },

    label: {
        color: "#64748B",
        fontSize: wp("3%"),
        fontWeight: "800",
        marginTop: hp("1%"),
        marginBottom: hp("0.7%"),
    },

    inputBox: {
        height: hp("6.5%"),
        borderRadius: 17,
        backgroundColor: "#F8FAFC",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: wp("4%"),
        borderWidth: 1,
        borderColor: "#EEF2F7",
        marginBottom: hp("0.7%"),
    },

    input: {
        flex: 1,
        color: "#1E293B",
        fontSize: wp("3.5%"),
        fontWeight: "600",
        marginLeft: wp("2.5%"),
    },

    securityCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 22,
        padding: wp("4%"),
        marginTop: hp("2%"),
        elevation: 3,
    },

    securityHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: hp("1%"),
    },

    securityTitle: {
        color: "#38BDF8",
        fontSize: wp("3.5%"),
        fontWeight: "900",
        marginLeft: 6,
    },

    securityText: {
        color: "#94A3B8",
        fontSize: wp("3%"),
        lineHeight: 20,
        fontWeight: "600",
        marginLeft: wp("5%"),
    },

    changeButton: {
        height: hp("6.7%"),
        backgroundColor: "#39AFFF",
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        marginTop: hp("3%"),
        elevation: 4,
        shadowColor: "#39AFFF",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 5,
        },
    },

    changeButtonText: {
        color: "#FFFFFF",
        fontSize: wp("3.8%"),
        fontWeight: "900",
    },
});

export default TrainerChangePassword;