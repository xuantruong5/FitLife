import { ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const MemberHome = ({ navigation }: any) => {
    const today = new Date();
    const getWeek = () => {
        const current = new Date();
        const day = current.getDay();

        const monday = new Date(current);
        monday.setDate(current.getDate() - (day === 0 ? 6 : day - 1));
        const arr = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(monday);
            d.setDate(monday.getDate() + i);
            arr.push({
                dayName: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"][i],
                date: d.getDate(),
                isToday:
                    d.getDate() === today.getDate() &&
                    d.getMonth() === today.getMonth() &&
                    d.getFullYear() === today.getFullYear(),
            });
        }
        return arr;
    };
    const week = getWeek();
    const hour = today.getHours();
    let greeting = "Chào buổi tối";
    if (hour < 12) greeting = "Chào buổi sáng";
    else if (hour < 18) greeting = "Chào buổi chiều";


    // lấy dữ liệu real 
    const [user, setUser] = useState<any>(null);
    useEffect(() => {
        const loadUser = async () => {
            const data = await AsyncStorage.getItem("user");
            if (data) {
                setUser(JSON.parse(data));
            }
        };

        loadUser();
    }, []);


    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>{greeting}👋 </Text>
                    <Text style={styles.name}>{user?.name}</Text>
                </View>

                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{user?.name?.charAt(0) || "U"}</Text>
                </View>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 10 }}>
                {week.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} style={[styles.dayCard, item.isToday && styles.todayCard]}>
                            <Text style={[styles.dayName, item.isToday && styles.todayText]} >
                                {item.dayName}
                            </Text>
                            <Text style={[styles.dayNumber, item.isToday && styles.todayText]}>
                                {item.date}
                            </Text>
                            {item.isToday} ? (
                            <View style={styles.todayDot} />
                            {/* ) : (
                                <View style={styles.dot}/>
                            ) */}
                        </TouchableOpacity>
                    )

                })}
            </ScrollView>
            <View style={styles.statsRow}>
                <View style={styles.card}>
                    <Ionicons name="flame-outline" size={24} color="#ff9800" />
                    <Text style={styles.bigText}>14</Text>
                    <Text style={styles.smallText}>Ngày Streak</Text>
                </View>

                <View style={styles.card}>
                    <Ionicons name="barbell-outline" size={24} color="#8b5cf6" />
                    <Text style={styles.bigText}>48</Text>
                    <Text style={styles.smallText}>Buổi tập</Text>
                </View>
                <View style={styles.card}>
                    <Ionicons name="radio-button-on-outline" size={24} color="#22c55e" />
                    <Text style={styles.bigText}>85%</Text>
                    <Text style={styles.smallText}>Mục tiêu</Text>
                </View>
            </View>

            <Text style={styles.title}>Chức năng</Text>

            <View style={styles.grid}>
                <TouchableOpacity
                    style={styles.functionCard}
                    onPress={() => navigation.navigate("MemberPackage")}
                >
                    <Ionicons name="cube-outline" size={26} color="#40A9FF" />
                    <Text style={styles.functionText}>Gói tập</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.functionCard}
                    onPress={() => navigation.navigate("MemberProgress")}
                >
                    <Ionicons name="pulse-outline" size={26} color="#40A9FF" />
                    <Text style={styles.functionText}>Tiến độ</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.functionCard}
                    onPress={() => navigation.navigate("MemberTrainerNotes")}
                >
                    <Ionicons name="document-text-outline" size={26} color="#40A9FF" />
                    <Text style={styles.functionText}>Ghi chú</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.functionCard}
                    // onPress={() => navigation.navigate("NotificationPage")}
                >
                    <Ionicons name="notifications-outline" size={26} color="#40A9FF" />
                    <Text style={styles.functionText}>Thông báo</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.functionCard}
                    onPress={() => navigation.navigate("MemberTrainer")}
                >
                    <Ionicons name="people-outline" size={26} color="#40A9FF" />
                    <Text style={styles.functionText}>HLV</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.functionCard}
                    onPress={() => navigation.navigate("MemberBooking")}
                >
                    <Ionicons name="calendar-outline" size={26} color="#40A9FF" />
                    <Text style={styles.functionText}>Đặt lịch</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.scheduleHeader}>
                <Text style={styles.title}>Lịch tập hôm nay</Text>

                <TouchableOpacity>
                    <Text style={styles.viewAll}>Xem tất cả</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.scheduleCard}>
                <View style={styles.leftIcon}>
                    <Ionicons name="barbell-outline" size={28} color="#fff" />
                </View>

                <View style={styles.scheduleInfo}>
                    <Text style={styles.scheduleTitle}>
                        HIIT Cardio
                    </Text>

                    <Text style={styles.trainer}>
                        HLV: Phạm Minh Tuấn
                    </Text>

                    <View style={styles.row}>
                        <View style={styles.rowItem}>
                            <Ionicons name="time-outline" size={14} color="#6C8DFF" />
                            <Text style={styles.infoText}>
                                06:30 - 07:30
                            </Text>
                        </View>

                        <View style={styles.rowItem}>
                            <Ionicons name="location-outline" size={14} color="#999" />
                            <Text style={styles.infoText}>
                                Tầng 2
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.checkCircle}>
                    <Ionicons name="checkmark" size={20} color="#56d364" />
                </View>
            </View>







        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f6f7fb",
        paddingHorizontal: wp("5%"),
        paddingTop: 55,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    greeting: {
        color: "#999",
        fontSize: 14,
    },

    name: {
        fontSize: 28,
        fontWeight: "700",
        color: "#222",
    },

    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#56A9FF",
        justifyContent: "center",
        alignItems: "center",
    },

    avatarText: {
        color: "#fff",
        fontWeight: "700",
    },

    dayCard: {
        width: 58,
        height: 90,
        backgroundColor: "#fff",
        borderRadius: 20,
        marginRight: 12,
        justifyContent: "center",
        alignItems: "center",
    },

    todayCard: {
        backgroundColor: "#4FB7FF",
    },

    dayName: {
        color: "#999",
        fontSize: 13,
    },

    dayNumber: {
        fontWeight: "700",
        fontSize: 20,
        marginVertical: 5,
    },

    todayText: {
        color: "#fff",
    },

    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#32CD32",
    },

    todayDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#fff",
    },

    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },

    card: {
        width: "31%",
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingVertical: 20,
        alignItems: "center",
        elevation: 2,
    },

    bigText: {
        fontSize: 22,
        fontWeight: "700",
        marginTop: 10,
    },

    smallText: {
        color: "#888",
        textAlign: "center",
        marginTop: 5,
    },

    title: {
        marginTop: 25,
        marginBottom: 15,
        fontWeight: "700",
        fontSize: 22,
        color: "#222",
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    functionCard: {
        width: "31%",
        backgroundColor: "#fff",
        height: 110,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
        elevation: 2,
    },

    functionText: {
        marginTop: 10,
        fontWeight: "600",
    },
    scheduleHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 15,
    },

    viewAll: {
        color: "#4FA9FF",
        fontWeight: "600",
    },

    scheduleCard: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 15,
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        elevation: 2,
        marginBottom: 30,
    },

    leftIcon: {
        width: 60,
        height: 60,
        borderRadius: 18,
        backgroundColor: "#56B9FF",
        justifyContent: "center",
        alignItems: "center",
    },

    scheduleInfo: {
        flex: 1,
        marginLeft: 15,
    },

    scheduleTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#222",
    },

    trainer: {
        color: "#888",
        marginTop: 3,
    },

    row: {
        flexDirection: "row",
        marginTop: 10,
    },

    rowItem: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 15,
    },

    infoText: {
        marginLeft: 4,
        color: "#666",
        fontSize: 13,
    },

    checkCircle: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#F2FFF5",
        justifyContent: "center",
        alignItems: "center",
    },
})
export default MemberHome;