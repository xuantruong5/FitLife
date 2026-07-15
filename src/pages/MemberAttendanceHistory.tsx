import React, { useMemo, useRef, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";

type AttendanceStatus = "present" | "late" | "absent";

type AttendanceItem = {
    id: number;
    date: string;
    dayLabel: string;
    time: string;
    status: AttendanceStatus;
};

const formatDate = (date: Date) =>
    `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;

const createDemoHistory = (): AttendanceItem[] => {
    const dayNames = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
    const offsets = [0, -2, -4, -7, -10];
    const statuses: AttendanceStatus[] = ["present", "present", "late", "absent", "present"];

    return offsets.map((offset, index) => {
        const date = new Date();
        date.setHours(12, 0, 0, 0);
        date.setDate(date.getDate() + offset);
        return {
            id: index + 1,
            date: formatDate(date),
            dayLabel: dayNames[date.getDay()],
            time: index % 2 === 0 ? "07:00 - 08:00" : "17:30 - 18:30",
            status: statuses[index],
        };
    });
};

const demoHistory = createDemoHistory();

const statusConfig = {
    present: { label: "Có mặt", icon: "checkmark-circle", color: "#16A66A", background: "#EAF9F2" },
    late: { label: "Đi trễ", icon: "time", color: "#F59E0B", background: "#FFF7E6" },
    absent: { label: "Vắng", icon: "close-circle", color: "#EF5B5B", background: "#FFF0F0" },
};

const MemberAttendanceHistory = ({ navigation, route }: any) => {
    const member = route?.params?.member ?? {};
    const pageRef = useRef<ScrollView>(null);
    const [weekOffset, setWeekOffset] = useState(0);
    const today = formatDate(new Date());
    const [viewState, setViewState] = useState<{
        selectedDate: string;
        attendanceStatuses: Record<number, AttendanceStatus>;
    }>({
        selectedDate: today,
        attendanceStatuses: Object.fromEntries(demoHistory.map(item => [item.id, item.status])),
    });
    const { selectedDate, attendanceStatuses } = viewState;

    const calendarDays = useMemo(() => {
        const labels = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
        return Array.from({ length: 7 }, (_, index) => {
            const date = new Date();
            date.setHours(12, 0, 0, 0);
            date.setDate(date.getDate() - 3 + index + weekOffset * 7);
            const dateValue = formatDate(date);
            const attendance = demoHistory.find(item => item.date === dateValue);
            return { day: date.getDate(), date: dateValue, label: labels[date.getDay()], attendance };
        });
    }, [weekOffset]);

    const calendarMonth = calendarDays[3]?.date.split("/");

    const orderedHistory = useMemo(() => {
        const selected = demoHistory.filter(item => item.date === selectedDate);
        const remaining = demoHistory.filter(item => item.date !== selectedDate);
        return [...selected, ...remaining];
    }, [selectedDate]);

    const selectDate = (date: string) => {
        setViewState(value => ({ ...value, selectedDate: date }));
        pageRef.current?.scrollTo({ y: 500, animated: true });
    };

    const changeAttendance = (id: number, status: AttendanceStatus) => {
        setViewState(value => ({
            ...value,
            attendanceStatuses: { ...value.attendanceStatuses, [id]: status },
        }));
    };

    const attended = Number(member.used_sessions ?? 5);
    const total = Number(member.total_sessions ?? 12);
    const percent = total > 0 ? Math.min(100, Math.round((attended / total) * 100)) : 0;
    const displayedMonth = `${calendarMonth?.[1]}/${calendarMonth?.[2]}`;
    const presentThisMonth = demoHistory.filter(item =>
        item.date.endsWith(displayedMonth) &&
        (attendanceStatuses[item.id] === "present" || attendanceStatuses[item.id] === "late"),
    ).length;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color="#27364B" />
                </TouchableOpacity>
                <View style={styles.headerText}>
                    <Text style={styles.eyebrow}>TIẾN ĐỘ KHÓA HỌC</Text>
                    <Text style={styles.title}>Lịch sử tập</Text>
                </View>
                <View style={styles.iconPlaceholder} />
            </View>

            <ScrollView ref={pageRef} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.memberCard}>
                    <View style={styles.avatar}>
                        <Ionicons name="person" size={30} color="#FFFFFF" />
                    </View>
                    <View style={styles.memberInfo}>
                        <Text style={styles.memberName}>{member.member_name ?? "Nguyễn Văn An"}</Text>
                        <Text style={styles.packageName}>{member.package_name ?? "Gói Cơ Bản"}</Text>
                    </View>
                    <View style={styles.percentCircle}>
                        <Text style={styles.percentValue}>{percent}%</Text>
                    </View>
                </View>

                <View style={styles.summaryCard}>
                    <View style={styles.summaryTop}>
                        <View>
                            <Text style={styles.summaryLabel}>ĐÃ HOÀN THÀNH</Text>
                            <Text style={styles.sessionValue}>
                                {attended}<Text style={styles.sessionTotal}>/{total} buổi</Text>
                            </Text>
                        </View>
                        <View style={styles.remainingBadge}>
                            <Ionicons name="fitness-outline" size={16} color="#168FF0" />
                            <Text style={styles.remainingText}>Còn {Math.max(total - attended, 0)} buổi</Text>
                        </View>
                    </View>
                    <View style={styles.progressTrack}>
                        <View style={[styles.progressFill, { width: `${percent}%` }]} />
                    </View>
                </View>

                <View style={styles.calendarCard}>
                    <View style={styles.calendarTop}>
                        <View>
                            <Text style={styles.calendarTitle}>Tháng {calendarMonth?.[1]}/{calendarMonth?.[2]}</Text>
                            <Text style={styles.calendarSubtitle}>{presentThisMonth} buổi đã tập trong tháng</Text>
                        </View>
                        <View style={styles.calendarArrows}>
                            <TouchableOpacity style={styles.calendarArrow} onPress={() => setWeekOffset(value => value - 1)}>
                                <Ionicons name="chevron-back" size={19} color="#FFFFFF" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.calendarArrow} onPress={() => setWeekOffset(value => value + 1)}>
                                <Ionicons name="chevron-forward" size={19} color="#FFFFFF" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daysRow}>
                        {calendarDays.map(item => {
                            const selected = selectedDate === item.date;
                            const color = item.attendance ? statusConfig[item.attendance.status].color : "transparent";
                            return (
                                <TouchableOpacity key={item.date} style={[styles.dayButton, selected && styles.dayButtonSelected]} onPress={() => selectDate(item.date)}>
                                    <Text style={[styles.weekDay, selected && styles.weekDaySelected]}>{item.label}</Text>
                                    <Text style={[styles.calendarDate, selected && styles.calendarDateSelected]}>{item.day}</Text>
                                    <View style={[styles.attendanceDot, { backgroundColor: color }]} />
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                    <View style={styles.legendRow}>
                        <Text style={styles.legendText}><Text style={styles.presentDot}>●</Text> Có mặt</Text>
                        <Text style={styles.legendText}><Text style={styles.lateDot}>●</Text> Đi trễ</Text>
                        <Text style={styles.legendText}><Text style={styles.absentDot}>●</Text> Vắng</Text>
                    </View>
                </View>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Chi tiết buổi tập</Text>
                    <Text style={styles.demoLabel}>DỮ LIỆU MẪU</Text>
                </View>

                {orderedHistory.map(item => {
                    const currentStatus = attendanceStatuses[item.id];
                    const status = statusConfig[currentStatus];
                    const isSelected = item.date === selectedDate;
                    return (
                        <View key={item.id} style={[styles.historyCard, isSelected && styles.historyCardSelected]}>
                            <View style={styles.sessionTop}>
                                <View style={styles.sessionTime}>
                                    <Ionicons name="time-outline" size={18} color="#13A5EE" />
                                    <Text style={styles.sessionTimeText}>{item.time}</Text>
                                </View>
                                <View style={[styles.currentStatus, { backgroundColor: status.background }]}>
                                    <Text style={[styles.currentStatusText, { color: status.color }]}>{status.label}</Text>
                                </View>
                            </View>

                            <View style={styles.sessionBottom}>
                                <View style={styles.smallAvatar}>
                                    <Text style={styles.avatarLetter}>{(member.member_name ?? "Nguyễn Văn An").charAt(0)}</Text>
                                </View>
                                <View style={styles.sessionMember}>
                                    <Text style={styles.sessionMemberName}>{member.member_name ?? "Nguyễn Văn An"}</Text>
                                    <Text style={styles.sessionPackage}>{member.package_name ?? "Gói Cơ Bản"} · {item.date}</Text>
                                </View>
                                <View style={styles.actionButtons}>
                                    <TouchableOpacity
                                        style={[styles.attendanceButton, styles.presentButton, currentStatus === "present" && styles.activeButton]}
                                        onPress={() => changeAttendance(item.id, "present")}
                                    >
                                        <Text style={styles.attendanceButtonText}>Có mặt</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.attendanceButton, styles.lateButton, currentStatus === "late" && styles.activeButton]}
                                        onPress={() => changeAttendance(item.id, "late")}
                                    >
                                        <Text style={styles.attendanceButtonText}>Đi trễ</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.attendanceButton, styles.absentButton, currentStatus === "absent" && styles.activeButton]}
                                        onPress={() => changeAttendance(item.id, "absent")}
                                    >
                                        <Text style={styles.attendanceButtonText}>Vắng</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F4F7FB" },
    header: { flexDirection: "row", alignItems: "center", paddingHorizontal: wp("5%"), paddingVertical: hp("1.2%") },
    iconButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center", elevation: 2 },
    iconPlaceholder: { width: 44 },
    headerText: { flex: 1, alignItems: "center" },
    eyebrow: { color: "#98A5B5", fontSize: 11, fontWeight: "700", letterSpacing: 0.5 },
    title: { color: "#202733", fontSize: 22, fontWeight: "800", marginTop: 2 },
    scrollContent: { paddingHorizontal: wp("5%"), paddingBottom: hp("5%") },
    memberCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#168FF0", borderRadius: 24, padding: 18, marginTop: hp("1%"), elevation: 3 },
    avatar: { width: 58, height: 58, borderRadius: 29, backgroundColor: "rgba(255,255,255,0.22)", alignItems: "center", justifyContent: "center" },
    memberInfo: { flex: 1, marginLeft: 14 },
    memberName: { color: "#FFFFFF", fontSize: 19, fontWeight: "800" },
    packageName: { color: "rgba(255,255,255,0.8)", fontSize: 13, marginTop: 4 },
    percentCircle: { width: 55, height: 55, borderRadius: 28, borderWidth: 5, borderColor: "rgba(255,255,255,0.45)", backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center" },
    percentValue: { color: "#168FF0", fontSize: 14, fontWeight: "800" },
    summaryCard: { backgroundColor: "#FFFFFF", borderRadius: 22, padding: 18, marginTop: 14, elevation: 2 },
    summaryTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    summaryLabel: { color: "#94A1B1", fontSize: 11, fontWeight: "700" },
    sessionValue: { color: "#1F2937", fontSize: 30, fontWeight: "800", marginTop: 3 },
    sessionTotal: { color: "#7D8B9E", fontSize: 16, fontWeight: "600" },
    remainingBadge: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#EAF5FF", borderRadius: 18, paddingHorizontal: 12, paddingVertical: 8 },
    remainingText: { color: "#168FF0", fontSize: 12, fontWeight: "700" },
    progressTrack: { height: 9, borderRadius: 5, backgroundColor: "#E8EFF6", overflow: "hidden", marginTop: 16 },
    progressFill: { height: "100%", borderRadius: 5, backgroundColor: "#19B978" },
    calendarCard: { backgroundColor: "#13A5EE", borderRadius: 24, marginVertical: 18, paddingTop: 18, paddingBottom: 12, overflow: "hidden", elevation: 2 },
    calendarTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 18, marginBottom: 13 },
    calendarTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "800" },
    calendarSubtitle: { color: "rgba(255,255,255,0.8)", fontSize: 11, marginTop: 3 },
    calendarArrows: { flexDirection: "row", gap: 8 },
    calendarArrow: { width: 36, height: 34, borderRadius: 11, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" },
    daysRow: { paddingHorizontal: 9, gap: 3 },
    dayButton: { width: wp("11.3%"), height: 70, borderRadius: 16, alignItems: "center", justifyContent: "center" },
    dayButtonSelected: { backgroundColor: "#FFFFFF" },
    weekDay: { color: "rgba(255,255,255,0.75)", fontSize: 11, fontWeight: "600" },
    weekDaySelected: { color: "#7D8B9E" },
    calendarDate: { color: "#FFFFFF", fontSize: 18, fontWeight: "800", marginTop: 3 },
    calendarDateSelected: { color: "#1F2937" },
    attendanceDot: { width: 6, height: 6, borderRadius: 3, marginTop: 5 },
    legendRow: { flexDirection: "row", justifyContent: "center", gap: 15, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: "rgba(255,255,255,0.25)", marginTop: 10, paddingTop: 10 },
    legendText: { color: "#FFFFFF", fontSize: 10, fontWeight: "600" },
    presentDot: { color: "#16A66A" },
    lateDot: { color: "#F59E0B" },
    absentDot: { color: "#EF5B5B" },
    sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
    sectionTitle: { color: "#263345", fontSize: 17, fontWeight: "800" },
    demoLabel: { color: "#A0AABA", fontSize: 9, fontWeight: "700", backgroundColor: "#E9EDF3", paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8 },
    historyCard: { backgroundColor: "#FFFFFF", borderRadius: 20, padding: 15, marginBottom: 13, elevation: 2 },
    historyCardSelected: { borderWidth: 2, borderColor: "#13A5EE", backgroundColor: "#F5FBFF" },
    sessionTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "#E6EBF1" },
    sessionTime: { flexDirection: "row", alignItems: "center" },
    sessionTimeText: { color: "#27364B", fontSize: 15, fontWeight: "700", marginLeft: 7 },
    currentStatus: { borderRadius: 15, paddingHorizontal: 12, paddingVertical: 7 },
    currentStatusText: { fontSize: 11, fontWeight: "700" },
    sessionBottom: { flexDirection: "row", alignItems: "center", marginTop: 13 },
    smallAvatar: { width: 43, height: 43, borderRadius: 22, backgroundColor: "#13A5EE", alignItems: "center", justifyContent: "center" },
    avatarLetter: { color: "#FFFFFF", fontSize: 18, fontWeight: "800" },
    sessionMember: { flex: 1, marginLeft: 10 },
    sessionMemberName: { color: "#27364B", fontSize: 13, fontWeight: "800" },
    sessionPackage: { color: "#8A98A9", fontSize: 9, marginTop: 3 },
    actionButtons: { flexDirection: "row", gap: 5 },
    attendanceButton: { minWidth: 47, height: 34, borderRadius: 10, alignItems: "center", justifyContent: "center", paddingHorizontal: 6, opacity: 0.55 },
    presentButton: { backgroundColor: "#13A5EE" },
    lateButton: { backgroundColor: "#F59E0B" },
    absentButton: { backgroundColor: "#EF4444" },
    activeButton: { opacity: 1, transform: [{ scale: 1.04 }] },
    attendanceButtonText: { color: "#FFFFFF", fontSize: 10, fontWeight: "800" },
});

export default MemberAttendanceHistory;
