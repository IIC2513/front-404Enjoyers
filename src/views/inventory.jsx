import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../components/auth/AuthContext';
import { getItemsFromInventory, equipWeapon, useConsumable, getCharacter } from '../components/inventory/InventoryServices';

function Inventory() {
  const { inventoryId } = useParams();
  const {token} = useContext(AuthContext);
  const [weapons, setWeapons] = useState([]);
  const [consumables, setConsumables] = useState([]);
  const [message, setMessage] = useState('');
  const [characterId, setCharacterId] = useState(0);
  const [equippedId, setEquippedId] = useState(0);
  
  async function fetchInventory() {
      const inventoryResponse = await getItemsFromInventory(inventoryId, token);
      if (inventoryResponse.status === 'success'){
          setMessage(inventoryResponse.message);
          setCharacterId(inventoryResponse.owner.id);
          setWeapons(inventoryResponse.weapons);
          setConsumables(inventoryResponse.consumables);
          const characterResponse = await getCharacter(inventoryResponse.owner.id, token);
          if (characterResponse.status === 'success'){
            setEquippedId(characterResponse.character.equipped);
          }
      }
      else{
          console.error("Error while getting inventory");
      }
  }

  useEffect(() => {
    fetchInventory();
  }, [inventoryId])

  const handleEquip = async (itemId) => {
    try {
        const weaponResponse = await equipWeapon(characterId, itemId, token);
        alert(weaponResponse.message);
        fetchInventory();
    } catch (error) {
        alert("Error while equipping weapon: " + error.message);
    }
};

const handleUse = async (itemId) => {
    try {
        const consumableResponse = await useConsumable(characterId, itemId, token);
        alert(consumableResponse.message);
        fetchInventory();
    } catch (error) {
        alert("Error while using consumable: " + error.message);
    }
};

  return (
<div className="inventory">
  <h1>{message} </h1>
  <div className='items'>

  <div className="weapons">
    <h2>Weapons</h2>
    {weapons.map((weapon, index) => (
      <div key={index} className='weapon'>
        <h3>{weapon.name} {weapon.id === equippedId && <> (Equipped)</>}</h3>
        <p>"{weapon.description}"</p>
        <p>Damage: {weapon.damage}</p>
        <p>Reach: {weapon.reach}</p>
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
    <h2>Consumables</h2>
    {consumables.map((consumable, index) => (
      <div key={index} className='consumable'>
        <h3>{consumable.name}</h3>
        <p>"{consumable.description}"</p>
        {consumable.quantity && <p>Quantity: {consumable.quantity}</p>}
        {consumable.health_points && <p>Health Points: {consumable.health_points}</p>}
        {consumable.property && <p>Property: {consumable.property}</p>}
        {consumable.hability && <p>Ability: {consumable.hability}</p>}
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
</div>

  );
}

export default Inventory;