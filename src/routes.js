import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import TextUserController from './app/controller/TextUserController';
import UserController from './app/controller/UserController';
import FileController from './app/controller/FileController'

const routes = new Router();
const upload = multer(multerConfig);

// user 
routes.post('/user/new', UserController.store)
routes.get('/user', UserController.getAll);
routes.get('/user/:id', UserController.getById);
routes.delete('/user/:id', UserController.deleteTextUser);
// routes.post('/textUser/avatar', UserController.updateUser);

// avatar 
routes.post('/files', upload.single('file'), FileController.store);


// texto // comentario usuario
routes.put('/textUser/:id', TextUserController.updateTextUser);
routes.post('/textUser/new', TextUserController.store);
routes.get('/textUser', TextUserController.getAll);
routes.get('/textUser/:id', TextUserController.getById);
routes.post('/textUser/avatar', TextUserController.updateTextUser);
routes.delete('/textUser/:id', TextUserController.deleteTextUser);

export default routes;
