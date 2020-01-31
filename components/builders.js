export const DEFAULT_FETCH_CONFIG = {
  method: 'GET',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  redirect: 'follow',
  referrer: 'no-referrer',
};

export const buildFetchConfig = (config = {}, headers = {}) => {
  const updatedHeaders = { ...DEFAULT_FETCH_CONFIG.headers, ...headers };
  return { ...DEFAULT_FETCH_CONFIG, ...config, ...{ headers: updatedHeaders } };
};
