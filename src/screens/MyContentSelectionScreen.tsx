// libraries
import React, { useCallback, useEffect, useState } from "react";
import styled, { useTheme } from "styled-components/native";
import { FlatList } from "react-native";
import { showMessage } from "react-native-flash-message";

// components
import { CustomText, SimpleButton, SpacerRow } from "@components/atoms";
import {
  CatWithSubListBtnProps,
  CatWithSubListBtn,
} from "@components/molecules";

// styles
import { genericStyles } from "@styles/genericStyles";

// misc
import { useAppDispatch, useAppSelector } from "@redux/store";
import {
  selectAllCategories,
  selectMyContentCategories,
} from "@screens/appSelectors";
import { setMyContentCategories } from "./appSlice";
import { useHomeNavigation } from "@utils/navigation";

export const MyContentSelectionScreen = () => {
  // variables
  const { layout } = useTheme();
  const data = useAppSelector(selectAllCategories);
  const [choosenCategories, setChoosenCategories] = useState<number[]>([]);
  const [choosenSubCategories, setChoosenSubCategories] = useState<
    number[] | null
  >([]);
  const dispatch = useAppDispatch();
  const myContentCategories = useAppSelector(selectMyContentCategories);
  const { navigate } = useHomeNavigation();

  // hooks
  useEffect(() => {
    if (myContentCategories) {
      const categories = Object.keys(myContentCategories).map((id) =>
        parseInt(id)
      );
      let subcategories = Object.values(myContentCategories).flat();

      setChoosenCategories(categories);
      setChoosenSubCategories(subcategories);
    }
  }, [myContentCategories]);

  // functions
  const toggleCategoyIds = (id: number, addOnly?: boolean) => {
    const currentIndex = choosenCategories.indexOf(id);
    let ids = [...choosenCategories];
    if (currentIndex > -1) {
      if (!addOnly) {
        ids.splice(currentIndex, 1);
      }
    } else {
      ids.push(id);
    }
    setChoosenCategories(ids);
  };

  const toggleSubcategoyIds: CatWithSubListBtnProps["onSelectSubCategory"] = (
    catId,
    subcatId
  ) => {
    const currentIndex = choosenSubCategories?.indexOf(subcatId || 1);
    // remove choosen subcategories of particular because it all is selected
    let ids = [...(choosenSubCategories || [])];
    toggleCategoyIds(catId, true);
    if (subcatId === null && data) {
      const subcategoryIds = data
        ?.find((cat) => cat.id === catId)
        ?.subcategories.map((subcat) => subcat.id);
      ids = ids.filter((id) => !subcategoryIds?.includes(id || 1));
    } else if (currentIndex && currentIndex > -1) {
      ids.splice(currentIndex, 1);
    } else {
      ids.push(subcatId || 1);
    }

    setChoosenSubCategories(ids);
  };

  const onClear = () => {
    setChoosenCategories([]);
    setChoosenSubCategories([]);
  };

  const onSaveClick = () => {
    if (choosenCategories.length === 0) {
      showMessage({
        message: "Please select atleast one category to continue!",
        type: "danger",
      });
    } else {
      const selectedCategories: { [catId: number]: number[] | null } =
        choosenCategories.reduce((acc, catId) => {
          const subCategories = data
            ?.find((cat) => cat.id === catId)
            ?.subcategories.map((subcat) =>
              choosenSubCategories?.includes(subcat?.id) ? subcat.id : null
            )
            .filter((id) => id);

          return {
            ...acc,
            [catId]: subCategories?.length ? subCategories : null,
          };
        }, {});

      dispatch(setMyContentCategories(selectedCategories));
      navigate("myContentFeed");
    }
  };

  // returns
  const renderHeader = useCallback(
    () => (
      <HeaderContainer>
        <CustomText>
          If you prefer to see your own choice of content then select from the
          categories and sub categories below and select save. You can get to
          your selection from the home page using the button "My Content" that
          appears when you save a selection.{" "}
          <CustomText font="bodyBold">
            Choose below to create your selection and use 'SAVE' to create your
            selection:
          </CustomText>
        </CustomText>
      </HeaderContainer>
    ),
    []
  );

  const renderFooter = useCallback(
    () => (
      <FooterContainer>
        <SimpleButton title="Clear" onPress={onClear} />
        <SpacerRow size={2} />
        <SimpleButton title="Save" onPress={onSaveClick} />
      </FooterContainer>
    ),
    [choosenCategories, choosenSubCategories]
  );

  return (
    <FlatList
      data={data}
      ListHeaderComponent={renderHeader()}
      renderItem={({ item }) => (
        <CatWithSubListBtn
          catId={item.id}
          title={item.name}
          subcategories={item.subcategories}
          selectedCategoryId={choosenCategories}
          selectedSubCategoryId={choosenSubCategories}
          onSelectCategory={toggleCategoyIds}
          onSelectSubCategory={toggleSubcategoyIds}
        />
      )}
      ListFooterComponent={renderFooter()}
      contentContainerStyle={{
        paddingHorizontal: layout.padding_x2,
        paddingBottom: layout.padding_x4,
      }}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const HeaderContainer = styled.View(({ theme: { layout } }) => ({
  ...genericStyles.rowWithCenter,
  justifyContent: "space-between",
  width: "100%",
  padding: layout.padding_x2,
}));

const FooterContainer = styled.View(({ theme: { layout } }) => ({
  ...genericStyles.row,
  paddingTop: layout.padding_x2,
  hieght: 40,
}));
