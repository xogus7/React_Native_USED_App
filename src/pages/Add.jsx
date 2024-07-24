import { SafeAreaView, Text, View } from "react-native";
import BasicHeader from "@components/BasicHeader";

const Add = () => {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <BasicHeader title={'Add'}/>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Add</Text>
        </View>
        </SafeAreaView>
    )
}

export default Add;