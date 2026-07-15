import { ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from "react-native-vector-icons/Ionicons";
import { BarChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import apiFitlife from "../general/api";


const TrainerIncome = ({ navigation }: any) => {

    const [income, setIncome] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());


    const getIncome = async () => {
        try {
            setLoading(true);

            const res = await apiFitlife.get(
                `/trainer/income?month=${currentMonth}&year=${currentYear}`
            );

            if (res.data.status) {
                setIncome(res.data);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getIncome();
    }, [selectedDate]);



    const incomes = [
        {
            id: 1,
            title: "Private 1-1 · Nguyễn Văn A",
            date: "22/06/2026",
            money: "300.000đ",
            icon: "barbell",
        },
        {
            id: 2,
            title: "Lớp Nhóm 5 người",
            date: "21/06/2026",
            money: "500.000đ",
            icon: "people",
        },
        {
            id: 3,
            title: "Private 1-1 · Trần Thị Bích",
            date: "20/06/2026",
            money: "300.000đ",
            icon: "checkmark-circle",
        },

    ];


    const changeMonth = (type: "prev" | "next") => {
        const newDate = new Date(selectedDate);

        if (type === "prev") {
            newDate.setMonth(newDate.getMonth() - 1);
        } else {
            newDate.setMonth(newDate.getMonth() + 1);
        }

        setSelectedDate(newDate);
    };

    const currentMonth = selectedDate.getMonth() + 1;
    const currentYear = selectedDate.getFullYear();



    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
                        <Ionicons name="arrow-back" size={22} color="#1E293B" />
                    </TouchableOpacity>

                    <Text style={styles.title}>Thu nhập</Text>
                    <TouchableOpacity style={styles.iconBtn}>
                        <Ionicons name="calendar-outline" size={22} color="#FFB020" />
                    </TouchableOpacity>
                </View>
                <View style={styles.incomeCard}>
                    <Text style={styles.cardLabel}>
                        Thu nhập  - Tháng {currentMonth}/{currentYear}
                    </Text>

                    <Text style={styles.money}>
                        {Number(income?.thu_nhap || 0).toLocaleString("vi-VN")} VNĐ
                    </Text>
                </View>
                <View style={styles.chartCard}>
                    <View style={styles.chartHeader}>
                        <Text style={styles.chartTitle}>
                            Biểu đồ theo tuần
                        </Text>

                        <View style={styles.monthContainer}>
                            <TouchableOpacity onPress={() => changeMonth("prev")}>
                                <Ionicons
                                    name="chevron-back"
                                    size={20}
                                    color="#FFB020"
                                />
                            </TouchableOpacity>

                            <View style={styles.monthTag}>
                                <Text style={styles.monthText}>
                                    Tháng {currentMonth}
                                </Text>
                            </View>

                            <TouchableOpacity onPress={() => changeMonth("next")}>
                                <Ionicons
                                    name="chevron-forward"
                                    size={20}
                                    color="#FFB020"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <BarChart
                        data={{
                            labels: income?.chart?.map((item: any) => item.week) || [],
                            datasets: [
                                {
                                    data:
                                        income?.chart?.map(
                                            (item: any) => Number(item.income) / 1000000
                                        ) || [],
                                },
                            ],
                        }}
                        width={wp("78%")}
                        height={220}
                        fromZero
                        showValuesOnTopOfBars
                        yAxisLabel=""
                        yAxisSuffix="M"
                        chartConfig={{
                            backgroundGradientFrom:
                                "#fff",
                            backgroundGradientTo:
                                "#fff",
                            decimalPlaces: 1,

                            color: () =>
                                "#FFC53D",

                            labelColor: () =>
                                "#94A3B8",

                            fillShadowGradient:
                                "#FFC53D",

                            fillShadowGradientOpacity: 1,
                        }}
                        style={{
                            borderRadius: 16,
                            marginTop: 10,
                        }}
                    />
                </View>

                <Text style={styles.historyTitle}>
                    Lịch sử dạy gần đây
                </Text>

                {income?.chi_tiet?.map((item: any) => (
                    <View key={item.id} style={styles.historyCard}>
                        <View style={styles.leftRow}>
                            <View style={styles.iconWrap}>
                                <Ionicons
                                    name="barbell"
                                    size={20}
                                    color="#60A5FA"
                                />
                            </View>

                            <View>
                                <Text style={styles.className}>
                                    {item.schedule_title}
                                </Text>

                                <Text style={styles.date}>
                                    {item.schedule_date}
                                </Text>
                            </View>
                        </View>

                        <Text style={styles.moneyText}>
                            + {Number(item.total_amount).toLocaleString("vi-VN")}đ
                        </Text>
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
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: wp("5%"),
        marginTop: hp("1%"),
    },

    iconBtn: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
    },

    title: {
        fontSize: wp("5.5%"),
        fontWeight: "700",
        color: "#1E293B",
    },

    incomeCard: {
        marginHorizontal: wp("5%"),
        marginTop: hp("2%"),
        backgroundColor: "#FFC53D",
        borderRadius: 30,
        padding: 15,
    },

    cardLabel: {
        color: "#827d6e",
        fontSize: 13,
    },

    money: {
        color: "#7A4A00",
        fontSize: 25,
        fontWeight: "900",
        marginTop: 10,
    },

    chartCard: {
        backgroundColor: "#FFF",
        marginHorizontal: wp("5%"),
        marginTop: hp("2%"),
        borderRadius: 25,
        padding: 15,
        elevation: 3,
    },

    chartHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    chartTitle: {
        fontWeight: "700",
        fontSize: 16,
        color: "#1E293B",
    },

    monthTag: {
        backgroundColor: "#FFF4D6",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },

    monthText: {
        color: "#FFB020",
        fontWeight: "600",
    },

    historyTitle: {
        marginHorizontal: wp("5%"),
        marginTop: hp("3%"),
        marginBottom: hp("1%"),
        fontSize: 18,
        fontWeight: "700",
        color: "#1E293B",
    },

    historyCard: {
        backgroundColor: "#FFF",
        marginHorizontal: wp("5%"),
        marginBottom: hp("1.5%"),
        borderRadius: 20,
        padding: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        elevation: 2,
    },

    leftRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    iconWrap: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: "#F3F8FF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    className: {
        fontWeight: "700",
        color: "#1E293B",
        width: wp("45%"),
    },

    date: {
        color: "#94A3B8",
        marginTop: 4,
        fontSize: 12,
    },

    moneyText: {
        color: "#00C48C",
        fontWeight: "700",
        fontSize: 16,
    },
    monthContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
})
export default TrainerIncome;