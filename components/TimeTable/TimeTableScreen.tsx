import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

const TimetableScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>Show Modal</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide" // You can change the animation type as needed
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20 }}>
            <Text>Modal Content</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text>Close Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TimetableScreen;
