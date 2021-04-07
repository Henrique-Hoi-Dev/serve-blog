import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      first_name: Yup.string().required().max(50),
      sur_name: Yup.string().required().max(50),
      email: Yup.string().required().email(),
      data_nascimento: Yup.string().required()

    });

    // if (!(await schema.isValid(req.body))) {
    //   return res.status(400).json({ error: 'validation error' });
    // }

     const user  = await User.create(req.body, {
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
          },
        ],
     });

    return res.json(user);
  }

  async getAll(req, res) {
    const user = await User.findAll({
      include: {
        model: File,
        as: 'avatar',
      },
    });
    return res.status(200).json(user);
  }
  catch(error) {
    return res.status(400).json(error);
  }

  async getById(req, res) {
    try {

      let { id } = req.params;
      let user = await User.findByPk(id);

      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async deleteTextUser(req, res) {
    try {
      const { id } = req.params;

      const user = await User.destroy({
        where: {
          id: id,
        },
      });

      if (!user) {
        return res.status(400).json({ message: 'product not found' });
      }

      return res.status(200).json(user);
    } catch (error) {

      return res.status(400).json(error.message);
    }
  }

  // async updateUser(req, res) {
  //   const { id } = req.params;

  //   const user = await User.findByPk(id);

  //   let textUserUpdated = await user.update(req.body);

  //   return res.json(userUpdated);
  // }
}
export default new UserController();
