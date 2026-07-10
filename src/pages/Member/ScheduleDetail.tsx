import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";
import { widthPercentageToDP as wp, } from "react-native-responsive-screen";
import apiFitlife from "../../general/api";

const ScheduleDetail =  ({ navigation, route  }: any) => {
    const { id } = route.params;
    const [data, setData] = useState<any>(null);
    const getDetail = async () => {
        try {
            const res = await apiFitlife.get(`/member/my-schedule/${id}`);
            if (res.data.status) {
                setData(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getDetail();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={22} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Chi tiết buổi tập</Text>
                </View>
                <View style={styles.banner}>
                    <Image source={{ uri: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200", }} style={styles.bannerImage} />
                    <View style={styles.overlay} />
                    <View style={styles.bannerText}>
                        <Text style={styles.className}>
                            {data?.title}
                        </Text>
                        <Text style={styles.status}>
                           {data?.status_text}
                        </Text>
                    </View>
                </View>

                <View style={styles.card}>

                    <View style={styles.infoItem}>
                        <Ionicons name="calendar-outline" size={20} color="#4FC3F7" />
                        <Text style={styles.infoTitle}>Ngày</Text>
                        <Text style={styles.infoValue}>
                             {data?.created_date}
                        </Text>
                    </View>

                    <View style={styles.infoItem}>
                        <Ionicons name="time-outline" size={20} color="#4CAF50" />
                        <Text style={styles.infoTitle}>Thời gian</Text>
                        <Text style={styles.infoValue}>
                             {data?.start_time.substring(0,5)} - {data?.end_time.substring(0,5)}
                        </Text>
                    </View>

                    <View style={styles.infoItem}>
                        <Ionicons name="location-outline" size={20} color="#FF9800" />
                        <Text style={styles.infoTitle}>Địa điểm</Text>
                        <Text style={styles.infoValue}>
                            {data?.branch_name} - {data?.room}
                        </Text>
                    </View>

                    <View style={styles.infoItem}>
                        <Ionicons name="barbell-outline" size={20} color="#00BCD4" />
                        <Text style={styles.infoTitle}>Loại bài</Text>
                        <Text style={styles.infoValue}>
                            {data?.title}

                        </Text>
                    </View>

                    <View style={styles.infoItem}>
                        <Ionicons name="cube-outline" size={20} color="#7E57C2" />
                        <Text style={styles.infoTitle}>Gói tập</Text>
                        <Text style={styles.infoValue}>
                            {data?.package_name}

                        </Text>
                    </View>

                </View>

                <Text style={styles.sectionTitle}>HLV PHỤ TRÁCH</Text>

                <View style={styles.coachCard}>

                    <View style={styles.coachLeft}>
                        <Image source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg", }} style={styles.avatar} />

                        <View>
                            <Text style={styles.coachName}>
                                {data?.trainer_name}
                            </Text>

                            <View style={styles.rating}>
                                <FontAwesome name="star" size={12} color="#FFC107" />
                                <FontAwesome name="star" size={12} color="#FFC107" />
                                <FontAwesome name="star" size={12} color="#FFC107" />
                                <FontAwesome name="star" size={12} color="#FFC107" />
                                <FontAwesome name="star" size={12} color="#FFC107" />
                                <Text style={styles.ratingText}>
                                    5.0
                                </Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.chatBtn}>
                        <Feather name="message-circle" size={20} color="#37D6C1" />
                    </TouchableOpacity>
                </View>



                <View style={styles.noteBox}>
                    <Text style={styles.noteTitle}>
                        GHI CHÚ TỪ HLV
                    </Text>

                    <Text style={styles.note}>
                        Mang theo khăn và nước uống trước buổi tập.
                    </Text>
                </View>



                <View style={styles.mapCard}>
                    <Image source={{ uri: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200", }} style={styles.mapImage} />
                    <View style={styles.mapOverlay} />
                    <TouchableOpacity style={styles.locationTag}>
                        <Ionicons name="paper-plane" size={15} color="#3EA8FF" />
                        <Text style={styles.locationText}>
                            {data?.branch_address}
                        </Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.buttonContainer}>

                    <TouchableOpacity>
                        <LinearGradient colors={["#67C8FF", "#4AB5FF"]} style={styles.blueButton} >
                            <Ionicons name="scan-outline" size={18} color="#fff" />
                            <Text style={styles.whiteText}>
                                Check-In
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.whiteButton}>
                        <MaterialIcons name="swap-horiz" color="#FF9800" size={20} />

                        <Text style={styles.orangeText}>
                            Đổi lịch
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.whiteButton}>
                        <Ionicons name="close-circle-outline" color="#FF5A5F" size={20}
                        />

                        <Text style={styles.redText}>
                            Hủy buổi
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.whiteButton}>
                        <Feather name="message-circle" size={18} color="#39CDBD" />

                        <Text style={styles.greenText}>
                            Chat HLV
                        </Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default ScheduleDetail;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F5F7FB",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 18,
    },

    back: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        elevation: 2,
    },

    title: {
        fontSize: 22,
        fontWeight: "700",
        marginLeft: 15,
    },

    banner: {
        width: wp("90%"),
        alignSelf: "center",
        height: 150,
        borderRadius: 18,
        overflow: "hidden",
    },

    bannerImage: {
        width: "100%",
        height: "100%",
    },

    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,.35)",
    },

    bannerText: {
        position: "absolute",
        left: 18,
        bottom: 20,
    },

    className: {
        color: "#fff",
        fontSize: 28,
        fontWeight: "700",
    },

    status: {
        color: "#4FC3F7",
        marginTop: 6,
        fontWeight: "700",
    },

    card: {
        backgroundColor: "#fff",
        margin: 18,
        borderRadius: 18,
        overflow: "hidden",
    },

    infoItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 18,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },

    infoTitle: {
        width: 90,
        color: "#999",
        marginLeft: 10,
    },

    infoValue: {
        flex: 1,
        textAlign: "right",
        fontWeight: "700",
        color: "#333",
    },

    sectionTitle: {
        marginHorizontal: 18,
        color: "#8E8E8E",
        fontWeight: "700",
        marginBottom: 10,
    },

    coachCard: {
        backgroundColor: "#fff",
        marginHorizontal: 18,
        borderRadius: 18,
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    coachLeft: {
        flexDirection: "row",
        alignItems: "center",
    },

    avatar: {
        width: 55,
        height: 55,
        borderRadius: 28,
        marginRight: 12,
    },

    coachName: {
        fontWeight: "700",
        fontSize: 16,
    },

    rating: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },

    ratingText: {
        marginLeft: 6,
        color: "#888",
    },

    chatBtn: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#EFFFFB",
        justifyContent: "center",
        alignItems: "center",
    },

    noteBox: {
        backgroundColor: "#fff",
        margin: 18,
        borderRadius: 18,
        padding: 18,
    },

    noteTitle: {
        color: "#56A9FF",
        fontWeight: "700",
        marginBottom: 10,
    },

    note: {
        color: "#888",
        lineHeight: 22,
    },

    mapCard: {
        marginHorizontal: 18,
        borderRadius: 18,
        overflow: "hidden",
        height: 120,
    },

    mapImage: {
        width: "100%",
        height: "100%",
    },

    mapOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(255,255,255,.45)",
    },

    locationTag: {
        position: "absolute",
        left: 15,
        top: 40,
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center",
    },

    locationText: {
        marginLeft: 8,
        color: "#3EA8FF",
        fontWeight: "600",
    },

    buttonContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        margin: 18,
        marginBottom: 40,
    },

    blueButton: {
        width: wp("42%"),
        height: 55,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },

    whiteButton: {
        width: wp("42%"),
        height: 55,
        borderRadius: 14,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 15,
    },

    whiteText: {
        color: "#fff",
        fontWeight: "700",
        marginLeft: 8,
    },

    orangeText: {
        color: "#FF9800",
        fontWeight: "700",
        marginLeft: 8,
    },

    redText: {
        color: "#FF5A5F",
        fontWeight: "700",
        marginLeft: 8,
    },

    greenText: {
        color: "#35CDBD",
        fontWeight: "700",
        marginLeft: 8,
    },
});