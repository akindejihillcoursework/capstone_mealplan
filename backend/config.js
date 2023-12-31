require('dotenv').config();

if(process.env.NODE_ENV === "test"){
    console.log("Test database activated");
}

/**Database address and login URI */
const db_password = process.env.DB_PASSWORD;
const DB_URI = process.env.NODE_ENV === "test"
    ? `postgresql://akindeji:${db_password}@localhost:5432/mealplan_test`
    : `postgresql://akindeji:${db_password}@localhost:5432/mealplan`;

const SECRET_KEY = process.env.SECRET_KEY || "not so secret";

const BCRYPT_WORK_FACTOR = 12;

const origin = ['http://localhost:3000', 'http://cerebro:3000', 'http://mealplan.cerebro.homelinux.net', 'http://cerebro.homelinux.net'];

module.exports = {
    DB_URI, SECRET_KEY, BCRYPT_WORK_FACTOR, origin
};
