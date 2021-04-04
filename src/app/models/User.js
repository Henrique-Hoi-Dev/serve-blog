import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        first_name: Sequelize.STRING,
        sur_name: Sequelize.STRING,
        data_nascimento: Sequelize.STRING,
        email: Sequelize.STRING,
        avatar_id: Sequelize.INTEGER,
      },
      {
        sequelize,
        timestamps: true,
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }
}

export default User;
