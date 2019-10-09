const express = require("express")

const router = express.Router()

const Cars = require("../cars/carsModel")

// GET all cars
router.get("/", async (req, res) => {
  const cars = await Cars.get()
  res.status(200).json(cars)
})

// GET car by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id
  const car = await Cars.getById(id)
  if (!car.length) {
    return res
      .status(400)
      .json({ errorMessage: "Car with specified ID could not be found" })
  }
  res.status(200).json(car)
})

// POST to add a car
router.post("/", async (req, res) => {
  var carData = req.body
  try {
    const newCar = await Cars.add(carData)
    res.status(201).json(newCar)
  } catch (error) {
    res.status(400).json({ errorMessage: "Could not add car to database" })
  }
})

// PUT to change a car by ID
router.put("/:id", async (req, res) => {
  const id = req.params.id
  const changes = req.body

  try {
    const oldCar = await Cars.getById(id)
    const newCar = await Cars.update(id, changes)
    res.status(200).json({ was: oldCar, now: newCar })
  } catch (error) {
    res
      .status(400)
      .json({ errorMessage: "Could not update car with specified ID" })
  }
})

// DELETE a car by ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const [car] = await Cars.getById(id)
    await Cars.remove(id)
    res.status(200).json({ deleted: car })
  } catch (error) {
    res.status(400).json({
      errorMessage: "Could not remove car with specified ID from the database"
    })
  }
})

module.exports = router
