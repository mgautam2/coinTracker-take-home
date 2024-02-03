const axios = require('axios');

const customAxios = axios.create({
    baseURL: 'https://blockchain.info',
  });



async function WalletInfo( address, offset = 0 ) {
    return await customAxios.get(`/rawaddr/${address}?offset=${offset}&limit=10`)
                 .then(response => response.data)
                 .catch(error => {
                    throw(error)
                })
}



module.exports = {
    WalletInfo
  };