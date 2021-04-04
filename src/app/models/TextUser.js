import Sequelize, { Model } from 'sequelize';

class TextUser extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        text: Sequelize.STRING,
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

export default TextUser;
