import { StyleSheet, Text, View } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from "react-native-vector-icons/Ionicons";


const MemberProgress = () => {
    return(
        <View style={styles.container}>
            <Text>Tiến độ làm ở đây </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent:"center",
        alignItems: "center",
        flex: 1
    }
})
export default MemberProgress;