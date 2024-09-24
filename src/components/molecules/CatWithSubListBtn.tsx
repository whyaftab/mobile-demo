// libraries
import React, { useReducer } from "react";
import styled, { useTheme } from "styled-components/native";

// components
import {
  CustomIcon,
  DivColumn,
  DivRow,
  SelectableButton,
  SpacerColumn,
  SpacerRow,
} from "@components/atoms";

// misc
import { Subcategory } from "@api/types";

// types
export type CatWithSubListBtnProps = {
  catId: number;
  title: string;
  subcategories: Subcategory[];
  selectedCategoryId: number | number[];
  selectedSubCategoryId: number | number[] | null;
  onSelectCategory: (id: number) => void;
  onSelectSubCategory: (catId: number, subCatId: number | null) => void;
};

export const CatWithSubListBtn: React.FC<CatWithSubListBtnProps> = ({
  catId,
  title,
  subcategories,
  selectedCategoryId,
  selectedSubCategoryId,
  onSelectSubCategory,
  onSelectCategory,
}) => {
  // variables
  const { layout } = useTheme();
  const [isSubSectionVisible, toggleSubSection] = useReducer(
    (oldValue) => !oldValue,
    !!subcategories.find((subId) => subId.id === selectedSubCategoryId)
  );
  const isCategorySelected =
    typeof selectedCategoryId === "number"
      ? catId === selectedCategoryId
      : selectedCategoryId.includes(catId);

  // renders
  return (
    <Container>
      <DivRow width="80%" marginBottom={layout.padding_x2}>
        <DivColumn width="100%">
          <SelectableButton
            title={title}
            isSelected={isCategorySelected}
            onPress={() => onSelectCategory(catId)}
          />
        </DivColumn>
        <SpacerRow size={2} />
        {subcategories.length > 0 && (
          <CustomIcon
            name="chevron-down"
            color="secondary"
            size={30}
            onPress={toggleSubSection}
          />
        )}
      </DivRow>

      {isSubSectionVisible === true && (
        <DivColumn width="100%" alignItems="flex-end">
          {subcategories.map((item) => (
            <DivColumn key={item.id} width="50%">
              <SelectableButton
                title={item.name}
                isSelected={
                  typeof selectedSubCategoryId === "number"
                    ? selectedSubCategoryId === item.id
                    : selectedSubCategoryId?.includes(item.id)
                }
                onPress={() => onSelectSubCategory(catId, item.id)}
              />
              <SpacerColumn size={2} />
            </DivColumn>
          ))}

          <DivColumn width="50%">
            <SelectableButton
              title="ALL"
              onPress={() => onSelectSubCategory(catId, null)}
              isSelected={
                typeof selectedSubCategoryId === "number"
                  ? selectedSubCategoryId === null
                  : !subcategories.find((sub) =>
                      selectedSubCategoryId?.includes(sub.id)
                    ) && isCategorySelected
              }
            />
            <SpacerColumn size={2} />
          </DivColumn>
        </DivColumn>
      )}
    </Container>
  );
};

const Container = styled.View(({}) => ({}));

const HeadingBtn = styled.View(({ theme: { colors, layout } }) => ({}));
