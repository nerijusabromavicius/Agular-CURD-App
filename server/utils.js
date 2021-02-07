const fs = require("fs");

module.exports = {
  idGenerator: () => "_" + Math.random().toString(36).substr(2, 9),
  doesCarPlateExist: (carOwners, currentCarOwner, res) => {
    const carOwnerExist = carOwners.find(
      (carOwner) => carOwner.carPlateNumber === currentCarOwner.carPlateNumber
    );
    return carOwnerExist;
  },
  carPlateNumberRegulation: (carOwners) => {
    const carPlateRegulationRegex = "[A-Za-z]{3}[0-9]{3}";
    return (valid = carOwners.carPlateNumber.match(carPlateRegulationRegex));
  },
  getCarOwnersFromDB: (dbName) => {
    const jsonData = fs.readFileSync(dbName);
    return JSON.parse(jsonData);
  },
  saveCarOwnerToDB: (data, dbName) => {
    const stringifyData = JSON.stringify(data);
    fs.writeFileSync(dbName, stringifyData);
  },
};
