import { Router } from 'express';
import { generateMockUsers } from '../mocks/mockingUsers.js';
import { generateMockPets } from '../mocks/mockingPets.js';
import userModel from '../dao/models/User.js';
import petModel from '../dao/models/Pet.js';

const router = Router();


router.get('/mockingpets', (req, res) => {
  try {
    const pets = generateMockPets(100); 
    return res.status(200).send({
      status: 'success',
      payload: pets,
    });
  } catch (error) {
    console.error('Error en /mockingpets:', error);
    return res.status(500).send({
      status: 'error',
      message: 'Error generando mascotas mock',
    });
  }
});


router.get('/mockingusers', async (req, res) => {
  try {
    const quantity = 50;
    const users = await generateMockUsers(quantity);

    return res.status(200).send({
      status: 'success',
      payload: users,
    });
  } catch (error) {
    console.error('Error en /mockingusers:', error);
    return res.status(500).send({
      status: 'error',
      message: 'Error generando usuarios mock',
    });
  }
});


router.post('/generateData', async (req, res) => {
  try {
    let { users = 0, pets = 0 } = req.body;

    users = parseInt(users);
    pets = parseInt(pets);

    if (isNaN(users) || isNaN(pets) || users < 0 || pets < 0) {
      return res.status(400).send({
        status: 'error',
        message: "Los parámetros 'users' y 'pets' deben ser números >= 0",
      });
    }

    // Generar mocks
    const usersToInsert = users > 0 ? await generateMockUsers(users) : [];
    const petsToInsert = pets > 0 ? generateMockPets(pets) : [];

    // Insertar en la base (Mongoose)
    const insertedUsers =
      usersToInsert.length > 0 ? await userModel.insertMany(usersToInsert) : [];
    const insertedPets =
      petsToInsert.length > 0 ? await petModel.insertMany(petsToInsert) : [];

    return res.status(201).send({
      status: 'success',
      message: 'Datos generados e insertados correctamente',
      inserted: {
        users: insertedUsers.length,
        pets: insertedPets.length,
      },
    });
  } catch (error) {
    console.error('Error en /generateData:', error);
    return res.status(500).send({
      status: 'error',
      message: 'Error generando e insertando datos en la base',
    });
  }
});

export default router;
