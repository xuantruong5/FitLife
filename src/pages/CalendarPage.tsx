import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";


const Calendar = ({ navigation }: any) => {

    const [currentDate, setCurrentDate] = useState(new Date());

    const [selectedDate, setSelectedDate] = useState(currentDate.toDateString());
    const [viewMode, setViewMode] = useState("week");

    const weekDays = useMemo(() => {
        // Lấy thứ hiện tại (0 = CN, 1 = T2, ...)
        const currentDay = currentDate.getDay();

        // Tìm ngày thứ Hai của tuần hiện tại
        const monday = new Date(currentDate);

        if (currentDay === 0) {
            // Nếu hôm nay là Chủ Nhật
            monday.setDate(currentDate.getDate() - 6);
        } else {
            monday.setDate(currentDate.getDate() - currentDay + 1);
        }

        const days = [];

        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(monday);
            currentDate.setDate(monday.getDate() + i);

            days.push({
                label: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"][i],
                date: currentDate.getDate(),
                fullDate: currentDate,
            });
        }

        return days;
    }, [currentDate]);

    const changeDay = (step: number) => {
        const newDate = new Date(currentDate);
        newDate.setDate(
            newDate.getDate() + step
        );
        setCurrentDate(newDate);
    };
    const changeMonth = (step: number) => {
        const newDate = new Date(currentDate);

        newDate.setMonth(
            newDate.getMonth() + step
        );

        setCurrentDate(newDate);
    };
    const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={22} color="#1E293B" />
                </TouchableOpacity>
                <Text style={styles.title}>
                    Lịch dạy
                </Text>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={viewMode === "day" ? styles.activeTab : styles.tab}
                    onPress={() => setViewMode("day")}
                >
                    <Text
                        style={
                            viewMode === "day"
                                ? styles.activeTabText
                                : styles.tabText
                        }
                    >
                        Ngày
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={viewMode === "week" ? styles.activeTab : styles.tab}
                    onPress={() => setViewMode("week")}
                >
                    <Text
                        style={
                            viewMode === "week"
                                ? styles.activeTabText
                                : styles.tabText
                        }
                    >
                        Tuần
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={viewMode === "month" ? styles.activeTab : styles.tab}
                    onPress={() => setViewMode("month")}
                >
                    <Text
                        style={
                            viewMode === "month"
                                ? styles.activeTabText
                                : styles.tabText
                        }
                    >
                        Tháng
                    </Text>
                </TouchableOpacity>
            </View>

            {viewMode === "week" && (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.weekContainer}
                >
                    {weekDays.map((item, index) => {
                        const active = selectedDate === item.fullDate.toDateString();

                        return (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.dayCard,
                                    active && styles.activeDayCard,
                                ]}
                                onPress={() => {
                                    setSelectedDate(item.fullDate.toDateString());
                                    setCurrentDate(item.fullDate);
                                }}>
                                <Text style={[styles.dayLabel, active && { color: "#fff" },]}>
                                    {item.label}
                                </Text>
                                <Text style={[styles.dayNumber, active && { color: "#fff" },]}>
                                    {item.date}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            )}
            {viewMode === "month" && (
                <View style={styles.monthContainer}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
                        <TouchableOpacity onPress={() => changeMonth(-1)}>
                            <Ionicons name="chevron-back" size={24} color="#1E293B" />
                        </TouchableOpacity>
                        <Text style={styles.monthTitle}>
                            Tháng {currentDate.getMonth() + 1}/{currentDate.getFullYear()}
                        </Text>
                        <TouchableOpacity onPress={() => changeMonth(1)}>
                            <Ionicons name="chevron-forward" size={24} color="#1E293B" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.monthGrid}>
                        {Array.from({ length: daysInMonth }, (_, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.monthDay}
                            >
                                <Text style={styles.monthDayText}>
                                    {index + 1}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            )}
            {viewMode === "day" && (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginHorizontal: wp("5%"),
                        marginTop: 20,
                    }}
                >
                    <TouchableOpacity onPress={() => changeDay(-1)}>
                        <Ionicons
                            name="chevron-back"
                            size={22}
                            color="#1E293B"
                        />
                    </TouchableOpacity>

                    <Text style={{ fontSize: 16, fontWeight: "700" }}>
                        {currentDate.toLocaleDateString("vi-VN")}
                    </Text>

                    <TouchableOpacity onPress={() => changeDay(1)}>
                        <Ionicons
                            name="chevron-forward"
                            size={22}
                            color="#1E293B"
                        />
                    </TouchableOpacity>
                </View>
            )}

            <ScrollView>
                <View style={{ paddingBottom: 50, marginTop: 20 }}>
                    {[
                        "07:00",
                        "08:00",
                        "09:00",
                        "10:00",
                        "11:00",
                        "12:00",
                        "13:00",
                        "14:00",
                        "15:00",
                        "16:00",
                        "17:00",
                        "18:00",
                    ].map((hour, index) => (
                        <View key={index} style={styles.timeRow}>
                            <Text style={styles.timeText}>
                                {hour}
                            </Text>
                        </View>
                    ))}
                    <View style={[styles.eventCard, { top: 95, backgroundColor: "#2CCB8F" }]}>
                        <Text style={styles.eventTitle}>
                            Dạy Private - Nguyễn Văn A
                        </Text>
                        <Text
                            style={styles.eventTime}
                        >
                            08:00 - 09:00
                        </Text>
                    </View>
                    <View
                        style={[
                            styles.eventCard,
                            { top: 575, backgroundColor: "#FF9448", },]}>
                        <Text
                            style={styles.eventTitle}
                        >
                            Lớp Yoga Cơ bản
                        </Text>
                        <Text
                            style={styles.eventTime}>14:00 - 15:00
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
        backgroundColor: "#F7F8FC",
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: wp("5%"),
        paddingTop: hp("1%"),
    },

    backBtn: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
    },

    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#1E293B",

    },

    tabContainer: {
        flexDirection: "row",
        backgroundColor: "#ECEFF6",
        marginHorizontal: wp("5%"),
        marginTop: hp("2%"),
        borderRadius: 18,
        padding: 4,
    },

    tab: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 12,
    },

    activeTab: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 15,
        alignItems: "center",
        paddingVertical: 12,
    },

    tabText: {
        color: "#94A3B8",
    },

    activeTabText: {
        color: "#4DA3FF",
        fontWeight: "700",
    },

    weekContainer: {
        paddingHorizontal: wp("5%"),
        paddingVertical: hp("2%"),
    },

    dayCard: {
        width: 50,
        height: 65,
        backgroundColor: "#fff",
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        elevation: 2,
    },

    activeDayCard: {
        backgroundColor: "#59B9FF",
    },

    dayLabel: {
        color: "#94A3B8",
        fontSize: 10,
    },

    dayNumber: {
        fontSize: 20,
        fontWeight: "700",
        color: "#1E293B",
    },

    timeRow: {
        flexDirection: "row",
        height: 80,
        paddingHorizontal: wp("5%"),
    },

    timeText: {
        width: 45,
        color: "#B6C0D1",
        fontSize: 12,
    },

    line: {
        flex: 1,
        height: 1,
        backgroundColor: "#E5EAF3",
        marginTop: 8,
        marginLeft: 10,
    },

    eventCard: {
        position: "absolute",
        left: 70,
        right: 20,
        height: 60,
        borderRadius: 16,
        justifyContent: "center",
        paddingHorizontal: 15,
    },

    eventTitle: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 14,
    },

    eventTime: {
        color: "#fff",
        fontSize: 12,
        marginTop: 4,
    },
    monthContainer: {
        paddingHorizontal: wp("5%"),
        paddingTop: 20,
    },

    monthTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1E293B",
        marginBottom: 15,
    },

    monthGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    monthDay: {
        width: "13%",
        aspectRatio: 1,
        backgroundColor: "#fff",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        elevation: 2,
    },

    monthDayText: {
        fontSize: 16,
        fontWeight: "600",
    },
})
export default Calendar;