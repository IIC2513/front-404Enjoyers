
export async function getFriends( user_id, token) {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${user_id}/friendsList`, {
        method: "GET",
        headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
         }
    });
    return await response.json();
}

export async function addFriend(user_id, new_friend_id, token) {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${user_id}/friends`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
         },
        body: JSON.stringify({ id:new_friend_id })
    });
    return await response.json();
}

export async function deleteFriend(user_id, friend_id, token) {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${user_id}/friends/${friend_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
         }
    });
    return await response.json();
}

export async function findByUsername(username, token) {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${username}/find`, {
        method: "GET",
        headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
         }
    });
    return await response.json();
}