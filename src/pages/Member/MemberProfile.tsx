import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiFitlife from "../../general/api"; 

const MemberProfile = ({ navigation }: any) => {
    const member = {
        name: "Nguyễn Văn An",
        email: "an.nguyen@gmail.com",
        phone: "0901 234 567",
        packageName: "Tiêu Chuẩn",
        startDate: "Từ 01/2024",
        totalSessions: "Còn 8 buổi",
        expiredDate: "Hết hạn 02/07",
        progressNote: "Cân nặng -3.9kg so với 6 tháng trước",
        trainerNote: "4 ghi chú gần đây",
    };

    const handlePress = (type: string) => {
        if (type === "progress") {
            navigation.navigate("MemberProgress");
            return;
        }

        if (type === "changePassword") {
            navigation.navigate("MemberChangePassword");
            return;
        }

        if (type === "editProfile") {
            navigation.navigate("MemberEditProfile");
            return;
        }

        Alert.alert("Thông báo", "Chức năng này sẽ được phát triển sau");
    };

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
            const api = all ? "/member/logout-all" : "/member/logout";

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
                        <Text style={styles.avatarText}>AN</Text>

                        <View style={styles.editAvatar}>
                            <Ionicons name="create-outline" size={12} color="#FFFFFF" />
                        </View>
                    </View>

                    <View style={styles.profileInfo}>
                        <Text style={styles.memberName}>{member.name}</Text>
                        <Text style={styles.memberText}>{member.email}</Text>
                        <Text style={styles.memberText}>{member.phone}</Text>

                        <View style={styles.packageRow}>
                            <View style={styles.packageBadge}>
                                <Text style={styles.packageText}>{member.packageName}</Text>
                            </View>

                            <Text style={styles.dateText}>{member.startDate}</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.groupTitle}>TÀI KHOẢN</Text>

                <View style={styles.menuCard}>
                    <TouchableOpacity
                        style={styles.menuRow}
                        activeOpacity={0.8}
                        onPress={() => handlePress("editProfile")}
                    >
                        <View style={[styles.iconBox, { backgroundColor: "#E8F4FF" }]}>
                            <Ionicons name="create-outline" size={20} color="#53B8FF" />
                        </View>

                        <View style={styles.menuContent}>
                            <Text style={styles.menuTitle}>Thay đổi hồ sơ</Text>
                            <Text style={styles.menuSubTitle}>Tên, số điện thoại, ngày sinh</Text>
                        </View>

                        <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                <View style={styles.menuCard}>
                    <TouchableOpacity
                        style={styles.menuRow}
                        activeOpacity={0.8}
                        onPress={() => handlePress("changePassword")}
                    >
                        <View style={[styles.iconBox, { backgroundColor: "#F4EDFF" }]}>
                            <Ionicons name="shield-outline" size={20} color="#8B5CF6" />
                        </View>

                        <View style={styles.menuContent}>

                            <Text style={styles.menuTitle}>Thay đổi mật khẩu</Text>
                            <Text style={styles.menuSubTitle}>Bảo mật tài khoản</Text>
                        </View>

                        <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.groupTitle}>TẬP LUYỆN</Text>

                <View style={styles.menuCard}>
                    <TouchableOpacity
                        style={styles.menuRow}
                        activeOpacity={0.8}
                        onPress={() => handlePress("package")}
                    >
                        <View style={[styles.iconBox, { backgroundColor: "#FFF3E8" }]}>
                            <Ionicons name="cube-outline" size={20} color="#FF8A00" />
                        </View>

                        <View style={styles.menuContent}>
                            <Text style={styles.menuTitle}>Gói của tôi</Text>
                            <Text style={styles.menuSubTitle}>
                                {member.packageName} · {member.totalSessions} · {member.expiredDate}
                            </Text>
                        </View>

                        <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                <View style={styles.menuCard}>
                    <TouchableOpacity
                        style={styles.menuRow}
                        activeOpacity={0.8}
                        onPress={() => handlePress("progress")}
                    >
                        <View style={[styles.iconBox, { backgroundColor: "#F4EDFF" }]}>
                            <Ionicons name="pulse-outline" size={20} color="#8B5CF6" />
                        </View>

                        <View style={styles.menuContent}>
                            <Text style={styles.menuTitle}>Theo dõi tiến độ</Text>
                            <Text style={styles.menuSubTitle}>{member.progressNote}</Text>
                        </View>

                        <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                <View style={styles.menuCard}>
                    <TouchableOpacity
                        style={styles.menuRow}
                        activeOpacity={0.8}
                        onPress={() => handlePress("trainerNote")}
                    >
                        <View style={[styles.iconBox, { backgroundColor: "#E8FFF8" }]}>
                            <Ionicons name="book-outline" size={20} color="#14B8A6" />
                        </View>

                        <View style={styles.menuContent}>
                            <Text style={styles.menuTitle}>Ghi chú HLV</Text>
                            <Text style={styles.menuSubTitle}>{member.trainerNote}</Text>
                        </View>

                        <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.groupTitle}>KHÁC</Text>

                <View style={styles.menuCard}>
                    <TouchableOpacity
                        style={styles.menuRow}
                        activeOpacity={0.8}
                        onPress={() => handlePress("support")}
                    >
                        <View style={[styles.iconBox, { backgroundColor: "#E8F4FF" }]}>
                            <Ionicons name="help-circle-outline" size={20} color="#53B8FF" />
                        </View>

                        <View style={styles.menuContent}>
                            <Text style={styles.menuTitle}>Hỗ trợ</Text>
                            <Text style={styles.menuSubTitle}>Liên hệ trung tâm hỗ trợ</Text>
                        </View>

                        <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.logoutBtn}
                    activeOpacity={0.8}
                    onPress={handleLogout}
                >
                    <Ionicons name="log-out-outline" size={20} color="#EF4444" />
                    <Text style={styles.logoutText}>Đăng xuất</Text>
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

    scrollContent: {
        paddingHorizontal: wp("5%"),
        paddingTop: hp("1%"),
        paddingBottom: hp("12%"),
    },

    pageTitle: {
        fontSize: wp("5.3%"),
        fontWeight: "800",
        color: "#1E293B",
        marginBottom: hp("2%"),
    },

    profileCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        padding: wp("4%"),
        flexDirection: "row",
        alignItems: "center",
        elevation: 4,
        marginBottom: hp("2.2%"),
    },

    avatarBox: {
        width: 72,
        height: 72,
        borderRadius: 18,
        backgroundColor: "#60A5FA",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },

    avatarText: {
        color: "#FFFFFF",
        fontSize: wp("5%"),
        fontWeight: "800",
    },

    editAvatar: {
        position: "absolute",
        right: -4,
        bottom: -4,
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: "#94A3B8",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#FFFFFF",
    },

    profileInfo: {
        flex: 1,
        marginLeft: wp("4%"),
    },

    memberName: {
        fontSize: wp("4.2%"),
        fontWeight: "800",
        color: "#1E293B",
    },

    memberText: {
        fontSize: wp("3.1%"),
        color: "#94A3B8",
        marginTop: 2,
        fontWeight: "600",
    },

    packageRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: hp("0.8%"),
    },

    packageBadge: {
        backgroundColor: "#E8F4FF",
        paddingHorizontal: wp("3%"),
        paddingVertical: hp("0.5%"),
        borderRadius: 14,
    },

    packageText: {
        color: "#53B8FF",
        fontSize: wp("2.8%"),
        fontWeight: "800",
    },

    dateText: {
        color: "#94A3B8",
        fontSize: wp("2.8%"),
        fontWeight: "700",
        marginLeft: wp("2%"),
    },

    groupTitle: {
        fontSize: wp("3.2%"),
        color: "#94A3B8",
        fontWeight: "800",
        marginBottom: hp("1%"),
        marginTop: hp("0.6%"),
    },

    menuCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        paddingHorizontal: wp("4%"),
        paddingVertical: hp("1.4%"),
        marginBottom: hp("1.3%"),
        elevation: 3,
    },

    menuRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },

    menuContent: {
        flex: 1,
        marginLeft: wp("3.5%"),
    },

    menuTitle: {
        color: "#1E293B",
        fontSize: wp("3.7%"),
        fontWeight: "800",
    },

    menuSubTitle: {
        color: "#94A3B8",
        fontSize: wp("3%"),
        marginTop: 3,
        fontWeight: "600",
    },

    logoutBtn: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        paddingVertical: hp("1.5%"),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        elevation: 3,
        marginTop: hp("1%"),
    },

    logoutText: {
        color: "#EF4444",
        fontSize: wp("3.7%"),
        fontWeight: "800",
        marginLeft: 8,
    },
});

export default MemberProfile;