import React, { useState } from 'react'
import {
  View, Text, SafeAreaView, Animated, StyleSheet, Dimensions, Platform, TouchableOpacity
} from 'react-native'
import {
  CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell
} from 'react-native-confirmation-code-field'

const { Value, Text: AnimatedText } = Animated;

const { width } = Dimensions.get('window');

const CELL_COUNT = 4;
const CELL_SIZE = 60;
const CELL_BORDER_RADIUS = 8;

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));

const animateCell = ({ hasValue, index, isFocused }) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      toValue: isFocused ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }),
    Animated.spring(animationsScale[index], {
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
      useNativeDriver: true,
    }),
  ]).start();
};

const OTPInputScreen = ({ navigation }) => {
  const [value, setValue] = useState('');

  const ref = useBlurOnFulfill({
    value,
    cellCount: CELL_COUNT,
  });

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const onPressContinue = () => {
    navigation.navigate('PasswordInput')
  };

  const renderCell = ({ index, symbol, isFocused }) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    }

    setTimeout(() => {
      animateCell({ hasValue, index, isFocused });
    }, 0);

    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textTitle}>Step 2 of 3</Text>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Enter the code you received to verify</Text>
        <CodeField
          ref={ref}
          value={value}
          {...props}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeField}
          keyboardType="number-pad"
          renderCell={renderCell}
          textContentType="oneTimeCode"
          secureTextEntry
          onChangeText={setValue}
        />
      </View>
      <View style={styles.viewBottom}>
        <TouchableOpacity style={styles.button} onPress={onPressContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff'
  },
  textTitle: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    textAlign: 'left',
    color: '#555',
    letterSpacing: 1,
  },
  wrapper: {
    flex: 1,
    width: width,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#333',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  codeField: {
    height: CELL_SIZE,
    marginTop: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  cell: {
    marginHorizontal: 8,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 5,
    ...Platform.select({ web: { lineHeight: 65 } }),
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: CELL_BORDER_RADIUS,
    color: '#0db665',
    backgroundColor: '#fff',

    // IOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.5,

    // Android
    elevation: 2,
  },
  viewBottom: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 40,
  },
  button: {
    width: width - 40,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0db665',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    alignItems: 'center',
  },
})

export default OTPInputScreen
