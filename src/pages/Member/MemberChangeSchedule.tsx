import { useEffect, useMemo, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import apiFitlife from "../../general/api";

const MemberChangeSchedule = ({ navigation, route }: any) => {
    const { id } = route.params;
    console.log("ID nhận được:", id);
    const [schedule, setSchedule] = useState<any>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [availableDates, setAvailableDates] = useState<any[]>([]);
    const [availableTimes, setAvailableTimes] = useState<any[]>([]);
    const [reason, setReason] = useState("");



    const weekDays = useMemo(() => {
        return (availableDates ?? []).map((item: any) => {
            const date = new Date(item.date);

            return {
                fullDate: date,
                dayName: [
                    "CN",
                    "T2",
                    "T3",
                    "T4",
                    "T5",
                    "T6",
                    "T7",
                ][date.getDay()],
                date: item.date,
            };
        });
    }, [availableDates]);


    const getChangeSchedule = async () => {
        try {
            const res = await apiFitlife.get(`/member/get-schedule/${id}`);
            console.log("Lịch hiện tại:", res.data);
            if (res.data.status) {
                const data = res.data.data;
                setSchedule(data);
                const schedules = data?.trainer_schedules ?? [];
                setAvailableDates(schedules);
                if (schedules.length > 0) {
                    const firstDate = new Date(schedules[0].date);
                    setSelectedDate(firstDate);
                    setAvailableTimes(
                        schedules.filter(
                            (item: any) => item.date === schedules[0].date
                        )
                    );
                } else {
                    setSelectedDate(null);
                    setAvailableTimes([]);
                }
            }
        } catch (error: any) {
            console.log("ERROR:", error);
            console.log("STATUS:", error?.response?.status);
            console.log(error?.response?.data);
        }
    };
    const handleChangeSchedule = async () => {
        try {
            const time = availableTimes.find(
                (item: any) => item.start_time === selectedTime
            );

            if (!time) {
                Alert.alert("Thông báo", "Vui lòng chọn khung giờ");
                return;
            }
            const body = {
                id_schedule: schedule.trainer_schedule_id,
                date: selectedDate?.toISOString().split("T")[0],
                start_time: selectedTime.substring(0, 5),
                end_time: time.end_time.substring(0, 5),
                reason: reason,
            };
            console.log(body);
            const res = await apiFitlife.post("/member/change-schedule", body);
            Alert.alert("Thông báo", res.data.message);
            if (res.data.status) {
                navigation.goBack();
            }
        } catch (error: any) {
            console.log("ERROR:", error);
            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);
            console.log("MESSAGE:", error.message);
            if (error.response?.status === 422) {
                const errors = error.response.data.errors;
                Object.values(errors).forEach((item: any) => {
                    Alert.alert("Lỗi", item[0]);
                });
            } else {
                console.log(error.response?.data);
            }
        }
    };
    useEffect(() => {
        getChangeSchedule();
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={22} color="#1E293B" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Đổi lịch tập</Text>
                    <View style={{ width: 42 }}></View>
                </View>

                <Text style={styles.currentTitle}>
                    Buổi tập hiện tại
                </Text>

                <View style={styles.currentCard}>
                    <View style={styles.rowItem}>
                        <Ionicons name="person-outline" size={18} color="#60A5FA" />
                        <Text style={styles.infoText}> {schedule?.trainer_name || "Đang tải..."} </Text>

                        <View style={styles.privateTag}>
                            <Text style={styles.privateText}>Private 1-1</Text>
                        </View>
                    </View>

                    <View style={styles.rowItem}>
                        <Ionicons name="calendar-outline" size={18} color="#CBD5E1" />
                        <Text style={styles.infoText}> {schedule?.date || "---"}</Text>
                    </View>

                    <View style={styles.rowItem}>
                        <Ionicons name="time-outline" size={18} color="#CBD5E1" />
                        <Text style={styles.infoText}>
                            {schedule?.start_time ? schedule.start_time.substring(0, 5) : "--:--"} - {schedule?.end_time ? schedule.end_time.substring(0, 5) : "--:--"}
                        </Text>
                    </View>
                </View>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        1. Chọn ngày mới
                    </Text>

                    <View style={styles.monthContainer}>
                        <View style={styles.monthBox}>
                            <Text style={styles.monthText}>
                                {selectedDate
                                    ? `Tháng ${selectedDate.getMonth() + 1} năm ${selectedDate.getFullYear()}`
                                    : "Đang chọn..."
                                }
                            </Text>
                        </View>
                    </View>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {weekDays.map((item, index) => {
                        // FIX LỖI: Chỉ so sánh toDateString() khi selectedDate không null
                        const active = selectedDate ? item.fullDate.toDateString() === selectedDate.toDateString() : false;

                        return (
                            <TouchableOpacity
                                key={index}
                                style={[styles.dayCard, active && styles.activeDay]}
                                onPress={() => {
                                    setSelectedDate(item.fullDate);
                                    const times = availableDates.filter((x: any) => x.date === item.date);
                                    setAvailableTimes(times);
                                    setSelectedTime("");
                                }}
                            >
                                <Text style={[styles.dayLabel, active && { color: "#fff" }]}>
                                    {item.dayName}
                                </Text>
                                <Text style={[styles.dayNumber, active && { color: "#fff" }]}>
                                    {item.fullDate.getDate()}
                                </Text>
                                <Text style={[styles.monthSmall, active && { color: "#fff" }]}>
                                    /{item.fullDate.getMonth() + 1}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                <Text style={[styles.sectionTitle, { marginTop: 25 }]}>
                    2. Chọn khung giờ mới
                </Text>
                <View style={styles.timeContainer}>
                    {/* Thêm Optional Chaining đề phòng availableTimes chưa kịp có dữ liệu */}
                    {availableTimes?.map((item: any) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.timeBtn, selectedTime === item.start_time && styles.activeTime]}
                            onPress={() => setSelectedTime(item.start_time)}
                        >
                            <Text style={[styles.timeText, selectedTime === item.start_time && { color: "#fff" }]}>
                                {item.start_time?.substring(0, 5)}
                                {" - "}
                                {item.end_time?.substring(0, 5)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={[styles.sectionTitle, { marginTop: 15 }]}>
                    3. Lý do đổi lịch
                </Text>
                <TextInput
                    style={styles.input}
                    multiline
                    placeholder="Nhập lý do đổi lịch..."
                    value={reason}
                    onChangeText={setReason}
                />

                <TouchableOpacity style={styles.submitBtn} onPress={handleChangeSchedule}>
                    <Text style={styles.submitText}>
                        Gửi yêu cầu đổi lịch
                    </Text>
                </TouchableOpacity>
                <Text style={styles.noteText}>
                    Lưu ý: Lịch sẽ chỉ chính thức thay đổi sau khi học viên nhấn{" "}
                    <Text style={styles.noteHighlight}>Đồng ý</Text>.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F8FC",
        paddingHorizontal: wp("5%"),
    },

    header: {
        flexDirection: "row",
        justifyContent:
            "space-between",
        alignItems: "center",
        marginTop: hp("1%"),
    },
    currentTitle: {
        marginTop: hp("2%"),
        marginBottom: 10,
        fontSize: wp("4%"),
        fontWeight: "700",
        color: "#1E293B",
    },

    currentCard: {
        backgroundColor: "#FFF",
        borderRadius: 20,
        padding: 16,
        elevation: 2,
    },

    rowItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 14,
    },

    infoText: {
        marginLeft: 10,
        fontSize: 14,
        color: "#64748B",
        fontWeight: "500",
    },

    privateTag: {
        marginLeft: "auto",
        backgroundColor: "#F8FAFC",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
    },

    privateText: {
        fontSize: 11,
        color: "#94A3B8",
        fontWeight: "600",
    },

    noteText: {
        textAlign: "center",
        color: "#94A3B8",
        fontSize: 13,
        marginTop: 5,
        marginBottom: 25,
        lineHeight: 20,
    },

    noteHighlight: {
        color: "#22C55E",
        fontWeight: "700",
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

    title: {
        fontSize: wp("5%"),
        fontWeight: "700",
        color: "#1E293B",
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: hp("1%"),
        marginBottom: 12,
    },

    monthContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: hp("3%"),
    },

    monthBox: {
        backgroundColor: "#FFF2D9",
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 25,
        marginHorizontal: 5,
    },

    monthText: {
        color: "#F5A623",
        fontWeight: "700",
        fontSize: wp("3.0%"),
    },

    sectionTitle: {
        marginTop: hp("3%"),
        marginBottom: 12,
        fontSize: wp("4%"),
        fontWeight: "700",
        color: "#1E293B",
    },

    dayCard: {
        width: wp("14%"),
        height: hp("8%"),
        backgroundColor: "#FFF",
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        elevation: 2,
    },

    activeDay: {
        backgroundColor: "#59B9FF",
    },

    dayLabel: {
        color: "#94A3B8",
        fontSize: 12,
    },

    dayNumber: {
        fontSize: 20,
        fontWeight: "700",
        color: "#1E293B",
    },

    monthSmall: {
        fontSize: 11,
        color: "#94A3B8",
    },

    timeContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent:
            "space-between",
    },

    timeBtn: {
        width: "23%",
        height: 50,
        borderRadius: 14,
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
        elevation: 2,
    },

    activeTime: {
        backgroundColor: "#59B9FF",
    },

    timeText: {
        color: "#475569",
        fontWeight: "600",
    },

    input: {
        backgroundColor: "#FFF",
        borderRadius: 18,
        minHeight: 90,
        padding: 15,
        textAlignVertical: "top",
    },

    submitBtn: {
        height: 55,
        backgroundColor: "#4DA3FF",
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 40,
    },

    submitText: {
        color: "#FFF",
        fontWeight: "700",
        fontSize: 16,
    },
})

export default MemberChangeSchedule;