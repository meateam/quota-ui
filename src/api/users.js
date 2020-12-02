import Axios from "axios";
import { baseURL } from "@/config";

/**
 * searchUsersByName gets all the users with the received name
 * @param name is the name of the users
 */
export async function searchUsersByName(name) {
  try {
    const res = await Axios.get(`${baseURL}/api/users`, {
      params: { partial: name },
    });
    const users = res.data.users ? res.data.users : [];
    return Promise.all(users.map((user) => formatUser(user)));
  } catch (err) {
    console.error(err);
  }
}

function formatUser(user) {
  const formatedUser = user;
  formatedUser.display = `${user.firstName} ${
    user.lastName ? user.lastName : ""
  } > ${user.hierarchyFlat}`;
  return formatedUser;
}
