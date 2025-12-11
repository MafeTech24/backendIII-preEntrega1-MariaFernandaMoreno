import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

const SPECIES = ['dog', 'cat', 'bird', 'other'];

export const generateMockPet = () => {
  return {
    _id: new mongoose.Types.ObjectId(),
    name: faker.person.firstName(),          
    specie: SPECIES[Math.floor(Math.random() * SPECIES.length)],
    birthDate: faker.date.past({ years: 10 }),
    adopted: false,
    owner: null,
    image: null,
  };
};

export const generateMockPets = (qty = 1) => {
  const pets = [];
  for (let i = 0; i < qty; i++) {
    pets.push(generateMockPet());
  }
  return pets;
};
