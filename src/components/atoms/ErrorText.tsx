// libraries
import React, { useEffect, useRef, useState } from 'react';
import { TextProps, View } from 'react-native';
import Animated, { useAnimatedRef, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { CustomText } from './CustomText';

interface ErrorTextProps extends TextProps {
  center?: boolean;
}

// error text component to be used by input elements
export const ErrorText: React.FC<ErrorTextProps> = ({ children, style, ...restProps }) => {
  // variables
  const aref = useAnimatedRef<View>();
  const heightRef = useRef<number>(0);
  const [isExpandable, setIsExpandable] = useState(false);
  const animStyle = useAnimatedStyle(
    () => ({
      height: isExpandable ? withTiming(heightRef.current) : withTiming(0),
      opacity: isExpandable ? withTiming(1) : withTiming(0),
    }),
    [isExpandable],
  );

  // hooks
  useEffect(() => {
    // fix for height not calculating
    if (children) {
      setTimeout(() => {
        setIsExpandable(true);
      }, 200);
    } else {
      setIsExpandable(false);
    }
  }, [children]);

  // returns
  return (
    <Animated.View style={animStyle}>
      <View
        ref={aref}
        onLayout={({
          nativeEvent: {
            layout: { height: h },
          },
        }) => (heightRef.current = h)}>
        <CustomText color="error" style={style} {...restProps}>
          {children}
        </CustomText>
      </View>
    </Animated.View>
  );
};
