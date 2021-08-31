const conection = require("../datebase/conection.js");
module.exports = {
  async create(request, response) {
    const { cep, district, municipality, public_place } = request.body;
    try {
     const [idAdress] =  await conection("adress").insert({
        cep, district, municipality, public_place
      });
      return response.json({id: idAdress,cep, district, municipality, public_place});
    } catch (err) {
      return response.json({ error: err.message })
    }
  },
  async index(request, response) {
    const { page = 1 } = request.query
    try {

      let adress = await conection('adress').limit(6).offset((page - 1) * 5)
      const [count] = await conection('adress').count();
      response.header("x-total-count", count['count(*)']);
      return response.json(adress);

    } catch (err) {
      return response.json({ error: err.message })
    }
  },
  async delete(request, response) {
    const { id } = request.params
    try {
      await conection('adress').where({id}).del()
      return response.send()

    } catch (err) {
      return response.json({ error: err.message })
    }
  }
};