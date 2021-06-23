const users = [];

export const addUser = ({ id,name,room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => user.room === room && user.name === name);
    if(existingUser) return {error : 'User name is taken.'}
    const user = { id, name, room };
    users.push(user);
    return { user };
}

export const removeUser = (id) => {
    return users.filter((user) => user.id !== id)
}

export const getUser = (id) => users.find((user) => user.id === id)

export const getUsersInRoom = (room) => users.filter((user) => user.room === room);

export default users;