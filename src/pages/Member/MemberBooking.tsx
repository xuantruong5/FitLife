import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from "react-native-vector-icons/Ionicons";
import apiFitlife from "../../general/api";
import { useEffect, useState } from "react";

const MemberBooking = ({ navigation }: any) => {
    const trainers = [
        {
            id: 1,
            name: "Elena Trần",
            desc: "Chuyên gia HIIT & Cardio",
            rating: 4.9,
            image: {
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9v97bAbcmpOOkK5B-0dHpunzMJ_jsAail7t9vWYtlMw&s=10",
            }
        },
        {
            id: 2,
            name: "David Phạm",
            desc: "Tốt nghiệp ĐH TDTT",
            rating: 4.9,
            image: {
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz72vzL86WcGg9ryr0j5FHTrj_79bXbRhisIWEiE8CLA&s=10",
            },
        },
        {
            id: 3,
            name: "Maya Vũ",
            desc: "Huấn luyện viên cấp 1",
            rating: 4.9,
            image: {
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKM3z8LCH2aqRXKklcHtyXOA8NtYnKhegclYmvZigfqQ&s=10",
            },
        },

    ];
    const [titles, setTitles] = useState<any[]>([]);
    const getTitles = async () => {
        try {
            const res = await apiFitlife.get("/member/title");

            if (res.data.status) {
                setTitles(res.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getTitles();
    }, []);
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={22} color="#333" />
                </TouchableOpacity>
                <Text style={styles.title}>Đặt Lịch Tập</Text>
                <View style={{ width: 42 }} />
            </View>
            <View style={styles.stepContainer}>
                <View style={styles.stepItem}>
                    <View style={[styles.circle, styles.activeCircle]}>
                        <Text style={styles.activeText}>1</Text>
                    </View>
                </View>
                <View style={styles.line} />

                <View style={styles.stepItem}>
                    <View style={styles.circle}>
                        <Text style={styles.inactiveText}>2</Text>
                    </View>
                </View>

                <View style={styles.line} />

                <View style={styles.stepItem}>
                    <View style={styles.circle}>
                        <Text style={styles.inactiveText}>3</Text>
                    </View>
                </View>

                <View style={styles.line} />

                <View style={styles.stepItem}>
                    <View style={styles.circle}>
                        <Text style={styles.inactiveText}>4</Text>
                    </View>
                </View>

                <View style={styles.line} />

                <View style={styles.stepItem}>
                    <View style={styles.circle}>
                        <Text style={styles.inactiveText}>5</Text>
                    </View>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Chọn loại bài tập</Text>

            <View style={styles.grid}>
                {titles.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.card}
                        onPress={() =>
                            navigation.navigate("selectPackage", {
                                scheduleId: item.id,
                            })
                        }
                    >
                        <Ionicons name="barbell" size={30} color="#4EA5FF" style={{ transform: [{ rotate: "120deg" }] }} />

                        <Text style={styles.cardText}>
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.sectionTitle}>
                Huấn luyện viên hàng đầu
            </Text>
            <View style={{ marginBottom: hp(3) }}>
                {trainers.map((item) => (
                    <TouchableOpacity key={item.id} style={styles.trainerCard}>

                        <Image
                            source={item.image}
                            style={styles.avatar}
                        />

                        <View style={styles.info}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.desc}>{item.desc}</Text>

                            <View style={styles.rating}>
                                <Ionicons name="star" size={18} color="#FDBA21" />
                                <Text style={styles.ratingText}>{item.rating}</Text>
                                <Ionicons name="star" size={14} color="#FDBA21" style={{ marginLeft: 3 }} />
                            </View>
                        </View>
                        <TouchableOpacity style={styles.bookBtn} onPress={() => navigation.navigate("selectPackage")}>
                            <Text style={styles.bookText}>Đăng Ký</Text>
                        </TouchableOpacity>



                    </TouchableOpacity>
                ))}
            </View>




        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F8FC",
        paddingHorizontal: wp(5),
        paddingTop: hp(2),
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: wp("5%"),
        marginTop: hp("4%"),
        marginBottom: hp("2%"),
    },

    backBtn: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        elevation: 2,
    },

    title: {
        marginLeft: 12,
        fontSize: 22,
        fontWeight: "700",
        color: "#1F2937",
    },

    stepContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: hp(3),
    },

    stepItem: {
        alignItems: "center",
    },

    circle: {
        width: 30,
        height: 30,
        borderRadius: 13,
        backgroundColor: "#E5E7EB",
        justifyContent: "center",
        alignItems: "center",
    },

    activeCircle: {
        backgroundColor: "#4ADE80",
    },

    activeText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 17,
    },

    inactiveText: {
        color: "#999",
        fontWeight: "700",
        fontSize: 12,
    },

    line: {
        flex: 1,
        height: 2,
        backgroundColor: "#E5E7EB",
        marginHorizontal: 6,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#222",
        marginBottom: hp(2),
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    card: {
        width: "47%",
        backgroundColor: "#fff",
        borderRadius: 18,
        paddingVertical: hp(3),
        paddingHorizontal: wp(4),
        marginBottom: hp(2),
        justifyContent: "center",
        alignItems: "center",
        elevation: 4,

        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },

    cardText: {
        marginTop: 15,
        fontSize: 15,
        fontWeight: "600",
        color: "#333",
    },
    trainerCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 15,
        marginBottom: 16,

        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        elevation: 4,
    },

    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },

    info: {
        flex: 1,
        marginLeft: 14,
    },

    name: {
        fontSize: 20,
        fontWeight: "700",
        color: "#222",
    },

    desc: {
        marginTop: 5,
        fontSize: 15,
        color: "#666",
    },

    rating: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },

    ratingText: {
        marginLeft: 5,
        marginRight: 3,
        fontSize: 15,
        fontWeight: "600",
        color: "#333",
    },
    bookBtn: {
        backgroundColor: "#4ADE80",
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },

    bookText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "700",
    },


})
export default MemberBooking;