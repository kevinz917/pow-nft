import axios from 'axios';
import * as yup from 'yup';

const pinata_api_key = '1e8fd7c04c433056e9d8';
const pinata_secret_api_key = '295594035c72c8adba418a1c260124a3e699413b5e74ea51761879dc345b8b88';
const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
export const pinata_base_url = 'https://gateway.pinata.cloud/ipfs/';

////////////////////////////////////////////////////////////

export const formSchema = yup.object().shape({
  Name: yup.string().required(),
  Description: yup.string().required(),
});

export const pinFileToIPFS = (name: string, description: string): Promise<string> => {
  const currentDate = Date.now();

  return axios
    .post(
      url,
      { name, description, date: currentDate },
      {
        headers: {
          pinata_api_key: pinata_api_key,
          pinata_secret_api_key: pinata_secret_api_key,
        },
      }
    )
    .then((response: any) => {
      return response.data.IpfsHash;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const formatFullIpfsUrl = (url: string): string => {
  return `${pinata_base_url}${url}`;
};
