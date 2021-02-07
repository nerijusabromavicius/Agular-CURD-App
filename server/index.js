const utils = require("./utils");
const express = require("express");
const fs = require("fs");
var cors = require("cors");

const dbName = "db.json";
const apiPath = "/carowner";
var app = express();

app.use([express.json(), cors()]);

app.post(apiPath, cors(), (req, res) => {
  const carOwners = utils.getCarOwnersFromDB(dbName);
  const newCarOwner = req.body;
  newCarOwner.carPlateNumber =
    newCarOwner.carPlateNumber !== null
      ? newCarOwner.carPlateNumber.toUpperCase()
      : null;
  if (
    newCarOwner.firstName === null ||
    newCarOwner.lastName === null ||
    newCarOwner.carPlateNumber === null
  ) {
    return res.status(401).send({ error: true, msg: "Car owner data missing" });
  }
  const isValidCarPlate = utils.carPlateNumberRegulation(newCarOwner);
  if (!isValidCarPlate) {
    return res
      .status(408)
      .send({ error: true, msg: "Car plate number is incorect" });
  }

  const carOwnerExist = utils.doesCarPlateExist(carOwners, newCarOwner);
  if (carOwnerExist) {
    return res
      .status(409)
      .send({ error: true, msg: "Car plate number already exist" });
  }

  carOwners.push({ id: utils.idGenerator(), ...newCarOwner });
  utils.saveCarOwnerToDB(carOwners, dbName);
  res.send({ success: true, msg: "User data added successfully" });
});

app.get(apiPath, cors(), (req, res) => {
  const carOwners = utils.getCarOwnersFromDB(dbName);
  res.send(carOwners);
});

app.patch(`${apiPath}/:id`, cors(), (req, res) => {
  const editedId = req.params.id;
  const editCarOwner = req.body;
  const carOwners = utils.getCarOwnersFromDB(dbName);
  editCarOwner.carPlateNumber =
    editCarOwner.carPlateNumber !== null
      ? editCarOwner.carPlateNumber.toUpperCase()
      : null;
  const currentCarOwner = carOwners.find((i) => i.id === editedId);
  if (currentCarOwner.carPlateNumber === editCarOwner.carPlateNumber) {
    const carPlateExist = utils.doesCarPlateExist(carOwners, editCarOwner);
    if (carPlateExist) {
      return res
        .status(409)
        .send({ error: true, msg: "Car plate number already exist" });
    }
  }

  const carPlateInvalid = utils.carPlateNumberRegulation(editCarOwner);
  if (!carPlateInvalid) {
    return res
      .status(408)
      .send({ error: true, msg: "Car plate number is incorect" });
  }

  const updateCarOwners = carOwners.filter(
    (carOwner) => carOwner.id !== editedId
  );
  updateCarOwners.push(editCarOwner);
  utils.saveCarOwnerToDB(updateCarOwners, dbName);
  res.send({ success: true, msg: "User data updated successfully" });
});

app.delete(`${apiPath}/:id`, cors(), (req, res) => {
  const deleteCarOwnerId = req.params.id;
  const carOwners = utils.getCarOwnersFromDB(dbName);
  const filteredCarOwners = carOwners.filter(
    (carOwner) => carOwner.id !== deleteCarOwnerId
  );
  if (carOwners.length === filteredCarOwners.length) {
    return res.status(409).send({ error: true, msg: "id does not exist" });
  }
  utils.saveCarOwnerToDB(filteredCarOwners, dbName);

  res.send({ success: true, msg: "User removed successfully" });
});

app.listen(8080, function () {
  console.log("Server is Up");
});
