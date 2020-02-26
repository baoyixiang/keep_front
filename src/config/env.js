    // NODE_ENV有三个值，分别对应如下:


export const ENV_DEV = "dev";
export const ENV_PROD = "prod";

const dev = {
  env: ENV_DEV,
  BASE_URL: 'http://47.94.97.168:8080',
  //BASE_URL: 'https://test.obowin.com',
};

const product = {
  env: ENV_PROD,
  BASE_URL: 'https://test.obowin.com',
};

const configs = {
  development: dev,
  production: product,
};

const config = {
  ...configs[process.env.NODE_ENV]
};

export default config;
