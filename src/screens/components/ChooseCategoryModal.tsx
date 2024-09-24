// libraries
import React, { useCallback } from "react";
import styled, { useTheme } from "styled-components/native";
import { FlatList } from "react-native";

// components
import {
  CatWithSubListBtnProps,
  CustomModal,
  CustomModalProps,
} from "@components/molecules";
import { CustomIcon, CustomText, DivRow, SpacerRow } from "@components/atoms";
import { CatWithSubListBtn } from "@components/molecules";

// styles
import { genericStyles } from "@styles/genericStyles";

// misc
import { useAppSelector } from "@redux/store";
import { selectAllCategories } from "@screens/appSelectors";

interface ChooseCategoryModalProps
  extends Pick<CustomModalProps, "isVisible" | "onClose">,
    Pick<
      CatWithSubListBtnProps,
      | "selectedCategoryId"
      | "selectedSubCategoryId"
      | "onSelectCategory"
      | "onSelectSubCategory"
    > {}

export const ChooseCategoryModal: React.FC<ChooseCategoryModalProps> = ({
  isVisible,
  onClose,
  selectedCategoryId,
  selectedSubCategoryId,
  onSelectCategory,
  onSelectSubCategory,
}) => {
  // variables
  const { layout } = useTheme();
  const data = useAppSelector(selectAllCategories);

  // hooks

  // functions

  // returns
  const renderHeader = useCallback(
    () => (
      <HeaderContainer>
        <DivRow flex={1}>
          <CustomIcon name="heart" color="text" />
          <SpacerRow size={1} />
          <CustomText>
            Select a category or use the drop down arrows for more focussed
            content...
          </CustomText>
        </DivRow>
        <SpacerRow size={4} />
        <CustomIcon name="x" size={30} color="text" onPress={onClose} />
      </HeaderContainer>
    ),
    []
  );

  return (
    <CustomModal
      isVisible={isVisible}
      renderHeader={renderHeader}
      onClose={onClose}
    >
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <CatWithSubListBtn
            catId={item.id}
            title={item.name}
            subcategories={item.subcategories}
            selectedCategoryId={selectedCategoryId}
            selectedSubCategoryId={selectedSubCategoryId}
            onSelectCategory={onSelectCategory}
            onSelectSubCategory={onSelectSubCategory}
          />
        )}
        contentContainerStyle={{ paddingHorizontal: layout.padding_x2 }}
        keyExtractor={(item) => item.id.toString()}
      />
    </CustomModal>
  );
};

const Container = styled.View(({ theme: { colors } }) => ({
  backgroundColor: colors.primaryBackground,
  flex: 1,
}));

const HeaderContainer = styled.View(({ theme: { layout } }) => ({
  ...genericStyles.rowWithCenter,
  justifyContent: "space-between",
  width: "100%",
  padding: layout.padding_x2,
}));
