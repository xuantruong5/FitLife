import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from "react-native-vector-icons/Ionicons";

const confirmBooking = ({ navigation }: any) => {
    return (
        <View style={{ flex: 1, backgroundColor: "#F7F8FC" }}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <Ionicons name="arrow-back" size={22} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Chi Tiết Lịch Đặt</Text>
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
                        <View style={[styles.circle, styles.activeCircle]}>
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
                <Text style={styles.note}>
                    Kiểm tra lại thông tin trước khi tiến hành thanh toán.
                </Text>

                <View style={styles.card}>
                    <View style={styles.trainerRow}>
                        <View style={styles.avatar} />
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Text style={styles.trainerName}>Phạm Minh Tuấn</Text>
                            <Text style={styles.trainerJob}>HIIT · Strength</Text>
                            <View style={styles.ratingRow}>
                                <Ionicons name="star" color="#FFC107" size={14} />
                                <Text style={styles.rating}>4.9</Text>
                                <Text style={styles.exp}>• 8 năm kinh nghiệm</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.changeBtn} onPress={() => navigation.navigate("selecttrainer")}>
                            <Text style={styles.changeText}>Đổi</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.infoCard}>
                    <View style={styles.topGradient} />
                    <Text style={styles.cardTitle}>THÔNG TIN BUỔI TẬP</Text>

                    <View style={styles.infoRow}>
                        <View style={styles.leftRow}>
                            <Ionicons name="cube-outline" size={18} color="#F59E0B" />
                            <Text style={styles.label}>Gói tập</Text>
                        </View>
                        <Text style={styles.blue}>Tiêu Chuẩn</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <View style={styles.leftRow}>
                            <Ionicons name="calendar-outline" size={18} color="#8B5CF6" />
                            <Text style={styles.label}>Ngày</Text>
                        </View>
                        <Text style={styles.value}>Thứ 4, 25/06/2026</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <View style={styles.leftRow}>
                            <Ionicons name="time-outline" size={18} color="#22C55E" />
                            <Text style={styles.label}>Giờ bắt đầu</Text>
                        </View>
                        <Text style={styles.time}>08:00</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <View style={styles.leftRow}>
                            <Ionicons name="hourglass-outline" size={18} color="#EF4444" />
                            <Text style={styles.label}>Thời lượng</Text>
                        </View>
                        <Text style={styles.value}>60 phút</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <View style={styles.leftRow}>
                            <Ionicons name="location-outline" size={18} color="#EC4899" />
                            <Text style={styles.label}>Địa điểm</Text>
                        </View>
                        <Text style={styles.value}>FitTrack Pro - Tầng 2</Text>
                    </View>
                </View>
                <View style={styles.costCard}>
                    <Text style={styles.cardTitle}>CHI PHÍ</Text>

                    <View style={styles.costRow}>
                        <Text style={styles.costLabel}>Phí buổi tập PT</Text>
                        <Text style={styles.costValue}>150.000đ</Text>
                    </View>

                    <View style={styles.costRow}>
                        <Text style={styles.costLabel}>Gói Tiêu Chuẩn (đã bao gồm)</Text>
                        <Text style={styles.free}>-150.000đ</Text>
                    </View>

                    <View style={styles.costRow}>
                        <Text style={styles.costLabel}>Phí nền tảng</Text>
                        <Text style={styles.free}>Miễn phí</Text>
                    </View>

                    <View style={styles.costRow}>
                        <Text style={styles.costLabel}>VAT (0%)</Text>
                        <Text style={styles.costValue}>0đ</Text>
                    </View>
                    <View style={styles.costRow}>
                        <Text style={styles.costLabel}>Giảm Giá</Text>
                        <Text style={styles.costValue}>0đ</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.costRow}>
                        <View>
                            <Text style={styles.total}>Tổng thanh toán</Text>
                            <Text style={styles.include}>Đã bao gồm trong gói</Text>
                        </View>

                        <Text style={styles.totalPrice}>0đ</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.bottomBar}>
                <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.btnText}>Hủy</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.confirmBtn}
                    onPress={() => navigation.navigate("payment")}
                >
                    <Text style={styles.btnText}>Xác nhận</Text>
                </TouchableOpacity>
            </View>

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
    note: {
        color: "#9CA3AF",
        marginBottom: 15,
        fontSize: 14,
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 22,
        padding: 16,
        marginBottom: 18,
        elevation: 5,
    },

    trainerRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    avatar: {
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: "#D1D5DB",
    },

    trainerName: {
        fontSize: 17,
        fontWeight: "700",
        color: "#111827",
    },

    trainerJob: {
        color: "#6B7280",
        marginTop: 2,
    },

    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },

    rating: {
        marginLeft: 3,
        fontWeight: "700",
    },

    exp: {
        marginLeft: 5,
        color: "#6B7280",
    },

    changeBtn: {
        backgroundColor: "#F3F4F6",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 18,
    },

    changeText: {
        color: "#6B7280",
        fontWeight: "700",
    },

    infoCard: {
        backgroundColor: "#fff",
        borderRadius: 22,
        padding: 16,
        marginBottom: 18,
        overflow: "hidden",
        elevation: 5,
    },

    topGradient: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 5,
        backgroundColor: "#60A5FA",
    },

    cardTitle: {
        fontWeight: "700",
        color: "#9CA3AF",
        marginBottom: 15,
    },

    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 8,
    },

    leftRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    label: {
        marginLeft: 8,
        color: "#6B7280",
    },

    value: {
        fontWeight: "700",
        color: "#1F2937",
    },

    blue: {
        color: "#3B82F6",
        fontWeight: "700",
    },

    time: {
        color: "#22C55E",
        fontWeight: "700",
    },

    costCard: {
        backgroundColor: "#fff",
        borderRadius: 22,
        padding: 16,
        marginBottom: 30,
        elevation: 5,
    },

    costRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 7,
    },

    costLabel: {
        color: "#6B7280",
    },

    costValue: {
        fontWeight: "700",
        color: "#111827",
    },

    free: {
        color: "#22C55E",
        fontWeight: "700",
    },

    divider: {
        height: 1,
        backgroundColor: "#E5E7EB",
        marginVertical: 12,
    },

    total: {
        fontWeight: "700",
        fontSize: 21,
        color: "#111827",
    },

    include: {
        color: "#22C55E",
        fontSize: 12,
        marginTop: 3,
    },

    totalPrice: {
        fontSize: 28,
        fontWeight: "800",
        color: "#3B82F6",
    },
    bottomBar: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5
    },

    cancelBtn: {
        flex: 1,
        backgroundColor: "#F36F6F",
        height: 55,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,

        elevation: 5,
    },

    confirmBtn: {
        flex: 1,
        backgroundColor: "#14C7A1",
        height: 55,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,

        elevation: 5,
    },

    btnText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },

})
export default confirmBooking;