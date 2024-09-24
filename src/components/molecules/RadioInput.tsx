// libraries
import React, { useMemo, useRef } from "react";
import styled from "styled-components/native";
import {
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
  useController,
  useWatch,
} from "react-hook-form";
import { View, ViewStyle } from "react-native";

// components
import {
  CustomText,
  InputProps,
  RadioButton,
  SpacerColumn,
} from "@components/atoms";

// styles
import { layout } from "@styles/layout";
import { DEFAULT_FORM_ERRORS } from "@utils/errors";

export type RadioInputDataType<T> = {
  label: string;
  value: PathValue<T, Path<T>>;
}[];

export interface RadioInputProps<T extends FieldValues> extends InputProps<T> {
  data: RadioInputDataType<T>;
  onChangeValue: UseFormSetValue<T>;
  onChange?: () => void;
  title: string;
  containerStyle?: ViewStyle;
}

export const RadioInput = <T extends FieldValues>({
  data,
  onChangeValue,
  onChange,
  title,
  containerStyle,
  name,
  control,
  defaultValue,
  rules,
  ...restProps
}: RadioInputProps<T>) => {
  // variables
  //   const value = useWatch({ control: restProps.control, name: restProps.name });
  const { field, fieldState } = useController<T>({
    name,
    control,
    rules,
    defaultValue,
  });

  const fieldError = useMemo(() => {
    if (fieldState.error) {
      if (fieldState.error?.message) {
        return fieldState.error?.message;
      }
      return DEFAULT_FORM_ERRORS.required;
    }
  }, [fieldState.error]);

  // returns
  return (
    <Container>
      <CustomText size={14} font="bodyBold" color="primary">
        {title}
      </CustomText>

      <SpacerColumn size={2} />
      {data.map((item) => (
        <View
          key={item.value}
          style={{
            paddingBottom: layout.padding_x2,
          }}
        >
          <RadioButton
            onPress={() => {
              field.onChange(item.value);
              onChange && onChange();
            }}
            label={item.label}
            value={item.value === field.value}
          />
        </View>
      ))}
      <CustomText color="error">{fieldError}</CustomText>
    </Container>
  );
};

const Container = styled.View(({ theme: { colors, layout } }) => ({}));
