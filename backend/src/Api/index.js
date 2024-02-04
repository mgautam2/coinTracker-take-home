const axios = require("axios");
var constants = require("../constants");

const customAxios = axios.create({
  baseURL: constants.API_BASE_URL,
});

async function WalletInfo(address, page = 1) {
  return await customAxios
    .get(
      `/rawaddr/${address}?offset=${(page - 1) * constants.PAGE_LIMIT}&limit=${
        constants.PAGE_LIMIT
      }`
    )
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error caught:', error);
      throw new Error(error);
    });
}

module.exports = {
  WalletInfo,
};
