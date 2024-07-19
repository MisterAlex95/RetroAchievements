import axios, { AxiosResponse } from "axios";

import { config } from "../../config";
import { getFixture } from "../../fixtures";

export type RequestConfig = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
};

export default class RequestManager {
  private requests: Map<string, Promise<AxiosResponse<any>>> = new Map();
  private static instance: RequestManager;

  private constructor() {}

  private log(str: string) {
    if (config.ENABLE_REQUEST_LOG) {
      console.log(str);
    }
  }

  public static getInstance() {
    if (!RequestManager.instance) {
      RequestManager.instance = new RequestManager();
    }
    return RequestManager.instance;
  }

  private async fetchRequest<T = any>(
    requestConfig: RequestConfig,
  ): Promise<AxiosResponse<T>> {
    if (config.ENABLE_FIXTURE && requestConfig.method === "GET") {
      const fixtureFilePath = `${requestConfig.url.substring(requestConfig.url.indexOf("API/") + 4, requestConfig.url.indexOf(".php")).replace(/\//g, "_")}`;
      const data = getFixture<T>(fixtureFilePath);
      if (data) {
        return { data } as AxiosResponse<T>;
      } else throw new Error(`Fixture file not found for ${requestConfig.url}`);
    }

    this.log(
      `Fetching ${requestConfig.method} request for ${requestConfig.url}`,
    );

    // Remplacez par la logique de requête réelle, par exemple avec fetch ou axios
    return axios.request<T>({
      method: requestConfig.method,
      url: requestConfig.url,
      data: requestConfig.body,
    });
  }

  public async request<T = any>(config: RequestConfig) {
    const requestKey = `${config.method || "GET"}:${config.url}`;

    if (this.requests.has(requestKey)) {
      this.log(`Request for ${config.url} is already in progress.`);
      return this.requests.get(requestKey);
    }

    const requestPromise = this.fetchRequest<T>(config).finally(() => {
      this.requests.delete(requestKey);
    });

    this.requests.set(requestKey, requestPromise);
    return requestPromise;
  }
}
