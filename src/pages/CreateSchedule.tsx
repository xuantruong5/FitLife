import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";


const CreateSchedule = ({ navigation }: any) => {
    const [selectedDays, setSelectedDays] = useState([]);
    const [type, setType] = useState("private");
    const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
    const getCurrentWeek = () => {
        const today = new Date();
        const monday = new Date(today);
        monday.setDate(today.getDate() + (today.getDay() === 0 ? -6 : 1 - today.getDay()));
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        return {
            start: monday.toLocaleDateString("vi-VN"),
            end: sunday.toLocaleDateString("vi-VN"),
        };
    };
    const week = getCurrentWeek();
    const toggleDay = (day: string) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter(item => item !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };
    // giờ 
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");



    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <Ionicons name="chevron-back" size={wp(6)} color="#39A7FF" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Đề xuất khóa tập</Text>
                    <View style={styles.status}>
                        <Text style={styles.statusText}>Chờ duyệt</Text>
                    </View>
                </View>
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>THÔNG TIN KHÓA TẬP</Text>
                    <Text style={styles.label}>Tên khóa tập / Chủ đề</Text>
                    <TextInput placeholder="VD: Giảm mỡ cấp tốc 30 ngày" style={styles.input} />
                    <Text style={[styles.label, { marginTop: 15 }]}>Loại hình</Text>

                    <View style={styles.typeContainer}>
                        <TouchableOpacity onPress={() => setType("private")} style={[styles.typeBtn, type === "private" && styles.typeActive,]}>
                            <Text style={type === "private" ? styles.typeActiveText : styles.typeText}>
                                Private (1 kèm 1)
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setType("group")} style={[styles.typeBtn, type === "group" && styles.typeActive,]}>
                            <Text style={type === "group" ? styles.typeActiveText : styles.typeText}>
                                Lớp Nhóm
                            </Text>
                        </TouchableOpacity>
                    </View>


                </View>
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>KHUNG GIỜ GIẢNG DẠY</Text>
                    <View style={styles.headerRow}>
                        <Text style={[styles.step, { marginBottom: 0 }]}>
                            1. Chọn Thứ trong tuần
                        </Text>

                        <Text style={styles.weekText}>
                            Tuần: {week.start} - {week.end}
                        </Text>
                    </View>
                    <View style={styles.dayWrap}>
                        {days.map((day) => {
                            const active = selectedDays.includes(day);
                            return (
                                <TouchableOpacity key={day} onPress={() => toggleDay(day)} style={[styles.dayItem, active && styles.dayItemActive,]}>
                                    <Text style={[styles.dayText, active && styles.dayTextActive,]}>
                                        {day}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}

                    </View>
                    <Text style={[styles.step, { marginTop: hp(1.5) }]}>
                        2. Khung giờ giảng dạy
                    </Text>

                    <View style={styles.timeRow}>
                        <View style={styles.timeBox}>
                            <Text style={styles.timeLabel}>Giờ bắt đầu</Text>

                            <View style={styles.timeInput}>
                                <Ionicons name="time-outline" size={wp(4.5)} color="#4A90FF" />
                                <Picker mode="dropdown" style={{ flex: 1 }} selectedValue={startTime} onValueChange={(itemValue) => setStartTime(itemValue)} enabled={true} dropdownIconColor="#4A90FF">
                                    <Picker.Item label="07:00" value="07:00" />
                                    <Picker.Item label="08:00" value="08:00" />
                                    <Picker.Item label="09:00" value="09:00" />
                                    <Picker.Item label="10:00" value="10:00" />
                                    <Picker.Item label="11:00" value="11:00" />
                                    <Picker.Item label="12:00" value="12:00" />
                                    <Picker.Item label="13:00" value="13:00" />
                                    <Picker.Item label="14:00" value="14:00" />
                                    <Picker.Item label="15:00" value="15:00" />
                                    <Picker.Item label="16:00" value="16:00" />
                                    <Picker.Item label="17:00" value="17:00" />
                                    <Picker.Item label="18:00" value="18:00" />
                                </Picker>
                            </View>
                        </View>

                        <Ionicons
                            name="arrow-forward"
                            size={wp(5)}
                            color="#B0B0B0"
                            style={{ marginHorizontal: wp(2), }}
                        />

                        <View style={styles.timeBox}>
                            <Text style={styles.timeLabel}>Giờ kết thúc</Text>

                            <View style={styles.timeInput}>
                                <Ionicons name="time-outline" size={wp(4.5)} color="#FF8A00" />
                                <Picker mode="dropdown" style={{ flex: 1 }} selectedValue={endTime} onValueChange={(itemValue) => setEndTime(itemValue)}>
                                    <Picker.Item label="08:00" value="08:00" />
                                    <Picker.Item label="09:00" value="09:00" />
                                    <Picker.Item label="10:00" value="10:00" />
                                    <Picker.Item label="11:00" value="11:00" />
                                    <Picker.Item label="12:00" value="12:00" />
                                    <Picker.Item label="13:00" value="13:00" />
                                    <Picker.Item label="14:00" value="14:00" />
                                    <Picker.Item label="15:00" value="15:00" />
                                    <Picker.Item label="16:00" value="16:00" />
                                    <Picker.Item label="17:00" value="17:00" />
                                    <Picker.Item label="18:00" value="18:00" />
                                </Picker>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>GHI CHÚ CHO QUẢN LÝ</Text>

                    <TextInput
                        multiline
                        numberOfLines={5}
                        placeholder="Nhập ghi chú hoặc đề xuất giá bán cho Admin..."
                        style={styles.note}
                        textAlignVertical="top"
                    />
                </View>
                <TouchableOpacity style={styles.submitBtn}>
                    <Text style={styles.submitText}>
                        Send 
                    </Text>
                </TouchableOpacity>

                <Text style={styles.bottomText}>
                    Khóa học sẽ hiển thị trên app Học viên sau khi được{" "}
                    <Text style={{ color: "#FF8A00", fontWeight: "700" }}>
                        Admin duyệt.
                    </Text>
                </Text>
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
        paddingHorizontal: wp(5),
        paddingTop: hp(4),
        marginBottom: hp(2),
    },

    backBtn: {
        width: wp(11),
        height: wp(11),
        borderRadius: wp(5.5),
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
    },

    title: {
        fontSize: wp(5.0),
        fontWeight: "700",
        color: "#18223B",
    },

    status: {
        backgroundColor: "#FFF3DA",
        paddingHorizontal: wp(3),
        paddingVertical: hp(0.7),
        borderRadius: wp(4),
    },

    statusText: {
        color: "#FF9800",
        fontSize: wp(3.2),
        fontWeight: "700",
    },

    card: {
        backgroundColor: "#fff",
        marginHorizontal: wp(5),
        marginBottom: hp(2),
        borderRadius: wp(5),
        padding: wp(5),
        elevation: 2,
    },

    sectionTitle: {
        fontSize: wp(3.2),
        color: "#9AA4B2",
        fontWeight: "700",
        marginBottom: hp(1.5),
    },
    label: {
        fontSize: 14,
        color: "#707B8D",
        marginBottom: 8,
        fontWeight: "600",
    },

    input: {
        height: hp(6),
        borderRadius: wp(3.5),
        backgroundColor: "#F4F6FA",
        paddingHorizontal: wp(4),
        fontSize: wp(3.5),
    },
    typeContainer: {
        flexDirection: "row",
        backgroundColor: "#F3F5F9",
        borderRadius: 16,
        padding: 5,
    },
    typeBtn: {
        flex: 1,
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
    },

    typeActive: {
        backgroundColor: "#fff",
        elevation: 2,
    },

    typeActiveText: {
        color: "#4A90FF",
        fontWeight: "700",
    },

    typeText: {
        color: "#999",
        fontWeight: "600",
    },
    step: {
        fontWeight: "700",
        color: "#5A6270",
        marginBottom: 12,
    },


    dayWrap: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    dayItem: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(6),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F4F6FA",
    },

    dayItemActive: {
        backgroundColor: "#38D88C",
    },

    dayText: {
        fontSize: wp(3.7),
        fontWeight: "700",
        color: "#666",
    },

    dayTextActive: {
        color: "#fff",
    },

    timeInput: {
        height: hp(6),
        borderRadius: wp(3.5),
        backgroundColor: "#F4F6FA",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: wp(3),
        flex: 1,
    },

    time: {
        marginLeft: wp(2),
        fontSize: wp(4.5),
        fontWeight: "700",
        color: "#18223B",
    },

    submitBtn: {
        marginHorizontal: wp(5),
        height: hp(7),
        borderRadius: hp(3.5),
        backgroundColor: "#FF6D00",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: hp(2),
    },

    submitText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: wp(4.5),
    },
    timeRow: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginTop: hp(1),
    },

    timeBox: {
        flex: 1,
    },

    timeLabel: {
        fontSize: wp(3.2),
        color: "#8F98A7",
        marginBottom: hp(0.8),
        fontWeight: "600",
    },

    note: {
        backgroundColor: "#F4F6FA",
        borderRadius: wp(4),
        minHeight: hp(16),
        padding: wp(4),
        fontSize: wp(3.8),
    },

    bottomText: {
        textAlign: "center",
        fontSize: wp(3.3),
        color: "#999",
        marginHorizontal: wp(6),
        marginBottom: hp(3),
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: hp(1.5),
    },




    weekText: {
        marginLeft: wp(2),
        fontSize: wp(3),
        color: "#666",
    },
});
export default CreateSchedule;