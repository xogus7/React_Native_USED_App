import { SafeAreaView, Text, View } from "react-native";
import BasicHeader from "@components/BasicHeader";

const MyPage = () => {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <BasicHeader title={'MyPage'}/>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>MyPage</Text>
        </View>
        </SafeAreaView>
    )
}

export default MyPage;