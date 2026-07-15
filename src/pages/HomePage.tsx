import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from "react-native-vector-icons/Ionicons";


const HomePage = ({ navigation }: any) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 10 }}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{ flex: 0.3 }}>
                        <Image style={styles.imagelogo} source={require('../assets/images/logo.jpg')}></Image>
                    </View>
                    <View style={{ flex: 0.7, flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <TouchableOpacity onPress={() => navigation.navigate("Location")}>
                            <Ionicons style={[styles.iconring, { color: "red" }]} name="location-outline" size={30} color="#000000ff" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons style={styles.iconring1} name="notifications-outline" size={30} color="#000000ff" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                            <Ionicons style={styles.iconring} name="settings-outline" size={30} color="#000000ff" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.banner} >
                    <View>
                        <Text style={styles.bannerText1}>Hôm nay</Text>
                        <Text style={styles.bannerText2}>Buổi dạy sắp tới</Text>
                    </View>
                    <TouchableOpacity style={styles.btnView} onPress={() => navigation.navigate('Attendance')} >
                        <Text style={styles.btnViewText}>Xem </Text>
                        <Ionicons name="chevron-forward" size={16} color="#fff" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.title}>QUẢN LÝ</Text>

                <View style={styles.row}>
                    <TouchableOpacity onPress={() => navigation.navigate('Calendar')}  style={[
                        styles.card,
                        {
                            shadowColor: '#5B9DFF',
                            elevation: 40,
                        },
                    ]}>
                        <View style={[styles.iconBox, { backgroundColor: "#5B9DFF" }]}>
                            <Ionicons name="calendar-outline" size={28} color="#fff" />
                        </View>
                        <Text style={styles.cardText}>
                            Xem lịch dạy
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Workout')} 
                    style={[styles.card,{shadowColor: '#FF6B6B',elevation: 40,},]}>
                        <View style={[styles.iconBox, { backgroundColor: "#ea5b5b" }]}>
                            <Ionicons name="barbell-sharp" size={28} color="#fff" style={{ transform: [{ rotate: '135deg' }], }} />
                        </View>
                        <Text style={styles.cardText}>
                            Quản Lý Lịch 
                        </Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => navigation.navigate('MembersPage')} style={[
                        styles.card,
                        {
                            shadowColor: '#42D66D',
                            elevation: 40,
                        },
                    ]}>
                        <View style={[styles.iconBox, { backgroundColor: "#42D66D" }]}>
                            <Ionicons name="people-outline" size={28} color="#fff" />
                        </View>
                        <Text style={styles.cardText}>
                            Quản lí học viên
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('TrainerIncome')} style={[
                        styles.card,
                        {
                            shadowColor: '#FFC107',
                            elevation: 40,
                        },
                    ]}>
                        <View style={[styles.iconBox, { backgroundColor: "#FFC107" }]}>
                            <Ionicons name="cash-outline" size={28} color="#fff" style={{ transform: [{ rotate: '135deg' }], }} />
                        </View>
                        <Text style={styles.cardText}>
                            Thu nhập
                        </Text>
                    </TouchableOpacity>

                </View>


            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imagelogo: {
        width: wp('12%'),
        height: wp('12%'),
        margin: wp('4%'),
        borderRadius: wp('6%'),
    },
    iconring1: {
        marginTop: hp('4%'),
        marginRight: wp('2%'),
    },
    iconring: {
        marginTop: hp('4%'),
        marginRight: wp('2%'),
    },
    banner: {
        marginHorizontal: wp('4%'),
        marginTop: hp('1%'),
        padding: wp('4%'),
        borderRadius: 18,
        backgroundColor: '#6761db',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    bannerText1: {
        color: '#ddd',
        fontSize: 12,
    },

    bannerText2: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 4,
    },

    btnView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
    },

    btnViewText: {
        color: '#fff',
        marginRight: 4,
    },

    title: {
        marginLeft: wp('5%'),
        marginTop: hp('3%'),
        marginBottom: hp('1.5%'),
        fontSize: 15,
        fontWeight: '700',
        color: '#999',
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: wp('4%'),
        marginBottom: hp('2%'),
    },

    card: {
        width: wp('42%'),
        height: hp('16%'),
        backgroundColor: '#fff',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        // elevation: 8,

    },

    iconBox: {
        width: wp('14%'),
        height: wp('14%'),
        borderRadius: wp('4%'),
        justifyContent: 'center',
        alignItems: 'center',
    },

    cardText: {
        marginTop: hp('1.5%'),
        fontSize: 14,
        fontWeight: '600',
        color: '#222',
        textAlign: 'center',
    },
})
export default HomePage