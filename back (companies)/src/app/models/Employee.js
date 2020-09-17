import Sequelize, { Model } from 'sequelize';

class Employee extends Model {
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
        cpf: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        age: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        company_uid: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'companies',
            key: 'uid',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Company, {
      as: 'company',
      foreignKey: 'company_uid',
    });
    // pertence a uma empresa

    this.hasMany(models.EmployeeRole, {
      as: 'roles',
      foreignKey: 'employee_uid',
      // chave que possui valor em comum
    });
    // um empregado tem varios cargos
  }
}

export default Employee;
