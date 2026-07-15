import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useState } from "react";
import DatePicker from "react-native-date-picker";

const StoreScheduleMember = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [openStartDate, setOpenStartDate] = useState(false);
    const [openEndDate, setOpenEndDate] = useState(false);


    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [openStartTime, setOpenStartTime] = useState(false);
    const [openEndTime, setOpenEndTime] = useState(false);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("vi-VN");
    }
    const formatTime = (time: Date) => {

        return time.toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        });
    }
    const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
    const [selectedDays, setSelectedDays] = useState<string[]>(["T3", "T5"]);
    const toggleDay = (day: string) => { if (selectedDays.includes(day)) { setSelectedDays(selectedDays.filter(item => item !== day)) } else { setSelectedDays([...selectedDays, day]) } }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.back}>
                    <Ionicons name="chevron-back" size={26} color="#555" />
                </TouchableOpacity>

                <View>
                    <Text style={styles.smallTitle}>
                        TẠO LỊCH HỌC
                    </Text>
                    <Text style={styles.name}>
                        Nguyễn Văn An 🏅
                    </Text>
                </View>
                <Text style={styles.done}>
                    Hoàn tất
                </Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.dateBox}>
                    <View style={styles.calendar}>
                        <Ionicons name="calendar-outline" size={25} color="#8A99A8" />
                    </View>
                    <TouchableOpacity style={styles.dateItem} onPress={() => setOpenStartDate(true)}>
                        <Text style={styles.label}>
                            Từ ngày
                        </Text>
                        <Text style={styles.date}>
                            {formatDate(startDate)}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.dateItem, styles.endDate]} onPress={() => setOpenEndDate(true)}>
                        <Text style={styles.label}>
                            Đến ngày
                        </Text>
                        <Text style={styles.date}>
                            {formatDate(endDate)}
                        </Text>
                    </TouchableOpacity>
                </View>
                <DatePicker modal  mode="date" open={openStartDate} date={startDate} onConfirm={(date) => { setOpenStartDate(false); setStartDate(date);}} onCancel={() => { setOpenStartDate(false)}}/>
                <DatePicker modal mode="date" open={openEndDate} date={endDate} onConfirm={(date) => {setOpenEndDate(false); setEndDate(date); }} onCancel={() => { setOpenEndDate(false) }}/>


                <Text style={styles.section}>
                    Chọn Thứ & Giờ Lặp Lại
                </Text>

                <View style={styles.days}>
                    {
                        days.map(day=> {
                            return(
                                <TouchableOpacity key={day}onPress={()=>toggleDay(day)} style={[ styles.day, selectedDays.includes(day) && styles.activeDay]}>
                                    <Text style={[styles.dayText, selectedDays.includes(day)&& styles.activeText]}>
                                        {day}
                                    </Text>
                                </TouchableOpacity>
                            )
                            
                        })
                    }
                </View>
                <View style={styles.timeCard}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.dayTitle}>
                            Khung giờ tập
                        </Text>
                        <Ionicons name="time-outline" size={22} color="#777"/>
                    </View>
                    <View style={styles.timeRow}>
                        <TouchableOpacity onPress={()=> setOpenStartTime(true)}>
                            <Text style={styles.timeText}>
                                {formatTime(startTime)}
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.line}>
                            <View style={styles.circle}/>
                        </View>
                         <TouchableOpacity onPress={()=> setOpenEndTime(true)}>
                        <Text style={styles.timeText}>
                            {formatTime(endTime)}
                        </Text>
                    </TouchableOpacity>
                    </View>
                </View>

                <DatePicker modal mode="time" open={openStartTime} date={startTime} onConfirm={(time)=>{ setOpenStartTime(false); setStartTime(time);}} onCancel={()=> setOpenStartTime(false) }/>
                <DatePicker modal mode="time" open={openEndTime} date={endTime} onConfirm={(time)=>{ setOpenEndTime(false); setEndTime(time); }} onCancel={()=>setOpenEndTime(false)}/>

                <Text style={styles.sessionLabel}>
                    Số buổi mỗi tuần
                </Text>

                <Text style={styles.session}>
                    {selectedDays.length}
                </Text>

                <View style={styles.divider}/>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>
                        TẠO LỊCH LẶP LẠI
                    </Text>
                </TouchableOpacity>
            </ScrollView>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F8FC",
        paddingHorizontal: wp(5)
    },
    header: {
        marginTop: hp(7),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    back: {
        width: 42,
        height: 42,
        borderRadius: 22,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
    },
    smallTitle: {
        fontSize: 12,
        color: "#999",
    },
    name: {
        fontSize: 18,
        fontWeight: "700"
    },
    done: {
        fontSize: 16
    },
    dateBox: {
        marginTop: 25,
        backgroundColor: "#fff",
        height: 90,
        borderRadius: 18,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        elevation: 3
    },
    calendar: {
        width: 45,
        height: 45,
        borderRadius: 12,
        backgroundColor: "#EEF2F6",
        justifyContent: "center",
        alignItems: "center"
    },
    dateItem: {
        marginLeft: 20
    },
    label: {
        color: "#888"
    },
    endDate: {
        marginLeft: 100, // đẩy sang sát phải
    },
    date: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: "600"
    },
    section: {
        marginTop: 25,
        fontSize: 16,
        fontWeight: "700"
    },
    days: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15
    },
    day: {
        width: 40,
        height: 38,
        borderRadius: 12,
        backgroundColor: "#E8EDF3",
        justifyContent: "center",
        alignItems: "center"
    },
    activeDay: {
        backgroundColor: "#3B9BEA"
    },
    dayText: {
        fontWeight: "600"
    },
    activeText: {
        color: "#fff"
    },
    timeCard: {
        marginTop: 20,
        backgroundColor: "#fff",
        borderRadius: 18,
        padding: 18,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    dayTitle: {
        fontSize: 16,
        fontWeight: "700"
    },
    timeRow: {
        marginTop: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    timeText: {
        fontSize: 17,
        fontWeight: "700"
    },
    line: {
        width: wp(45),
        height: 4,
        backgroundColor: "#DCE4EC"
    },
    circle: {
        width: 18,
        height: 18,
        borderRadius: 10,
        backgroundColor: "#3B9BEA",
        marginTop: -7,
        marginLeft: 60
    },
    sessionLabel: {
        marginTop: 20,
        color: "#888"
    },
    session: {
        fontSize: 20,
        fontWeight: "700",
        marginTop: 5
    },
    divider: {
        height: 1,
        backgroundColor: "#ddd",
        marginTop: 15
    },
    button: {
        marginTop: 20,
        height: 55,
        borderRadius: 30,
        backgroundColor: "#3B9BEA",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30
    },
    buttonText: {
        color: "#fff",
        fontWeight: "700"
    }


})
export default StoreScheduleMember;