import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarOD = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateSelect = (date) => {
    // Handle the selected date
    setSelectedDate(date.dateString);
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDateSelect}
        markedDates={{ [selectedDate]: { selected: true, disableTouchEvent: true, selectedColor: 'blue' } }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:'90%',
    padding:10
  },
});

export default CalendarOD;
