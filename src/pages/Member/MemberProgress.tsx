import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart, BarChart } from "react-native-chart-kit";

const MemberProgress = ({ navigation }: any) => {
    const bodyStats = [
        {
            id: 1,
            title: "Cân nặng",
            value: "72.1 kg",
            change: "-3.9 kg vs 6 tháng trước",
            color: "#53B8FF",
            icon: "scale-outline",
            percent: 72,
        },
        {
            id: 2,
            title: "Mỡ cơ thể",
            value: "18.5%",
            change: "-3.5% vs 6 tháng trước",
            color: "#FF9F43",
            icon: "body-outline",
            percent: 55,
        },
        {
            id: 3,
            title: "Khối cơ",
            value: "32.4 kg",
            change: "+2.1 kg vs 6 tháng trước",
            color: "#22C55E",
            icon: "barbell-outline",
            percent: 68,
        },
        {
            id: 4,
            title: "BMI",
            value: "22.4",
            change: "-1.2 vs 6 tháng trước",
            color: "#8B5CF6",
            icon: "pulse-outline",
            percent: 60,
        },
    ];

    const chartConfig = {
        backgroundGradientFrom: "#FFFFFF",
        backgroundGradientTo: "#FFFFFF",
        decimalPlaces: 1,
        color: () => "#53B8FF",
        labelColor: () => "#94A3B8",
        propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#53B8FF",
        },
    };

    const barChartConfig = {
        backgroundGradientFrom: "#FFFFFF",
        backgroundGradientTo: "#FFFFFF",
        decimalPlaces: 0,
        color: () => "#9B7CFF",
        labelColor: () => "#94A3B8",
        fillShadowGradient: "#9B7CFF",
        fillShadowGradientOpacity: 1,
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={22} color="#1E293B" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Theo dõi tiến độ</Text>

                <View style={{ width: 42 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View>
                            <Text style={styles.cardLabel}>Cân nặng 6 tháng</Text>

                            <View style={styles.rowCenter}>
                                <Text style={styles.bigValue}>71.1</Text>
                                <Text style={styles.unit}>kg</Text>
                            </View>
                        </View>

                        <View style={styles.greenBadge}>
                            <Ionicons name="trending-down-outline" size={14} color="#22C55E" />
                            <Text style={styles.greenBadgeText}>-3.9 kg</Text>
                        </View>
                    </View>

                    <LineChart
                        data={{
                            labels: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
                            datasets: [
                                {
                                    data: [76, 75.2, 74.1, 73.6, 72.9, 72.1],
                                },
                            ],
                        }}

                        width={wp("80%")}
                        height={190}
                        bezier
                        withShadow={false}
                        withVerticalLines={false}
                        withOuterLines={false}
                        chartConfig={chartConfig}
                        style={styles.chart}
                    />
                </View>

                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View>
                            <Text style={styles.cardLabel}>Buổi tập / tháng</Text>

                            <View style={styles.rowCenter}>
                                <Text style={styles.bigValue}>13</Text>
                                <Text style={styles.unit}>buổi</Text>
                            </View>
                        </View>

                        <View style={styles.purpleBadge}>
                            <Ionicons name="trending-up-outline" size={14} color="#8B5CF6" />
                            <Text style={styles.purpleBadgeText}>+62%%</Text>
                        </View>
                    </View>

                    <BarChart
                        data={{
                            labels: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
                            datasets: [
                                {
                                    data: [6, 8, 10, 9, 12, 13],
                                },
                            ],
                        }}

                        width={wp("80%")}
                        height={210}
                        fromZero
                        showValuesOnTopOfBars
                        yAxisLabel=""
                        yAxisSuffix=""
                        chartConfig={barChartConfig}
                        style={styles.chart}
                    />
                </View>

                <Text style={styles.sectionTitle}>Chỉ số cơ thể</Text>

                <View style={styles.statsGrid}>
                    {bodyStats.map((item) => (
                        <View key={item.id} style={styles.statCard}>
                            <View style={[styles.statIcon, { backgroundColor: item.color }]}>
                                <Ionicons name={item.icon} size={20} color="#fff" />
                            </View>

                            <Text style={styles.statTitle}>{item.title}</Text>
                            <Text style={styles.statValue}>{item.value}</Text>

                            <Text
                                style={[
                                    styles.statChange,
                                    {
                                        color: item.change.includes("+") ? "#22C55E" : "#22C55E",
                                    },
                                ]}
                            >
                                {item.change}
                            </Text>

                            <View style={styles.progressRow}>
                                <View style={styles.progressBg}>
                                    <View
                                        style={[
                                            styles.progressFill,
                                            {
                                                width: `${item.percent}%`,
                                                backgroundColor: item.color,
                                            },
                                        ]}
                                    />
                                </View>

                                <Text style={styles.progressPercent}>
                                    {item.percent}%
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FB",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: wp("5%"),
        marginTop: hp("1%"),
        marginBottom: hp("2%"),
    },

    iconBtn: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
    },

    headerTitle: {
        fontSize: wp("5.3%"),
        fontWeight: "700",
        color: "#1E293B",
    },

    scrollContent: {
        paddingHorizontal: wp("5%"),
        paddingBottom: hp("4%"),
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 24,
        padding: wp("4%"),
        marginBottom: hp("2%"),
        elevation: 4,
    },

    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },

    cardLabel: {
        fontSize: wp("3.2%"),
        color: "#94A3B8",
        fontWeight: "600",
    },

    rowCenter: {
        flexDirection: "row",
        alignItems: "flex-end",
        marginTop: hp("0.5%"),
    },

    bigValue: {
        fontSize: wp("6%"),
        fontWeight: "800",
        color: "#0F172A",
    },

    unit: {
        fontSize: wp("3.4%"),
        fontWeight: "700",
        color: "#0F172A",
        marginLeft: 4,
        marginBottom: 3,
    },

    greenBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ECFDF3",
        paddingHorizontal: wp("3%"),
        paddingVertical: hp("0.8%"),
        borderRadius: 18,
    },

    greenBadgeText: {
        color: "#22C55E",
        fontWeight: "700",
        fontSize: wp("3%"),
        marginLeft: 4,
    },

    purpleBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F4EDFF",
        paddingHorizontal: wp("3%"),
        paddingVertical: hp("0.8%"),
        borderRadius: 18,
    },

    purpleBadgeText: {
        color: "#8B5CF6",
        fontWeight: "700",
        fontSize: wp("3%"),
        marginLeft: 4,
    },

    chart: {
        marginTop: hp("1.5%"),
        borderRadius: 16,
        marginLeft: -wp("2%"),
    },

    sectionTitle: {
        fontSize: wp("5%"),
        fontWeight: "800",
        color: "#1E293B",
        marginBottom: hp("1.5%"),
    },

    statsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    statCard: {
        width: "48%",
        backgroundColor: "#fff",
        borderRadius: 22,
        padding: wp("4%"),
        marginBottom: hp("1.5%"),
        elevation: 4,
    },

    statIcon: {
        width: 38,
        height: 38,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: hp("1%"),
    },

    statTitle: {
        color: "#94A3B8",
        fontSize: wp("3.1%"),
        fontWeight: "600",
    },

    statValue: {
        color: "#0F172A",
        fontSize: wp("4.6%"),
        fontWeight: "800",
        marginTop: hp("0.4%"),
    },

    statChange: {
        fontSize: wp("2.7%"),
        fontWeight: "700",
        marginTop: hp("0.5%"),
    },

    progressBg: {
        flex: 1,
        height: 7,
        backgroundColor: "#E5E7EB",
        borderRadius: 10,
        overflow: "hidden",
    },

    progressFill: {
        height: "100%",
        borderRadius: 10,
    },

    progressRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: hp("1%"),
    },

    progressPercent: {
        marginLeft: 8,
        fontSize: wp("2.8%"),
        fontWeight: "700",
        color: "#64748B",
    },

});

export default MemberProgress;