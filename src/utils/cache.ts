// libraries
import moment from "moment";

// misc
import { secureStorage } from "./secure-storage";

const prefix = "cache";
const expiryInDays = 360;

type ItemType = {
  value: object | string;
  timeStamp: number;
};

const store = async (key: string, value: ItemType["value"]) => {
  const item: ItemType = {
    value,
    timeStamp: Date.now(),
  };

  try {
    await secureStorage.setItem(prefix + key, JSON.stringify(item));
  } catch (err) {
    console.log(err);
  }
};

const isExpired = (item: ItemType) => {
  const now = moment(Date.now());
  const storedTime = moment(item.timeStamp);
  return now.diff(storedTime, "days") > expiryInDays;
};

const get = async (key: string) => {
  try {
    const value = await secureStorage.getItem(prefix + key);
    if (!value) {
      return null;
    }
    const item: ItemType = JSON.parse(value);

    if (!item) return null;

    if (isExpired(item)) {
      secureStorage.removeItem(prefix + key);
      return null;
    }

    return item.value;
  } catch (err) {
    console.log(key, err);
  }
};

const remove = async (key: string) => {
  try {
    secureStorage.removeItem(prefix + key);
  } catch (err) {
    console.log(err);
  }
};

export default { store, get, remove };
