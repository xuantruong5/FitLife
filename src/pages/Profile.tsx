import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiFitlife from "../general/api";

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
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.logoutBtn}
                activeOpacity={0.8}
                onPress={handleLogout}
            >
                <Ionicons name="log-out-outline" size={20} color="#EF4444" />
                <Text style={styles.logoutText}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end", // 👈 đẩy xuống dưới
        alignItems: "center",
        paddingBottom: hp("3%"),
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
})
export default Profile;