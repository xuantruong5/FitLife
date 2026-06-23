import { Image, View } from "react-native"

const Onloading = ({navigation}: any)=> {
    return (
        <View style={{flex:1, justifyContent: "center", alignItems:"center"}}>
            <Image style={{width:250, height:250}} source={require('../assets/images/logo.jpg')}  ></Image>
        </View>
    )
} 
export default Onloading;