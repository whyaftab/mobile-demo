// libraries
import React, { useEffect, useMemo, useRef } from "react";
import styled, { useTheme } from "styled-components/native";
import {
  AutocompleteDropdown,
  AutocompleteDropdownRef,
  TAutocompleteDropdownItem,
} from "react-native-autocomplete-dropdown";

// components
import { CustomText, SpacerColumn } from "@components/atoms";
import { useAppSelector } from "@redux/store";
import { selectAllArticles } from "./appSelectors";
import { useHomeNavigation } from "@utils/navigation";
import { ArticleType } from "@api/types";

// misc
export const SearchScreen = () => {
  // variables
  const allArticles = useAppSelector(selectAllArticles);
  const navigation = useHomeNavigation();
  const { navigate } = navigation;
  const { layout } = useTheme();
  const searchRef = useRef<AutocompleteDropdownRef>(null);

  const data: TAutocompleteDropdownItem[] = useMemo(
    () =>
      (allArticles || [])?.map((item) => ({
        id: item.id.toString(),
        title: item.title,
        type: item.type,
      })),
    [allArticles]
  );

  // hooks
  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      // do something
      console.log(searchRef.current.close());

      // searchRef.current?.close();
    });

    return unsubscribe;
  }, [navigation]);

  // functions
  const onSelectItem = (
    item: TAutocompleteDropdownItem & { type: ArticleType }
  ) => {
    if (item?.id) {
      navigate("articleDetail", { id: parseInt(item.id), type: item.type });
    }
  };

  // returns
  return (
    <Container>
      <CustomText>
        <CustomText font="bodyBold">
          Please use the box below and enter keywords to find our content.{" "}
        </CustomText>
        If you can't find what you are looking for then please browse our
        categories.
      </CustomText>
      <SpacerColumn size={3} />

      <AutocompleteDropdown
        controller={(controller) => {
          searchRef.current = controller;
        }}
        onSelectItem={onSelectItem}
        textInputProps={{
          placeholder: "Enter text to search",
        }}
        dataSet={data}
        suggestionsListMaxHeight={layout.window.height * 0.6}
        containerStyle={{ flex: 1 }}
      />
    </Container>
  );
};

const Container = styled.View(({ theme: { colors, layout } }) => ({
  backgroundColor: colors.primaryBackground,
  flex: 1,
  padding: layout.padding_x4,
}));
