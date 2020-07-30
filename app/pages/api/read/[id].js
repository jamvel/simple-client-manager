import axios from 'axios';
/**
 *
 * [id] request parameter is available under req.query.id (@link https://nextjs.org/docs/api-routes/dynamic-api-routes)
 *
 */
export default async (req, res) => {
  try {
    const { data } = await axios.get(`${process.env.ENDPOINT_READ}${req.query.id}`);
    return res.status(200).send(data);
  } catch (e) {
    res.status(e.response.status).send(e.response.data);
  }
};
