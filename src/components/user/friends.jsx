import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { getFriends, addFriend, deleteFriend, findByUsername } from './UserService';
import parseJwt from '../auth/AuthParser';


function Friends() {
  const {token} = useContext(AuthContext);
  const userId = parseJwt(token)?.sub;
  const [friends, setFriends ] = useState([]);
  const [newFriend, setNewFriend] = useState('');

  async function fetchFriends() {
    const friendsResponse = await getFriends(userId, token);
    if (friendsResponse.status === 'success'){
      setFriends(friendsResponse.friends);
    }
    else{
      console.error(`Error: ${friendsResponse.message}`);
    }
  }

  useEffect(() => {
    fetchFriends();
  }, []);

  const unfriendBtn = async (friend_id) => {
    const deleteResponse = await deleteFriend(userId, friend_id, token);
    if (deleteResponse.status === "success"){
        fetchFriends();
    }
    else{
        alert(`Error: ${deleteResponse.message}`);
    }
  };

  const addFriendBtn = async () => {
    if (newFriend){
        try{
            const findResponse = await findByUsername(newFriend, token);
            if (findResponse.status === "success"){
                const addResponse = await addFriend(userId, findResponse.id, token);
                if (addResponse.status === "success"){
                    fetchFriends();
                    setNewFriend('');
                }
                else{
                    alert(`Error: ${addResponse.message}`);
                }
            }
            else{
                alert(`Error: ${findResponse.message}`);
            }
        }catch(error){
            console.error(error);
        }
    }
  };

  return (
    <div className="friends">
      <h1>Your Friends</h1>
      {friends?.map((friend, index) => (
        <div key={index} className='friendCard'>
            <h2>{friend.username}</h2>
            <h3>{friend.email}</h3>
            <button 
                className='deleteFriendBtn'
                onClick={() => {unfriendBtn(friend.id)}}
            > Unfriend </button>
        </div>
      ))}
      <h1>Add new friends</h1>
      <div className='new_friend'>

      <input
        type="text"
        placeholder="Username"
        value={newFriend}
        onChange={(e) => setNewFriend(e.target.value)}
      />
      <button
        className='addFriendBtn'
        onClick={() => {addFriendBtn()}}
      >Add</button>        
      </div>
    </div>
  );
}

export default Friends;