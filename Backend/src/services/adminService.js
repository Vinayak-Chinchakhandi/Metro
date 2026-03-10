const adminModel = require("../models/adminModel");

exports.login = async ({ username, password }) => {

  const admin = await adminModel.getAdmin(username);

  if (!admin) {
    throw new Error("Admin not found");
  }

  if (admin.password !== password) {
    throw new Error("Invalid password");
  }

  return {
    message: "Login successful"
  };

};