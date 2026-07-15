import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import apiFitlife from "../general/api";





const MembersPage = ({ navigation }: any) => {
    const [members, setMembers] = useState<any[]>([]);
    const [status, setStatus] = useState("1");
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);

    const getMembers = async (memberStatus = "1") => {
        try {
            setLoading(true);

            const res = await apiFitlife.get("/trainer/member-packages", {
                params: {
                    status: memberStatus,
                },
            });
            console.log("Response:", res.data);

            if (res.data.status) {
                setMembers(res.data.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getMembers(status);
    }, [status]);

    const filteredMembers = useMemo(() => {
        return members.filter((item: any) =>
            item.member_name
                .toLowerCase()
                .includes(keyword.toLowerCase())
        );
    }, [members, keyword]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
                    <Ionicons name="chevron-back" size={22} color="#444" />
                </TouchableOpacity>

                <View>
                    <Text style={styles.subTitle}>DANH SÁCH</Text>
                    <Text style={styles.title}>Học viên</Text>
                </View>

                <TouchableOpacity style={styles.iconBtn}>
                    <Ionicons name="options-outline" size={22} color="#4BA3F5" />
                </TouchableOpacity>
            </View>

            <View style={styles.searchBox}>
                <Ionicons name="search-outline" size={18} color="#999" />
                <TextInput placeholder="Tìm học viên..." style={styles.input} value={keyword} onChangeText={setKeyword} />
            </View>

            <View style={styles.statsRow}>
                <Text style={styles.countText}>
                    {filteredMembers.length} học viên
                </Text>

                <View style={styles.pickerContainer}>
                    <Picker selectedValue={status} onValueChange={(value) => setStatus(value)}>
                        <Picker.Item label="Đang hoạt động" value="1" />
                        <Picker.Item label="Hết hạn" value="0" />
                        <Picker.Item label="Chưa duyệt" value="2" />
                        <Picker.Item label="Đã hủy" value="3" />
                    </Picker>
                </View>

                {/* <TouchableOpacity style={styles.statusBadge}>
                    <Text style={styles.statusText}>
                        Đang hoạt động
                    </Text>
                </TouchableOpacity> */}
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {filteredMembers.map((item: any) => {
                    const progress =
                        item.total_sessions > 0
                            ? Math.round((item.used_sessions / item.total_sessions) * 100)
                            : 0;
                    const progressColor =
                        progress >= 80
                            ? "#2ecc71"
                            : progress >= 50
                                ? "#4BA3F5"
                                : "#ff7f50";
                    return (
                        <View key={item.id} style={styles.card}>
                            <View style={styles.avatar}>
                                <Ionicons name="person" size={24} color="#fff" />
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.name}>
                                    {item.member_name} 🏅
                                </Text>

                                <Text style={styles.package}>
                                    {item.package_name} · {item.used_sessions}/{item.total_sessions} buổi
                                </Text>

                                <View style={styles.progressContainer}>
                                    <View style={styles.progressBg}>
                                        <View
                                            style={[
                                                styles.progressFill,
                                                {
                                                    width: `${progress}%`,
                                                    backgroundColor: progressColor,
                                                },
                                            ]}
                                        />
                                    </View>

                                    <Text style={styles.progressText}>
                                        {progress}%
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity onPress={() => navigation.navigate("MemberAttendanceHistory", { member: item })} style={styles.arrowBtn}>
                                <Ionicons name="chevron-forward" size={18} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    )
                }
                )}
            </ScrollView>


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F6FA",
        paddingHorizontal: wp("4%"),
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: hp("1.5%"),
    },

    iconBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        elevation: 2,
    },
    pickerContainer: {
        width: 150,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        backgroundColor: "#DFF3FF",
        paddingHorizontal: 12,
        paddingVertical: 6,
    },


    subTitle: {
        textAlign: "center",
        color: "#9AA4B2",
        fontSize: 11,
        fontWeight: "600",
    },

    title: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "700",
        color: "#222",
    },

    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 15,
        paddingHorizontal: 12,
        marginBottom: hp("2%"),
        height: 48,
    },

    input: {
        flex: 1,
        marginLeft: 8,
    },

    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: hp("2%"),
    },

    countText: {
        color: "#7B8A9A",
        fontWeight: "600",
    },

    statusBadge: {
        backgroundColor: "#DFF3FF",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },

    statusText: {
        color: "#4BA3F5",
        fontSize: 12,
        fontWeight: "600",
    },

    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 14,
        marginBottom: 14,
        elevation: 2,
    },

    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#4BA3F5",
        justifyContent: "center",
        alignItems: "center",
    },

    info: {
        flex: 1,
        marginLeft: 12,
    },

    name: {
        fontSize: 15,
        fontWeight: "700",
        color: "#222",
    },

    package: {
        fontSize: 12,
        color: "#7B8A9A",
        marginTop: 2,
        marginBottom: 8,
    },

    progressContainer: {
        flexDirection: "row",
        alignItems: "center",
    },

    progressBg: {
        flex: 1,
        height: 6,
        backgroundColor: "#E8EEF5",
        borderRadius: 20,
        overflow: "hidden",
        marginRight: 8,
    },

    progressFill: {
        height: "100%",
        borderRadius: 20,
        // backgroundColor: "#4BA3F5",
    },


    progressText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#4BA3F5",
        marginLeft: 4,
    },

    arrowBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#4BA3F5",
        justifyContent: "center",
        alignItems: "center",
    },


});

export default MembersPage;
