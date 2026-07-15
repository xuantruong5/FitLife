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

const specialties = [
    "Giảm mỡ",
    "Tăng cơ",
    "Yoga",
    "Phục hồi chấn thương",
    "Boxing",
    "Pilates",
];

const TrainerEditProfile = ({ navigation }: any) => {
    const [fullName, setFullName] = useState("Nguyễn Phi Tỉ");
    const [phone, setPhone] = useState("0912 345 678");
    const [introduction, setIntroduction] = useState(
        "Chia sẻ phong cách huấn luyện, kinh nghiệm và mục tiêu hỗ trợ học viên của bạn."
    );

    const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([
        "Giảm mỡ",
        "Tăng cơ",
    ]);

    const toggleSpecialty = (specialty: string) => {
        setSelectedSpecialties(current =>
            current.includes(specialty)
                ? current.filter(item => item !== specialty)
                : [...current, specialty]
        );
    };

    const handleSave = () => {
        if (!fullName.trim() || !phone.trim()) {
            Alert.alert(
                "Thông báo",
                "Vui lòng nhập đầy đủ họ tên và số điện thoại"
            );
            return;
        }

        Alert.alert("Thành công", "Thông tin hồ sơ đã được cập nhật", [
            {
                text: "OK",
                onPress: () => navigation.goBack(),
            },
        ]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons
                        name="arrow-back"
                        size={21}
                        color="#38BDF8"
                    />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Thay đổi hồ sơ</Text>

                <TouchableOpacity onPress={handleSave}>
                    <Text style={styles.saveHeaderText}>Lưu</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.avatarSection}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>PT</Text>

                        <TouchableOpacity style={styles.editAvatarButton}>
                            <Ionicons
                                name="create-outline"
                                size={14}
                                color="#38BDF8"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.formCard}>
                    <Text style={styles.sectionTitle}>HỒ SƠ PT</Text>

                    <Text style={styles.label}>Họ và tên</Text>

                    <TextInput
                        style={styles.input}
                        value={fullName}
                        onChangeText={setFullName}
                        placeholder="Nhập họ và tên"
                        placeholderTextColor="#B0B7C3"
                    />

                    <View style={styles.separator} />

                    <Text style={styles.label}>Số điện thoại</Text>

                    <TextInput
                        style={styles.input}
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="Nhập số điện thoại"
                        placeholderTextColor="#B0B7C3"
                        keyboardType="phone-pad"
                    />
                </View>

                <View style={styles.specialtyHeader}>
                    <Text style={styles.sectionTitle}>Chuyên môn</Text>

                    <Text style={styles.selectedCount}>
                        Đã chọn {selectedSpecialties.length}/6
                    </Text>
                </View>

                <View style={styles.specialtyContainer}>
                    {specialties.map(specialty => {
                        const isSelected =
                            selectedSpecialties.includes(specialty);

                        return (
                            <TouchableOpacity
                                key={specialty}
                                activeOpacity={0.8}
                                style={[
                                    styles.specialtyChip,
                                    isSelected &&
                                        styles.specialtyChipSelected,
                                ]}
                                onPress={() =>
                                    toggleSpecialty(specialty)
                                }
                            >
                                {isSelected && (
                                    <Ionicons
                                        name="checkmark"
                                        size={14}
                                        color="#FFFFFF"
                                    />
                                )}

                                <Text
                                    style={[
                                        styles.specialtyText,
                                        isSelected &&
                                            styles.specialtyTextSelected,
                                    ]}
                                >
                                    {specialty}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <Text style={styles.sectionTitle}>Giới thiệu bản thân</Text>

                <View style={styles.bioCard}>
                    <TextInput
                        style={styles.bioInput}
                        value={introduction}
                        onChangeText={setIntroduction}
                        placeholder="Nhập giới thiệu bản thân"
                        placeholderTextColor="#B0B7C3"
                        multiline
                        maxLength={500}
                        textAlignVertical="top"
                    />

                    <Text style={styles.characterCount}>
                        {introduction.length}/500
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.updateButton}
                    activeOpacity={0.85}
                    onPress={handleSave}
                >
                    <Text style={styles.updateButtonText}>
                        Cập nhật hồ sơ
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

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: wp("5%"),
        paddingTop: hp("1%"),
        paddingBottom: hp("1.5%"),
    },

    backButton: {
        width: 40,
        height: 40,
        borderRadius: 14,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
    },

    headerTitle: {
        color: "#1E293B",
        fontSize: wp("4.5%"),
        fontWeight: "800",
    },

    saveHeaderText: {
        color: "#38BDF8",
        fontSize: wp("3.5%"),
        fontWeight: "800",
    },

    scrollContent: {
        paddingHorizontal: wp("5%"),
        paddingBottom: hp("6%"),
    },

    avatarSection: {
        alignItems: "center",
        marginVertical: hp("2%"),
    },

    avatar: {
        width: 86,
        height: 86,
        borderRadius: 43,
        backgroundColor: "#4DA8FF",
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

    editAvatarButton: {
        position: "absolute",
        right: -3,
        bottom: 2,
        width: 27,
        height: 27,
        borderRadius: 14,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
    },

    formCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 22,
        padding: wp("4%"),
        elevation: 3,
        marginBottom: hp("2%"),
    },

    sectionTitle: {
        color: "#475569",
        fontSize: wp("3.2%"),
        fontWeight: "800",
        marginBottom: hp("1%"),
    },

    label: {
        color: "#94A3B8",
        fontSize: wp("2.8%"),
        fontWeight: "700",
        marginTop: hp("0.6%"),
    },

    input: {
        color: "#1E293B",
        fontSize: wp("3.7%"),
        fontWeight: "600",
        paddingVertical: hp("1.2%"),
    },

    separator: {
        height: 1,
        backgroundColor: "#EEF2F7",
    },

    specialtyHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    selectedCount: {
        color: "#A0A8B5",
        fontSize: wp("2.8%"),
        fontWeight: "600",
    },

    specialtyContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: hp("2%"),
    },

    specialtyChip: {
        backgroundColor: "#FFFFFF",
        paddingHorizontal: wp("3.5%"),
        paddingVertical: hp("0.9%"),
        borderRadius: 18,
        marginRight: wp("2%"),
        marginBottom: hp("1%"),
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#EEF2F7",
    },

    specialtyChipSelected: {
        backgroundColor: "#39AFFF",
        borderColor: "#39AFFF",
    },

    specialtyText: {
        color: "#64748B",
        fontSize: wp("3%"),
        fontWeight: "700",
    },

    specialtyTextSelected: {
        color: "#FFFFFF",
        marginLeft: 3,
    },

    bioCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 22,
        padding: wp("4%"),
        elevation: 3,
        minHeight: hp("15%"),
    },

    bioInput: {
        minHeight: hp("10%"),
        color: "#475569",
        fontSize: wp("3.3%"),
        lineHeight: 21,
        fontWeight: "500",
    },

    characterCount: {
        color: "#A0A8B5",
        fontSize: wp("2.7%"),
        textAlign: "right",
    },

    updateButton: {
        height: hp("6.7%"),
        backgroundColor: "#39AFFF",
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        marginTop: hp("3%"),
        elevation: 4,
    },

    updateButtonText: {
        color: "#FFFFFF",
        fontSize: wp("3.8%"),
        fontWeight: "900",
    },
});

export default TrainerEditProfile;