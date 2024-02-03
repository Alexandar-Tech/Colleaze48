import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const MulticolorBarChartExample = () => {
  const data = {
    labels: ['Present','Absent','Leave'],
    datasets: [
      {
        data: [0,50,100],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Purple
      },
    ],
  };

  return (
    <View style={styles.container}>
      <BarChart
        style={styles.chart}
        data={data}
        width={300}
        height={180}
        chartConfig={{
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          
        }}
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default MulticolorBarChartExample;
