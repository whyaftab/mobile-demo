// libraries
import { FlashList } from "@shopify/flash-list";
import React, { useCallback, useEffect, useState } from "react";
import { Article } from "@api/types";
import styled from "styled-components/native";
import { useWindowDimensions } from "react-native";

// components
import { CustomText, EtcFooter, SpacerColumn } from "@components/atoms";
import { ContentCard } from "@components/molecules";

// misc
import { useHomeNavigation } from "@utils/navigation";

// types
export type ArticleListProps = {
  data: Article[];
};

export const ArticleList: React.FC<ArticleListProps> = ({ data }) => {
  // variables
  const [dataSlice, setDataSlice] = useState<Article[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const { navigate } = useHomeNavigation();
  const { height, width } = useWindowDimensions();

  // hooks
  useEffect(() => {
    loadMore(true);
  }, [data.length]);

  // functions
  const loadMore = (reset?: boolean) => {
    if (dataSlice.length !== data.length) {
      const ITEMS_PER_PAGE = 20; // what is the batch size you want to load.
      if (reset) {
        setPageNumber(1);
        const start = 0 * ITEMS_PER_PAGE;
        const end = 1 * ITEMS_PER_PAGE - 1;

        const newData = data && data.slice(start, end); // here, we will receive next batch of the items
        setDataSlice([...newData]); // here we are appending new batch to existing batch
      } else {
        setPageNumber((prev) => prev + 1);
        const start = pageNumber * ITEMS_PER_PAGE;
        const end = (pageNumber + 1) * ITEMS_PER_PAGE - 1;

        const newData = data && data.slice(start, end); // here, we will receive next batch of the items
        setDataSlice([...dataSlice, ...newData]); // here we are appending new batch to existing batch
      }
    }
  };

  // returns
  const renderItem = useCallback(
    ({ item }) => (
      <ContentCard
        {...item}
        onPress={() =>
          navigate("articleDetail", { id: parseInt(item.id), type: item.type })
        }
      />
    ),
    []
  );

  const renderEmptyFooter = useCallback(
    () => (
      <EmptyContainer>
        <CustomText textAlign="center" font="bodyBold">
          Sorry no result found!
        </CustomText>
      </EmptyContainer>
    ),
    []
  );

  return (
    <FlashList<Article>
      data={dataSlice}
      renderItem={renderItem}
      extraData={[width, height]}
      ListFooterComponent={data.length ? EtcFooter : renderEmptyFooter}
      keyExtractor={(item) => item.id.toString() + item.type}
      ItemSeparatorComponent={() => <SpacerColumn size={3} />}
      onEndReached={loadMore}
      estimatedItemSize={170}
      onEndReachedThreshold={0.5}
    />
  );
};

const EmptyContainer = styled.View(({ theme: { colors, layout } }) => ({
  padding: layout.padding_x2,
}));
