const adminService = require("../services/adminService");

exports.login = async (req, res) => {

  try {

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: "username and password required"
      });
    }

    const result = await adminService.login({ username, password });

    res.json(result);

  } catch (error) {

    res.status(401).json({
      error: error.message
    });

  }

};