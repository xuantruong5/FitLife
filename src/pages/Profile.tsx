import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiFitlife from "../general/api";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = ({ navigation }: any) => {
    const handleLogout = () => {
        Alert.alert(
            "Đăng xuất",
            "Bạn muốn đăng xuất như thế nào?",
            [
                {
                    text: "Hủy",
                    style: "cancel",
                },
                {
                    text: "Thiết bị này",
                    onPress: () => logout(false),
                },
                {
                    text: "Tất cả thiết bị",
                    style: "destructive",
                    onPress: () => logout(true),
                },
            ]
        );
    };

    const logout = async (all: boolean) => {
        try {
            const api = all ? "/trainer/logout-all" : "/trainer/logout";

            const response = await apiFitlife.post(api);

            Alert.alert(response.data.message);

            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("user");
            await AsyncStorage.removeItem("role");

            navigation.replace("Login");
        } catch (error: any) {
            const message = error?.data?.message || "Đăng xuất thất bại";

            Alert.alert(message);

            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("user");
            await AsyncStorage.removeItem("role");

            navigation.replace("Login");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <Text style={styles.pageTitle}>Cá nhân</Text>

                <View style={styles.profileCard}>
                    <View style={styles.avatarBox}>
                        <Text style={styles.avatarText}>PT</Text>
                    </View>

                    <View style={styles.profileInfo}>
                        <Text style={styles.nameText}>Nguyễn Phi Tỉ</Text>
                        <Text style={styles.infoText}>
                            nguyenphiti@gmail.com
                        </Text>
                        <Text style={styles.infoText}>0912 345 678</Text>

                        <View style={styles.badgeRow}>
                            <View style={styles.roleBadge}>
                                <Text style={styles.roleText}>Senior PT</Text>
                            </View>

                            <View style={styles.ratingBadge}>
                                <Ionicons
                                    name="star"
                                    size={12}
                                    color="#F59E0B"
                                />
                                <Text style={styles.ratingText}>
                                    4.8 đánh giá
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <Text style={styles.sectionLabel}>TÀI KHOẢN</Text>

                <View style={styles.menuCard}>
                    <TouchableOpacity
                        style={styles.menuRow}
                        activeOpacity={0.8}
                        onPress={() =>
                            navigation.navigate("TrainerEditProfile")
                        }
                    >
                        <View
                            style={[
                                styles.iconBox,
                                { backgroundColor: "#EAF8FF" },
                            ]}
                        >
                            <Ionicons
                                name="create-outline"
                                size={20}
                                color="#38BDF8"
                            />
                        </View>

                        <View style={styles.menuContent}>
                            <Text style={styles.menuTitle}>
                                Thay đổi hồ sơ
                            </Text>
                            <Text style={styles.menuDescription}>
                                Cập nhật thông tin cá nhân
                            </Text>
                        </View>

                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color="#94A3B8"
                        />
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity
                        style={styles.menuRow}
                        activeOpacity={0.8}
                        onPress={() =>
                            navigation.navigate("TrainerChangePassword")
                        }
                    >
                        <View
                            style={[
                                styles.iconBox,
                                { backgroundColor: "#F4EEFF" },
                            ]}
                        >
                            <Ionicons
                                name="shield-outline"
                                size={20}
                                color="#A78BFA"
                            />
                        </View>

                        <View style={styles.menuContent}>
                            <Text style={styles.menuTitle}>
                                Thay đổi mật khẩu
                            </Text>
                            <Text style={styles.menuDescription}>
                                Bảo mật tài khoản của bạn
                            </Text>
                        </View>

                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color="#94A3B8"
                        />
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity
                        style={styles.menuRow}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate("TrainerIncome")}
                    >
                        <View
                            style={[
                                styles.iconBox,
                                { backgroundColor: "#EAFBF5" },
                            ]}
                        >
                            <Ionicons
                                name="wallet-outline"
                                size={20}
                                color="#10B981"
                            />
                        </View>

                        <View style={styles.menuContent}>
                            <Text style={styles.menuTitle}>
                                Ví & Thu nhập
                            </Text>
                            <Text style={styles.menuDescription}>
                                Quản lý thu nhập và thanh toán
                            </Text>
                        </View>

                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color="#94A3B8"
                        />
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionLabel}>
                    HOẠT ĐỘNG DẠY HỌC
                </Text>

                <View style={styles.menuCard}>
                    <TouchableOpacity
                        style={styles.menuRow}
                        activeOpacity={0.8}
                        onPress={() =>
                            navigation.navigate("TrainerTeachingHistory")
                        }
                    >
                        <View
                            style={[
                                styles.iconBox,
                                { backgroundColor: "#EAF8FF" },
                            ]}
                        >
                            <Ionicons
                                name="time-outline"
                                size={20}
                                color="#38BDF8"
                            />
                        </View>

                        <View style={styles.menuContent}>
                            <Text style={styles.menuTitle}>
                                Lịch sử dạy học
                            </Text>

                            <Text style={styles.menuDescription}>
                                Thống kê các buổi đã hoàn thành
                            </Text>
                        </View>

                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color="#94A3B8"
                        />
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity
                        style={styles.menuRow}
                        activeOpacity={0.8}
                        onPress={() =>
                            Alert.alert(
                                "Thông báo",
                                "Chức năng đánh giá đang được phát triển"
                            )
                        }
                    >
                        <View
                            style={[
                                styles.iconBox,
                                { backgroundColor: "#FFF7E8" },
                            ]}
                        >
                            <Ionicons
                                name="star-outline"
                                size={20}
                                color="#F59E0B"
                            />
                        </View>

                        <View style={styles.menuContent}>
                            <Text style={styles.menuTitle}>
                                Đánh giá từ học viên
                            </Text>
                            <Text style={styles.menuDescription}>
                                Xem nhận xét của học viên
                            </Text>
                        </View>

                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color="#94A3B8"
                        />
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionLabel}>HỖ TRỢ</Text>

                <View style={styles.menuCard}>
                    <TouchableOpacity
                        style={styles.menuRow}
                        activeOpacity={0.8}
                        onPress={() =>
                            Alert.alert(
                                "Trung tâm trợ giúp",
                                "Email hỗ trợ: support@fitlife.vn"
                            )
                        }
                    >
                        <View
                            style={[
                                styles.iconBox,
                                { backgroundColor: "#E8FBF7" },
                            ]}
                        >
                            <Ionicons
                                name="headset-outline"
                                size={20}
                                color="#14B8A6"
                            />
                        </View>

                        <View style={styles.menuContent}>
                            <Text style={styles.menuTitle}>
                                Trung tâm trợ giúp
                            </Text>
                            <Text style={styles.menuDescription}>
                                Liên hệ đội ngũ hỗ trợ FitLife
                            </Text>
                        </View>

                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color="#94A3B8"
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.logoutBtn}
                    activeOpacity={0.8}
                    onPress={handleLogout}
                >
                    <Ionicons
                        name="log-out-outline"
                        size={20}
                        color="#EF4444"
                    />
                    <Text style={styles.logoutText}>Đăng xuất</Text>
                </TouchableOpacity>

                <Text style={styles.versionText}>
                    FitLife Trainer · Version 1.0.0
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F8FC",
    },

    scrollContent: {
        paddingHorizontal: wp("5%"),
        paddingTop: hp("1%"),
        paddingBottom: hp("12%"),
    },

    pageTitle: {
        color: "#1E293B",
        fontSize: wp("5%"),
        fontWeight: "800",
        textAlign: "center",
        marginBottom: hp("2%"),
    },

    profileCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        padding: wp("4%"),
        flexDirection: "row",
        alignItems: "center",
        elevation: 4,
        marginBottom: hp("2%"),
    },

    avatarBox: {
        width: 70,
        height: 70,
        borderRadius: 22,
        backgroundColor: "#4DA8FF",
        justifyContent: "center",
        alignItems: "center",
    },

    avatarText: {
        color: "#FFFFFF",
        fontSize: wp("5%"),
        fontWeight: "900",
    },

    profileInfo: {
        flex: 1,
        marginLeft: wp("4%"),
    },

    nameText: {
        color: "#1E293B",
        fontSize: wp("4.2%"),
        fontWeight: "800",
    },

    infoText: {
        color: "#94A3B8",
        fontSize: wp("3%"),
        fontWeight: "600",
        marginTop: 2,
    },

    badgeRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: hp("0.8%"),
    },

    roleBadge: {
        backgroundColor: "#EAF8FF",
        borderRadius: 12,
        paddingHorizontal: wp("2.5%"),
        paddingVertical: 4,
    },

    roleText: {
        color: "#38BDF8",
        fontSize: wp("2.6%"),
        fontWeight: "800",
    },

    ratingBadge: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: wp("2%"),
        backgroundColor: "#FFF7E8",
        borderRadius: 12,
        paddingHorizontal: wp("2.5%"),
        paddingVertical: 4,
    },

    ratingText: {
        color: "#F59E0B",
        fontSize: wp("2.6%"),
        fontWeight: "800",
        marginLeft: 3,
    },

    sectionLabel: {
        color: "#A0A8B5",
        fontSize: wp("2.8%"),
        fontWeight: "800",
        marginTop: hp("1%"),
        marginBottom: hp("1%"),
    },

    menuCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 22,
        paddingHorizontal: wp("4%"),
        elevation: 3,
        marginBottom: hp("2%"),
    },

    menuRow: {
        minHeight: 70,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: hp("1.2%"),
    },

    iconBox: {
        width: 42,
        height: 42,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },

    menuContent: {
        flex: 1,
        marginLeft: wp("3%"),
    },

    menuTitle: {
        color: "#1E293B",
        fontSize: wp("3.5%"),
        fontWeight: "800",
    },

    menuDescription: {
        color: "#A0A8B5",
        fontSize: wp("2.8%"),
        fontWeight: "500",
        marginTop: 3,
    },

    divider: {
        height: 1,
        backgroundColor: "#F0F2F6",
        marginLeft: 54,
    },

    logoutBtn: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        paddingVertical: hp("1.5%"),
        paddingHorizontal: wp("6%"),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        elevation: 3,
        marginBottom: hp("2%"),
    },

    logoutText: {
        color: "#EF4444",
        fontSize: wp("3.7%"),
        fontWeight: "800",
        marginLeft: 8,
    },

    versionText: {
        color: "#B0B7C3",
        fontSize: wp("2.8%"),
        textAlign: "center",
    },
});

export default Profile;