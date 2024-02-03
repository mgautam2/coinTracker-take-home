import axios from "axios";

const customAxios = axios.create({
  baseURL: "http://localhost:4000",
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

async function GetTransactions(walletAddress, offset = 0) {
  console.log(offset)
  return await customAxios
    .post(`/getTransactions`, { walletAddress, offset })
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
