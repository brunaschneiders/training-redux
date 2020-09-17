import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        uid: {
          allowNull: false,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        email: {
          allowNull: false,
          type: Sequelize.STRING,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: Sequelize.VIRTUAL,
        },
        password_hash: {
          type: Sequelize.STRING,
        },
      },
      {
        sequelize,
      }
    );
    // criar um hook que vai fazer algo sem que a gente mande
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    // antes de salvar esse usuario no banco, o hook sera ativado
    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  // compara a senha passada com o password_hash do usuario
}

export default User;
