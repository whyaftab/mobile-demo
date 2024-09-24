// libraries
import axiosClient from "axios";
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import * as FileSystem from "expo-file-system";

// misc
import { API_URL } from "@env";
import cache from "./cache";
import {
  ACCESS_API_ENDPOINT,
  ACCESS_FILE_NAME,
  OFFLINE_FOLDER_NAME,
} from "./constants";
import { retrieveAccessData } from "./helpers";

/**
 * Creates an initial 'axios' instance with custom settings.
 */

const instance = axiosClient.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
  },
});

/**
 * add bearer token for authenticated requests
 */

instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      console.log("API_URL", API_URL);

      // const token = await cache.get(APP_AUTH_TOKEN);
      // // console.log('token', token);
      // if (token) {
      //   config.headers["Authorization"] = `Bearer ${token}`;
      // }
      // config.params = { language: language || defaultNS };
    } catch (e) {
      // saving error
    }

    return config;
  }
);

/**
 * Handle all responses. It is possible to add handlers
 * for requests, but it is omitted here for brevity.
 */
instance.interceptors.response.use(
  async (res) => {
    if (res.data) {
      if (res.config.url === ACCESS_API_ENDPOINT) {
        let vitaDir = `${FileSystem.documentDirectory}${OFFLINE_FOLDER_NAME}/`;
        try {
          if (res.data.data) {
            await FileSystem.makeDirectoryAsync(vitaDir, {
              intermediates: true,
            });
            await FileSystem.writeAsStringAsync(
              vitaDir + ACCESS_FILE_NAME,
              JSON.stringify(res.data)
            );
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        await cache.store(res.config.url, res.data); //* caching the response
      }
      return res.data;
    }

    const data = await cache.get(res.config.url); //* retrieving the data from the cache
    return data;
  },
  async (err) => {
    if (err.code === "ERR_NETWORK") {
      let data;
      if (err.config.url === ACCESS_API_ENDPOINT) {
        data = retrieveAccessData();
      } else {
        data = await cache.get(err.config.url); //* retrieving the data from the cache
      }
      return Promise.resolve(data);
    }

    if (err.response) {
      return Promise.reject({
        ...err.response.data,
        code: err.response.status || 404,
      });
    }

    if (err.request) {
      return Promise.reject(err.request);
    }

    return Promise.reject(err.message);
  }
);

/**
 * Replaces main `axios` instance with the custom-one.
 *
 * @param cfg - Axios configuration object.
 * @returns A promise object of a response of the HTTP request with the 'data' object already
 * destructured.
 */
const request = <T>(cfg: AxiosRequestConfig) =>
  instance.request<unknown, T>(cfg);

export default request;
