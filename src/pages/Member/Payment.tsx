import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from "react-native-vector-icons/Ionicons";
import apiFitlife from "../../general/api";

const payment = ({ navigation, route }: any) => {
    const { order } = route.params;
    console.log(order);
    const [selected, setSelected] = useState(false);
    useEffect(() => {
        const timer = setInterval(async () => {
            try {
                const res = await apiFitlife.get( `/member/orders/check-payment/${order.order_code}`);
                console.log("Trạng thái thanh toán:", res.data);
                if (res.data.is_thanh_toan === 1) {
                    clearInterval(timer);
                    navigation.replace( "BookingSuccess", {order: order});
                }
            } catch (error) {
                console.log(error);
            }
        }, 5000);
        return () => {
            clearInterval(timer);
        }
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: "#F7F8FC" }}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <Ionicons name="arrow-back" size={22} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Thanh Toán </Text>
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
                        <View style={[styles.circle, styles.activeCircle]}>
                            <Text style={styles.inactiveText}>5</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.sectionTitle}>PHƯƠNG THỨC THANH TOÁN</Text>

                <View style={styles.paymentCard}>
                    <View style={styles.bankRow}>
                        <Image source={require("../../assets/images/logoMB.jpg")} style={styles.bankLogo} />
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Text style={styles.bankName}>MB Bank</Text>
                            <Text style={styles.bankDesc}>
                                Thanh toán qua ứng dụng MB Bank
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => setSelected(!selected)}>
                            <View style={[styles.checkCircle, { backgroundColor: selected ? "#2F80ED" : "#E5E7EB", }]}>
                                {selected && (
                                    <Ionicons name="checkmark" size={18} color="#fff" />
                                )}
                            </View>
                        </TouchableOpacity >
                    </View>
                </View>
                <Text style={styles.sectionTitle}>CHI PHÍ THANH TOÁN</Text>
                <View style={styles.costCard}>
                    <View style={styles.costRow}>
                        <Text style={styles.costLabel}>Phí buổi PT</Text>
                        <Text style={styles.costValue}>
                            {Number(order?.subtotal ?? 0).toLocaleString("vi-VN")}đ
                        </Text>
                    </View>
                    <View style={styles.costRow}>
                        <Text style={styles.costLabel}>Khấu trừ gói Tiêu Chuẩn</Text>
                        <Text style={[styles.costValue, { color: "#22C55E" }]}>
                            -0đ
                        </Text>
                    </View>
                    <View style={styles.costRow}>
                        <Text style={styles.costLabel}>Mã giảm giá</Text>
                        <Text style={styles.costValue}>
                            -{Number(order?.discount ?? 0).toLocaleString("vi-VN")}đ
                        </Text>
                    </View>
                    <View style={styles.costRow}>
                        <Text style={styles.costLabel}>VAT (0%)</Text>
                        <Text style={styles.costValue}>0đ</Text>
                    </View>
                    <View style={styles.divider} />

                    <View style={styles.costRow}>
                        <Text style={styles.totalLabel}>Tổng cộng</Text>
                        <View style={{ alignItems: "flex-end" }}>
                            <Text style={styles.totalValue}> {Number(order?.total_amount ?? 0).toLocaleString("vi-VN")}đ</Text>
                            <Text style={styles.note}>
                                Đã bao gồm trong gói tập
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.qrCard}>
                    <Image
                        source={{ uri: "https://img.vietqr.io/image/MB-0813559551-compact.png?amount=" + Number(order?.total_amount ?? 0) + "&addInfo=" + order.order_code + "&accountName=TRAN%20XUAN%20TRUONG" }}
                        resizeMode="contain"
                        style={styles.qrImage}
                    />
                    <Text style={styles.qrText}>
                        Hoặc quét mã VietQR để thanh toán nhanh
                    </Text>
                </View>
                <TouchableOpacity style={styles.payBtn}>
                    <Text style={styles.payText}> Đang chờ thanh toán</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
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
        fontSize: 14,
        fontWeight: "700",
        color: "#8A8A8A",
        marginBottom: 12,
        marginLeft: 4,
    },

    paymentCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        // borderWidth: 1.5,
        // borderColor: "#2F80ED",
        padding: 16,
        marginBottom: 24,
    },

    bankRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    bankLogo: {
        width: 44,
        height: 44,
        borderRadius: 10,
        backgroundColor: "#0055A4",
        justifyContent: "center",
        alignItems: "center",
    },

    bankLogoText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },

    bankName: {
        fontSize: 16,
        fontWeight: "700",
        color: "#222",
    },

    bankDesc: {
        marginTop: 3,
        color: "#777",
        fontSize: 13,
    },

    checkCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "#2F80ED",
        justifyContent: "center",
        alignItems: "center",
    },

    costCard: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 18,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        marginBottom: 20,
    },

    costRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14,
    },

    costLabel: {
        color: "#8A8A8A",
        fontSize: 15,
    },

    costValue: {
        fontSize: 15,
        fontWeight: "600",
        color: "#333",
    },

    divider: {
        height: 1,
        backgroundColor: "#ECECEC",
        marginVertical: 10,
    },

    totalLabel: {
        fontSize: 22,
        fontWeight: "700",
        color: "#222",
    },

    totalValue: {
        fontSize: 30,
        fontWeight: "700",
        color: "#2F80ED",
    },

    note: {
        color: "#22C55E",
        fontSize: 12,
        marginTop: 4,
    },

    payBtn: {
        marginTop: 10,
        backgroundColor: "#2F80ED",
        borderRadius: 15,
        height: 56,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: hp(5),
    },

    payText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },
    qrCard: {
        marginTop: 5,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        borderRadius: 20,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
    },

    qrImage: {
        width: 155,
        height: 155,
        marginBottom: 12,
    },

    qrText: {
        fontSize: 16,
        color: "#333",
        textAlign: "center",
    },
})
export default payment;