🐾 Backend III – Pre-Entrega Nº1
Mocks, generación de datos y persistencia en MongoDB

Autora: María Fernanda Moreno
Curso: Backend III – Testing y Escalabilidad

📌 Descripción General

Este proyecto implementa la Pre-Entrega Nº1 del curso Backend III de Coderhouse.
El objetivo es incorporar un sistema de Mocking para generar datos falsos, exponerlos mediante endpoints y permitir la inserción masiva de usuarios y mascotas dentro de una base MongoDB.

Se trabajó sobre la estructura del proyecto AdoptMe y se agregaron:

Router exclusivo para mocks (mocks.router.js)

Generación de usuarios falsos con contraseña hasheada

Generación de mascotas mock

Inserción masiva configurable desde un endpoint POST

Verificación de los datos insertados mediante endpoints reales

📂 Estructura Relevante del Proyecto
src/
 ├── app.js
 ├── dao/
 │    └── models/
 │         ├── User.js
 │         └── Pet.js
 ├── mocks/
 │    ├── mockingUsers.js
 │    ├── mockingPets.js
 │    └── mocks.router.js
 ├── routes/
 │    ├── users.router.js
 │    ├── pets.router.js
 │    ├── adoption.router.js
 │    ├── sessions.router.js
 │    └── mocks.router.js
 └── utils/
      └── index.js

⚙️ Configuración del Entorno

Instalar dependencias:

npm install


Iniciar el servidor:

npm run dev

🧪 Módulos de Mocking
1. Mocking de Usuarios

Archivo: src/mocks/mockingUsers.js

Cada usuario generado incluye:

_id (ObjectId)

first_name, last_name

email

password → contraseña hasheada (coder123)

role (user o admin)

pets: array vacío

2. Mocking de Mascotas

Archivo: src/mocks/mockingPets.js

Cada mascota incluye:

_id

name

specie

birthDate

adopted (false)

owner (null)

image (null)

📡 Endpoints del Router /api/mocks

El router fue creado en:

src/routes/mocks.router.js


Y montado en:

app.use("/api/mocks", mocksRouter);

▶️ GET /api/mocks/mockingusers

Genera 50 usuarios mock (no se insertan en DB).

Ejemplo de respuesta:

{
  "status": "success",
  "payload": [ ...50 usuarios mock... ]
}

▶️ GET /api/mocks/mockingpets

Genera mascotas mock (sin persistirlas).

▶️ POST /api/mocks/generateData

Inserta en MongoDB la cantidad de usuarios y mascotas especificada.

Body (JSON):
{
  "users": 5,
  "pets": 5
}

Respuesta:
{
  "status": "success",
  "message": "Datos generados e insertados correctamente",
  "inserted": {
    "users": 5,
    "pets": 5
  }
}

🔍 Verificación de Inserción en DB
✔ GET /api/users

Devuelve los usuarios insertados.

✔ GET /api/pets

Devuelve las mascotas insertadas.

También se verificó mediante MongoDB Compass, visualizando las colecciones users y pets.

✔ Checklist de Consigna
Requisito	Cumplido
Crear router mocks bajo /api/mocks	✔
Migrar /mockingpets al nuevo router	✔
Crear módulo de mocking de usuarios	✔
GET /mockingusers funcionando	✔
POST /generateData que inserta datos	✔
Verificación con GET users/pets	✔