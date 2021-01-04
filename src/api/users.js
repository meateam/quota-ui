import Axios from "axios";

const usersRoute = "/api/users";

/**
 * searchUsersByName gets all the users with the received name
 * @param name is the name of the users
 */
export async function searchUsersByName(name) {
    try {
        const res = await Axios.get(usersRoute, {
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
    formatedUser.display = `${user.firstName} ${user.lastName ? user.lastName : ""
        } > ${user.hierarchyFlat}`;
    return formatedUser;
}
