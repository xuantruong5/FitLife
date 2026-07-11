import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView, } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import apiFitlife from "../../general/api";



const MemberTrainerNotes = ({ navigation }: any) => {
    const [notes, setNotes] = useState<any[]>([]);
    const getTrainerNotes = async () => {
        try {
            const res = await apiFitlife.get("/member/my-trainer-note");
            if (res.data.status) {
                setNotes(res.data.data);
            }
        } catch (error) {
            console.log("Trainer Note Error:", error);
        } 
    };
    useEffect(() => {
        getTrainerNotes();
    }, []);
    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={22} color="#333" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>
                    Ghi chú từ HLV
                </Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {notes.map((item) => (
                    <View style={styles.card} key={item.id}>

                        <View style={styles.row}>
                            <View
                                style={[styles.badge,{ backgroundColor: item.color + "20" },]}>
                                <Text style={[ styles.badgeText, { color: item.color },]} >
                                    {item.category}
                                </Text>
                            </View>

                            <Text style={styles.date}>{item.created_date}</Text>
                        </View>

                        <Text style={styles.title}>
                            {item.title}
                        </Text>

                        <Text style={styles.content}>
                            {item.note}
                        </Text>

                        <View style={styles.footer}>
                            <Image
                                source={{
                                    uri: "https://randomuser.me/api/portraits/men/32.jpg",
                                }}
                                style={styles.avatar}
                            />

                            <Text style={styles.trainer}>
                                HLV {item.trainer_name}
                            </Text>
                        </View>

                    </View>
                ))}
            </ScrollView>

        </View>
    );
};

export default MemberTrainerNotes;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F7FB",
        paddingHorizontal: 18,
        paddingTop: 60,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },

    back: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
    },

    headerTitle: {
        fontSize: 24,
        fontWeight: "700",
        marginLeft: 15,
        color: "#222",
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 22,
        padding: 18,
        marginBottom: 20,
        elevation: 4,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    badge: {
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 20,
    },

    badgeText: {
        fontSize: 12,
        fontWeight: "700",
    },

    date: {
        color: "#999",
        fontWeight: "600",
    },

    title: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: "700",
        color: "#333",
    },

    content: {
        marginTop: 10,
        fontSize: 15,
        color: "#888",
        lineHeight: 24,
    },

    footer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        borderTopWidth: 1,
        borderColor: "#F1F1F1",
        paddingTop: 15,
    },

    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },

    trainer: {
        marginLeft: 10,
        color: "#777",
        fontWeight: "600",
    },
});