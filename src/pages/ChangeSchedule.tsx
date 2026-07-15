import { useEffect, useMemo, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiFitlife from "../general/api";

const ChangeSchedule = ({ navigation, route }: any) => {
    const { schedule } = route.params;
    const [trainer, setTrainer] = useState<any>(null); // lay ten tu token 

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedEndTime, setSelectedEndTime] = useState("");
    const [reason, setReason] = useState("");
    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };





    const changeWeek = (direction: number) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() + direction * 7);
        setSelectedDate(newDate);
    };
    const weekDays = useMemo(() => {
        // Thứ trong tuần hiện tại (0 = CN, 1 = T2, ...)
        const currentDay = selectedDate.getDay();
        // Tìm ngày thứ 2 của tuần hiện tại
        const monday = new Date(selectedDate);
        if (currentDay === 0) {
            // Nếu là Chủ Nhật thì lùi 6 ngày
            monday.setDate(monday.getDate() - 6);
        } else {
            // Các ngày còn lại lùi về thứ 2
            monday.setDate(monday.getDate() - currentDay + 1);
        }
        const result = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(monday);
            date.setDate(monday.getDate() + i);
            result.push({
                fullDate: date,
                dayName: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"][i],
            });
        }
        return result;
    }, [selectedDate]);

    const times = [
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
    ];


    const handleChangeSchedule = async () => {

        if (!selectedTime) {
            Alert.alert("Vui lòng chọn giờ mới");
            return;
        }

        if (!reason) {
            Alert.alert("Vui lòng nhập lý do");
            return;
        }


        try {

            const payload = {
                old_schedule_id: schedule.id,

                date: formatDate(selectedDate),

                start_time: selectedTime + ":00",

                end_time:
                    `${String(parseInt(selectedTime) + 1).padStart(2, "0")}:00:00`,

                reason: reason
            };


            console.log("DATA SEND:", payload);


            const res = await apiFitlife.post(
                "/trainer/change-schedule",
                payload
            );


            if (res.data.success) {

                Alert.alert("Gửi yêu cầu đổi lịch thành công");

                navigation.goBack();

            }


        } catch (error: any) {

            console.log(
                error.response?.data || error
            );

            Alert.alert(
                error.response?.data?.message ||
                "Đổi lịch thất bại"
            );

        }

    };
    useEffect(() => {
        const loadTrainer = async () => {
            const data = await AsyncStorage.getItem("user");
            if (data) {
                const user = JSON.parse(data);
                setTrainer(user);
            }
        };
        loadTrainer();
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
                        <Text style={styles.infoText}>{trainer?.name}</Text>

                        <View style={styles.privateTag}>
                            <Text style={styles.privateText}>{schedule.title}</Text>
                        </View>
                    </View>

                    <View style={styles.rowItem}>
                        <Ionicons name="calendar-outline" size={18} color="#CBD5E1" />
                        <Text style={styles.infoText}> {new Date(schedule.date).toLocaleDateString("vi-VN")}</Text>
                    </View>

                    <View style={styles.rowItem}>
                        <Ionicons name="time-outline" size={18} color="#CBD5E1" />
                        <Text style={styles.infoText}>
                            {schedule.start_time.substring(0, 5)} - {schedule.end_time.substring(0, 5)}
                        </Text>
                    </View>
                </View>


                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        1. Chọn ngày mới
                    </Text>

                    <View style={styles.monthContainer}>
                        <TouchableOpacity onPress={() => changeWeek(-1)}>
                            <Ionicons name="chevron-back" size={15} color="#F5A623" />
                        </TouchableOpacity>

                        <View style={styles.monthBox}>
                            <Text style={styles.monthText}>
                                Tháng{" "} {selectedDate.getMonth() + 1} {" "} năm{" "} {selectedDate.getFullYear()}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => changeWeek(1)}>
                            <Ionicons name="chevron-forward" size={15} color="#F5A623" />
                        </TouchableOpacity>
                    </View>

                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {weekDays.map(
                        (
                            item, index
                        ) => {
                            const active = item.fullDate.toDateString() === selectedDate.toDateString();
                            return (
                                <TouchableOpacity key={index} style={[styles.dayCard, active && styles.activeDay]} onPress={() => setSelectedDate(item.fullDate)}>
                                    <Text style={[styles.dayLabel, active && { color: "#fff" }]}>
                                        {item.dayName}
                                    </Text>
                                    <Text style={[styles.dayNumber, active && { color: "#fff", },]}>
                                        {item.fullDate.getDate()}
                                    </Text>

                                    <Text style={[styles.monthSmall, active && { color: "#fff", },]}>
                                        /
                                        {item.fullDate.getMonth() + 1}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }
                    )}
                </ScrollView>

                <Text style={[styles.sectionTitle, { marginTop: 25 }]}>
                    2. Chọn khung giờ mới
                </Text>
                <View style={styles.timeContainer}>
                    {times.map((time) => (
                        <TouchableOpacity key={time} style={[styles.timeBtn, selectedTime === time && styles.activeTime]} onPress={() =>  {setSelectedTime(time);}}>
                            <Text style={[styles.timeText, selectedTime === time && { color: "#fff" }]}>
                                {time}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={[styles.sectionTitle, { marginTop: 15, }]}>
                    3. Lý do đổi lịch
                </Text>
                <TextInput style={styles.input} multiline placeholder="Nhập lý do đổi lịch..." value={reason} onChangeText={setReason} />

                <TouchableOpacity style={styles.submitBtn}  onPress={handleChangeSchedule}>
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
    )
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

export default ChangeSchedule;