import { React, useState, useEffect } from "react";
import * as spaceService from "../../services/spaces";

const Owner = () => {
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    const fetchOwner = async () => {
      const param = {};

      const responseOwner = await spaceService.getSpace(param);

      if (responseOwner?.status === 200) {
        const listSpace = responseOwner?.data?.listSpaces;
        console.log('🚀 ~ fetchOwner ~ listSpace:', listSpace)
        setOwners(listSpace);
      } else {
        console.log(responseOwner);
      }
    };
    fetchOwner();
  }, []);

  function deleteid(id) {
    // axios({
    //   url: "http://localhost:8080/api/users/delete-user/?userId"+id,
    //   method: "delete",
    //   withCredentials: false,
    //   headers: {
    //     'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsZXh1YW50YW4xMkBnbWFpbC5jb20iLCJyb2xlcyI6WyJBZG1pbiJdLCJpYXQiOjE2OTk3Njg4NzEsImV4cCI6MTY5OTk0MTY3MX0.lNnNDP-mp8od_8RukgHZU-mR3cDAG00w96uZ-aQEPZ0kCnKuU6Lb5WYQZS2vOzdpvNodL0sASDKvEb_GkjCvow',
    //     'Content-Type': 'application/json'
    //   }
    // }).then((response) => {
    //   setPost(response.data.listUsers);
    // });
  }

  return (
    <div>
      <div>
        <h2 className="my-5 text-3xl font-bold">Management Owner Account</h2>
      </div>
      <table className="w-full bg-white table-auto">
        <thead>
          <tr className="flex w-full bg-gray-100">
            <th className="flex-1 p-2 text-black border ">ID</th>
            <th className="flex-1 p-2 text-black border ">Name</th>
            <th className="flex-1 p-2 text-black border ">Email</th>
            <th className="flex-1 p-2 text-black border ">Phone</th>
            <th className="flex-1 p-2 text-black border ">Address</th>
            <th className="flex-1 p-2 text-black border ">Tùy Chọn</th>
          </tr>
        </thead>
        <tbody>
          {owners.map((space, index) => (
            <tr key={index} className="flex items-center h-16">
              <td className="flex items-center justify-center flex-1 h-full px-2 border">
                {space?.ownerId?.id}
              </td>
              <td className="flex items-center justify-center flex-1 h-full px-2 border">
                {space?.ownerId?.name}
              </td>
              <td className="flex items-center justify-center flex-1 h-full px-2 border">
                {space?.ownerId?.email}
              </td>
              <td className="flex items-center justify-center flex-1 h-full px-2 border">
                {space?.ownerId?.phone}
              </td>
              <td className="flex items-center justify-center flex-1 h-full px-2 border">
                {space?.ownerId?.address}
              </td>
              <td className="flex items-center justify-center flex-1 h-full gap-4 px-2 border">
                <button
                  className="px-2 py-1 text-white bg-green-600 rounded-md hover:underline"
                  oncl
                >
                  Sửa
                </button>
                <button
                  className="px-2 py-1 text-white bg-red-600 rounded-md hover:underline"
                  onClick={deleteid}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Owner;
