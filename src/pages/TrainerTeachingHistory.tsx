import React, { useMemo, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type TeachingStatus = "completed" | "cancelled";

type TeachingHistoryItem = {
    id: number;
    studentName: string;
    packageName: string;
    sessionType: string;
    date: string;
    time: string;
    duration: number;
    status: TeachingStatus;
    avatar: string;
    avatarColor: string;
    calories?: number;
};

const teachingHistory: TeachingHistoryItem[] = [
    {
        id: 1,
        studentName: "Nguyễn Văn An",
        packageName: "Gói Private 3 tháng",
        sessionType: "Tập tăng cơ",
        date: "15/07/2026",
        time: "07:00 - 08:00",
        duration: 60,
        status: "completed",
        avatar: "A",
        avatarColor: "#5B9DFF",
        calories: 420,
    },
    {
        id: 2,
        studentName: "Trần Thị Bích",
        packageName: "Gói giảm mỡ 10 buổi",
        sessionType: "HIIT Cardio",
        date: "14/07/2026",
        time: "10:00 - 11:00",
        duration: 60,
        status: "completed",
        avatar: "B",
        avatarColor: "#FF6DB0",
        calories: 510,
    },
    {
        id: 3,
        studentName: "Lê Hoàng Cường",
        packageName: "Gói VIP 6 tháng",
        sessionType: "Strength Training",
        date: "13/07/2026",
        time: "15:00 - 16:00",
        duration: 60,
        status: "completed",
        avatar: "C",
        avatarColor: "#2ECC71",
        calories: 380,
    },
    {
        id: 4,
        studentName: "Phạm Minh Đức",
        packageName: "Gói Private 1 tháng",
        sessionType: "Phục hồi chấn thương",
        date: "12/07/2026",
        time: "17:00 - 18:00",
        duration: 60,
        status: "cancelled",
        avatar: "D",
        avatarColor: "#F59E0B",
    },
    {
        id: 5,
        studentName: "Nguyễn Thu Hà",
        packageName: "Gói Yoga cơ bản",
        sessionType: "Yoga & Stretching",
        date: "11/07/2026",
        time: "08:00 - 09:00",
        duration: 60,
        status: "completed",
        avatar: "H",
        avatarColor: "#A78BFA",
        calories: 230,
    },
];

const TrainerTeachingHistory = ({ navigation }: any) => {
    const [selectedFilter, setSelectedFilter] = useState<
        "all" | "completed" | "cancelled"
    >("all");

    const filteredHistory = useMemo(() => {
        if (selectedFilter === "all") {
            return teachingHistory;
        }

        return teachingHistory.filter(
            item => item.status === selectedFilter
        );
    }, [selectedFilter]);

    const completedCount = teachingHistory.filter(
        item => item.status === "completed"
    ).length;

    const totalMinutes = teachingHistory
        .filter(item => item.status === "completed")
        .reduce((total, item) => total + item.duration, 0);

    const totalHours = totalMinutes / 60;

    const totalStudents = new Set(
        teachingHistory.map(item => item.studentName)
    ).size;

    const renderStatus = (status: TeachingStatus) => {
        if (status === "completed") {
            return (
                <View style={styles.completedBadge}>
                    <Ionicons
                        name="checkmark-circle"
                        size={14}
                        color="#22C55E"
                    />

                    <Text style={styles.completedText}>
                        Hoàn thành
                    </Text>
                </View>
            );
        }

        return (
            <View style={styles.cancelledBadge}>
                <Ionicons
                    name="close-circle"
                    size={14}
                    color="#EF4444"
                />

                <Text style={styles.cancelledText}>
                    Đã hủy
                </Text>
            </View>
        );
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
                        size={22}
                        color="#1E293B"
                    />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>
                    Lịch sử dạy học
                </Text>

                <TouchableOpacity style={styles.calendarButton}>
                    <Ionicons
                        name="calendar-outline"
                        size={21}
                        color="#4BA3F5"
                    />
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryTitle}>
                        Tổng quan tháng này
                    </Text>

                    <View style={styles.summaryRow}>
                        <View style={styles.summaryItem}>
                            <View
                                style={[
                                    styles.summaryIcon,
                                    { backgroundColor: "#E8F4FF" },
                                ]}
                            >
                                <Ionicons
                                    name="fitness-outline"
                                    size={22}
                                    color="#4BA3F5"
                                />
                            </View>

                            <Text style={styles.summaryValue}>
                                {completedCount}
                            </Text>

                            <Text style={styles.summaryLabel}>
                                Buổi đã dạy
                            </Text>
                        </View>

                        <View style={styles.summaryDivider} />

                        <View style={styles.summaryItem}>
                            <View
                                style={[
                                    styles.summaryIcon,
                                    { backgroundColor: "#ECFFF5" },
                                ]}
                            >
                                <Ionicons
                                    name="time-outline"
                                    size={22}
                                    color="#22C55E"
                                />
                            </View>

                            <Text style={styles.summaryValue}>
                                {totalHours} giờ
                            </Text>

                            <Text style={styles.summaryLabel}>
                                Tổng thời gian
                            </Text>
                        </View>

                        <View style={styles.summaryDivider} />

                        <View style={styles.summaryItem}>
                            <View
                                style={[
                                    styles.summaryIcon,
                                    { backgroundColor: "#F4EDFF" },
                                ]}
                            >
                                <Ionicons
                                    name="people-outline"
                                    size={22}
                                    color="#A78BFA"
                                />
                            </View>

                            <Text style={styles.summaryValue}>
                                {totalStudents}
                            </Text>

                            <Text style={styles.summaryLabel}>
                                Học viên
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.filterContainer}>
                    <TouchableOpacity
                        style={[
                            styles.filterButton,
                            selectedFilter === "all" &&
                                styles.activeFilterButton,
                        ]}
                        onPress={() => setSelectedFilter("all")}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                selectedFilter === "all" &&
                                    styles.activeFilterText,
                            ]}
                        >
                            Tất cả
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.filterButton,
                            selectedFilter === "completed" &&
                                styles.activeFilterButton,
                        ]}
                        onPress={() =>
                            setSelectedFilter("completed")
                        }
                    >
                        <Text
                            style={[
                                styles.filterText,
                                selectedFilter === "completed" &&
                                    styles.activeFilterText,
                            ]}
                        >
                            Hoàn thành
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.filterButton,
                            selectedFilter === "cancelled" &&
                                styles.activeFilterButton,
                        ]}
                        onPress={() =>
                            setSelectedFilter("cancelled")
                        }
                    >
                        <Text
                            style={[
                                styles.filterText,
                                selectedFilter === "cancelled" &&
                                    styles.activeFilterText,
                            ]}
                        >
                            Đã hủy
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        Các buổi dạy gần đây
                    </Text>

                    <Text style={styles.resultCount}>
                        {filteredHistory.length} buổi
                    </Text>
                </View>

                {filteredHistory.length === 0 ? (
                    <View style={styles.emptyCard}>
                        <Ionicons
                            name="calendar-clear-outline"
                            size={48}
                            color="#CBD5E1"
                        />

                        <Text style={styles.emptyTitle}>
                            Chưa có lịch sử dạy học
                        </Text>

                        <Text style={styles.emptyDescription}>
                            Các buổi dạy đã hoàn thành sẽ xuất hiện ở đây.
                        </Text>
                    </View>
                ) : (
                    filteredHistory.map(item => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.historyCard}
                            activeOpacity={0.85}
                        >
                            <View style={styles.cardHeader}>
                                <View style={styles.dateRow}>
                                    <Ionicons
                                        name="calendar-outline"
                                        size={16}
                                        color="#4BA3F5"
                                    />

                                    <Text style={styles.dateText}>
                                        {item.date}
                                    </Text>
                                </View>

                                {renderStatus(item.status)}
                            </View>

                            <View style={styles.studentRow}>
                                <View
                                    style={[
                                        styles.avatar,
                                        {
                                            backgroundColor:
                                                item.avatarColor,
                                        },
                                    ]}
                                >
                                    <Text style={styles.avatarText}>
                                        {item.avatar}
                                    </Text>
                                </View>

                                <View style={styles.studentInformation}>
                                    <Text style={styles.studentName}>
                                        {item.studentName}
                                    </Text>

                                    <Text style={styles.packageName}>
                                        {item.packageName}
                                    </Text>
                                </View>

                                <Ionicons
                                    name="chevron-forward"
                                    size={20}
                                    color="#B0B7C3"
                                />
                            </View>

                            <View style={styles.sessionInformation}>
                                <View style={styles.sessionItem}>
                                    <View
                                        style={[
                                            styles.smallIconBox,
                                            {
                                                backgroundColor:
                                                    "#E8F4FF",
                                            },
                                        ]}
                                    >
                                        <Ionicons
                                            name="barbell-outline"
                                            size={16}
                                            color="#4BA3F5"
                                        />
                                    </View>

                                    <View>
                                        <Text style={styles.infoLabel}>
                                            Nội dung
                                        </Text>

                                        <Text style={styles.infoValue}>
                                            {item.sessionType}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.sessionItem}>
                                    <View
                                        style={[
                                            styles.smallIconBox,
                                            {
                                                backgroundColor:
                                                    "#FFF7E8",
                                            },
                                        ]}
                                    >
                                        <Ionicons
                                            name="time-outline"
                                            size={16}
                                            color="#F59E0B"
                                        />
                                    </View>

                                    <View>
                                        <Text style={styles.infoLabel}>
                                            Thời gian
                                        </Text>

                                        <Text style={styles.infoValue}>
                                            {item.time}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            {item.status === "completed" &&
                                item.calories && (
                                    <View style={styles.resultBox}>
                                        <View style={styles.resultItem}>
                                            <Ionicons
                                                name="timer-outline"
                                                size={17}
                                                color="#64748B"
                                            />

                                            <Text
                                                style={
                                                    styles.resultText
                                                }
                                            >
                                                {item.duration} phút
                                            </Text>
                                        </View>

                                        <View style={styles.resultItem}>
                                            <Ionicons
                                                name="flame-outline"
                                                size={17}
                                                color="#FF7849"
                                            />

                                            <Text
                                                style={
                                                    styles.resultText
                                                }
                                            >
                                                {item.calories} kcal
                                            </Text>
                                        </View>
                                    </View>
                                )}
                        </TouchableOpacity>
                    ))
                )}
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
        width: 42,
        height: 42,
        borderRadius: 14,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
    },

    calendarButton: {
        width: 42,
        height: 42,
        borderRadius: 14,
        backgroundColor: "#E8F4FF",
        justifyContent: "center",
        alignItems: "center",
    },

    headerTitle: {
        color: "#1E293B",
        fontSize: wp("5%"),
        fontWeight: "800",
    },

    scrollContent: {
        paddingHorizontal: wp("5%"),
        paddingBottom: hp("8%"),
    },

    summaryCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        padding: wp("4%"),
        elevation: 4,
        marginTop: hp("1%"),
    },

    summaryTitle: {
        color: "#1E293B",
        fontSize: wp("4%"),
        fontWeight: "800",
        marginBottom: hp("2%"),
    },

    summaryRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    summaryItem: {
        flex: 1,
        alignItems: "center",
    },

    summaryIcon: {
        width: 44,
        height: 44,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: hp("0.8%"),
    },

    summaryValue: {
        color: "#1E293B",
        fontSize: wp("4%"),
        fontWeight: "900",
    },

    summaryLabel: {
        color: "#94A3B8",
        fontSize: wp("2.7%"),
        fontWeight: "600",
        marginTop: 3,
        textAlign: "center",
    },

    summaryDivider: {
        width: 1,
        height: 58,
        backgroundColor: "#EEF2F7",
    },

    filterContainer: {
        flexDirection: "row",
        backgroundColor: "#E9EDF5",
        borderRadius: 18,
        padding: 4,
        marginTop: hp("2%"),
    },

    filterButton: {
        flex: 1,
        height: 42,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
    },

    activeFilterButton: {
        backgroundColor: "#FFFFFF",
        elevation: 2,
    },

    filterText: {
        color: "#94A3B8",
        fontSize: wp("3.1%"),
        fontWeight: "700",
    },

    activeFilterText: {
        color: "#4BA3F5",
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: hp("2.5%"),
        marginBottom: hp("1.2%"),
    },

    sectionTitle: {
        color: "#1E293B",
        fontSize: wp("4.2%"),
        fontWeight: "800",
    },

    resultCount: {
        color: "#94A3B8",
        fontSize: wp("3%"),
        fontWeight: "700",
    },

    historyCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 22,
        padding: wp("4%"),
        elevation: 3,
        marginBottom: hp("1.5%"),
    },

    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: hp("1%"),
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
    },

    dateRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    dateText: {
        color: "#64748B",
        fontSize: wp("3.1%"),
        fontWeight: "700",
        marginLeft: 6,
    },

    completedBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ECFDF3",
        paddingHorizontal: wp("2.5%"),
        paddingVertical: 6,
        borderRadius: 14,
    },

    completedText: {
        color: "#22C55E",
        fontSize: wp("2.7%"),
        fontWeight: "800",
        marginLeft: 4,
    },

    cancelledBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF1F2",
        paddingHorizontal: wp("2.5%"),
        paddingVertical: 6,
        borderRadius: 14,
    },

    cancelledText: {
        color: "#EF4444",
        fontSize: wp("2.7%"),
        fontWeight: "800",
        marginLeft: 4,
    },

    studentRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: hp("1.5%"),
    },

    avatar: {
        width: 48,
        height: 48,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },

    avatarText: {
        color: "#FFFFFF",
        fontSize: wp("4%"),
        fontWeight: "900",
    },

    studentInformation: {
        flex: 1,
        marginLeft: wp("3%"),
    },

    studentName: {
        color: "#1E293B",
        fontSize: wp("3.8%"),
        fontWeight: "800",
    },

    packageName: {
        color: "#94A3B8",
        fontSize: wp("2.9%"),
        fontWeight: "600",
        marginTop: 3,
    },

    sessionInformation: {
        flexDirection: "row",
        marginTop: hp("1.5%"),
        gap: 10,
    },

    sessionItem: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F8FAFC",
        borderRadius: 16,
        padding: wp("3%"),
    },

    smallIconBox: {
        width: 34,
        height: 34,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginRight: wp("2%"),
    },

    infoLabel: {
        color: "#94A3B8",
        fontSize: wp("2.5%"),
        fontWeight: "600",
    },

    infoValue: {
        color: "#475569",
        fontSize: wp("2.9%"),
        fontWeight: "800",
        marginTop: 2,
    },

    resultBox: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: hp("1.3%"),
        paddingTop: hp("1.2%"),
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
    },

    resultItem: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: wp("5%"),
    },

    resultText: {
        color: "#64748B",
        fontSize: wp("2.9%"),
        fontWeight: "700",
        marginLeft: 5,
    },

    emptyCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 22,
        alignItems: "center",
        paddingVertical: hp("5%"),
        paddingHorizontal: wp("5%"),
        elevation: 2,
    },

    emptyTitle: {
        color: "#1E293B",
        fontSize: wp("4%"),
        fontWeight: "800",
        marginTop: hp("1.5%"),
    },

    emptyDescription: {
        color: "#94A3B8",
        fontSize: wp("3%"),
        fontWeight: "600",
        textAlign: "center",
        marginTop: hp("0.8%"),
        lineHeight: 20,
    },
});

export default TrainerTeachingHistory;