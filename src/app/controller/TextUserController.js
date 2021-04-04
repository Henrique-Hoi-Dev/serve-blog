import * as Yup from 'yup';
import TextUser from '../models/TextUser';
import File from '../models/File';

class TextUserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required().max(100),
      text: Yup.string().required().max(700),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation error' });
    }

     const textUser = await TextUser.create(req.body);

    return res.json(textUser);
  }

  async getAll(req, res) {
    const textUser = await TextUser.findAll({
      include: {
        model: File,
        as: 'avatar',
      },
    });
    return res.status(200).json(textUser);
  }
  catch(error) {
    return res.status(400).json(error);
  }

  async getById(req, res) {
    try {
      let { id } = req.params;
      let textUser = await TextUser.findByPk(id);

      return res.status(200).json(textUser);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async deleteTextUser(req, res) {
    try {
      const { id } = req.params;

      const textUser = await TextUser.destroy({
        where: {
          id: id,
        },
      });

      if (!textUser) {
        return res.status(400).json({ message: 'product not found' });
      }

      return res.status(200).json(textUser);
    } catch (error) {

      return res.status(400).json(error.message);
    }
  }

  async updateTextUser(req, res) {
    const { id } = req.params;

    const textUser = await TextUser.findByPk(id);

    let textUserUpdated = await textUser.update(req.body);

    return res.json(textUserUpdated);
  }
}
export default new TextUserController();
