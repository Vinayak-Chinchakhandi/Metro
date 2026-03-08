const QRCode = require("qrcode");

exports.generateQR = async (data) => {
  return await QRCode.toDataURL(JSON.stringify(data));
};