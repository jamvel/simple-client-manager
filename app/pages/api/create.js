import axios from 'axios';
/**
 *
 *
 */
export default async (req, res) => {
  try {
    const { data } = await axios.post(`${process.env.ENDPOINT_CREATE}`, {
      ...req.body,
    });
    return res.status(200).send(data);
  } catch (e) {
    res.status(e.response.status).send(e.response.data);
  }
};
