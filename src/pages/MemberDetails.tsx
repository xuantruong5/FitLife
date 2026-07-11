import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { LineChart } from "react-native-chart-kit";

const MemberDetails = ({ navigation }: any) => {
    const member = {
        name: "Nguyễn Văn A",
        totalSessions: 15,
        attended: 1,
        absent: 14,
        completion: 7,
        currentWeight: 65,
        weightChange: -2,
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={22} color="#1E293B" ></Ionicons>
                </TouchableOpacity>

                <Text style={styles.headerTitle}>
                    Chi tiết: {member.name}
                </Text>
                <View style={{ width: 42 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: hp("5%") }}>
                <View style={styles.card}>
                    <View style={styles.summaryContainer}>
                        <AnimatedCircularProgress size={95} width={8} fill={member.completion} tintColor="#FF9F43" backgroundColor="#EEF2F7" rotation={0} lineCap="round">
                            {() => {
                                return (
                                    <Text style={styles.percentText}>
                                        {member.completion}%
                                    </Text>
                                );
                            }}
                        </AnimatedCircularProgress>
                        <View style={styles.statsRight}>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>
                                    Tổng số buổi
                                </Text>
                                <Text style={styles.infoValue}>
                                    {member.totalSessions}
                                </Text>
                            </View>

                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: "#22C55E" }]}>
                                    Đã tập
                                </Text>
                                <Text style={[styles.infoValue, { color: "#22C55E", }]}>
                                    {member.attended}
                                </Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: "#FF6B6B", }]}>
                                    Số buổi nghỉ
                                </Text>
                                <Text
                                    style={[styles.infoValue, { color: "#FF6B6B", },]}>
                                    {member.absent}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>
                        CẢI THIỆN CHỈ SỐ CƠ THỂ
                    </Text>
                    <Text style={styles.subTitle}>
                        Cân nặng (kg) — 1 tháng
                    </Text>
                    <LineChart data={{
                        labels: ["01/6", "08/6", "15/6", "22/6", "29/6",],
                        datasets: [{ data: [67, 66.8, 66.2, 65.5, 65,], },],
                    }}
                        width={wp("78%")} height={180} withShadow={false} withVerticalLines={false} withOuterLines={false} bezier
                        chartConfig={{
                            backgroundGradientFrom:
                                "#FFFFFF",
                            backgroundGradientTo:
                                "#FFFFFF",
                            decimalPlaces: 0,
                            color: () =>
                                "#53B8FF",
                            labelColor: () =>
                                "#94A3B8",
                            propsForDots: {
                                r: "4",
                                strokeWidth: "2",
                                stroke: "#53B8FF",
                            },
                        }}
                        style={{ marginTop: 10, borderRadius: 16, }}
                    />
                    <View style={styles.weightRow}>
                        <View style={styles.weightCard}>
                            <Text style={styles.weightLabel}>
                                Hiện tại
                            </Text>
                            <Text style={styles.weightValue}>
                                {member.currentWeight}{" "} kg
                            </Text>
                        </View>
                        <View style={[styles.weightCard, { backgroundColor: "#ECFFF5",  }]}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Ionicons name="trending-down-outline" size={14} color="#22C55E"/>
                                <Text style={[styles.weightLabel, { color: "#22C55E", }]}> Giảm</Text>
                            </View>
                            
                            <Text style={[styles.weightValue, { color: "#22C55E", }]}>
                                {member.weightChange}{" "}Kg
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={styles.commentHeader}>
                        <View style={styles.iconBox}>
                            <Ionicons name="document-text" size={16} color="#FFF" />
                        </View>
                        <Text style={styles.commentTitle}>
                            Nhận xét của PT
                        </Text>
                    </View>
                    <View style={styles.goodBox}>
                        <Text style={styles.goodTitle}>
                            • Điểm mạnh
                        </Text>
                        <Text style={styles.commentText}>
                            • Thể lực Squat cải
                            thiện rõ rệt qua các
                            buổi tập.
                        </Text>
                        <Text style={styles.commentText}>
                            • Sức bền tổng thể tăng
                            đáng kể so với tháng
                            trước.
                        </Text>
                    </View>
                    <View style={styles.badBox}>
                        <Text style={styles.badTitle}>
                            • Cần khắc phục
                        </Text>
                        <Text style={styles.commentText}>
                            • Kỹ thuật Plank chưa
                            vững.
                        </Text>
                        <Text style={styles.commentText}>
                            • Cần kiểm soát lượng
                            calo nạp vào tốt hơn.
                        </Text>
                    </View>
                </View>
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
        justifyContent: "space-between",
        paddingHorizontal: wp("5%"),
        marginTop: hp("1%"),
        marginBottom: hp("2%"),
    },

    backBtn: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
    },

    headerTitle: {
        fontSize: wp("4.5%"),
        fontWeight: "700",
        color: "#1E293B",
    },

    card: {
        backgroundColor: "#FFF",
        marginHorizontal: wp("5%"),
        marginBottom: hp("2%"),
        borderRadius: 24,
        padding: wp("4%"),
        elevation: 3,
    },

    summaryContainer: {
        flexDirection: "row",
        alignItems: "center",
    },

    percentText: {
        fontSize: 20,
        fontWeight: "700",
        color: "#1E293B",
    },

    statsRight: {
        flex: 1,
        marginLeft: wp("4%"),
    },

    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#F8FAFC",
        padding: 12,
        borderRadius: 12,
        marginBottom: 10,
    },

    infoLabel: {
        color: "#64748B",
    },

    infoValue: {
        fontWeight: "700",
        color: "#1E293B",
    },

    sectionTitle: {
        fontWeight: "700",
        color: "#94A3B8",
        fontSize: 12,
    },

    subTitle: {
        color: "#94A3B8",
        marginTop: 4,
    },

    weightRow: {
        flexDirection: "row",
        marginTop: 10,
        gap: 10,
    },

    weightCard: {
        flex: 1,
        backgroundColor: "#F8FAFC",
        borderRadius: 16,
        padding: 15,
    },

    weightLabel: {
        color: "#94A3B8",
        fontSize: 12,
    },

    weightValue: {
        marginTop: 5,
        fontSize: 24,
        fontWeight: "700",
        color: "#1E293B",
    },

    commentHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },

    iconBox: {
        width: 28,
        height: 28,
        borderRadius: 8,
        backgroundColor: "#FFB020",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },

    commentTitle: {
        fontWeight: "700",
        color: "#1E293B",
    },

    goodBox: {
        backgroundColor: "#ECFFF5",
        padding: 12,
        borderRadius: 14,
        marginBottom: 10,
    },

    badBox: {
        backgroundColor: "#FFF1F1",
        padding: 12,
        borderRadius: 14,
    },

    goodTitle: {
        color: "#22C55E",
        fontWeight: "700",
        marginBottom: 8,
    },

    badTitle: {
        color: "#FF6B6B",
        fontWeight: "700",
        marginBottom: 8,
    },

    commentText: {
        color: "#475569",
        marginBottom: 5,
        lineHeight: 20,
    },
})
export default MemberDetails;