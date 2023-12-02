import { React, useState, useEffect, useContext, Fragment } from "react";
import axios from "axios";
import * as adminsService from "../../services/admin";
import AuthContext from "../../context/authProvider";
import Modal from "../admin/ModalUser";

//show list
const User = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [users, setUsers] = useState([]);
  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = auth.accessToken;
      const param = {};

      const responseUser = await adminsService.getUser(param, accessToken);
      console.log("🚀 ~ fetchUser ~ responseUser:", responseUser);

      if (responseUser?.status === 200) {
        setUsers(responseUser.data.listUsers);
      } else {
        console.log(responseUser);
      }
    };
    fetchUser();
  }, [auth]);

  useEffect(() => {
    const myDataString = localStorage.getItem("auth");
    if (myDataString !== null) {
      const myDataObject = JSON.parse(myDataString);
      setAuth(myDataObject);
    } else {
      setAuth({});
    }
  }, []);

  //edit user
  const [editingUser, setEditingUser] = useState(null);

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setUsers([...users, newRow])
      : setUsers(
          users.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          }),
        );
  };

  const handleEdit = async (user) => {
    setModalOpen(true);
    setRowToEdit(user.id);
    console.log(user.id);
    const accessToken = auth.accessToken;
    const param = {
      userId: user,
      role: "R2",
    };
    const responseUpdate = await adminsService.updateUser(param, accessToken);
    console.log(responseUpdate);
  };

  const handleSave = (editedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === editedUser.id ? editedUser : user,
    );
    setUsers(updatedUsers);
    setEditingUser(null);
  };

  //delete user
  const deleteId = async (id) => {
    const res = await axios.delete(
      `http://localhost:8080/api/users/delete-user?userId=${id}`,
      {
        withCredentials: false,
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJxdXkxQGdtYWlsLmNvbSIsInJvbGVzIjpbIkFkbWluIl0sImlhdCI6MTcwMDM2MTUyOSwiZXhwIjoxNzAwNTM0MzI5fQ.846lz8sUyYMKdM42EbPqAG9J3emByqpg7oQUxNQfxg8wlHJW-DKcQbwIN7zZJ01vDwm1xE4lnGfw4_U5XGfhAg",
          "Content-Type": "application/json",
        },
      },
    );
    const userDelete = res.data.user;
    console.log(userDelete);
    const newUsers = [...users];
    newUsers.splice(
      newUsers.findIndex((user) => user.id === userDelete.id),
      1,
    );
    setUsers(() => newUsers);
  };
  return (
    <Fragment>
      <h2 className="my-5 text-2xl font-bold">Management User Account</h2>
      <table class=" w-full table-auto border-separate border-spacing-y-5 rounded-tl-xl rounded-tr-xl">
        <thead className=" w-full  bg-[#ECEFF1]">
          <tr>
            <th className="rounded-l-xl py-3 pl-3 text-left text-base font-medium text-[#1B2432]">
              User Name
            </th>
            <th className="text-left text-base font-medium text-[#1B2432]">
              Visit Id
            </th>
            <th className="text-left text-base font-medium text-[#1B2432]">
              Email
            </th>
            <th className="text-left text-base font-medium text-[#1B2432]">
              Phone
            </th>
            <th className="text-left text-base font-medium text-[#1B2432]">
              Address
            </th>
            <th className="text-left text-base font-medium text-[#1B2432]">
              Role
            </th>
            <th className="rounded-r-xl text-left text-base font-medium text-[#1B2432]">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="w-full">
          {users.map((user, index) => {
            return (
              <tr key={index} className=" bg-[#FFF]">
                <td className="py-3 pl-3 rounded-l-xl">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://mighty.tools/mockmind-api/content/human/7.jpg"
                      alt="avatar"
                      className="object-cover rounded-full h-9 w-9"
                    />
                    <span>{user.name}</span>
                  </div>
                </td>
                <td className="py-3 pl-3">
                  <span>{user.id}</span>
                </td>
                <td className="py-3 pl-3">
                  <span> {user.email}</span>
                </td>
                <td className="py-3 pl-3">
                  <span>{user.phone}</span>
                </td>
                <td className="py-3 pl-3">
                  <span>{user.address}</span>
                </td>
                <td className="py-3 pl-3">
                  <span>{user.role}</span>
                </td>
                <td className="py-3 pl-3 ml-auto rounded-r-xl">
                  <div className="flex gap-2">
                    <button className="rounded-xl bg-[#23A9F9] px-6 py-2 text-white">
                      Update
                    </button>
                    <button className="rounded-xl bg-[#FFA900] px-6 py-2 text-white">
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default User;

/**
 * <div className="">
      <div>
        <h2 className="my-5 text-2xl font-bold">Management User Account</h2>
      </div>

      <table className="w-full bg-white table-auto">
        <thead>
          <tr className="flex w-full bg-gray-100">
            <th className="flex-1 p-2 text-black border ">ID</th>
            <th className="flex-1 p-2 text-black border ">Name</th>
            <th className="flex-1 p-2 text-black border ">Email</th>
            <th className="flex-1 p-2 text-black border ">Phone</th>
            <th className="flex-1 p-2 text-black border ">Address</th>
            <th className="flex-1 p-2 text-black border ">Role</th>
            <th className="flex-1 p-2 text-black border ">Tùy Chọn</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={index}
              className="flex items-center h-16"
              data-index={index}
            >
              <td className="flex items-center justify-center flex-1 h-full px-2 border">
                {user.id}
              </td>
              <td className="flex items-center justify-center flex-1 h-full px-2 border">
                {user.name}
              </td>
              <td className="flex items-center justify-center flex-1 h-full px-2 border">
                {user.email}
              </td>
              <td className="flex items-center justify-center flex-1 h-full px-2 border">
                {user.phone}
              </td>
              <td className="flex items-center justify-center flex-1 h-full px-2 border">
                {user.address}
              </td>
              <td className="flex items-center justify-center flex-1 h-full px-2 border">
                {user.role}
              </td>
              <td className="flex items-center justify-center flex-1 h-full gap-4 px-2 border">
                <button
                  className="px-2 py-1 text-white bg-green-600 rounded-md hover:underline"
                  onClick={() => handleEdit(user.id)}
                >
                  Sửa
                </button>
                <button
                  className="px-2 py-1 text-white bg-red-600 rounded-md hover:underline"
                  onClick={() => deleteId(user.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen}
      <div>
        {modalOpen && (
          <Modal
            closeModal={() => {
              setModalOpen(false);
              setRowToEdit(null);
            }}
            onSubmit={handleSubmit}
            defaultValue={rowToEdit !== null && users[rowToEdit]}
          />
        )}
      </div>
    </div>
 */
