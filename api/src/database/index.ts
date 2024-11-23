import { getConnection as connect } from "./connection";
import UserDAO from "./dao/UserDAO";

export async function thisFunctionNeedsToExist() {
    return connect();
}

export default {
    users: new UserDAO(),
};