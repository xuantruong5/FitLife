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
import apiFitlife from "../../general/api";

const MemberRegister = ({ navigation }: any) => {
    const [is_show, setIsshow] = useState(true);
    const [isChecked, setIsChecked] = useState(false);


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [ErrorMessage, setErrorMessage] = useState<Record<string, string>>({});
    const [isAgree, setIsAgree] = useState(false);

    const handleRegister = async () => {
        var payload = {
            email: email,
            phone: phone,
            name: name,
            password: password,
            re_password: confirmPassword
        }
        try {
            const response = await apiFitlife.post("/register", payload);
            var message = response.data.message;
            Alert.alert(message, "", [
                { text: "OK", onPress: () => navigation.navigate('Login') }
            ]);

        } catch (error: any) {
            var listErrors = error.response?.data?.errors;
            if (listErrors) {
                const listFor = Object.fromEntries(
                    Object.entries(listErrors).map(([k, v]: any) => [k, Array.isArray(v) ? v[0] : String(v)])
                );
                setErrorMessage(listFor);
            }
        }
    };
    const errorBorder = (field: string) => {
        return ErrorMessage[field] ? { borderColor: 'red', borderWidth: 1 } : {};
    }

    const TextInLine = (field: string) =>
        ErrorMessage[field] ? (
            <Text style={styles.errorInline}>* {ErrorMessage[field]}</Text>
        ) : null;

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

                    <Text style={styles.headerTitle}>Đăng ký</Text>

                    <View style={{ width: 42 }} />
                </View>

                <View style={styles.iconCenter}>
                    <View style={styles.userIconBox}>
                        <Ionicons name="person-add-outline" size={34} color="#A78BFA" />
                    </View>

                    <Text style={styles.title}>Tạo tài khoản FitLife</Text>

                    <Text style={styles.description}>
                        Đăng ký tài khoản hội viên để theo dõi lịch tập, PT và tiến độ cá nhân.
                    </Text>
                </View>

                <View style={styles.formCard}>
                    <Text style={styles.label}>Họ và tên</Text>
                    <View style={[styles.inputBox, errorBorder('name')]}>
                        <Ionicons name="person-outline" size={20} color="#A7AFBF" />

                        <TextInput
                            placeholder="Nhập họ và tên"
                            placeholderTextColor="#A7AFBF"
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                        />
                        {TextInLine('name')}
                    </View>

                    <Text style={styles.label}>Email</Text>
                    <View style={[styles.inputBox, errorBorder('email')]}>
                        <Ionicons name="mail-outline" size={20} color="#A7AFBF" />

                        <TextInput
                            placeholder="Nhập email"
                            placeholderTextColor="#A7AFBF"
                            style={styles.input}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />
                        {TextInLine('email')}
                    </View>

                    <Text style={styles.label}>Số điện thoại</Text>
                    <View style={[styles.inputBox, errorBorder('phone')]}>
                        <Ionicons name="call-outline" size={20} color="#A7AFBF" />

                        <TextInput
                            placeholder="Nhập số điện thoại"
                            placeholderTextColor="#A7AFBF"
                            style={styles.input}
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={setPhone}
                        />
                        {TextInLine('so_dien_thoai')}
                    </View>

                    <Text style={styles.label}>Mật khẩu</Text>
                    <View style={[styles.inputBox, errorBorder('password')]}>
                        <Ionicons name="lock-closed-outline" size={20} color="#A7AFBF" />

                        <TextInput
                            placeholder="Nhập mật khẩu"
                            placeholderTextColor="#A7AFBF"
                            style={styles.input}
                            secureTextEntry={is_show}
                            value={password}
                            onChangeText={setPassword}
                        />

                        <TouchableOpacity onPress={() => setIsshow(!is_show)}>
                            <Ionicons
                                name={is_show ? "eye-off-outline" : "eye-outline"}
                                size={20}
                                color="#A7AFBF"
                            />
                        </TouchableOpacity>
                        {TextInLine('password')}
                    </View>

                    <Text style={styles.label}>Xác nhận mật khẩu</Text>
                    <View style={[styles.inputBox, errorBorder('re_password')]}>
                        <Ionicons name="lock-closed-outline" size={20} color="#A7AFBF" />

                        <TextInput
                            placeholder="Nhập lại mật khẩu"
                            placeholderTextColor="#A7AFBF"
                            style={styles.input}
                            secureTextEntry={is_show}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />

                        <TouchableOpacity onPress={() => setIsshow(!is_show)}>
                            <Ionicons
                                name={is_show ? "eye-off-outline" : "eye-outline"}
                                size={20}
                                color="#A7AFBF"
                            />
                        </TouchableOpacity>
                        {TextInLine('re_password')}
                    </View>

                    <TouchableOpacity
                        style={styles.agreeRow}
                        activeOpacity={0.8}
                        onPress={() => setIsAgree(!isAgree)}
                    >
                        <View style={[styles.checkBox, isAgree && styles.checkBoxActive]}>
                            {isAgree && (
                                <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                            )}
                        </View>

                        <Text style={styles.agreeText}>
                            Tôi đồng ý với điều khoản sử dụng của FitLife
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.registerBtn}
                        activeOpacity={0.85}
                        onPress={handleRegister}
                    >
                        <Text style={styles.registerBtnText}>ĐĂNG KÝ</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.loginRow}>
                    <Text style={styles.loginText}>Đã có tài khoản?</Text>

                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.loginLink}> Đăng nhập</Text>
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
    errorInline: {
        position: 'absolute',
        left: 44,
        top: -10,
        fontSize: 14,
        color: '#FF4D4F',
        backgroundColor: '#fff',
        paddingHorizontal: 5,
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
        marginBottom: hp("2.5%"),
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
        marginBottom: hp("2.5%"),
    },

    userIconBox: {
        width: 72,
        height: 72,
        borderRadius: 28,
        backgroundColor: "#F4EDFF",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: hp("1.5%"),
    },

    title: {
        fontSize: wp("6%"),
        color: "#1E293B",
        fontWeight: "900",
    },

    description: {
        width: "86%",
        textAlign: "center",
        color: "#94A3B8",
        fontSize: wp("3.4%"),
        lineHeight: 21,
        fontWeight: "600",
        marginTop: hp("0.8%"),
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
        marginBottom: hp("0.8%"),
    },

    input: {
        flex: 1,
        marginLeft: wp("2.5%"),
        fontSize: wp("3.7%"),
        color: "#1E293B",
        fontWeight: "600",
    },

    agreeRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: hp("1.5%"),
    },

    checkBox: {
        width: 22,
        height: 22,
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

    agreeText: {
        flex: 1,
        color: "#64748B",
        fontSize: wp("3.2%"),
        fontWeight: "600",
        lineHeight: 19,
    },

    registerBtn: {
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

    registerBtnText: {
        color: "#FFFFFF",
        fontSize: wp("3.8%"),
        fontWeight: "900",
        letterSpacing: 0.8,
    },

    loginRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: hp("3%"),
    },

    loginText: {
        color: "#64748B",
        fontSize: wp("3.5%"),
        fontWeight: "600",
    },

    loginLink: {
        color: "#8B5CF6",
        fontSize: wp("3.5%"),
        fontWeight: "900",
    },
});

export default MemberRegister;