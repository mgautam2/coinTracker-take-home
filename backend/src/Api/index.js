const axios = require('axios');

const customAxios = axios.create({
    baseURL: 'https://blockchain.info',
  });



async function WalletInfo( address ) {
    return await customAxios.get(`/rawaddr/${address}`)
                 .then(response => response.data)
                 .catch(error => {
                    throw(error)
                })
}



module.exports = {
    WalletInfo
  };