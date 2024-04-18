import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Input from '../components/Input';

const Main = () => {
  const [filter, setFilter] = useState("");
  const [balance, setBalance] = useState(0);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    getUser(); 
    getAccount();
  }, [filter]);

  const getUser = async () => {
    const response = await axios.get('http://localhost:3000/api/v1/user?filter=' + filter.toLowerCase());
    setUsers(response.data.users);
  };

  const getAccount = async () => {
    const response = await axios.get('http://localhost:3000/api/v1/account', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });
    setBalance(response.data.balance);
  };

  const openModal = (user) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="m-5 p-5">
      <span className="font-bold text-xl">Your Balance</span> :{" "}
      <span className="font-semibold"> Rs. {balance.toFixed(2)}</span>
      <div className="mt-4 mb-4">
        <span className="text-2xl mr-2">Users</span>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border-2 border-gray-500 w-1/2 rounded-md p-1"
          placeholder="Search users"
        />
      </div>
      <hr />
      {users.map((user) => (
        <div key={user.username} className="mt-4 grid grid-flow-col">
          <div className="avatar placeholder flex items-center col-span-11">
            <div className="bg-neutral text-neutral-content rounded-full w-12 ">
              <span>AY</span>
            </div>
            <span className="m-2">{user.firstName} {user.lastName}</span>
          </div>
          <button className="btn btn-neutral col-span-1" onClick={() => openModal(user)}>Send Money</button>
          {selectedUser && selectedUser._id === user._id && (
            <dialog open className="modal">
              <div className="modal-box">
                <h2 className="font-bold text-2xl text-center">Send Money!</h2>
                <div className="avatar placeholder flex items-center col-span-11">
                  <div className="bg-neutral text-neutral-content rounded-full w-12 ">
                    <span>AY</span>
                  </div>
                  <span className="m-2 font-semibold text-xl">{user.firstName} {user.lastName}</span>
                </div>
                <p className="font-semibold">Amount (in Rs)</p>
                <div className='flex flex-col justify-center'>
                  <Input />
                  <button className='btn mt-4 btn-success w-1/2'>Send</button>
                </div>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn" onClick={closeModal}>Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          )}
        </div>
      ))}
    </div>
  );
};

export default Main;
