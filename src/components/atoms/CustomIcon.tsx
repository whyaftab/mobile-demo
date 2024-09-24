// libraries
import React, { useCallback } from "react";
import { SvgProps } from "react-native-svg";
import styled, { useTheme } from "styled-components/native";
import { Shadow } from "react-native-shadow-2";
import FeatherIcon from "@expo/vector-icons/Feather";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome5";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";
import IoniconsIcon from "@expo/vector-icons/Ionicons";
import { PressableProps } from "react-native";
import FontawesomeIcons from "@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/FontAwesome5Free.json";

// components
import { CustomPressable } from "./CustomPressable";
import { ConditionalWrap } from "./ConditionalWrap";
import { Loading } from "./Loading";

// misc
import { ColorPalette } from "@styles/types";

// types

export type IconNames = keyof typeof FontawesomeIcons;

export type IconTypeProps =
  | { name: keyof typeof FeatherIcon.glyphMap; type?: "feather" }
  | { name: keyof typeof FontawesomeIcons; type?: "fontawesome" }
  | { name: keyof typeof MaterialIcon.glyphMap; type?: "material" }
  | { name: keyof typeof IoniconsIcon.glyphMap; type?: "ionic" };

export type IconProps = SvgProps &
  IconTypeProps & {
    containerStyle?: PressableProps["style"];
    isError?: boolean;
    isDisabled?: boolean;
    raised?: boolean;
    reverse?: boolean;
    color?: ColorPalette;
    isLoading?: boolean;
    size?: number;
  };

export const CustomIcon = ({
  isError,
  isDisabled,
  raised,
  onPress,
  reverse,
  isLoading,
  size = 20,
  color,
  containerStyle,
  type = "feather",
  name,
  ...restProps
}: IconProps) => {
  // variables
  const { colors } = useTheme();

  // functions
  const getIconColor = () => {
    if (reverse) return colors.white;
    else if (isDisabled) return colors.primary50;
    else if (isError) return colors.error;
    else if (color) return colors[color];
    return colors.text;
  };

  const getBgColor = () => {
    if (reverse) return colors[color] || colors.primary;
    return colors.white;
  };

  // renders
  const Icon = useCallback(() => {
    let IconType;
    switch (type) {
      case "fontawesome":
        IconType = FontAwesomeIcon;
        break;

      case "material":
        IconType = MaterialIcon;
        break;

      case "ionic":
        IconType = IoniconsIcon;
        break;

      default:
        IconType = FeatherIcon;
        break;
    }

    return (
      <IconType
        name={name}
        color={getIconColor()}
        size={size}
        style={{ width: size, height: size }}
        onPress={onPress}
        {...restProps}
      />
    );
  }, [name, size, color, type]);

  return (
    <ConditionalWrap
      condition={onPress !== undefined}
      wrap={(children) => (
        <CustomPressable
          hitSlop={!raised ? 10 : undefined}
          pressableStyle={containerStyle}
          onPress={onPress}
        >
          {children}
        </CustomPressable>
      )}
    >
      <ConditionalWrap
        condition={raised}
        wrap={(children) => (
          <Shadow
            distance={1}
            style={{
              borderTopLeftRadius: 100,
              borderTopRightRadius: 100,
              borderBottomLeftRadius: 100,
              borderBottomRightRadius: 100,
            }}
            sides={{ top: true, bottom: true, end: true, start: true }}
          >
            <Container color={getBgColor()} reverse={reverse}>
              {children}
            </Container>
          </Shadow>
        )}
      >
        {isLoading ? <Loading color={getIconColor()} /> : <Icon />}
      </ConditionalWrap>
    </ConditionalWrap>
  );
};

const Container = styled.View<{ reverse?: boolean; color: string }>(
  ({ theme: { layout }, color }) => ({
    // ...genericStyles.shadow,
    backgroundColor: color,
    padding: layout.padding_x1_5,
    borderRadius: 500,
  })
);
