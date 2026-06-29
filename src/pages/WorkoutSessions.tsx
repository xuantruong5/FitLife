import { ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from "react-native-vector-icons/Ionicons";
import {CalendarPlus, CalendarSync,} from "lucide-react-native";

const Workout = ({ navigation }: any) => {
    return(
        <ScrollView   style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.circleBtn}>
                    <Ionicons name="arrow-back" size={22} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Quản lí Lịch</Text>
                <TouchableOpacity style={styles.avatar}>
                    <Text style={styles.avatarText}>N</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <Text style={styles.hello}>Xin chào 👋</Text>
                <Text style={styles.title}>Chọn chức năng</Text>

                <TouchableOpacity onPress={() => navigation.navigate("CreateSchedule")} style={[styles.card,{shadowColor: "#46E070", },]}>
                    <View style={[styles.iconBox, {backgroundColor: "#46E070" }]}>
                        <CalendarPlus size={34} color="#fff" strokeWidth={2.5}/>
                    </View>
                    <Text style={styles.cardTitle}>Tạo lịch tập mới</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("EditSchedule")} style={[styles.card,{shadowColor: "#FF9434", },]}>
                    <View style={[styles.iconBox, {backgroundColor: "#FF9434" }]}>
                        <Ionicons name="document-text-outline" size={36} color="#fff" />
                    </View>
                    <Text style={styles.cardTitle}>Chỉnh sửa lịch tập</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Calendar")} style={[styles.card,{shadowColor: "#3B82F6", },]}>
                    <View style={[styles.iconBox, {backgroundColor: "#3B82F6" }]}>
                        <CalendarSync size={34} color="#fff" strokeWidth={2.5} />
                    </View>
                    <Text style={styles.cardTitle}>Đổi lịch tập</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F8FB",
    },

    header: {
        height: hp("13%"),
        backgroundColor: "#2FB8F7",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: wp("5%"),
        paddingTop: hp("2%"),
        elevation: 8,
    },

    circleBtn: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "rgba(255,255,255,0.25)",
        justifyContent: "center",
        alignItems: "center",
    },

    headerTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "700",
    },

    avatar: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#3D4BFF",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#fff",
    },

    avatarText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 18,
    },

    content: {
        paddingHorizontal: wp("6%"),
        marginTop: hp("3%"),
    },

    hello: {
        color: "#8B8B8B",
        fontSize: 16,
    },

    title: {
        fontSize: 25,
        fontWeight: "700",
        color: "#16213E",
        marginTop: hp("0.5%"),
        marginBottom: hp("4%"),
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 25,
        height: hp("22%"),
        justifyContent: "center",
        alignItems: "center",
        marginBottom: hp("3%"),

        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.18,
        shadowRadius: 15,
        elevation: 8,
    },
    

    iconBox: {
        width: 82,
        height: 82,
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: hp("2%"),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 6,
    },

    cardTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#16213E",
    },
})
export default Workout;