exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("cars")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("cars").insert([
        {
          VIN: "S3BMHB68B3286050",
          make: "SUBARU",
          model: "Legacy",
          mileage: 9000,
          transmission: "",
          title: ""
        },
        {
          VIN: "1FTPW145X5FB30722",
          make: "DODGE",
          model: "Journey",
          mileage: 13000,
          transmission: "",
          title: ""
        },
        {
          VIN: "1FMYU93173KA03711",
          make: "FORD",
          model: "Escape",
          mileage: 2000,
          transmission: "",
          title: ""
        }
      ])
    })
}
