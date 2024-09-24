// libraries
import React from "react";
import styled, { useTheme } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useConfirm } from "@sj-distributor/react-native-confirm-modal";
import { useDispatch } from "react-redux";

// components
import { SettingBtn } from "@components/molecules";
import { CustomPressable, CustomText, DivColumn } from "@components/atoms";

// misc
import { useAccessCode } from "@context/AccessCodeProvider";
import { useHomeNavigation } from "@utils/navigation";
import { setAppData } from "./appSlice";
import cache from "@utils/cache";
import { APP_LOCAL_DATA } from "@utils/keys";
import { useAppSelector } from "@redux/store";
import { selectMyContentCategories } from "./appSelectors";

export const MyEapScreen = () => {
  // variables
  const { bottom } = useSafeAreaInsets();
  const { confirm } = useConfirm();
  const { colors, layout } = useTheme();
  const { resetAccessCode } = useAccessCode();
  const { navigate } = useHomeNavigation();
  const dispatch = useDispatch();
  const myContentCategories = useAppSelector(selectMyContentCategories);

  // functions
  const deleteData = async () => {
    dispatch(
      setAppData({
        article: {
          liked: [],
          bookmarked: [],
          recentlyVisited: [],
        },
        myContentCategories: null,
      })
    );
    await cache.remove(APP_LOCAL_DATA);
  };

  const triggerConfirmModal = async () => {
    const isOk = await confirm({
      title: "WARNING",
      confirmText: "Continue",
      description: `By continuing, all data will be purged from the App and anything saved if logged into the website version.`,
      containerStyle: {
        backgroundColor: colors.primary,
      },
      titleStyle: {
        color: colors.text,
        fontSize: 16,
        lineHeight: 24,
        fontWeight: "bold",
      },
      descriptionStyle: {
        color: "rgba(0, 0, 0, 0.6)",
        fontSize: 14,
        lineHeight: 21,
        fontWeight: "400",
        paddingHorizontal: layout.padding_x2,
        paddingVertical: layout.padding_x1,
      },
      confirmTextStyle: {
        color: colors.error,
      },
    });

    return isOk;
  };

  // returns
  return (
    <Container bottomInset={bottom}>
      <DivColumn>
        <SettingBtn
          title="View My Saved Selection"
          onPress={() =>
            navigate(
              myContentCategories ? "myContentFeed" : "myContentSelection"
            )
          }
        />
        <SettingBtn
          title="Recently Viewed"
          onPress={() => navigate("recentlyVisitedArticles")}
        />
        <SettingBtn
          title="My Likes"
          onPress={() => navigate("likedArticles")}
        />
        <SettingBtn
          title="My Bookmarks"
          onPress={() => navigate("bookmarkedArticles")}
        />
        <SettingBtn
          title="Logout"
          onPress={async () => {
            const isOk = await triggerConfirmModal();
            if (isOk) {
              deleteData();
              resetAccessCode();
            }
          }}
        />
      </DivColumn>

      <DeleteDataBtn
        onPress={async () => {
          const isOk = await triggerConfirmModal();
          if (isOk) {
            deleteData();
          }
        }}
      >
        <CustomText color="primary">Delete Data</CustomText>
      </DeleteDataBtn>
    </Container>
  );
};

const Container = styled.View<{ bottomInset: number }>(
  ({ theme: { colors, layout }, bottomInset }) => ({
    backgroundColor: colors.secondaryBackground,
    flex: 1,
    paddingVertical: layout.padding_x4,
    paddingHorizontal: layout.padding_x1,
    justifyContent: "space-between",
    paddingBottom: layout.padding_x4 + bottomInset,
  })
);

const DeleteDataBtn = styled(CustomPressable)(
  ({ theme: { colors, layout } }) => ({
    backgroundColor: colors.error,
    paddingVertical: layout.padding_x1,
    paddingHorizontal: layout.padding_x2,
    alignItems: "center",
  })
);
