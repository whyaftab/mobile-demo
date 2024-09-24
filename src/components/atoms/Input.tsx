/* eslint-disable react/display-name */
import React, { forwardRef, Ref, useMemo } from "react";
import {
  RegisterOptions,
  useController,
  Control,
  Path,
  PathValue,
  FieldValues,
} from "react-hook-form";
import {
  NativeSyntheticEvent,
  StyleProp,
  TextInput as RNTextInput,
  TextInputKeyPressEventData,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import styled, { useTheme } from "styled-components/native";

// components
import { CustomIcon, IconNames } from "./CustomIcon";
import { SpacerColumn, SpacerRow } from "./Spacer";

// misc
import { fonts } from "@styles/fonts";
import { CustomText } from "./CustomText";
import { DEFAULT_FORM_ERRORS } from "@utils/errors";

export interface InputProps<T extends FieldValues>
  extends Omit<TextInputProps, "accessibilityRole" | "defaultValue"> {
  icon?: IconNames;
  placeHolder?: string;
  style?: StyleProp<ViewStyle>;
  onPressEnter?: () => void;
  disabled?: boolean;
  control?: Control<T>;
  name: Path<T>;
  rules?: Omit<RegisterOptions, "valueAsNumber" | "valueAsDate" | "setValueAs">;
  defaultValue?: PathValue<T, Path<T>>;
  containerStyle?: ViewStyle;
  error?: string;
  displayValue?: string;
  title: string;
  inputContainerStyle?: ViewStyle;
}

interface InputStyleProps
  extends Omit<
    InputProps<unknown>,
    | "onPressEnter"
    | "name"
    | "control"
    | "defaultValue"
    | "rules"
    | "containerStyle"
    | "error"
  > {
  handleKeyPress?: (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => void;
  handleChangeText?(value: string): void;
}

// only styling for component
export const InputStyle = forwardRef<RNTextInput, InputStyleProps>(
  (
    {
      placeHolder,
      children,
      disabled,
      icon,
      displayValue,
      value,
      handleKeyPress,
      handleChangeText,
      title,
      inputContainerStyle,
      ...restProps
    },
    ref
  ) => {
    const { colors, layout } = useTheme();

    return (
      <>
        <CustomText>{title}</CustomText>
        <SpacerColumn size={1} />
        <InputContainer style={inputContainerStyle}>
          {icon && (
            <>
              <CustomIcon name={icon} color="text" />
              <SpacerRow size={1.5} />
            </>
          )}
          <View
            style={{
              flex: 1,
              marginRight: children ? layout.padding_x1_5 : undefined,
              justifyContent: "center",
            }}
          >
            <TextInput
              ref={ref}
              editable={!disabled}
              placeholder={placeHolder}
              onChangeText={handleChangeText}
              onKeyPress={handleKeyPress}
              placeholderTextColor={colors.silver}
              value={displayValue || value}
              {...restProps}
            />
          </View>

          <>{children}</>
        </InputContainer>
      </>
    );
  }
);

// input functionality component with react hook form
const InputInner = <T extends FieldValues>(
  {
    onPressEnter,
    name,
    control,
    defaultValue,
    rules,
    containerStyle,
    error,
    ...restProps
  }: InputProps<T>,
  ref?: Ref<RNTextInput>
) => {
  // variables
  const { field, fieldState } = useController<T>({
    name,
    control,
    rules,
    defaultValue,
  });
  const { layout } = useTheme();

  // hooks

  const fieldError = useMemo(() => {
    if (fieldState.error) {
      if (fieldState.error?.message) {
        return fieldState.error?.message;
      }
      return DEFAULT_FORM_ERRORS.required;
    }
  }, [fieldState.error]);
  console.log("fieldError", fieldError);

  // custom validation
  const handleChangeText = (value: string) => {
    field.onChange(value);
    if (restProps?.onChangeText) {
      restProps.onChangeText(value);
    }
  };

  // Handling key pressing
  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => {
    const {
      nativeEvent: { key: keyValue },
    } = event;
    switch (keyValue) {
      case "Enter":
        if (onPressEnter) onPressEnter();
    }
  };

  return (
    <MainContainer style={containerStyle}>
      <InputStyle
        ref={ref}
        handleKeyPress={handleKeyPress}
        handleChangeText={handleChangeText}
        {...restProps}
        value={field.value || ""}
      />
      <CustomText color="error">{error || fieldError}</CustomText>
    </MainContainer>
  );
};

// input type assertion for forwardref
export const Input = React.forwardRef(InputInner) as <T extends FieldValues>(
  p: InputProps<T> & { ref?: Ref<RNTextInput> }
) => React.ReactElement;

const MainContainer = styled.View({ width: "100%" });

const InputContainer = styled.View(({ theme: { colors, layout } }) => ({
  borderColor: colors.alto,
  borderWidth: 1,
  backgroundColor: colors.white,
  // flex: 1,
  borderRadius: 10,
  paddingVertical: layout.padding_x2,
  paddingHorizontal: layout.padding_x3,
  minHeight: 55,
  justifyContent: "center",
  flexDirection: "row",
}));

const TextInput = styled.TextInput(({ theme: { colors } }) => ({
  flex: 1,
  color: colors.text,
  fontFamily: fonts.family.bodyRegular,
}));
