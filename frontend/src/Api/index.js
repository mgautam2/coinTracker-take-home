import axios from "axios";
import constants from "../constants";

const customAxios = axios.create({
  baseURL: constants.SERVER_BASE_URL,
});

async function GetWallets(name) {
  return await customAxios
    .get(`/getWallets?name=${name}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

async function AddWallet(name, walletAddress) {
  return await customAxios
    .post(`/addWallet`, { name, walletAddress })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

async function GetTransactions(walletAddress, page) {
  return await customAxios
    .post(`/getTransactions`, { walletAddress, page })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export default {
  GetWallets,
  AddWallet,
  GetTransactions,
};
