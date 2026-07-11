import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

const trainers = [
    {
        id: 1,
        name: "Trường xấu trai",
        type: "Physical trainer",
        age: 28,
        address: "Villanur, Puducherry",
        image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400",
        skills: ["Tăng cơ - Giảm mỡ", "Tập gym tổng hợp", "Dinh dưỡng thể hình"],
        days: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
        activeDays: ["T2", "T4", "T6", "CN"],
        time: ["06:00 - 09:00", "17:00 - 21:00"],
        favorite: false,
    },
    {
        id: 2,
        name: "Huy Đẹp trai",
        type: "Cardio Workout",
        age: 35,
        address: "Anna nagar, Puducherry",
        image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400",
        skills: ["Cardio - Giảm mỡ", "HIIT - Đốt calo", "Sức bền & Dẻo dai"],
        days: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
        activeDays: ["T3", "T5", "T7"],
        time: ["07:00 - 10:00", "16:00 - 20:00"],
        favorite: false,
    },
    {
        id: 3,
        name: "Khánh bé điều",
        type: "Physical trainer",
        age: 28,
        address: "Villanur, Puducherry",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400",
        skills: ["Tăng cơ - Sức mạnh", "Tập gym nâng cao", "Phục hồi chấn thương"],
        days: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
        activeDays: ["T2", "T3", "T5", "T7"],
        time: ["06:30 - 09:30", "17:30 - 21:30"],
        favorite: false,
    },
    {
        id: 4,
        name: "Hùng chị đẹp",
        type: "Cardio Workout",
        age: 35,
        address: "Anna nagar, Puducherry",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
        skills: ["Cardio - Giảm mỡ", "Tập luyện cơ bản", "Tư vấn sức khỏe"],
        days: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
        activeDays: ["T2", "T4", "T6", "CN"],
        time: ["06:00 - 08:30", "18:00 - 20:30"],
        favorite: false,
    },
];

const MemberTrainer = ({ navigation }: any) => {
    const handleChooseTrainer = (name: string) => {
        Alert.alert("Chọn PT", `Bạn đã chọn huấn luyện viên ${name}`);
    };

    const handleViewDetail = (trainer: any) => {
        navigation.navigate("MemberTrainerDetail", { trainer });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={22} color="#111827" />
                </TouchableOpacity>

                <View style={styles.headerTextBox}>
                    <Text style={styles.headerTitle}>Chọn PT</Text>
                    <Text style={styles.headerSubTitle}>
                        Xem thông tin và lịch tập để chọn PT phù hợp
                    </Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {trainers.map((item) => (
                    <View key={item.id} style={styles.trainerCard}>
                        <View style={styles.cardTop}>
                            <Image source={{ uri: item.image }} style={styles.avatar} />

                            <View style={styles.trainerInfo}>
                                <Text style={styles.trainerName}>{item.name}</Text>

                                <Text style={styles.trainerType}>
                                    {item.type}  ·  Age {item.age}
                                </Text>

                                <View style={styles.locationRow}>
                                    <Ionicons name="location" size={13} color="#0095FF" />
                                    <Text style={styles.locationText}>{item.address}</Text>
                                </View>
                            </View>

                            <TouchableOpacity>
                                <Ionicons
                                    name={item.favorite ? "heart" : "heart-outline"}
                                    size={25}
                                    color={item.favorite ? "#EF4444" : "#111827"}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.detailRow}>
                            <View style={styles.leftCol}>
                                <View style={styles.titleRow}>
                                    <Ionicons name="checkmark-circle-outline" size={15} color="#0095FF" />
                                    <Text style={styles.infoTitle}>Chuyên môn</Text>
                                </View>

                                {item.skills.map((skill, index) => (
                                    <View key={index} style={styles.skillRow}>
                                        <Ionicons name="checkmark" size={12} color="#94A3B8" />
                                        <Text style={styles.skillText}>{skill}</Text>
                                    </View>
                                ))}
                            </View>

                            <View style={styles.rightCol}>
                                <View style={styles.titleRow}>
                                    <Ionicons name="calendar-outline" size={15} color="#0095FF" />
                                    <Text style={styles.infoTitle}>Lịch tập</Text>
                                </View>

                                <View style={styles.dayRow}>
                                    {item.days.map((day) => {
                                        const isActive = item.activeDays.includes(day);

                                        return (
                                            <View
                                                key={day}
                                                style={[
                                                    styles.dayBadge,
                                                    isActive && styles.dayBadgeActive,
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        styles.dayText,
                                                        isActive && styles.dayTextActive,
                                                    ]}
                                                >
                                                    {day}
                                                </Text>
                                            </View>
                                        );
                                    })}
                                </View>

                                <View style={styles.timeRow}>
                                    <Ionicons name="time-outline" size={14} color="#0095FF" />

                                    <View>
                                        {item.time.map((time, index) => (
                                            <Text key={index} style={styles.timeText}>
                                                {time}
                                            </Text>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.actionRow}>
                            <TouchableOpacity
                                style={styles.detailBtn}
                                activeOpacity={0.8}
                                onPress={() => handleViewDetail(item)}
                            >
                                <Text style={styles.detailBtnText}>Xem chi tiết</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.chooseBtn}
                                activeOpacity={0.8}
                                onPress={() => handleChooseTrainer(item.name)}
                            >
                                <Text style={styles.chooseBtnText}>Chọn PT</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F8FC",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: wp("5%"),
        marginTop: hp("1%"),
        marginBottom: hp("1%"),
    },

    backBtn: {
        width: 38,
        height: 38,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        elevation: 2,
        marginRight: wp("3%"),
    },

    headerTextBox: {
        flex: 1,
    },

    headerTitle: {
        fontSize: wp("6%"),
        fontWeight: "800",
        color: "#111827",
    },

    headerSubTitle: {
        marginTop: 2,
        fontSize: wp("3%"),
        color: "#94A3B8",
        fontWeight: "500",
    },

    scrollContent: {
        paddingHorizontal: wp("5%"),
        paddingBottom: hp("12%"),
    },

    trainerCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: wp("3.5%"),
        marginBottom: hp("1.5%"),
        elevation: 3,
    },

    cardTop: {
        flexDirection: "row",
        alignItems: "center",
    },

    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: "#E5E7EB",
    },

    trainerInfo: {
        flex: 1,
        marginLeft: wp("3%"),
    },

    trainerName: {
        fontSize: wp("4.2%"),
        fontWeight: "800",
        color: "#111827",
    },

    trainerType: {
        marginTop: 2,
        fontSize: wp("3%"),
        color: "#94A3B8",
        fontWeight: "600",
    },

    locationRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
    },

    locationText: {
        marginLeft: 3,
        fontSize: wp("3%"),
        color: "#0095FF",
        fontWeight: "600",
    },

    detailRow: {
        flexDirection: "row",
        marginTop: hp("1.5%"),
    },

    leftCol: {
        width: "48%",
    },

    rightCol: {
        width: "52%",
    },

    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
    },

    infoTitle: {
        marginLeft: 4,
        fontSize: wp("3.2%"),
        color: "#111827",
        fontWeight: "800",
    },

    skillRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
    },

    skillText: {
        marginLeft: 4,
        fontSize: wp("2.8%"),
        color: "#64748B",
        fontWeight: "500",
    },

    dayRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 8,
    },

    dayBadge: {
        width: 23,
        height: 23,
        borderRadius: 7,
        backgroundColor: "#F1F5F9",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 4,
        marginBottom: 4,
    },

    dayBadgeActive: {
        backgroundColor: "#0095FF",
    },

    dayText: {
        fontSize: wp("2.4%"),
        color: "#94A3B8",
        fontWeight: "800",
    },

    dayTextActive: {
        color: "#FFFFFF",
    },

    timeRow: {
        flexDirection: "row",
        alignItems: "flex-start",
    },

    timeText: {
        marginLeft: 5,
        fontSize: wp("2.7%"),
        color: "#475569",
        fontWeight: "600",
        lineHeight: 16,
    },

    actionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: hp("1.3%"),
    },

    detailBtn: {
        width: "46%",
        height: 36,
        borderRadius: 8,
        borderWidth: 1.3,
        borderColor: "#111827",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },

    detailBtnText: {
        color: "#111827",
        fontWeight: "800",
        fontSize: wp("3.1%"),
    },

    chooseBtn: {
        width: "50%",
        height: 36,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0095FF",
    },

    chooseBtnText: {
        color: "#FFFFFF",
        fontWeight: "800",
        fontSize: wp("3.1%"),
    },
});

export default MemberTrainer;