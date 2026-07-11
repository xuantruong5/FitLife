import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";

const members = [
    {
        id: "1",
        name: "Nguyễn Văn A",
        package: "Gói Private 3 tháng",
        progress: 65,
        sessions: "13/20 buổi",
        color: "#4BA3F5",

    },
    {
        id: "2",
        name: "Trần Thị Bích",
        package: "Gói Nhóm 10 buổi",
        progress: 80,
        sessions: "8/10 buổi",
        color: "#2ecc71",
    },
    {
        id: "3",
        name: "Lê Hoàng Cường",
        package: "Gói VIP 6 tháng",
        progress: 40,
        sessions: "24/60 buổi",
        color: "#ff7f50",
    },
    {
        id: "4",
        name: "Phạm Minh Đức",
        package: "Gói Private 1 tháng",
        progress: 90,
        sessions: "9/10 buổi",
        color: "#2ecc71",
    },
    {
        id: "5",
        name: "Võ Thị Hoa",
        package: "Gói Yoga 20 buổi",
        progress: 55,
        sessions: "11/20 buổi",
        color: "#4BA3F5",
    },
];



const MembersPage = ({ navigation }: any) => {
    const [status, setStatus] = useState("active");
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
                    <Ionicons name="chevron-back" size={22} color="#444"/>
                </TouchableOpacity>

                <View>
                    <Text style={styles.subTitle}>DANH SÁCH</Text>
                    <Text style={styles.title}>Học viên</Text>
                </View>

                <TouchableOpacity style={styles.iconBtn}>
                    <Ionicons name="options-outline" size={22} color="#4BA3F5"/>
                </TouchableOpacity>
            </View>

            <View style={styles.searchBox}>
                <Ionicons
                    name="search-outline"
                    size={18}
                    color="#999"
                />
                <TextInput
                    placeholder="Tìm học viên..."
                    style={styles.input}
                />
            </View>

            <View style={styles.statsRow}>
                <Text style={styles.countText}>
                    {members.length} học viên
                </Text>

                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={status}
                        onValueChange={(value) => setStatus(value)}
                        
                    >
                        <Picker.Item  label="active" value="active" />
                        <Picker.Item label="stopped" value="stopped" />
                        <Picker.Item label="completed" value="completed" />
                    </Picker>
                </View>

                {/* <TouchableOpacity style={styles.statusBadge}>
                    <Text style={styles.statusText}>
                        Đang hoạt động
                    </Text>
                </TouchableOpacity> */}
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {members.map((item) => (
                    <View key={item.id} style={styles.card}>
                        <View style={styles.avatar}>
                            <Ionicons  name="person"  size={24} color="#fff" /> 
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.name}>
                                {item.name} 🏅
                            </Text>

                            <Text style={styles.package}>
                                {item.package} · {item.sessions}
                            </Text>

                            <View style={styles.progressContainer}>
                                <View style={styles.progressBg}>
                                    <View
                                        style={[
                                            styles.progressFill,
                                            {
                                                width: `${item.progress}%`,
                                                backgroundColor: item.color,
                                            },
                                        ]}
                                    />
                                </View>

                                <Text style={styles.progressText}>
                                    {item.progress}%
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity onPress={() => navigation.navigate("Progress")} style={styles.arrowBtn}>
                            <Ionicons name="chevron-forward" size={18} color="#fff"/>
                        </TouchableOpacity>
                    </View>
                ))}

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