import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from "react-native-vector-icons/Ionicons";

const selecttrainer = ({ navigation }: any) => {
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

    const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
    const getCurrentWeek = () => {
        const today = new Date();
        const monday = new Date(today);
        monday.setDate(today.getDate() + (today.getDay() === 0 ? -6 : 1 - today.getDay()));
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        return {
            start: monday.toLocaleDateString("vi-VN"),
            end: sunday.toLocaleDateString("vi-VN"),
        };
    };
    const week = getCurrentWeek();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={22} color="#333" />
                </TouchableOpacity>
                <Text style={styles.title}>Đội Ngũ Huấn Luyện Viên</Text>
                <View style={{ width: 42 }} />
            </View>
            <View style={styles.stepContainer}>

                <View style={styles.stepItem}>
                    <View style={styles.circle}>
                        <Text style={styles.activeText}>1</Text>
                    </View>
                </View>

                <View style={styles.line} />

                <View style={styles.stepItem}>
                    <View style={styles.circle}>
                        <Text style={styles.inactiveText}>2</Text>
                    </View>
                </View>

                <View style={styles.line} />

                <View style={styles.stepItem}>
                    <View style={[styles.circle, styles.activeCircle]}>
                        <Text style={styles.inactiveText}>3</Text>
                    </View>
                </View>

                <View style={styles.line} />

                <View style={styles.stepItem}>
                    <View style={styles.circle}>
                        <Text style={styles.inactiveText}>4</Text>
                    </View>
                </View>

                <View style={styles.line} />

                <View style={styles.stepItem}>
                    <View style={styles.circle}>
                        <Text style={styles.inactiveText}>5</Text>
                    </View>
                </View>
            </View>
            {trainers.map((item) => (
                <TouchableOpacity key={item.id} style={styles.card}>

                    <View style={styles.topRow}>

                        <Image source={{ uri: item.image }} style={styles.avatar} />

                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Text style={styles.name}>{item.name}</Text>

                            <Text style={styles.subTitle}>
                                {item.type} · Age {item.age}
                            </Text>

                            <View style={styles.locationRow}>
                                <Ionicons name="location-sharp" size={15} color="#1E90FF" />
                                <Text style={styles.location}>
                                    {item.address}
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity>
                            <Ionicons name="heart-outline" size={28} color="#222" />
                        </TouchableOpacity>

                    </View>

                    <View style={styles.contentRow}>

                        <View style={{ flex: 1 }}>

                            <View style={styles.titleRow}>
                                <Ionicons name="checkmark-circle-outline" size={18} color="#1E90FF" />
                                <Text style={styles.sectionTitle}>
                                    Chuyên môn
                                </Text>
                            </View>

                            {item.skills.map((s, index) => (
                                <Text key={index} style={styles.skill}>
                                    ✓ {s}
                                </Text>
                            ))}

                        </View>

                        <View style={{ flex: 1 }}>

                            <View style={styles.titleRow}>
                                <Ionicons name="calendar-outline" size={18} color="#1E90FF" />
                                <Text style={styles.sectionTitle}>
                                    Lịch tập
                                </Text>

                            </View>
                            <Text style={styles.weekText}>
                                Tuần: {week.start} - {week.end}
                            </Text>

                            <View style={styles.dayContainer}>
                                {days.map((d) => (
                                    <View key={d} style={[styles.dayBox, item.activeDays.includes(d) && styles.dayActive,]}>
                                        <Text style={[styles.dayText, item.activeDays.includes(d) && styles.dayTextActive,]} >
                                            {d}
                                        </Text>
                                    </View>
                                ))}
                            </View>

                            <View style={styles.timeRow}>
                                <Ionicons name="time-outline" size={18} color="#1E90FF" />
                                <View>
                                    <Text style={styles.time}>{item.time[0]}</Text>
                                    <Text style={styles.time}>{item.time[1]}</Text>
                                </View>
                            </View>

                        </View>

                    </View>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.detailBtn} onPress={() => navigation.navigate("MemberTrainerDetail")}>
                            <Text style={styles.detailText}>
                                Xem chi tiết
                            </Text>
                        </TouchableOpacity>
                    </View>

                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F8FC",
        paddingHorizontal: wp(5),
        paddingTop: hp(2),
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: wp("5%"),
        marginTop: hp("4%"),
        marginBottom: hp("2%"),
    },

    backBtn: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        elevation: 2,
    },

    title: {
        marginLeft: 12,
        fontSize: 22,
        fontWeight: "700",
        color: "#1F2937",
    },

    stepContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: hp(3),
    },

    stepItem: {
        alignItems: "center",
    },

    circle: {
        width: 30,
        height: 30,
        borderRadius: 13,
        backgroundColor: "#E5E7EB",
        justifyContent: "center",
        alignItems: "center",
    },

    activeCircle: {
        backgroundColor: "#4ADE80",
    },

    activeText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 17,
    },

    inactiveText: {
        color: "#999",
        fontWeight: "700",
        fontSize: 12,
    },

    line: {
        flex: 1,
        height: 2,
        backgroundColor: "#E5E7EB",
        marginHorizontal: 6,
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 22,
        padding: 18,
        marginBottom: 20,
        elevation: 5,
    },

    topRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },

    name: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1F2937",
    },

    subTitle: {
        color: "#94A3B8",
        fontSize: 15,
        marginTop: 3,
    },

    locationRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },

    location: {
        color: "#1E90FF",
        marginLeft: 3,
        fontWeight: "600",
    },

    contentRow: {
        flexDirection: "row",
        marginTop: 20,
    },

    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },

    sectionTitle: {
        fontWeight: "700",
        fontSize: 16,
        marginLeft: 5,
    },

    skill: {
        color: "#64748B",
        marginBottom: 8,
        fontSize: 15,
    },

    dayContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },

    dayBox: {
        width: 30,
        height: 30,
        borderRadius: 10,
        backgroundColor: "#EEF2F7",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 6,
        marginBottom: 8,
    },

    dayActive: {
        backgroundColor: "#1E90FF",
    },

    dayText: {
        color: "#94A3B8",
        fontWeight: "700",
        fontSize: 13,
    },

    dayTextActive: {
        color: "#fff",
    },

    timeRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop: 8,
    },

    time: {
        marginLeft: 6,
        fontSize: 15,
        color: "#475569",
        fontWeight: "600",
    },

    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },

    detailBtn: {
        flex: 1,
        height: 45,
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: "#111827",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    detailText: {
        fontWeight: "700",
        fontSize: 17,
        color: "#111827",
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: hp(1.5),
    },
    weekText: {
        marginTop: hp("0.5%"),
        marginBottom: hp(1.5),
        marginLeft: wp(1),
        fontSize: wp(3),
        color: "#666",
    },



})
export default selecttrainer;