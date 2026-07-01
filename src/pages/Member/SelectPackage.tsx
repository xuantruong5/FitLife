import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from "react-native-vector-icons/Ionicons";

const selectPackage = ({ navigation }: any) => {
    const packages = [
        {
            name: "Cơ Bản",
            price: "500.000",
            badge: "",
            recommended: false,
            features: [
                "Tập tự do không giới hạn",
                "Truy cập tất cả thiết bị",
                "1 buổi tư vấn HLV/tháng",
                "App theo dõi tiến độ",
            ],
        },
        {
            name: "Tiêu Chuẩn",
            price: "900.000",
            badge: "Phổ biến nhất",
            recommended: true,
            features: [
                "Tất cả gói Cơ Bản",
                "4 buổi PT/tháng",
                "Lịch tập cá nhân hóa",
                "Dinh dưỡng cơ bản",
                "Ghi chú từ HLV",
            ],
        },
        {
            name: "Cao Cấp",
            price: "1.500.000",
            badge: "Premium",
            recommended: false,
            features: [
                "Tất cả gói Tiêu Chuẩn",
                "PT không giới hạn",
                "Tư vấn dinh dưỡng chuyên sâu",
                "Check-in ưu tiên",
                "Hỗ trợ 24/7",
            ],
        },
    ];
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={22} color="#333" />
                </TouchableOpacity>
                <Text style={styles.title}>Gói Thành Viên</Text>
                <View style={{ width: 42 }} />
            </View>
            <View style={styles.stepContainer}>

                <View style={styles.stepItem}>
                    <View style={styles.circle}>
                        <Text style={styles.activeText}>1</Text>
                    </View>
                </View>

                <View style={styles.line} />

                <View style={styles.stepItem}>
                    <View style={[styles.circle, styles.activeCircle]}>
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

            <View style={{ marginTop: hp(2), paddingBottom: hp(4) }}>
                {packages.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.packageCard} activeOpacity={0.8} onPress={() => navigation.navigate("selecttrainer")}>
                        <View style={styles.packageHeader}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={styles.packageName}>{item.name}</Text>
                                {item.badge && (
                                    <View style={[styles.badge, { backgroundColor: item.badge === "Phổ biến nhất" ? "#43B5FF" : "#A855F7", },]}>
                                        <Text style={styles.badgeText}>{item.badge}</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                            <Text style={[ styles.price, { color: index === 0 ? "#5cc683" : index === 1 ? "#56D7F2" : "#A855F7", }, ]} >
                                {item.price}
                            </Text>
                            <Text style={styles.month}> đ/tháng</Text>
                        </View>
                        <View style={{ marginTop: hp(1.2) }}>
                            {item.features.map((feature, i) => (
                                <View key={i} style={styles.featureRow}>
                                    <Ionicons name="checkmark-circle" size={16} color="#6EE7B7"/>
                                    <Text style={styles.featureText}>{feature}</Text>
                                </View>
                            ))}
                        </View>

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
    packageCard: {
        backgroundColor: "#fff",
        borderRadius: 22,
        padding: wp(5),
        marginBottom: hp(2.2),
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 5,
    },

    recommendCard: {
        borderWidth: 1.5,
        borderColor: "#8ED0FF",
    },

    packageHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    packageName: {
        fontSize: 20,
        fontWeight: "700",
        color: "#1F2937",
    },

    badge: {
        marginLeft: 8,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 12,
    },

    badgeText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "700",
    },

    price: {
        fontSize: 30,
        fontWeight: "800",
        color: "#56D7F2",
    },


    month: {
        marginBottom: 4,
        fontSize: 14,
        color: "#888",
    },

    featureRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },

    featureText: {
        marginLeft: 8,
        fontSize: 14,
        color: "#4B5563",
    },
})
export default selectPackage;