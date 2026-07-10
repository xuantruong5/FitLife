import { ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import apiFitlife from "../../general/api";

const MemberPackage = ({ navigation }: any) => {
    const [user, setUser] = useState<any>(null);
    const [memberPackage, setMemberPackage] = useState<any>(null);
    const [history, setHistory] = useState<any[]>([]);
    const [tab, setTab] = useState("detail");
    const getMyPackage = async () => {
        try {
            const res = await apiFitlife.get("/member/my-package");
            if (res.data.status) {
                setHistory(res.data.data);
                const activePackage = res.data.data.find(
                    (item: any) => item.status === 1
                );
                setMemberPackage(activePackage);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getMyPackage();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
                        <Ionicons name="arrow-back" size={22} color="#222" />
                    </TouchableOpacity>

                    <Text style={styles.title}>Gói của tôi</Text>
                </View>

                <LinearGradient colors={["#56B7FF", "#8D6BFF"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.card}>
                    <View style={styles.statusRow}>
                        <Text style={styles.smallWhite}>Gói {memberPackage?.status_text}</Text>
                        <View style={styles.active}>
                            <Text style={styles.activeText}>{memberPackage?.status_text}</Text>
                        </View>
                    </View>
                    <Text style={styles.packageName}>{memberPackage?.package_name}</Text>

                    <View style={styles.middle}>
                        <AnimatedCircularProgress size={80} width={7} fill={memberPackage ? (memberPackage.used_sessions / memberPackage.total_sessions) * 100 : 0} tintColor="#fff" backgroundColor="rgba(255,255,255,.25)" rotation={220} arcSweepAngle={280}>
                            {() => {
                                return (
                                    <View>
                                        <Text style={styles.circleNumber}>
                                            {memberPackage
                                                ? memberPackage.total_sessions - memberPackage.used_sessions
                                                : 0}
                                        </Text>
                                        <Text style={styles.circleText}>còn lại</Text>
                                    </View>
                                )
                            }}
                        </AnimatedCircularProgress>
                        <View style={{ flex: 1, marginLeft: 20 }}>
                            <Text style={styles.progressTitle}>Tiến độ sử dụng</Text>
                            <View style={styles.progress}>
                                <View style={styles.progressFill} />
                            </View>
                            <Text style={styles.used}>
                                {memberPackage?.used_sessions}/{memberPackage?.total_sessions} buổi đã dùng
                            </Text>
                            <Text style={styles.expire}>
                                Hết hạn: {memberPackage?.end_date}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.tags}>
                        <View style={styles.tag}>
                            <Text style={styles.tagText}>4 buổi PT/tháng</Text>
                        </View>
                        <View style={styles.tag}>
                            <Text style={styles.tagText}>Lịch cá nhân hóa</Text>
                        </View>

                        <View style={styles.tag}>
                            <Text style={styles.tagText}>Ghi chú HLV</Text>
                        </View>

                    </View>
                </LinearGradient>

                <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.greenBtn}>
                        <Ionicons name="calendar-outline" size={18} color="#fff" />
                        <Text style={styles.greenText}> Đặt lịch ngay</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.whiteBtn}>
                        <Ionicons name="refresh-outline" size={18} color="#ff8c33" />
                        <Text style={styles.orangeText}> Gia hạn gói</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.tabContainer}>
                    <TouchableOpacity style={[styles.tab, tab === "detail" && styles.activeTab]} onPress={() => setTab("detail")}>
                        <Text style={[styles.tabText, tab === "detail" && styles.activeTabText,]}>
                            Chi tiết gói
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tab, tab === "history" && styles.activeTab,]} onPress={() => setTab("history")}>
                        <Text style={[styles.tabText, tab === "history" && styles.activeTabText,]}>
                            Lịch sử mua
                        </Text>
                    </TouchableOpacity>
                </View>
                {tab === "detail" ? (
                    <View style={styles.detailCard}>
                        <View style={styles.row}>
                            <Text style={styles.left}>Tên gói</Text>
                            <Text style={styles.right}>
                                {memberPackage?.package_name}
                            </Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.left}>Ngày bắt đầu</Text>
                            <Text style={styles.right}>
                                {memberPackage?.start_date}
                            </Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.left}>Ngày hết hạn</Text>
                            <Text style={styles.right}>
                                {memberPackage?.end_date}
                            </Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.left}>Tổng buổi</Text>
                            <Text style={styles.right}>
                                {memberPackage?.total_sessions} buổi
                            </Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.left}>Còn lại</Text>
                            <Text style={[styles.right, { color: "#4DA5FF" }]}>
                                {memberPackage
                                    ? memberPackage.total_sessions - memberPackage.used_sessions
                                    : 0} buổi
                            </Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.left}>Hỗ trợ PT</Text>
                            <Text style={[styles.right, { color: "#4DA5FF" }]}>
                                ✓ {memberPackage?.pt_sessions} buổi/tháng
                            </Text>
                        </View>
                    </View>
                ) : (
                    <>
                        {history.map((item: any) => (
                            <View key={item.id} style={styles.history}>
                              
                                <View style={{ flex: 1 }}>
                                    <View style={styles.titleRow}>
                                        <Text style={styles.historyTitle}>
                                            {item.package_name}
                                        </Text>

                                        <View
                                            style={
                                                item.status === 1
                                                    ? styles.statusActive
                                                    : styles.statusActive2
                                            }
                                        >
                                            <Text
                                                style={
                                                    item.status === 1
                                                        ? styles.statusText
                                                        : styles.statusText2
                                                }
                                            >
                                                {item.status_text}
                                            </Text>
                                        </View>
                                    </View>

                                    <Text style={styles.historyDate}>
                                        {item.start_date} - {item.end_date}
                                    </Text>

                                   
                                    <View style={styles.infoRow}>
                                        <Text style={styles.price}>
                                            {Number(item.price).toLocaleString()}đ
                                        </Text>

                                        <Text style={styles.session}>
                                            {item.total_sessions} buổi
                                        </Text>
                                    </View>
                                </View>

                                <TouchableOpacity style={styles.renewBtn}>
                                    <Text style={styles.renewText}>Gia hạn</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </>
                )}


            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FB",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
        marginHorizontal: 20,
    },

    back: {
        width: 40,
        height: 40,
        backgroundColor: "#fff",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        elevation: 2,
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        marginLeft: 15,
    },

    card: {
        margin: 20,
        borderRadius: 24,
        padding: 20,
    },

    statusRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    smallWhite: {
        color: "#fff",
        opacity: 0.9,
    },

    packageName: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "800",
        marginTop: 4,
    },

    active: {
        backgroundColor: "#fff",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
    },

    activeText: {
        color: "#36c86d",
        fontWeight: "700",
        fontSize: 12,
    },

    middle: {
        flexDirection: "row",
        marginTop: 18,
        alignItems: "center",
    },

    circleNumber: {
        color: "#fff",
        fontSize: 24,
        textAlign: "center",
        fontWeight: "800",
    },

    circleText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 11,
    },

    progressTitle: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "600",
    },

    progress: {
        height: 8,
        backgroundColor: "rgba(255,255,255,.25)",
        borderRadius: 10,
        marginVertical: 10,
    },

    progressFill: {
        width: "50%",
        height: 8,
        backgroundColor: "#fff",
        borderRadius: 10,
    },

    used: {
        color: "#fff",
        fontWeight: "600",
    },

    expire: {
        color: "#fff",
        marginTop: 4,
        opacity: 0.9,
    },

    tags: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },

    tag: {
        backgroundColor: "rgba(255,255,255,.2)",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
    },

    tagText: {
        color: "#fff",
        fontSize: 12,
    },

    actionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
    },

    greenBtn: {
        flex: 1,
        backgroundColor: "#39D76A",
        borderRadius: 18,
        height: 56,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginRight: 10,
    },

    whiteBtn: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 18,
        height: 56,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },

    greenText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },

    orangeText: {
        color: "#ff8c33",
        fontWeight: "700",
        fontSize: 16,
    },

    tabContainer: {
        flexDirection: "row",
        backgroundColor: "#ECECEC",
        margin: 20,
        borderRadius: 20,
        padding: 4,
    },

    tab: {
        flex: 1,
        padding: 10,
        borderRadius: 18,
        alignItems: "center",
    },

    activeTab: {
        backgroundColor: "#fff",
    },

    tabText: {
        color: "#999",
        fontWeight: "600",
    },

    activeTabText: {
        color: "#4DA5FF",
    },

    detailCard: {
        backgroundColor: "#fff",
        borderRadius: 20,
        marginHorizontal: 20,
        marginBottom: 30,
        overflow: "hidden",
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 18,
        borderBottomWidth: 1,
        borderColor: "#eee",
    },

    left: {
        color: "#888",
        fontSize: 16,
    },

    right: {
        color: "#222",
        fontWeight: "700",
        fontSize: 16,
    },

    history: {
        backgroundColor: "#fff",
        marginHorizontal: 20,
        marginBottom: 16,
        borderRadius: 20,
        padding: 18,
        flexDirection: "row",
        alignItems: "center",
        elevation: 2,
    },

    historyTitle: {
        fontWeight: "700",
        fontSize: 18,
    },

    historyDate: {
        color: "#888",
        marginTop: 5,
    },

    price: {
        color: "#4DA5FF",
        fontWeight: "800",
        fontSize: 18,
    },

    session: {
        color: "#999",
        marginLeft: 15,
    },
    titleRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },


    priceBox: {
        alignItems: "flex-end",
        marginHorizontal: 15,
    },

    renewBtn: {
        backgroundColor: "#4DA5FF",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        justifyContent: "center",
    },

    renewText: {
        color: "#fff",
        fontWeight: "700",
    },

    statusActive: {
        backgroundColor: "#EAFBF1",
        marginLeft: 10,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusActive2: {
        backgroundColor: "#424242",
        marginLeft: 10,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 20,
    },

    statusText: {
        color: "#39D76A",
        fontSize: 11,
        fontWeight: "700",
    },
    statusText2: {
        color: "#F8F9FA",
        fontSize: 12,
        fontWeight: "700",
    },


    statusExpire: {
        backgroundColor: "#F3F4F6",
        marginLeft: 10,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },

    statusExpireText: {
        color: "#999",
        fontSize: 11,
        fontWeight: "700",
    },





});

export default MemberPackage;