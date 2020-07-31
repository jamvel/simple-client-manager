import axios from 'axios';
/**
 * [id] request parameter is available under req.query.id (@link https://nextjs.org/docs/api-routes/dynamic-api-routes)
 * @name PUT/api/update/:id
 * @function
 * @param {Object} req
 * @param {Object} res
 */
export default async (req, res) => {
  try {
    const { data } = await axios.put(`${process.env.ENDPOINT_UPDATE}${req.query.id}`, {
      ...req.body,
    });
    return res.status(200).send(data);
  } catch (e) {
    res.status(e.response.status).send(e.response.data);
  }
};
