import { Alert, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

const MemberTrainerDetail = ({ navigation, route }: any) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={22} color="#222" />
                </TouchableOpacity>

                {/* Trainer Card */}
                <View style={styles.card}>

                    <View style={styles.topRow}>
                        <Image
                            source={{
                                uri: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400",
                            }}
                            style={styles.avatar}
                        />

                        <View style={{ marginLeft: 15, flex: 1 }}>
                            <Text style={styles.name}>Phạm Minh Tuấn</Text>

                            <Text style={styles.job}>
                                Huấn luyện viên cá nhân
                            </Text>

                            <View style={styles.ratingRow}>
                                <Ionicons name="star" color="#F8B400" size={15} />
                                <Ionicons name="star" color="#F8B400" size={15} />
                                <Ionicons name="star" color="#F8B400" size={15} />
                                <Ionicons name="star" color="#F8B400" size={15} />
                                <Ionicons name="star" color="#F8B400" size={15} />

                                <Text style={styles.rating}>
                                    4.9 (86 đánh giá)
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Info */}

                    <View style={styles.infoRow}>
                        {[
                            { value: "8 năm", label: "Kinh nghiệm" },
                            { value: "120+", label: "Học viên" },
                            { value: "4.9★", label: "Đánh giá" },
                        ].map((item, index) => (
                            <View key={index} style={[styles.infoBox, { backgroundColor: index === 0 ? "#EFF6FF" : index === 1 ? "#ECFDF5" : "#FFF7ED", },]}>
                                <Text style={[styles.infoNumber, { color: index === 0 ? "#60A5FA" : index === 1 ? "#22C55E" : "#F59E0B", },]} >
                                    {item.value}
                                </Text>

                                <Text style={styles.infoText}>{item.label}</Text>
                            </View>
                        ))}
                    </View>

                    <Text style={styles.description}>
                        Chứng chỉ NASM-CPT & Precision Nutrition.
                        Chuyên gia về giảm cân, tăng cơ và cải thiện sức khỏe.
                        Đã huấn luyện nhiều vận động viên chuyên nghiệp
                        và học viên phổ thông.
                    </Text>

                </View>

                {/* Skill */}

                <Text style={styles.sectionTitle}>Chuyên môn</Text>

                <View style={styles.skillRow}>
                    {["Strength Training", "HIIT", "CrossFit", "Dinh dưỡng"].map(
                        (item, index) => (
                            <View key={index} style={[styles.skillBox, { backgroundColor: index === 0 ? "#EAF4FF" : index === 1 ? "#EAFBF0" : index === 2 ? "#FFF2E8" : "#F3EDFF", },]}>
                                <Text style={[styles.skill, { color: index === 0 ? "#4F9CF9" : index === 1 ? "#22C55E" : index === 2 ? "#FB923C" : "#A855F7", },]} >
                                    {item}
                                </Text>
                            </View>
                        )
                    )}
                </View>

                {/* Schedule */}

                <Text style={styles.sectionTitle}>Lịch trong tuần</Text>

                <View style={styles.scheduleCard}>

                    <View style={styles.scheduleItem}>
                        <View>
                            <Text style={styles.day}>Thứ 2 & 4 & 6</Text>
                            <Text style={styles.type}>HIIT Cardio</Text>
                        </View>

                        <View style={styles.timeBox}>
                            <Text style={styles.time}>06:30 - 07:30</Text>
                        </View>
                    </View>

                    <View style={styles.line} />

                    <View style={styles.scheduleItem}>
                        <View>
                            <Text style={styles.day}>Thứ 3 & 5</Text>
                            <Text style={styles.type}>Strength Training</Text>
                        </View>

                        <View style={styles.timeBox}>
                            <Text style={styles.time}>18:00 - 19:15</Text>
                        </View>
                    </View>

                </View>

            </ScrollView>

            {/* Bottom Button */}

            <View style={styles.bottom}>

                <TouchableOpacity style={styles.callBtn} onPress={() => Linking.openURL("tel:0123456789")}>
                    <Ionicons name="call-outline" color="#fff" size={20} />
                    <Text style={styles.callText}>Gọi điện</Text>

                </TouchableOpacity>

                <TouchableOpacity style={styles.messageBtn}>
                    <Ionicons name="chatbubble-outline" color="#60A5FA" size={20} />
                    <Text style={styles.messageText}>Nhắn tin</Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F8FC",
    },

    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
        elevation: 3
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 24,
        marginHorizontal: 20,
        padding: 20,
        elevation: 6
    },

    topRow: {
        flexDirection: "row",
        alignItems: "center"
    },

    avatar: {
        width: 90,
        height: 90,
        borderRadius: 20
    },

    name: {
        fontSize: 22,
        fontWeight: "700",
        color: "#1E293B"
    },

    job: {
        color: "#3B82F6",
        fontSize: 15,
        marginTop: 4
    },

    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8
    },

    rating: {
        marginLeft: 8,
        color: "#64748B"
    },

    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 25
    },

    infoBox: {
        width: 95,
        backgroundColor: "#F8FAFC",
        borderRadius: 15,
        paddingVertical: 15,
        alignItems: "center"
    },

    infoNumber: {
        fontSize: 22,
        fontWeight: "700",
        color: "#3B82F6"
    },

    infoText: {
        color: "#94A3B8",
        marginTop: 5
    },

    description: {
        marginTop: 20,
        color: "#64748B",
        lineHeight: 24,
        fontSize: 15
    },

    sectionTitle: {
        fontSize: 24,
        fontWeight: "700",
        marginHorizontal: 20,
        marginTop: 25,
        marginBottom: 15
    },

    skillRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginHorizontal: 20
    },
    skillBox: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 10,
        marginBottom: 10,
    },

    skill: {
        fontWeight: "600",
        fontSize: 14,
    },

    scheduleCard: {
        backgroundColor: "#fff",
        marginHorizontal: 20,
        borderRadius: 20,
        elevation: 4,
        marginBottom: 100
    },

    scheduleItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 18
    },

    day: {
        fontWeight: "700",
        fontSize: 16,
        color: "#1E293B"
    },

    type: {
        color: "#94A3B8",
        marginTop: 4
    },

    timeBox: {
        backgroundColor: "#E8F3FF",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20
    },

    time: {
        color: "#3B82F6",
        fontWeight: "700"
    },

    line: {
        height: 1,
        backgroundColor: "#E5E7EB"
    },

    bottom: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    },

    callBtn: {
        flex: 1,
        backgroundColor: "#3DDC84",
        height: 55,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginRight: 10
    },

    callText: {
        color: "#fff",
        fontWeight: "700",
        marginLeft: 8,
        fontSize: 16
    },

    messageBtn: {
        flex: 1,
        backgroundColor: "#fff",
        height: 55,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        elevation: 4
    },

    messageText: {
        color: "#60A5FA",
        fontWeight: "700",
        marginLeft: 8,
        fontSize: 16
    },

})


export default MemberTrainerDetail;