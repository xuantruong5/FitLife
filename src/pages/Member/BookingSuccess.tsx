import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from "react-native-vector-icons/Ionicons";

const BookingSuccess = ({ navigation }: any) => {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.bgCircle1} />
            <View style={styles.bgCircle2} />
            <Text style={styles.title}>Đặt lịch thành công!</Text>

            <View style={styles.successBox}>
                <Ionicons name="checkmark-circle" size={100} color="#54D16A" />
            </View>

            <View style={styles.card}>
                <View style={styles.row}>
                    <View style={styles.iconBox}>
                        <Ionicons name="calendar-outline" size={22} color="#3F6F8E" />
                    </View>
                    <View>
                        <Text style={styles.text}>Thứ 4, 25/06</Text>
                        <Text style={styles.subText}>Lúc 08:00</Text>
                    </View>
                </View>
                <View style={[styles.row, { marginTop: 12 }]}>
                    <View style={styles.iconBox}>
                        <Ionicons name="person-outline" size={22} color="#3F6F8E" />
                    </View>
                    <Text style={styles.text}>HLV: Phạm Minh Tuấn</Text>
                </View>
            </View>
            <View style={styles.card}>
                <View style={styles.row}>
                    <View style={styles.iconBox}>
                        <Ionicons name="time-outline" size={22} color="#3F6F8E" />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.noteTitle}>Ghi chú hội viên:</Text>
                        <Text style={styles.note}>Hội viên VIP</Text>
                        <Text style={[styles.noteTitle, { marginTop: 8 }]}>Vị trí:
                        </Text>
                        <Text style={styles.note}>Phòng tập số 3</Text>
                    </View>
                </View>
            </View>

            <View style={styles.messageCard}>
                <Text style={styles.messageTitle}>Lời cảm ơn từ Quản lý:</Text>
                <Text style={styles.message}>
                    Chào bạn, là Quản lý phòng gym [Tên Phòng Gym], tôi xin chân thành cảm
                    ơn bạn đã lựa chọn WellFit Team. Chúc bạn có một buổi tập luyện tràn
                    đầy năng lượng!
                </Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("MemberTabs")}>
                <Text style={styles.buttonText}>Về Trang Chủ</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4FFFC",
        paddingHorizontal: wp(6),
    },

    bgCircle1: {
        position: "absolute",
        width: 280,
        height: 280,
        borderRadius: 150,
        backgroundColor: "#D8FFF3",
        top: -80,
        left: -70,
    },

    bgCircle2: {
        position: "absolute",
        width: 220,
        height: 220,
        borderRadius: 120,
        backgroundColor: "#EAFDF7",
        right: -80,
        top: 60,
    },

    title: {
        fontSize: hp(3.3),
        fontWeight: "700",
        color: "#2D2D2D",
        alignSelf: "center",
        marginTop: hp(8),
        marginBottom: hp(3),
    },

    successBox: {
        alignSelf: "center",
        width: wp(45),
        height: wp(45),
        borderRadius: 25,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        elevation: 6,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },

    card: {
        backgroundColor: "#fff",
        marginTop: hp(2),
        borderRadius: 18,
        padding: 18,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
    },

    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: "#DDF3F8",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    text: {
        fontSize: hp(2.2),
        fontWeight: "600",
        color: "#2B2B2B",
    },

    subText: {
        fontSize: hp(2),
        color: "#555",
        marginTop: 3,
    },

    noteTitle: {
        fontWeight: "700",
        fontSize: hp(2),
        color: "#222",
    },

    note: {
        fontSize: hp(1.9),
        color: "#555",
        marginTop: 2,
    },

    messageCard: {
        marginTop: hp(2),
        borderRadius: 18,
        padding: 18,
        backgroundColor: "#B8F0C8",
        elevation: 3,
    },

    messageTitle: {
        fontSize: hp(2.1),
        fontWeight: "700",
        color: "#2E2E2E",
        marginBottom: 8,
    },

    message: {
        fontSize: hp(1.8),
        color: "#2E2E2E",
        lineHeight: 22,
    },

    button: {
        marginVertical: hp(4),
        height: hp(6.5),
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#42C8D8",
        elevation: 5,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: hp(2.2),
    },
})
export default BookingSuccess;