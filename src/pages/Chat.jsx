import { SafeAreaView, Text, View } from "react-native";
import BasicHeader from "@components/BasicHeader";

const Chat = () => {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <BasicHeader title={'Chat'}/>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Chat</Text>
        </View>
        </SafeAreaView>
    )
}

export default Chat;