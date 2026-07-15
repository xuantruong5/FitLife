import React, { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from "react-native-responsive-screen";
import apiFitlife from "../general/api";


const MemberAttendanceHistory = ({ navigation, route }: any) => {
    const { member } = route.params;
    console.log("member =", member);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const totalDays = new Date(year, month + 1, 0).getDate();
        return Array.from({ length: totalDays }, (_, i) => {
            const d = new Date(year, month, i + 1);
            return {
                fullDate: d,
                day: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"][d.getDay()],
                date: d.getDate(),
                active:
                    d.toDateString() === selectedDate.toDateString(),
            };
        });
    };
    const days = getDaysInMonth(currentMonth);
    const nextMonth = () => {
        setCurrentMonth(
            new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth() + 1,
                1
            )
        );
    };
    const previousMonth = () => {
        setCurrentMonth(
            new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth() - 1,
                1
            )
        );
    };
    const [schedules, setSchedules] = useState<any[]>([]);
    const formatDate = (date: Date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const d = String(date.getDate()).padStart(2, "0");

        return `${y}-${m}-${d}`;
    };
    const getSchedules = async (date: Date) => {
        try {
            const response = await apiFitlife.get("/trainer/member-schedules", {
                params: {
                    date: formatDate(date),
                    id_member: member.id_member,
                },
            });
            console.log(JSON.stringify(response.data.data, null, 2));

            if (response.data.status) {
                setSchedules(response.data.data);
            }

        } catch (error) {
            console.log(error);
        }
    };
    const changeAttendance = async (
        id_schedule_member: number,
        status: number
    ) => {
        try {
            const res = await apiFitlife.post(
                "/trainer/change/attendances",
                {
                    id_schedule_member,
                    status,
                }
            );

            if (res.data.status) {
                getSchedules(selectedDate);
            }

        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getSchedules(selectedDate);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={26} color="#233047" />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.smallTitle}>
                            TIẾN ĐỘ KHÓA HỌC
                        </Text>
                        <Text style={styles.title}>Lịch tập</Text>
                    </View>
                    <View style={{ width: 45 }} />
                </View>
                <View style={styles.memberCard}>
                    <View style={styles.avatar}>
                        <Ionicons name="person" size={42} color="#fff" />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.memberName}>
                            {member.member_name}
                        </Text>
                        <Text style={styles.package}>
                            {member.package_name}
                        </Text>
                    </View>
                    <View style={styles.percentCircle}>
                        <Text style={styles.percent}>0%</Text>
                    </View>
                </View>
                <View style={styles.progressCard}>
                    <View style={styles.row}>
                        <View>
                            <Text style={styles.gray}>
                                ĐÃ HOÀN THÀNH
                            </Text>

                            <Text style={styles.count}>
                                {member.present_sessions}
                                <Text style={styles.total}>
                                    /{member.total_sessions}buổi
                                </Text>
                            </Text>
                        </View>
                        <View style={styles.leftTag}>
                            <Ionicons
                                name="fitness-outline"
                                color="#1E88E5"
                                size={18}
                            />
                            <Text style={styles.leftText}>
                                Đã Tập {member.present_sessions}  Buổi
                            </Text>
                        </View>
                    </View>
                    <View style={styles.progress}>
                        <View style={[styles.progressValue, { width: "0%" }]} />
                    </View>
                </View>
                <View style={styles.calendarCard}>
                    <View style={styles.rowBetween}>
                        <View>
                            <Text style={styles.month}>
                                Tháng {currentMonth.getMonth() + 1}/{currentMonth.getFullYear()}
                            </Text>
                            <Text style={styles.monthSub}>
                                4 buổi đã tập trong tháng
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity
                                style={styles.arrow}
                                onPress={previousMonth}
                            >
                                <Ionicons
                                    name="chevron-back"
                                    color="#fff"
                                    size={22}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.arrow}
                                onPress={nextMonth}
                            >
                                <Ionicons
                                    name="chevron-forward"
                                    color="#fff"
                                    size={22}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.weekRow}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingVertical: 10 }}
                        >
                            {days.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => { setSelectedDate(item.fullDate); getSchedules(item.fullDate); }}
                                    style={[
                                        styles.dayBox,
                                        item.active && styles.activeDay,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.day,
                                            item.active && { color: "#6B7280" },
                                        ]}
                                    >
                                        {item.day}
                                    </Text>

                                    <Text
                                        style={[
                                            styles.date,
                                            item.active && { color: "#1E293B" },
                                        ]}
                                    >
                                        {item.date}
                                    </Text>

                                    <View style={styles.dot} />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                    <View style={styles.legend}>
                        <Text style={styles.legendItem}>
                            🟢 Có mặt
                        </Text>

                        <Text style={styles.legendItem}>
                            🟡 Đi trễ
                        </Text>

                        <Text style={styles.legendItem}>
                            🔴 Vắng
                        </Text>
                    </View>
                </View>

                <View style={styles.titleRow}>
                    <Text style={styles.detailTitle}>
                        Chi tiết buổi tập
                    </Text>

                    <View style={styles.demo}>
                        <Text style={styles.demoText}>
                            LỊCH TẬP
                        </Text>
                    </View>
                </View>

                {schedules.map((item) => (

                    <View key={item.id} style={styles.scheduleCard}>

                        <View style={styles.rowBetween}>

                            <View style={styles.row}>
                                <Ionicons name="time-outline" color="#2196F3" size={22} />
                                <Text style={styles.time}>
                                    {item.schedule_start.substring(0, 5)} - {item.schedule_end.substring(0, 5)}
                                </Text>
                            </View>

                            <View style={styles.status}>
                                <Text style={styles.statusText}>
                                    {item.attendance_status == 1
                                        ? "Có mặt"
                                        : item.attendance_status == 2
                                            ? "Đi trễ"
                                            : item.attendance_status == 3
                                                ? "Vắng"
                                                : "Chưa điểm danh"}
                                </Text>
                            </View>

                        </View>

                        <View style={styles.divider} />

                        <View style={styles.rowBetween}>

                            <View style={styles.row}>

                                <View style={styles.avatarSmall}>
                                    <Text style={styles.avatarText}>
                                        N
                                    </Text>
                                </View>

                                <View>

                                    <Text style={styles.name}>
                                        {item.member_name}
                                    </Text>

                                    <Text style={styles.info}>
                                        {item.package_name} · {item.schedule_date_format}
                                    </Text>

                                </View>

                            </View>

                            <View style={styles.actionRow}>

                                <TouchableOpacity style={styles.present} onPress={() => {
        console.log("item =", item);
        console.log("id_schedule_member =", item.id_schedule_member);

        changeAttendance(item.id, 1);
    }}>
                                    <Text style={styles.actionText}>
                                        Có mặt
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.late} onPress={() => changeAttendance(item.id, 2)}>
                                    <Text style={styles.actionText}>
                                        Đi trễ
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.absent} onPress={() => changeAttendance(item.id, 3)}>
                                    <Text style={styles.actionText}>
                                        Vắng
                                    </Text>
                                </TouchableOpacity>

                            </View>

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
        backgroundColor: "#F4F6F8",
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: wp(5),
        marginTop: hp(2),
    },

    back: {
        width: 40,
        height: 40,
        backgroundColor: "#fff",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
    },

    smallTitle: {
        textAlign: "center",
        color: "#94A3B8",
        fontWeight: "700",
    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1E293B",
        textAlign: "center",
    },

    memberCard: {
        margin: wp(5),
        backgroundColor: "#1E88E5",
        borderRadius: 25,
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        elevation: 6,
    },

    avatar: {
        width: 58,
        height: 58,
        borderRadius: 44,
        backgroundColor: "#4FA9EF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 20,
    },

    memberName: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },

    package: {
        color: "#E3F2FD",
        fontSize: 15,
        marginTop: 4,
    },

    percentCircle: {
        width: 52,
        height: 52,
        borderRadius: 41,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },

    percent: {
        color: "#1E88E5",
        fontWeight: "bold",
        fontSize: 18,
    },

    progressCard: {
        backgroundColor: "#fff",
        marginHorizontal: wp(5),
        borderRadius: 25,
        padding: 14,
        elevation: 4,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
    },

    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    gray: {
        color: "#94A3B8",
        fontWeight: "700",
    },

    count: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1E293B",
    },

    total: {
        fontSize: 18,
        color: "#94A3B8",
    },

    leftTag: {
        flexDirection: "row",
        backgroundColor: "#E8F2FF",
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 30,
        alignItems: "center",
    },

    leftText: {
        color: "#1E88E5",
        marginLeft: 8,
        fontWeight: "700",
    },

    progress: {
        height: 10,
        backgroundColor: "#EDF2F7",
        borderRadius: 10,
        marginTop: 20,
    },

    progressValue: {
        height: 10,
        backgroundColor: "#1E88E5",
        borderRadius: 10,
    },

    calendarCard: {
        backgroundColor: "#1E9AE8",
        margin: wp(5),
        borderRadius: 25,
        padding: 22,
    },

    month: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },

    monthSub: {
        color: "#E0F2FE",
    },

    arrow: {
        width: 30,
        height: 30,
        backgroundColor: "#5DB8F3",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
    },

    weekRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 25,
    },

    dayBox: {
        alignItems: "center",
        padding: 10,
        borderRadius: 20,
    },

    activeDay: {
        backgroundColor: "#fff",
    },

    day: { color: "#fff" },

    date: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },

    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#34C759",
        marginTop: 8,
    },

    legend: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },

    legendItem: {
        color: "#fff",
        marginHorizontal: 8,
        fontSize: 12,
    },

    titleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: wp(5),
        marginBottom: 10,
    },

    detailTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },

    demo: {
        backgroundColor: "#EEF2F7",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },

    demoText: {
        color: "#94A3B8",
        fontWeight: "700",
    },

    scheduleCard: {
        backgroundColor: "#fff",
        marginHorizontal: wp(5),
        marginBottom: 18,
        borderRadius: 22,
        padding: 18,
        elevation: 4,
    },

    divider: {
        height: 1,
        backgroundColor: "#EEF2F7",
        marginVertical: 16,
    },

    time: {
        fontSize: 16,
        fontWeight: "700",
        marginLeft: 10,
    },

    status: {
        backgroundColor: "#E7F8EC",
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 20,
    },

    statusText: {
        color: "#0F9D58",
        fontWeight: "700",
    },

    avatarSmall: {
        width: 40,
        height: 40,
        borderRadius: 25,
        backgroundColor: "#2196F3",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    avatarText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 20,
    },

    name: {
        fontWeight: "700",
        fontSize: 15,
    },

    info: {
        color: "#94A3B8",
        marginTop: 4,
    },

    actionRow: {
        flexDirection: "row",
    },

    present: {
        backgroundColor: "#2196F3",
        paddingHorizontal: 9,
        paddingVertical: 9,
        borderRadius: 12,
        marginLeft: 8,
    },

    late: {
        backgroundColor: "#F8C25C",
        paddingHorizontal: 9,
        paddingVertical: 9,
        borderRadius: 12,
        marginLeft: 8,
    },

    absent: {
        backgroundColor: "#EF8F94",
        paddingHorizontal: 9,
        paddingVertical: 9,
        borderRadius: 12,
        marginLeft: 8,
    },

    actionText: {
        color: "#fff",
        fontWeight: "bold",
    },
})


export default MemberAttendanceHistory;
