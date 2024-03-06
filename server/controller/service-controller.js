const Services = require("../models/service-model");

const services = async (req, res) => {
  try {
    const response = await Services.find();
    if (!response) {
      res.status(404).json({ msg: "no service found" });
      return;
    }
    res.status(200).json({ response });
  } catch (error) {
    console.log(`Error from service controller ${error}`);
  }
};
module.exports = services;
