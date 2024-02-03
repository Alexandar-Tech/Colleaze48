import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import moment from 'moment'
import Date from './Date'

const Calendar = ({ onSelectDate, selected }) => {
  const [dates, setDates] = useState([])

  const getDates = () => {
    const _dates = []
    for (let i = -3; i < 20; i++) {
      const date = moment().add(i, 'days')
      _dates.push(date)
    }
    setDates(_dates)
  }

  useEffect(() => {
    getDates()
  }, [])

  return (
    <>
      <View style={styles.dateSection}>
        <View style={styles.scroll}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {dates.map((date, index) => (
              <Date
                key={index}
                date={date}
                onSelectDate={onSelectDate}
                selected={selected}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  )
}

export default Calendar

const styles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateSection: {
    width: '100%',
    padding: 20,
  },
  scroll: {
    height: 150,
  },
})