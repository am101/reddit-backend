const bcrypt = require('bcrypt');

async function cryptPassword(password) {
    return await bcrypt.hash(password, 12);
}
async function comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}


module.exports = { cryptPassword, comparePassword }