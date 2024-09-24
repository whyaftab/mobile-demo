// libraries
import React from "react";
import styled from "styled-components/native";

// components
import { SettingBtn } from "@components/molecules";

// misc
import { useHomeNavigation } from "@utils/navigation";
import { selectDynamicContent } from "./appSelectors";
import { useAppSelector } from "@redux/store";

export const LegalScreen = () => {
  // variables
  const { navigate } = useHomeNavigation();
  const dynamicContent = useAppSelector(selectDynamicContent);

  // hooks

  // functions

  // returns
  return (
    <Container>
      {!!dynamicContent?.privacy_policy && (
        <SettingBtn
          title="Privacy Policy"
          onPress={() =>
            navigate("htmlPage", {
              html: dynamicContent.privacy_policy,
              headerTitle: "Privacy Policy",
            })
          }
        />
      )}
      {!!dynamicContent?.data_protection && (
        <SettingBtn
          title="Data Protection"
          onPress={() =>
            navigate("htmlPage", {
              html: dynamicContent?.data_protection || "",
              headerTitle: "Data Protection",
            })
          }
        />
      )}

      {!!dynamicContent?.privacy_policy && (
        <SettingBtn
          title="Terms of Use"
          onPress={() =>
            navigate("htmlPage", {
              html: dynamicContent.terms_of_use,
              headerTitle: "Terms of Use",
            })
          }
        />
      )}

      {!!dynamicContent?.faq_content && (
        <SettingBtn
          title="FAQs"
          onPress={() =>
            navigate("htmlPage", {
              html: dynamicContent.faq_content,
              headerTitle: "FAQs",
            })
          }
        />
      )}
    </Container>
  );
};

const Container = styled.View(({ theme: { colors, layout } }) => ({
  backgroundColor: colors.secondaryBackground,
  flex: 1,
  paddingVertical: layout.padding_x4,
  paddingHorizontal: layout.padding_x1,
}));
