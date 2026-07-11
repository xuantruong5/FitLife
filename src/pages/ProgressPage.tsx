import { ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from "react-native-safe-area-context";

const students = [
    {
        id: 1,
        name: "Nguyễn Văn A",
        lesson: "1/15 buổi",
        progress: 7,
        color: "#4A8CFF",
    },
    {
        id: 2,
        name: "Nguyễn Văn B",
        lesson: "5/15 buổi",
        progress: 33,
        color: "#20C997",
    },
    {
        id: 3,
        name: "Trần Thị C",
        lesson: "10/15 buổi",
        progress: 66,
        color: "#E649A6",
    },
    {
        id: 4,
        name: "Lê Hoàng D",
        lesson: "3/20 buổi",
        progress: 15,
        color: "#F59F00",
    },
];

const Progress =  ({ navigation }: any) => {

    return(
       <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={22} color="#1E293B"/>
                </TouchableOpacity>

                <Text style={styles.title}>
                    Theo dõi tiến độ
                </Text>
                <TouchableOpacity style={styles.addBtn}>
                    <Ionicons name="add" size={24} color="#fff"/>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: hp("3%")}}>
                {students.map((item)=> (
                    <View key={item.id} style={styles.card}>
                        <View style={[ styles.avatar, {backgroundColor:item.color, }]}>
                            <Ionicons  name="person" size={28} color="#fff"/>
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.name}>
                                {item.name}
                            </Text>
                            <Text style={styles.lesson}>
                                Buổi: {item.lesson}
                            </Text>

                            <View style={styles.progressRow}>
                                <View style={styles.progressBg}>
                                    <View style={[styles.progressFill, {width: `${item.progress}%`,backgroundColor:item.color,}]}></View>
                                </View>
                                <Text style={[styles.percent,{color: item.color}]}>
                                    {item.progress}%
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate("MemberDetails")} style={styles.detailBtn}>
                            <Text style={styles.detailText}>
                                Xem Thêm 
                            </Text>
                            <Ionicons name ="chevron-forward" size={16} color="#fff" ></Ionicons>
                        </TouchableOpacity>
                        
                    </View>
                ))}

            </ScrollView>

       </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FB",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: wp("5%"),
        marginTop: hp("1%"),
        marginBottom: hp("2%"),
    },

    iconBtn: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
    },

    addBtn: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#4A8CFF",
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
    },

    title: {
        fontSize: wp("5.3%"),
        fontWeight: "700",
        color: "#1E293B",
    },

    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        marginHorizontal: wp("5%"),
        marginBottom: hp("2%"),
        padding: wp("4%"),
        borderRadius: 24,
        elevation: 4,
    },

    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
    },

    content: {
        flex: 1,
        marginLeft: wp("3%"),
    },

    name: {
        fontSize: wp("4%"),
        fontWeight: "700",
        color: "#1E293B",
    },

    lesson: {
        marginTop: 2,
        color: "#94A3B8",
        fontSize: wp("3.2%"),
    },

    progressRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: hp("1%"),
    },

    progressBg: {
        flex: 1,
        height: 6,
        backgroundColor: "#E5E7EB",
        borderRadius: 6,
        overflow: "hidden",
    },

    progressFill: {
        height: "100%",
        borderRadius: 6,
    },

    percent: {
        marginLeft: 8,
        fontWeight: "700",
        fontSize: wp("3.2%"),
    },

    detailBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#53B8FF",
        paddingHorizontal: wp("4%"),
        paddingVertical: hp("1.2%"),
        borderRadius: 20,
        marginLeft: wp("2%"),
    },

    detailText: {
        color: "#fff",
        fontWeight: "600",
        marginRight: 3,
    },
    statsRight: {
        flex: 1,
        marginLeft: wp("4%"),
    },
})
export default Progress;