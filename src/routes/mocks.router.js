import { Router } from "express";
import { generateMockUsers } from "../mocks/mockingUsers.js";
import { generateMockPets } from "../mocks/mockingPets.js";
import userModel from "../dao/models/User.js";
import petModel from "../dao/models/Pet.js";

const router = Router();


router.get("/mockingusers", async (req, res) => {
  try {
    const users = await generateMockUsers(50);
    res.status(200).send({
      status: "success",
      payload: users,
    });
  } catch (error) {
    console.error("Error en /mockingusers:", error);
    res.status(500).send({
      status: "error",
      message: "Error generando usuarios mock",
    });
  }
});


router.get("/mockingpets", (req, res) => {
  try {
    const pets = generateMockPets(100);
    res.status(200).send({
      status: "success",
      payload: pets,
    });
  } catch (error) {
    console.error("Error en /mockingpets:", error);
    res.status(500).send({
      status: "error",
      message: "Error generando mascotas mock",
    });
  }
});


router.post("/generateData", async (req, res) => {
  try {
    let { users = 0, pets = 0 } = req.body;

    users = parseInt(users);
    pets = parseInt(pets);

    if (isNaN(users) || isNaN(pets) || users < 0 || pets < 0) {
      return res.status(400).send({
        status: "error",
        message: "Los parámetros 'users' y 'pets' deben ser números >= 0",
      });
    }

    const mockUsers =
      users > 0 ? await generateMockUsers(users) : [];
    const mockPets =
      pets > 0 ? generateMockPets(pets) : [];

    const insertedUsers =
      mockUsers.length > 0 ? await userModel.insertMany(mockUsers) : [];
    const insertedPets =
      mockPets.length > 0 ? await petModel.insertMany(mockPets) : [];

    res.status(201).send({
      status: "success",
      message: "Datos generados e insertados correctamente",
      inserted: {
        users: insertedUsers.length,
        pets: insertedPets.length,
      },
    });
  } catch (error) {
    console.error("Error en /generateData:", error);
    res.status(500).send({
      status: "error",
      message: "Error generando e insertando datos",
    });
  }
});

export default router;
