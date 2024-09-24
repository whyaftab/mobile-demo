// libraries
import { useEffect, useRef } from "react";

// misc
import { useAppDispatch, useAppSelector } from "@redux/store";
import { selectAppData } from "@screens/appSelectors";
import cache from "@utils/cache";
import { APP_LOCAL_DATA } from "@utils/keys";
import { setAppData } from "@screens/appSlice";
import { AppState } from "@screens/types";

export const useSyncLocalSaves = () => {
  const appData = useAppSelector(selectAppData);
  const dispatch = useAppDispatch();

  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    (async () => {
      await cache.store(APP_LOCAL_DATA, appData);
    })();
  }, [JSON.stringify(appData)]);

  useEffect(() => {
    (async () => {
      let data = await cache.get(APP_LOCAL_DATA);

      if (data) {
        dispatch(setAppData(data as AppState["appData"]));
      }
    })();
  }, []);
};
