// libraries
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { RouteProp, useRoute } from "@react-navigation/native";

// components
import { ArticleList } from "@components/organisms";
import { ChooseCategoryModal } from "./components/ChooseCategoryModal";

// misc
import { useAppSelector } from "@redux/store";
import {
  selectCategoryArticles,
  selectCategoryById,
  selectSubCategoryById,
} from "./appSelectors";
import { HomeStackParamList } from "@utils/navigation";
import { useDynamicHeader } from "@context/DynamicHeaderProvider";

export const ArticlesListScreen = () => {
  // variables
  const {
    params: { categoryId },
  } = useRoute<RouteProp<HomeStackParamList, "articles">>();
  const [selectedCatAndSubCatIds, setSelectedCatAndSubCatIds] = useState<{
    categoryId: number;
    subCategoryId: null | number;
  }>({
    categoryId: categoryId,
    subCategoryId: null,
  });
  const category = useAppSelector((state) =>
    selectCategoryById(state, selectedCatAndSubCatIds.categoryId)
  );
  const subcategory = useAppSelector((state) =>
    selectSubCategoryById(
      state,
      selectedCatAndSubCatIds.categoryId,
      selectedCatAndSubCatIds.subCategoryId
    )
  );

  const { setTitle, rightChevronToggled, toggleRightChevron } =
    useDynamicHeader();

  const data = useAppSelector((state) =>
    selectCategoryArticles(
      state,
      selectedCatAndSubCatIds.categoryId,
      selectedCatAndSubCatIds.subCategoryId
    )
  );

  // hooks
  useEffect(() => {
    if (subcategory?.name) {
      setTitle(subcategory?.name);
    } else {
      setTitle(category?.name || "Category");
    }

    return () => setTitle("");
  }, [category?.name, subcategory?.name]);

  // returns
  return (
    <Container>
      <ArticleList data={data} />

      <ChooseCategoryModal
        isVisible={rightChevronToggled}
        onClose={toggleRightChevron}
        selectedCategoryId={selectedCatAndSubCatIds.categoryId}
        selectedSubCategoryId={selectedCatAndSubCatIds.subCategoryId}
        onSelectCategory={(id) =>
          setSelectedCatAndSubCatIds({
            categoryId: id,
            subCategoryId: null,
          })
        }
        onSelectSubCategory={(catId, subCatId) =>
          setSelectedCatAndSubCatIds({
            categoryId: catId,
            subCategoryId: subCatId,
          })
        }
      />
    </Container>
  );
};

const Container = styled.View(({ theme: { colors } }) => ({
  backgroundColor: colors.secondaryBackground,
  flex: 1,
}));
