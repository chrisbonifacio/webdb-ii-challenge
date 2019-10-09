const knex = require("knex")
const knexConfig = require("../knexfile")

const db = knex(knexConfig.development)

async function get() {
  const cars = await db("cars")
  return cars
}

async function getById(id) {
  const car = await db("cars")
    .select("*")
    .where("id", id)
  return car
}

async function add(carData) {
  const id = await db("cars").insert(carData)

  const newCar = await db("cars")
    .select("*")
    .where({ id: id[0] })

  return newCar
}

async function update(id, changes) {
  await db("cars")
    .where({ id: id })
    .update(changes)

  const car = await db("cars")
    .select("*")
    .where({ id: id })

  return car
}

async function remove(id) {
  const carsDeleted = await db("cars")
    .where({ id: id })
    .del()

  return carsDeleted
}

module.exports = { get, getById, add, update, remove }
