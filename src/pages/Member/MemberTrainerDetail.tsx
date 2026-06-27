import { Alert, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

const MemberTrainerDetail = ({ navigation, route }: any) => {
    const trainer = route.params?.trainer;

    if (!trainer) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={22} color="#1E293B" />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Chi tiết huấn luyện viên</Text>

                    <View style={{ width: 42 }} />
                </View>

                <View style={styles.emptyBox}>
                    <Text style={styles.emptyText}>Không có dữ liệu huấn luyện viên</Text>
                </View>
            </SafeAreaView>
        );
    }

    const role = trainer.role || trainer.type || "Huấn luyện viên";
    const skills = trainer.skills || [];
    const rating = trainer.rating || 4.9;
    const reviews = trainer.reviews || 86;
    const experience = trainer.experience || "8 năm";
    const students = trainer.students || "120+";
    const evaluate = trainer.evaluate || trainer.price || `${rating}★`;

    const description =
        trainer.description ||
        `Huấn luyện viên ${trainer.name} có kinh nghiệm trong lĩnh vực ${role.toLowerCase()}. Chuyên hỗ trợ học viên cải thiện sức khỏe, vóc dáng và duy trì thói quen tập luyện phù hợp.`;

    const schedule =
        trainer.schedule ||
        trainer.time?.map((time: string, index: number) => ({
            day: index === 0 ? "Buổi sáng" : "Buổi chiều",
            subject: role,
            time: time,
        })) ||
        [];

    const handleCall = () => {
        if (trainer.phone) {
            Linking.openURL(`tel:${trainer.phone}`);
        } else {
            Alert.alert("Thông báo", "Chưa có số điện thoại của huấn luyện viên");
        }
    };

    const handleMessage = () => {
        Alert.alert("Nhắn tin", `Mở khung chat với ${trainer.name}`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={22} color="#1E293B" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Chi tiết huấn luyện viên</Text>

                <TouchableOpacity style={styles.heartBtn}>
                    <Ionicons name="heart-outline" size={23} color="#1E293B" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.profileCard}>
                    <View style={styles.profileTop}>
                        <Image source={{ uri: trainer.image }} style={styles.avatar} />

                        <View style={styles.profileInfo}>
                            <Text style={styles.trainerName}>{trainer.name}</Text>
                            <Text style={styles.trainerRole}>{role}</Text>

                            <View style={styles.ratingRow}>
                                <Ionicons name="star" size={13} color="#FFB020" />
                                <Ionicons name="star" size={13} color="#FFB020" />
                                <Ionicons name="star" size={13} color="#FFB020" />
                                <Ionicons name="star" size={13} color="#FFB020" />
                                <Ionicons name="star-half" size={13} color="#FFB020" />

                                <Text style={styles.ratingText}>
                                    {rating} ({reviews} đánh giá)
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.summaryRow}>
                        <View style={styles.summaryBox}>
                            <Text style={styles.summaryValue}>{experience}</Text>
                            <Text style={styles.summaryLabel}>Kinh nghiệm</Text>
                        </View>

                        <View style={[styles.summaryBox, { backgroundColor: "#ECFFF5" }]}>
                            <Text style={[styles.summaryValue, { color: "#22C55E" }]}>
                                {students}
                            </Text>
                            <Text style={styles.summaryLabel}>Học viên</Text>
                        </View>

                        <View style={[styles.summaryBox, { backgroundColor: "#FFF7E8" }]}>
                            <Text style={[styles.summaryValue, { color: "#FF9F43" }]}>
                                {evaluate}
                            </Text>
                            <Text style={styles.summaryLabel}>Đánh giá</Text>
                        </View>
                    </View>

                    <Text style={styles.description}>
                        {description}
                    </Text>
                </View>

                <Text style={styles.sectionTitle}>Chuyên môn</Text>

                <View style={styles.skillWrap}>
                    {skills.map((item: string, index: number) => (
                        <View
                            key={index}
                            style={[
                                styles.skillBadge,
                                index % 4 === 0 && { backgroundColor: "#E8F4FF" },
                                index % 4 === 1 && { backgroundColor: "#ECFFF5" },
                                index % 4 === 2 && { backgroundColor: "#FFF3E8" },
                                index % 4 === 3 && { backgroundColor: "#F3ECFF" },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.skillText,
                                    index % 4 === 0 && { color: "#53B8FF" },
                                    index % 4 === 1 && { color: "#22C55E" },
                                    index % 4 === 2 && { color: "#FF8A00" },
                                    index % 4 === 3 && { color: "#8B5CF6" },
                                ]}
                            >
                                {item}
                            </Text>
                        </View>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Lịch trong tuần</Text>

                <View style={styles.scheduleCard}>
                    {schedule.map((item: any, index: number) => (
                        <View
                            key={index}
                            style={[
                                styles.scheduleRow,
                                index !== schedule.length - 1 && styles.borderBottom,
                            ]}
                        >
                            <View style={styles.scheduleInfo}>
                                <Text style={styles.scheduleDay}>{item.day}</Text>
                                <Text style={styles.scheduleSubject}>{item.subject}</Text>
                            </View>

                            <View style={styles.timeBadge}>
                                <Text style={styles.timeText}>{item.time}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.callBtn} onPress={handleCall}>
                        <Ionicons name="call-outline" size={18} color="#FFFFFF" />
                        <Text style={styles.callText}>Gọi điện</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.messageBtn} onPress={handleMessage}>
                        <Ionicons name="chatbubble-outline" size={18} color="#53B8FF" />
                        <Text style={styles.messageText}>Nhắn tin</Text>
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

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: wp("5%"),
        marginTop: hp("1%"),
        marginBottom: hp("2%"),
    },

    backBtn: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
    },

    heartBtn: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
    },

    headerTitle: {
        fontSize: wp("4.5%"),
        fontWeight: "800",
        color: "#1E293B",
    },

    scrollContent: {
        paddingBottom: hp("10%"),
    },

    profileCard: {
        backgroundColor: "#FFFFFF",
        marginHorizontal: wp("5%"),
        borderRadius: 24,
        padding: wp("4%"),
        elevation: 4,
        marginBottom: hp("2%"),
    },

    profileTop: {
        flexDirection: "row",
        alignItems: "center",
    },

    avatar: {
        width: 82,
        height: 82,
        borderRadius: 22,
        backgroundColor: "#E5E7EB",
    },

    profileInfo: {
        flex: 1,
        marginLeft: wp("4%"),
    },

    trainerName: {
        fontSize: wp("4.5%"),
        fontWeight: "800",
        color: "#1E293B",
    },

    trainerRole: {
        fontSize: wp("3.2%"),
        color: "#53B8FF",
        fontWeight: "700",
        marginTop: 4,
    },

    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        marginTop: 8,
    },

    ratingText: {
        color: "#64748B",
        fontSize: wp("3%"),
        marginLeft: 5,
    },

    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: hp("2%"),
    },

    summaryBox: {
        width: "31%",
        backgroundColor: "#E8F4FF",
        borderRadius: 16,
        paddingVertical: hp("1.3%"),
        alignItems: "center",
    },

    summaryValue: {
        color: "#53B8FF",
        fontSize: wp("3.5%"),
        fontWeight: "800",
    },

    summaryLabel: {
        color: "#94A3B8",
        fontSize: wp("2.7%"),
        marginTop: 4,
        fontWeight: "600",
    },

    description: {
        marginTop: hp("2%"),
        color: "#94A3B8",
        fontSize: wp("3.3%"),
        lineHeight: 22,
        fontWeight: "500",
    },

    sectionTitle: {
        fontSize: wp("4.5%"),
        fontWeight: "800",
        color: "#1E293B",
        marginHorizontal: wp("5%"),
        marginBottom: hp("1.2%"),
    },

    skillWrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginHorizontal: wp("5%"),
        marginBottom: hp("2%"),
    },

    skillBadge: {
        paddingHorizontal: wp("3.5%"),
        paddingVertical: hp("0.9%"),
        borderRadius: 18,
        marginRight: wp("2%"),
        marginBottom: hp("1%"),
    },

    skillText: {
        fontSize: wp("3%"),
        fontWeight: "800",
    },

    scheduleCard: {
        backgroundColor: "#FFFFFF",
        marginHorizontal: wp("5%"),
        borderRadius: 22,
        paddingHorizontal: wp("4%"),
        elevation: 4,
        marginBottom: hp("2%"),
    },

    scheduleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: hp("1.8%"),
    },

    scheduleInfo: {
        flex: 1,
        paddingRight: wp("2%"),
    },

    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },

    scheduleDay: {
        color: "#1E293B",
        fontWeight: "800",
        fontSize: wp("3.3%"),
    },

    scheduleSubject: {
        color: "#94A3B8",
        fontSize: wp("3%"),
        marginTop: 3,
        fontWeight: "600",
    },

    timeBadge: {
        backgroundColor: "#E8F4FF",
        paddingHorizontal: wp("3%"),
        paddingVertical: hp("0.8%"),
        borderRadius: 18,
    },

    timeText: {
        color: "#53B8FF",
        fontWeight: "800",
        fontSize: wp("3%"),
    },

    actionRow: {
        flexDirection: "row",
        marginHorizontal: wp("5%"),
        gap: 12,
    },

    callBtn: {
        flex: 1,
        backgroundColor: "#4ADE80",
        borderRadius: 16,
        paddingVertical: hp("1.5%"),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    callText: {
        color: "#FFFFFF",
        fontWeight: "800",
        marginLeft: 6,
        fontSize: wp("3.5%"),
    },

    messageBtn: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        paddingVertical: hp("1.5%"),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
    },

    messageText: {
        color: "#53B8FF",
        fontWeight: "800",
        marginLeft: 6,
        fontSize: wp("3.5%"),
    },

    emptyBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: wp("5%"),
    },

    emptyText: {
        fontSize: wp("4%"),
        color: "#94A3B8",
        fontWeight: "700",
    },
});

export default MemberTrainerDetail;