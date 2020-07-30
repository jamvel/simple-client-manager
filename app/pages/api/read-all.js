import axios from 'axios';
/**
 *
 *
 */
export default async (req, res) => {
  try {
    const { data } = await axios.get(`${process.env.ENDPOINT_READALL}`);
    return res.status(200).send(data);
  } catch (e) {
    res.status(e.response.status).send(e.response.data);
  }
};
