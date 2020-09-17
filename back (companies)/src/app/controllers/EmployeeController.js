import Employee from '../models/Employee';
import EmployeeRole from '../models/EmployeeRole';
import Company from '../models/Company';
import Role from '../models/Role';

class EmployeeController {
  async index(req, res) {
    try {
      const employees = await Employee.findAll({
        attributes: ['uid', 'name', 'age', 'cpf'],
        include: [
          {
            model: Company,
            as: 'company',
            attributes: ['uid', 'name', 'address'],
          },
        ],
      });
      return res.json({ employees });
    } catch (error) {
      return res.json({ error });
    }
  }

  async show(req, res) {
    try {
      const employee = await Employee.findAll({
        attributes: ['uid', 'name', 'age', 'cpf'],
        include: [
          {
            model: Company,
            as: 'company',
            attributes: ['uid', 'name', 'address'],
          },
          {
            model: EmployeeRole,
            as: 'roles',
            attributes: ['role_uid'],
            include: [
              {
                model: Role,
                as: 'role',
                attributes: ['name'],
              },
            ],
          },
        ],
      });

      return res.json({ employee });
    } catch (error) {
      return res.json({ error });
    }
  }

  async store(req, res) {
    const t = await Employee.sequelize.transaction();
    // model que dá nome a controller
    // t é uma transaction
    // Quando se tem mais de uma execução/transação (employee e role) é necessário assegurar
    // que ou as duas dao certo, ou as duas dao errao,
    // uma vez que elas estão interligadas. Para isso, o transaction é utilizado.
    try {
      const employee = await Employee.create(req.body, {
        transaction: t,
      });

      const { roles } = req.body;

      await Promise.all(
        // com o promise, em caso de erro, todo o map vai falhar. Assim, nao corre o risco de apenas uma parte do array (roles) funcionar e o resto falhar. Ou funciona todo, ou nada.
        roles.map(async (role_uid) => {
          const role = await EmployeeRole.create(
            {
              employee_uid: employee.uid,
              role_uid,
            },
            { transaction: t }
          );

          return role;
        })
      );

      await t.commit();
      // com o t.commit(), se tudo deu certo (todas as transações), elas podem efetivamente ser reaalizadas.
      return res.json({ employee });
    } catch (error) {
      await t.rollback();
      // com o t.rollback(), se alguma transação der errada, ele volta ´pra como se nao tivesse feito nenhuma transação
      return res.json({ error });
    }
  }

  async update(req, res) {}

  async delete(req, res) {}
}

export default new EmployeeController();
