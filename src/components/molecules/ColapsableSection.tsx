// libraries
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import styled from 'styled-components/native';

// components
import { CustomIcon, CustomText } from '@components/atoms';

// misc
import { genericStyles } from '@styles/genericStyles';
import { theme } from '@styles/themes';

type CollapsableSectionProps = {
  title: string;
  isExpandedByDefault?: boolean;
  backgroundColor?: string;
  isRead?: boolean;
  headerStyle?: ViewStyle;
};

export const CollapsableSection: React.FC<React.PropsWithChildren<CollapsableSectionProps>> = ({
  title,
  children,
  isExpandedByDefault = false,
  backgroundColor = theme.colors.cornflowerBlue,
  isRead,
  headerStyle,
}) => {
  // variables
  const [isExpanded, setIsExpanded] = useState(false);
  const aref = useAnimatedRef<View>();
  const heightRef = useRef<number>(0);
  const style = useAnimatedStyle(
    () => ({
      height: isExpanded ? withTiming(heightRef.current) : withTiming(0),
      opacity: isExpanded ? withTiming(1) : withTiming(0),
    }),
    [isExpanded],
  );
  const rotateStyle = useAnimatedStyle(() => {
    const rotate = interpolate(isExpanded ? 1 : 0, [0, 1], [0, 180], Extrapolate.CLAMP);

    return {
      transform: [{ rotate: `${rotate}deg` }],
    };
  }, [isExpanded]);

  // hooks
  useEffect(() => {
    setTimeout(() => {
      if (isExpandedByDefault) {
        setIsExpanded(true);
      }
    }, 1000);
  }, [isExpandedByDefault]);

  // functions
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  // returns
  return (
    <View style={genericStyles.fill}>
      <Header onPress={toggleExpansion} color={backgroundColor} style={headerStyle}>
        <TitleHeader>
          <CustomText opacity={isRead ? 0.5 : 1} font="bodyMedium">
            {title}
          </CustomText>
        </TitleHeader>

        <Animated.View style={[styles.chevronContainer, rotateStyle]}>
          <CustomIcon name="chevron-down" />
        </Animated.View>
      </Header>
      <Animated.View style={[styles.childrenContainer, style]}>
        <View
          ref={aref}
          onLayout={({
            nativeEvent: {
              layout: { height: h },
            },
          }) => (heightRef.current = h)}
          style={styles.childrenContainer}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

const Header = styled.Pressable<{ color: string }>(({ theme: { layout }, color }) => ({
  backgroundColor: color,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  paddingHorizontal: layout.padding_x2,
  paddingVertical: layout.padding_x1,
  ...genericStyles.rowWithCenter,
}));

const TitleHeader = styled.View({
  alignSelf: 'flex-start',
});

const styles = StyleSheet.create({
  chevronContainer: {},
  childrenContainer: {
    width: '100%',
  },
});
