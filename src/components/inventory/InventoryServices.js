
export async function getItemsFromInventory(inventoryId, token) {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/inventories/${inventoryId}/items`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                }
    });
    return await response.json();
}

export async function equipWeapon(characterId, itemId, token) {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/characters/equip`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                },
            body: JSON.stringify({
                char_id: characterId,
                item_id: itemId
            })
    });
    return await response.json();
}

export async function useConsumable(characterId, itemId, token) {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/characters/use`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                },
            body: JSON.stringify({
                char_id: characterId,
                item_id: itemId
            })
    });
    return await response.json();
}