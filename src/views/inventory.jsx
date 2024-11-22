import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../components/auth/AuthContext';
import { getItemsFromInventory, equipWeapon, useConsumable } from '../components/inventory/InventoryServices';

function Inventory() {
  const { inventoryId } = useParams();
  const {token} = useContext(AuthContext);
  const [weapons, setWeapons] = useState([]);
  const [consumables, setConsumables] = useState([]);
  const [message, setMessage] = useState('');
  const [characterId, setCharacterId] = useState(0);

  useEffect(() => {
    async function fetchInventory() {
        const inventoryResponse = await getItemsFromInventory(inventoryId, token);
        if (inventoryResponse.status === 'success'){
            setMessage(inventoryResponse.message);
            setCharacterId(inventoryResponse.owner.id);
            setWeapons(inventoryResponse.weapons);
            setConsumables(inventoryResponse.consumables);
        }
        else{
            console.error("Error while getting inventory");
        }
    }
    fetchInventory();
  }, [])

  const handleEquip = async (itemId) => {
    try {
        const weaponResponse = await equipWeapon(characterId, itemId, token);
        alert(weaponResponse.message);
    } catch (error) {
        alert("Error while equipping weapon: " + error.message);
    }
};

const handleUse = async (itemId) => {
    try {
        const consumableResponse = await useConsumable(characterId, itemId, token);
        alert(consumableResponse.message);
    } catch (error) {
        alert("Error while using consumable: " + error.message);
    }
};

  return (
<div className="inventory">
  <h1>{message} </h1>
  <div className="weapons">
    {weapons.map((weapon, index) => (
      <div key={index}>
        <p>{weapon.name}</p>
        <button 
          onClick={() => {
            handleEquip(weapon.id)
        }}>
            Equip 
        </button>
      </div>
    ))}
  </div>
  <div className="consumables">
    {consumables.map((consumable, index) => (
      <div key={index}>
        <p>{consumable.name}</p>
        <button 
          onClick={() => {
            handleUse(consumable.id)
        }}>
            Use 
        </button>
      </div>
    ))}
  </div>
</div>

  );
}

export default Inventory;