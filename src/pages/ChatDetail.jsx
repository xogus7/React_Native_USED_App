import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import BasicHeader from '@components/BasicHeader';

const ChatDetail = ({route}) => {
  const [otherUser, setOtherUser] = useState();
  const [messages, setMessages] = useState([]);
  const user = route.params.user;
  useEffect(() => {
    fetchOtherUser(route.params.user);
    fetchMessages(route.params.user);
    console.log(user)
    async function fetchOtherUser(user) {
      setOtherUser({
        _id: user.id,
        name: user.nickname,
        avatar: user.profileImage,
      });
    }

    async function fetchMessages(user) {
      setMessages([
        {
          _id:  2,
          text: 'Message text',
          createdAt: new Date(),
          user: {
            _id: user.id,
            name: user.nickname,
            avatar: user.profileImage,
          },
        },
      ]);
    }
  }, [route.params.id]);

  const onSend = useCallback((sendMessages) => {
    setMessages(prevMessages => [...sendMessages, ...prevMessages]);
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <BasicHeader
        title={`${user.nickname}님과의 대화`}
      />
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={onSend}
        user={{
          _id: 1,
          name: 'name',
          avatar: user.profileImage,
        }}
      />
    </SafeAreaView>
  );
};



export default ChatDetail;