import { Router } from 'express';
import cors from 'cors';

import CompanyController from './app/controllers/CompanyController';
import EmployeeController from './app/controllers/EmployeeController';
import RoleController from './app/controllers/RoleController';
import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';

import authMiddleware from './app/middlewares/auth';

const routes = Router();
routes.use(cors());

routes.get('/', (req, res) => res.json({ result: 'TEST-API' }));

// ROUTES PARA USER
routes.post('/users', UserController.store);
// routes.get('/users', UserController.index);
// routes.get('/users/:uid', UserController.show);

// ROUTES PARA AUTH
routes.post('/login', AuthController.store);

// ROUTES PARA COMPANY
routes.get('/companies', CompanyController.index);

routes.use(authMiddleware);
// a partir dessa rota utiliza o middleware)

// ROUTES PARA USER(auth)
routes.put('/users/:uid', UserController.update);

// ROUTES PARA COMPANY(auth)
routes.post('/companies', CompanyController.store);
routes.get('/companies/:uid', CompanyController.show);

// ROUTES PARA EMPLOYEE(auth)
routes.post('/employees', EmployeeController.store);
routes.get('/employees', EmployeeController.index);
routes.get('/employees/:uid', EmployeeController.show);

// ROUTES PARA ROLE(auth)
routes.post('/roles', RoleController.store);
routes.get('/roles', RoleController.index);
routes.get('/roles/:uid', RoleController.show);

export default routes;
