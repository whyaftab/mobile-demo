import * as FileSystem from "expo-file-system";
import { ACCESS_FILE_NAME, OFFLINE_FOLDER_NAME } from "./constants";
import { MainData, ServerResponse } from "@api/types";

export const randomIntFromInterval = (min: number, max: number) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const retrieveAccessData: () => Promise<
  ServerResponse<MainData>
> = async () => {
  const vitaDir = `${FileSystem.documentDirectory}${OFFLINE_FOLDER_NAME}/`;

  const data = await FileSystem.readAsStringAsync(vitaDir + ACCESS_FILE_NAME);

  const parseData = JSON.parse(data) as ServerResponse<MainData>;

  return parseData;
};
