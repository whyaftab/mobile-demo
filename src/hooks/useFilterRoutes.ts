// libraries
import { useMemo } from "react";
import { RouteItem } from "@utils/navigation";

// misc
import { useAccessCode } from "@context/AccessCodeProvider";

export const useFilterRoutes = <T>(routes: RouteItem<T>[]) => {
  // variables
  const { accessCode } = useAccessCode();

  // hooks
  const modifyStack = useMemo(
    () =>
      routes.filter(({ forRole }) =>
        accessCode ? forRole != "only-guest" : forRole != "only-loggedin-user"
      ),
    [accessCode]
  );

  // returns
  return modifyStack;
};
