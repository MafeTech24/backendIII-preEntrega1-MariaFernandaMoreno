import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import { createHash } from '../utils/index.js';

const ROLES = ['user', 'admin'];


export const generateMockUser = async () => {
  const hashedPassword = await createHash('coder123');

  return {
    _id: new mongoose.Types.ObjectId(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email().toLowerCase(),
    password: hashedPassword,
    role: ROLES[Math.floor(Math.random() * ROLES.length)],
    pets: [], 
  };
};


export const generateMockUsers = async (qty = 1) => {
  const promises = [];
  for (let i = 0; i < qty; i++) {
    promises.push(generateMockUser());
  }
  return Promise.all(promises);
};
