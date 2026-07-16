import { SafeAreaView } from "react-native-safe-area-context"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from "react";
import apiFitlife from "../general/api";


const getWeekDays = (weekOffset = 0) => {
    const today = new Date();
    const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    const weekDays = [];
    for (let i = -3; i <= 3; i++) {
        const date = new Date();
        date.setDate(today.getDate() + i + weekOffset * 7);
        weekDays.push({
            day: dayNames[date.getDay()],
            date: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
            fullDate: date,
            isToday:
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear(),
        });
    }
    return weekDays;

}
const Attendance = ({ navigation }: any) => {
    const [weekOffset, setWeekOffset] = useState(0);
    const weekDays = getWeekDays(weekOffset);
    const [selectedDate, setSelectedDate] = useState(new Date().getDate());
    const currentMonth = weekDays[3]?.month;
    const currentYear = weekDays[3]?.year;




    const [schedules, setSchedules] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const getTodaySchedules = async (date?: string) => {
        try {
            setLoading(true);

            const res = await apiFitlife.get("/trainer/today-schedules", {
                params: date ? { date } : {},
            });

            if (res.data.status) {
                setSchedules(res.data.data);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };
    const changeAttendance = async (
        id_schedule_member: number,
        status: number
    ) => {
        try {
            const res = await apiFitlife.post("/trainer/change/attendances",
                {
                    id_schedule_member,
                    status,
                }
            );

            if (res.data.status) {
                // load lại danh sách
                getTodaySchedules();
            }
        } catch (error) {
            console.log(error);
        }
    };








    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        getTodaySchedules();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={styles.headerTop}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={22} color="#fff" ></Ionicons>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}> Điểm danh ca tập</Text>

                        <View style={styles.calendarControl}>
                            <View style={styles.arrowRow}>
                                <TouchableOpacity
                                    style={styles.countBox}
                                    onPress={() => setWeekOffset(weekOffset - 1)}
                                >
                                    <Ionicons
                                        name="chevron-back"
                                        size={18}
                                        color="#fff"
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.countBox, { marginLeft: 8 }]}
                                    onPress={() => setWeekOffset(weekOffset + 1)}
                                >
                                    <Ionicons
                                        name="chevron-forward"
                                        size={18}
                                        color="#fff"
                                    />
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.monthText}>
                                {selectedDate}/{currentMonth}/{currentYear}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.calendarRow}>
                        {weekDays.map((item, index) => (
                            <TouchableOpacity key={index} onPress={() => { setSelectedDate(item.date); const date = `${item.year}-${String(item.month).padStart(2, "0")}-${String(item.date).padStart(2, "0")}`; getTodaySchedules(date); }}
                                style={[styles.dayItem, selectedDate === item.date && styles.dayItemActive]}>
                                <Text
                                    style={[
                                        styles.dayText,
                                        selectedDate === item.date && {
                                            color: "#4BA3F5",
                                        },
                                    ]}
                                >
                                    {item.day}
                                </Text>

                                <Text
                                    style={[
                                        styles.dateText,
                                        selectedDate === item.date && {
                                            color: "black",
                                        },
                                    ]}
                                >
                                    {item.date}
                                </Text>
                                {item.isToday && (
                                    <View style={styles.todayDot} />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <View style={styles.content}>
                    <Text style={styles.dateLabel}>
                        Hôm Nay {selectedDate}/{currentMonth}/{currentYear}
                    </Text>

                    <Text style={styles.sectionTitle}>
                        {schedules.length} ca tập
                    </Text>

                    {schedules.map((item: any) => {
                        const member = item.schedule_members?.[0]?.member;
                        const attendance = item.schedule_members?.[0]?.attendance;

                        return (
                            <View key={item.id} style={styles.card}>
                                <View style={styles.timeRow}>
                                    <View style={styles.timeLeft}>
                                        <Ionicons
                                            name="time-outline"
                                            size={16}
                                            color="#4BA3F5"
                                        />

                                        <Text style={styles.timeText}>
                                            {item.start_time.substring(0, 5)} - {item.end_time.substring(0, 5)}
                                        </Text>
                                    </View>

                                    {attendance?.status === 1 ? (
                                        <TouchableOpacity style={styles.doneBadge}>
                                            <Text style={styles.doneText}>
                                                Đã điểm danh
                                            </Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity style={styles.waitBadge}>
                                            <Text style={styles.waitText}>
                                                Chờ điểm danh
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                </View>

                                <View style={styles.userRow}>
                                    <View
                                        style={[
                                            styles.avatar,
                                            { backgroundColor: "#4BA3F5" },
                                        ]}
                                    >
                                        <Text style={styles.avatarText}>
                                            {member?.name?.charAt(0)}
                                        </Text>
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.name}>
                                            {member?.name}
                                        </Text>

                                        <Text style={styles.note}>
                                            {item.package?.name}
                                        </Text>
                                    </View>

                                    {attendance?.status === 1 ? (
                                        <TouchableOpacity style={styles.presentBadge}>
                                            <Text style={styles.presentText}>✓ Có mặt</Text>
                                        </TouchableOpacity>
                                    ) : attendance?.status === 2 ? (
                                        <TouchableOpacity
                                            style={[styles.presentBadge, { backgroundColor: "#FDECEC" }]}
                                        >
                                            <Text style={[styles.presentText, { color: "#E74C3C" }]}>
                                                ✕ Vắng
                                            </Text>
                                        </TouchableOpacity>
                                    ) : attendance?.status === 3 ? (
                                        <TouchableOpacity
                                            style={[styles.presentBadge, { backgroundColor: "#FFF4E5" }]}
                                        >
                                            <Text style={[styles.presentText, { color: "#F39C12" }]}>
                                                ⏰ Đi trễ
                                            </Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <View style={{ flexDirection: "row" }}>
                                            <TouchableOpacity
                                                style={styles.confirmBtn}
                                                onPress={() =>
                                                    changeAttendance(item.schedule_members[0].id, 1)
                                                }
                                            >
                                                <Text style={styles.confirmText}>Có mặt</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={[
                                                    styles.confirmBtn,
                                                    { backgroundColor: "#F39C12", marginLeft: 6 },
                                                ]}
                                                onPress={() =>
                                                    changeAttendance(item.schedule_members[0].id, 3)
                                                }
                                            >
                                                <Text style={styles.confirmText}>Đi trễ</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={[
                                                    styles.confirmBtn,
                                                    { backgroundColor: "#E74C3C", marginLeft: 6 },
                                                ]}
                                                onPress={() =>
                                                    changeAttendance(item.schedule_members[0].id, 2)
                                                }
                                            >
                                                <Text style={styles.confirmText}>Vắng</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F6FA",
    },

    header: {
        backgroundColor: "#4BA3F5",
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        paddingHorizontal: wp("5%"),
        paddingTop: hp("2%"),
        paddingBottom: hp("3%"),
    },

    headerTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: hp("3%"),
    },

    headerTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },

    countBox: {
        backgroundColor: "rgba(255,255,255,0.25)",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
    },

    countText: {
        color: "#fff",
        fontWeight: "600",
    },

    calendarRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    dayItem: {
        alignItems: "center",
    },

    dayItemActive: {
        backgroundColor: "#fff",
        width: 40,
        height: 55,
        borderRadius: 15,
        justifyContent: "center",
    },

    dayText: {
        color: "#DDEEFF",
        fontSize: 11,
    },

    dateText: {
        color: "#fff",
        fontWeight: "700",
        marginTop: 2,
    },

    content: {
        padding: wp("4%"),
    },

    dateLabel: {
        color: "#999",
        fontSize: 12,
    },

    sectionTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "#222",
        marginTop: 5,
        marginBottom: 15,
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 18,
        padding: 15,
        marginBottom: 15,
        elevation: 4,
    },

    timeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },

    timeLeft: {
        flexDirection: "row",
        alignItems: "center",
    },

    timeText: {
        marginLeft: 5,
        fontWeight: "600",
        color: "#444",
    },

    doneBadge: {
        backgroundColor: "#DDF7E7",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    },

    doneText: {
        color: "#2ECC71",
        fontSize: 11,
        fontWeight: "600",
    },

    waitBadge: {
        backgroundColor: "#F0F0F0",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    },

    waitText: {
        color: "#999",
        fontSize: 11,
    },

    userRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    avatar: {
        width: 38,
        height: 38,
        borderRadius: 19,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },

    avatarText: {
        color: "#fff",
        fontWeight: "bold",
    },

    name: {
        fontSize: 14,
        fontWeight: "700",
        color: "#333",
    },

    note: {
        fontSize: 12,
        color: "#999",
        marginTop: 2,
    },

    presentBadge: {
        backgroundColor: "#DDF7E7",
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 15,
    },

    presentText: {
        color: "#2ECC71",
        fontSize: 11,
        fontWeight: "600",
    },

    confirmBtn: {
        backgroundColor: "#4BA3F5",
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 12,
    },

    confirmText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
    },
    calendarControl: {
        alignItems: "center",
        marginTop: 13
    },

    arrowRow: {
        flexDirection: "row",
    },

    monthText: {
        color: "#fff",
        fontSize: 11,
        marginTop: 4,
    },
    todayDot: {
        position: "absolute",
        bottom: 1,
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#4BA3F5",
    },
});
export default Attendance;