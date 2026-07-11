
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable, Modal, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import DatePicker from "react-native-date-picker";
import apiFitlife from "../../general/api";

const MemberEditProfile = ({ navigation }: any) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");

    // lịch sinh nhật 
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };



    // lấy token 
    const [user, setUser] = useState<any>(null);





    // kéo api lấy các tỉnh thành 
    const [provinces, setProvinces] = useState<any[]>([]);
    const [showProvince, setShowProvince] = useState(false);


    const handleSave = async () => {
        try {
            const response = await apiFitlife.post("/member/change-profile", {

                name: fullName,
                phone: phone,
                date_of_birth: birthday,
                gender: gender === "Nam" ? 1 : 0,
                address: address,
            });

            await AsyncStorage.setItem(
                "user",
                JSON.stringify(response.data.data)
            );

            Alert.alert("Thành công", response.data.message, [
                {
                    text: "OK",
                    onPress: () => navigation.goBack(),
                },
            ]);
        } catch (error: any) {
            console.log(error);

            Alert.alert(
                "Lỗi",
                error?.data?.message || "Không thể cập nhật thông tin"
            );
        }
    };
    useEffect(() => {
        const fetchUser = async () => {
            const storedUser = await AsyncStorage.getItem("user");
            if (storedUser) {
                const data = JSON.parse(storedUser);
                setUser(data);

                setFullName(data.name ?? "");
                setEmail(data.email ?? "");
                setPhone(data.phone ?? "");
                setBirthday((data.date_of_birth ?? "").replace(/\//g, "-"));
                console.log("date_of_birth từ API:", data.date_of_birth);
                setGender(data.gender == 1 ? "Nam" : "Nữ");
                setAddress(data.address ?? "");


            }
        };

        fetchUser();
    }, []);


    // kéo api tỉnh thành 
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await fetch("https://provinces.open-api.vn/api/p/");
                const data = await response.json();
                setProvinces(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProvinces();
    }, []);



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

                    <Text style={styles.headerTitle}>Thay đổi hồ sơ</Text>

                    <View style={{ width: 42 }} />
                </View>

                <View style={styles.avatarSection}>
                    <View style={styles.avatarBox}>
                        <Text style={styles.avatarText}>{user?.name?.trim().split(" ").pop() || "U"}</Text>

                        <TouchableOpacity style={styles.cameraBtn}>
                            <Ionicons name="camera-outline" size={16} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.nameText}>{user?.name}</Text>
                    <Text style={styles.emailText}>{user?.email}</Text>
                </View>

                <View style={styles.formCard}>
                    <Text style={styles.label}>Họ và tên</Text>
                    <View style={styles.inputBox}>
                        <Ionicons name="person-outline" size={20} color="#A7AFBF" />

                        <TextInput
                            placeholder="Nhập họ và tên"
                            placeholderTextColor="#A7AFBF"
                            style={styles.input}
                            value={fullName}
                            onChangeText={setFullName}
                        />
                    </View>

                    <Text style={styles.label}>Email</Text>
                    <View style={[styles.inputBox, styles.disabledInput]}>
                        <Ionicons name="mail-outline" size={20} color="#A7AFBF" />

                        <TextInput
                            placeholder="Nhập email"
                            placeholderTextColor="#A7AFBF"
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            editable={false}
                        />
                    </View>

                    <Text style={styles.noteText}>Email không thể thay đổi</Text>

                    <Text style={styles.label}>Số điện thoại</Text>
                    <View style={styles.inputBox}>
                        <Ionicons name="call-outline" size={20} color="#A7AFBF" />

                        <TextInput
                            placeholder="Nhập số điện thoại"
                            placeholderTextColor="#A7AFBF"
                            style={styles.input}
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                        />
                    </View>

                    <Text style={styles.label}>Ngày sinh</Text>
                    <Pressable
                        style={styles.inputBox}
                        onPress={() => setOpenDatePicker(true)}
                    >
                        <Ionicons
                            name="calendar-outline"
                            size={20}
                            color="#A7AFBF"
                        />

                        <TextInput
                            style={styles.input}
                            value={birthday}
                            editable={false}
                            placeholder="dd/mm/yyyy"
                            pointerEvents="none"
                        />
                    </Pressable>

                    <Text style={styles.label}>Giới tính</Text>
                    <View style={styles.genderRow}>
                        <TouchableOpacity
                            style={[
                                styles.genderBtn,
                                gender === "Nam" && styles.genderBtnActive,
                            ]}
                            onPress={() => setGender("Nam")}
                        >
                            <Ionicons
                                name="male-outline"
                                size={18}
                                color={gender === "Nam" ? "#FFFFFF" : "#8B5CF6"}
                            />
                            <Text
                                style={[
                                    styles.genderText,
                                    gender === "Nam" && styles.genderTextActive,
                                ]}
                            >
                                Nam
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.genderBtn,
                                gender === "Nữ" && styles.genderBtnActive,
                            ]}
                            onPress={() => setGender("Nữ")}
                        >
                            <Ionicons
                                name="female-outline"
                                size={18}
                                color={gender === "Nữ" ? "#FFFFFF" : "#8B5CF6"}
                            />
                            <Text
                                style={[
                                    styles.genderText,
                                    gender === "Nữ" && styles.genderTextActive,
                                ]}
                            >
                                Nữ
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Địa chỉ</Text>
                    <Pressable
                        style={styles.inputBox}
                        onPress={() => setShowProvince(true)}
                    >
                        <Ionicons
                            name="location-outline"
                            size={20}
                            color="#A7AFBF"
                        />

                        <Text
                            style={[
                                styles.input,
                                {
                                    color: address ? "#1E293B" : "#A7AFBF",
                                },
                            ]}
                        >
                            {address || "Chọn tỉnh/thành"}
                        </Text>
                    </Pressable>
                </View>

                <View style={styles.infoCard}>
                    <View style={styles.infoHeader}>
                        <Ionicons name="information-circle-outline" size={18} color="#A78BFA" />
                        <Text style={styles.infoTitle}>Thông tin tài khoản</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Gói tập</Text>
                        <Text style={styles.infoValue}>Tiêu Chuẩn</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Ngày tham gia</Text>
                        <Text style={styles.infoValue}>01/2024</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Trạng thái</Text>
                        <Text style={[styles.infoValue, { color: "#22C55E" }]}>Đang hoạt động</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.saveBtn}
                    activeOpacity={0.85}
                    onPress={handleSave}
                >
                    <Text style={styles.saveText}>Lưu thay đổi</Text>
                </TouchableOpacity>
            </ScrollView>
            <DatePicker modal open={openDatePicker}
                date={birthday ? new Date(birthday) : new Date()}
                mode="date"
                title="Chọn ngày sinh"
                confirmText="Chọn"
                cancelText="Hủy"
                maximumDate={new Date()}
                onConfirm={(date) => {
                    setOpenDatePicker(false);
                    setBirthday(formatDate(date));
                }}
                onCancel={() => {
                    setOpenDatePicker(false);
                }}
            />
            <Modal
                visible={showProvince}
                animationType="slide"
            >
                <SafeAreaView style={{ flex: 1 }}>
                    <FlatList
                        data={provinces}
                        keyExtractor={(item) => item.code.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={{
                                    padding: 18,
                                    borderBottomWidth: 1,
                                    borderColor: "#eee",
                                }}
                                onPress={() => {
                                    setAddress(item.name);
                                    setShowProvince(false);
                                }}
                            >
                                <Text>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </SafeAreaView>
            </Modal>
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

    avatarSection: {
        alignItems: "center",
        marginBottom: hp("2.5%"),
    },

    avatarBox: {
        width: 92,
        height: 92,
        borderRadius: 28,
        backgroundColor: "#60A5FA",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        elevation: 5,
    },

    avatarText: {
        color: "#FFFFFF",
        fontSize: wp("6%"),
        fontWeight: "900",
    },

    cameraBtn: {
        position: "absolute",
        right: -5,
        bottom: -5,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#A78BFA",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#FFFFFF",
    },

    nameText: {
        marginTop: hp("1.5%"),
        fontSize: wp("5%"),
        color: "#1E293B",
        fontWeight: "900",
    },

    emailText: {
        marginTop: 4,
        fontSize: wp("3.3%"),
        color: "#94A3B8",
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
        marginBottom: hp("0.7%"),
    },

    disabledInput: {
        backgroundColor: "#F1F5F9",
        opacity: 0.85,
    },

    input: {
        flex: 1,
        marginLeft: wp("2.5%"),
        fontSize: wp("3.7%"),
        color: "#1E293B",
        fontWeight: "600",
    },

    noteText: {
        fontSize: wp("2.8%"),
        color: "#94A3B8",
        fontWeight: "600",
        marginBottom: hp("0.5%"),
    },

    genderRow: {
        flexDirection: "row",
        gap: 12,
        marginBottom: hp("0.7%"),
    },

    genderBtn: {
        flex: 1,
        height: hp("6.2%"),
        borderRadius: 18,
        backgroundColor: "#F8FAFC",
        borderWidth: 1,
        borderColor: "#EEF2F7",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },

    genderBtnActive: {
        backgroundColor: "#A78BFA",
        borderColor: "#A78BFA",
    },

    genderText: {
        marginLeft: 6,
        fontSize: wp("3.5%"),
        fontWeight: "800",
        color: "#8B5CF6",
    },

    genderTextActive: {
        color: "#FFFFFF",
    },

    infoCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 22,
        padding: wp("4%"),
        marginTop: hp("2%"),
        elevation: 4,
    },

    infoHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: hp("1.2%"),
    },

    infoTitle: {
        marginLeft: 6,
        fontSize: wp("3.6%"),
        color: "#A78BFA",
        fontWeight: "900",
    },

    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: hp("0.9%"),
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
    },

    infoLabel: {
        color: "#94A3B8",
        fontSize: wp("3.2%"),
        fontWeight: "700",
    },

    infoValue: {
        color: "#1E293B",
        fontSize: wp("3.2%"),
        fontWeight: "800",
    },

    saveBtn: {
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

    saveText: {
        color: "#FFFFFF",
        fontSize: wp("3.8%"),
        fontWeight: "900",
    },
});

export default MemberEditProfile;