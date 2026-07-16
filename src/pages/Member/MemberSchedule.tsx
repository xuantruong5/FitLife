import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
// import { Alert } from "react-native";
import apiFitlife from "../../general/api";


const tabs = ["Tất cả", "Sắp tới", "Hoàn thành", "Đã hủy"];

const MemberSchedule = ({ navigation }: any) => {


    const [selectedTab, setSelectedTab] = useState("Tất cả");


    const [scheduleData, setScheduleData] = useState<any[]>([]);
    const getMySchedule = async () => {
        try {
            const res = await apiFitlife.get("/member/my-schedule");
            console.log("Response:", res.data);

            if (res.data.status) {
                setScheduleData(res.data.data);
            }
        } catch (error: any) {
             console.log("Status:", error?.response?.status);
        console.log("Data:", error?.response?.data);
        console.log("Headers:", error?.config?.headers);
        console.log("Full Error:", error);
            console.log(error);
        }
    };

    useEffect(() => {
        getMySchedule();
    }, []);
    const cancelSchedule = async (scheduleMemberId: number) => {
        Alert.alert(
            "Hủy lịch",
            "Bạn có chắc muốn hủy lịch tập này?",
            [
                {
                    text: "Không",
                    style: "cancel",
                },
                {
                    text: "Đồng ý",
                    onPress: async () => {
                        try {
                            const res = await apiFitlife.post("/member/cancel-schedule", {
                                schedule_member_id: scheduleMemberId,
                            });
                            console.log("Cancel:", res.data);

                            if (res.data.status) {
                                Alert.alert("Thành công", res.data.message);

                                // Load lại danh sách
                                getMySchedule();
                            } else {
                                Alert.alert("Thông báo", res.data.message);
                            }
                        } catch (error: any) {
                            console.log("Status:", error?.response?.status);
                            console.log("Data:", error?.response?.data);
                            console.log(error);

                            Alert.alert(
                                "Lỗi",
                                error?.response?.data?.message || "Hủy lịch thất bại."
                            );
                        }
                    },
                },
            ]
        );
    };



    const filteredData = scheduleData.filter(
        item =>
            selectedTab === "Tất cả" ||
            item.status_text === selectedTab
    );


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={22} color="#222" />
                </TouchableOpacity>

                <Text style={styles.title}>Lịch tập của tôi</Text>
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.iconBtn}>
                        <Ionicons name="stats-chart-outline" size={20} color="#53B8FF" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconBtn}>
                        <Ionicons name="calendar-outline" size={20} color="#999" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.tabContainer}>
                {tabs.map((item) => (
                    <TouchableOpacity key={item} style={[styles.tab, selectedTab === item && styles.activeTab]} onPress={() => setSelectedTab(item)}>
                        <Text style={[styles.tabText, selectedTab === item && styles.activeTabText,]}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {filteredData.map((item) => (
                    <View key={item.id} style={styles.card}>
                        <View style={styles.row}>
                            <Image source={{ uri: item.image }} style={styles.image} />

                            <View style={{ flex: 1 }}>
                                <View style={styles.topRow}>
                                    <Text style={styles.className}>{item.title}</Text>
                                    <View style={[styles.status, { backgroundColor: item.status_color + "25" }]}>
                                        <Text style={{ color: item.status_color, fontSize: 13, fontWeight: "700" }}>
                                            {item.status_text}
                                        </Text>
                                    </View>
                                </View>
                                <Text style={styles.trainer}>
                                    HLV: {item.trainer_name}
                                </Text>

                                <View style={styles.infoRow}>
                                    <Ionicons name="time-outline" size={14} color="#F6A623" />
                                    <Text style={styles.infoText}>
                                        {item.start_time.substring(0, 5)} - {item.end_time.substring(0, 5)}
                                    </Text>
                                    <Ionicons name="location-outline" size={14} color="#999" style={{ marginLeft: 10 }} />
                                    <Text style={styles.infoText}>{item.branch_name} - {item.room}</Text>
                                </View>
                                <Text style={styles.date}>{item.created_date}</Text>
                            </View>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.actionRow}>
                            <TouchableOpacity style={styles.blueBtn}>
                                <Text style={styles.blueText}>Check-in</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.orangeBtn} onPress={() => {
                                console.log(item);
                                navigation.navigate("MemberChangeSchedule", {
                                    id: item.id,
                                });
                            }} >
                                <Text style={styles.orangeText}>Đổi lịch</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.redBtn} onPress={() => cancelSchedule(item.id)}>
                                <Text style={styles.redText}>Hủy</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.chatBtn}>
                                <Ionicons name="chatbubble-outline" size={18} color="#53D7C7" />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.chitiet} onPress={() => navigation.navigate("ScheduleDetail", { id: item.id, })}>
                                <Text style={styles.blackText}>Xem Chi Tiết</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                ))}
            </ScrollView>
        </SafeAreaView >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F8FC",
        paddingHorizontal: wp(4),
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: hp(1),
        marginBottom: hp(2),
    },

    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },

    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#222",
    },

    headerIcons: {
        flexDirection: "row",
    },

    iconBtn: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 8,
    },

    tabContainer: {
        flexDirection: "row",
        backgroundColor: "#EFEFEF",
        borderRadius: 15,
        padding: 4,
        marginBottom: 15,
    },

    tab: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 12,
        alignItems: "center",
    },

    activeTab: {
        backgroundColor: "#fff",
    },

    tabText: {
        color: "#999",
        fontWeight: "600",
        fontSize: 13,
    },

    activeTabText: {
        color: "#53B8FF",
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 22,
        padding: 15,
        marginBottom: 18,
        elevation: 3,
    },

    row: {
        flexDirection: "row",
    },

    image: {
        width: 55,
        height: 55,
        borderRadius: 12,
        marginRight: 12,
    },

    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    className: {
        fontWeight: "700",
        fontSize: 17,
        color: "#222",
    },

    trainer: {
        color: "#666",
        marginTop: 3,
    },

    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },

    infoText: {
        marginLeft: 3,
        color: "#777",
        fontSize: 13,
    },

    date: {
        color: "#999",
        marginTop: 3,
        fontSize: 13,
    },

    status: {
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderRadius: 30,
    },

    divider: {
        height: 1,
        backgroundColor: "#eee",
        marginVertical: 15,
    },

    actionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    blueBtn: {
        backgroundColor: "#EAF5FF",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 15,
    },

    orangeBtn: {
        backgroundColor: "#FFF3E8",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 15,
    },

    redBtn: {
        backgroundColor: "#FFECEC",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 15,
    },

    chatBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#EFFFFB",
        justifyContent: "center",
        alignItems: "center",
    },

    blueText: {
        color: "#4AA7FF",
        fontWeight: "600",
    },

    orangeText: {
        color: "#FF9B42",
        fontWeight: "600",
    },

    redText: {
        color: "#FF6B6B",
        fontWeight: "600",
    },
    chitiet: {
        backgroundColor: "#d6d3d3",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
    },

    blackText: {
        color: "#000",
        fontSize: 14,
        fontWeight: "600",
    },
});
export default MemberSchedule;