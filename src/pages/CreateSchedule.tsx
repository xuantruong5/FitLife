import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import apiFitlife from "../general/api";
import DatePicker from "react-native-date-picker";



const CreateSchedule = ({ navigation }: any) => {
    const [selectedDays, setSelectedDays] = useState([]);
    const [type, setType] = useState("private");
    const [packageType, setPackageType] = useState("basic");
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

    // giờ 
    const [openStartTime, setOpenStartTime] = useState(false);
    const [openEndTime, setOpenEndTime] = useState(false);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const formatTime = (time: Date) => {
        return time.toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    }



    const [title, setTitle] = useState("");
    const [room, setRoom] = useState("");
    const [note, setNote] = useState("");
    const [maxMembers, setMaxMembers] = useState("");


    const [date, setDate] = useState(new Date());
    const [openDate, setOpenDate] = useState(false);
    const formatDate = (date: Date) => {
        return date.toISOString().split("T")[0];
    };


    const [selectedBranch, setSelectedBranch] = useState("");
    const [selectedPackage, setSelectedPackage] = useState("");
    const [branches, setBranches] = useState<any[]>([]);
    const [packages, setPackages] = useState<any[]>([]);

    const loadData = async () => {
        try {
            const res = await apiFitlife.get("/trainer/goi/chi-nhanh");

            if (res.data.success) {
                setBranches(res.data.branches);
                setPackages(res.data.packages);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        loadData();
    }, []);
    const handleCreateSchedule = async () => {
        try {

            if (
                !title ||
                !date ||
                !startTime ||
                !endTime ||
                !selectedPackage ||
                !selectedBranch ||
                !maxMembers
            ) {
                Alert.alert("Vui lòng nhập đầy đủ thông tin");
                return;
            }

            const body = {
                title,
                date: formatDate(date),
                start_time: formatTime(startTime),
                end_time: formatTime(endTime),
                room,
                id_package: selectedPackage,
                id_branch: selectedBranch,
                max_members: Number(maxMembers),
                note,
            };

            const res = await apiFitlife.post("/trainer/create-schedule", body);

            if (res.data.success) {
                Alert.alert(res.data.message);
                navigation.goBack();
            }

        } catch (error: any) {

            console.log(error?.data);

            if (error?.data?.message) {
                Alert.alert(error.data.message);
            } else {
                Alert.alert("Có lỗi xảy ra.");
            }

        }
    };



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
                    <TextInput placeholder="VD: Giảm mỡ cấp tốc 30 ngày" style={styles.input} value={title} onChangeText={setTitle} />
                    <Text style={[styles.label, { marginTop: 10 }]}>
                        Phòng học
                    </Text>

                    <TextInput placeholder="VD: Phòng A" style={styles.input} value={room} onChangeText={setRoom} />

                    <Text style={[styles.label, { marginTop: 10 }]}>
                        Số học viên tối đa
                    </Text>

                    <TextInput style={styles.input} keyboardType="numeric" value={maxMembers} onChangeText={setMaxMembers} />

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

                    <Text style={[styles.label, { marginTop: 10 }]}>
                        Gói tập
                    </Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            mode="dropdown"
                            selectedValue={selectedPackage}
                            onValueChange={(itemValue) => setSelectedPackage(itemValue)}
                            dropdownIconColor="#666"
                            style={styles.picker} >
                            <Picker.Item label="Chọn gói tập..." value="" color="#999" />
                            {packages.map((item) => (
                                <Picker.Item key={item.id} label={item.name} value={item.id} />
                            ))}
                        </Picker>
                    </View>
                    <Text style={[styles.label, { marginTop: 10 }]}>
                        Chi Nhánh
                    </Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            mode="dropdown"
                            selectedValue={selectedBranch}
                            onValueChange={(itemValue) => setSelectedBranch(itemValue)}
                            dropdownIconColor="#666"
                            style={styles.picker} >
                            <Picker.Item label="Chọn chi nhánh..." value="" color="#999" />

                            {branches.map((item) => (
                                <Picker.Item key={item.id} label={item.name} value={item.id} />
                            ))}
                        </Picker>
                    </View>




                </View>
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>KHUNG GIỜ GIẢNG DẠY</Text>
                    <View style={styles.headerRow}>
                        <Text style={[styles.step, { marginBottom: 0 }]}>
                            1. Chọn Ngày
                        </Text>
                        <Text style={styles.weekText}>
                            Tuần: {week.start} - {week.end}
                        </Text>
                    </View>
                    <Text style={styles.step}>
                        Ngày học
                    </Text>
                    <TouchableOpacity style={styles.dateInput} onPress={() => setOpenDate(true)}>
                        <Text>
                            {formatDate(date)}
                        </Text>
                        <Ionicons name="calendar-outline" size={20} color="#666" />
                    </TouchableOpacity>

                    <DatePicker modal mode="date" open={openDate} date={date} onConfirm={(value) => { setOpenDate(false); setDate(value); }} onCancel={() => setOpenDate(false)} />
                    <Text style={[styles.step, { marginTop: hp(1.5) }]}>
                        2. Khung giờ giảng dạy
                    </Text>

                    <View style={styles.timeRow}>

                        <View style={styles.timeBox}>
                            <Text style={styles.timeLabel}>Giờ bắt đầu</Text>

                            <TouchableOpacity
                                style={styles.dateInput}
                                onPress={() => setOpenStartTime(true)}
                            >
                                <Text style={styles.dateText}>
                                    {formatTime(startTime)}
                                </Text>

                                <Ionicons
                                    name="time-outline"
                                    size={20}
                                    color="#4A90FF"
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: 15 }} />

                        <View style={styles.timeBox}>
                            <Text style={styles.timeLabel}>Giờ kết thúc</Text>

                            <TouchableOpacity
                                style={styles.dateInput}
                                onPress={() => setOpenEndTime(true)}
                            >
                                <Text style={styles.dateText}>
                                    {formatTime(endTime)}
                                </Text>

                                <Ionicons
                                    name="time-outline"
                                    size={20}
                                    color="#FF8A00"
                                />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <DatePicker
                        modal
                        mode="time"
                        open={openStartTime}
                        date={startTime}
                        onConfirm={(time) => {
                            setOpenStartTime(false);
                            setStartTime(time);
                        }}
                        onCancel={() => setOpenStartTime(false)}
                    />

                    <DatePicker
                        modal
                        mode="time"
                        open={openEndTime}
                        date={endTime}
                        onConfirm={(time) => {
                            setOpenEndTime(false);
                            setEndTime(time);
                        }}
                        onCancel={() => setOpenEndTime(false)}
                    />
                </View>
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>GHI CHÚ CHO QUẢN LÝ</Text>

                    <TextInput multiline numberOfLines={5} placeholder="Nhập ghi chú hoặc đề xuất giá bán cho Admin..." value={note} onChangeText={setNote} style={styles.note} textAlignVertical="top" />
                </View>
                <TouchableOpacity style={styles.submitBtn} onPress={handleCreateSchedule}>
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
        height: hp(4),
        borderRadius: wp(3.5),
        backgroundColor: "#F4F6FA",
        paddingHorizontal: wp(4),
        fontSize: wp(3.9),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    typeContainer: {
        flexDirection: "row",
        backgroundColor: "#F3F5F9",
        borderRadius: 16,
        padding: 5,
    },
    typeContainer1: {
        flexDirection: "row",
        backgroundColor: "#F3F5F9",
        borderRadius: 16,
        padding: 5,
        marginTop: 10
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
    pickerContainer: {
        backgroundColor: "#F4F6FA",
        borderRadius: 16,
        overflow: "hidden",
        marginTop: 5,
    },

    picker: {
        height: 55,
        width: "100%",
        color: "#333",
    },
    dateInput: {
        height: hp(6),
        backgroundColor: "#F4F6FA",
        borderRadius: wp(3.5),
        paddingHorizontal: wp(4),

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        marginTop: hp(0.5),
    },

    dateText: {
        fontSize: wp(3.9),
        color: "#18223B",
        fontWeight: "500",
    },
});
export default CreateSchedule;