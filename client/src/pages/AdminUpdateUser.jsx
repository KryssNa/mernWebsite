import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const AdminUpdateUser = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const { authorizationToken } = useAuth();
  const params = useParams();
  const editEvent = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const fetchDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      console.log(response);
      if (response.ok) {
        const userData = await response.json();
        console.log(userData);
        // getAllUsersData();
        setUser(userData);
      }
    } catch (error) {
      console.log("Error during fetching details", error);
    }
  };
  useEffect(() => {
    fetchDetails();
  }, []);
  const submitDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/update/${params.id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(user),
        }
      );
      if (response.ok) {
        toast.success("user updated successfullyu");
        // getAllUsersData();
      } else {
        toast.error("Not updated");
      }
    } catch (error) {
      console.log(error);
    }
    fetchDetails();
  };
  return (
    <>
      <div className="main-div">
        <h2>Admin Update User</h2>
        <div className="form-div">
          <label> Username</label>
          <input
            type="text"
            onChange={editEvent}
            name="username"
            value={user.username}
          />
          <label> Email</label>
          <input
            type="text"
            onChange={editEvent}
            name="email"
            value={user.email}
          />
          <label> Phone</label>
          <input
            type="number"
            onChange={editEvent}
            name="phone"
            value={user.phone}
          />
          <button onClick={() => submitDetails}>Submit</button>
        </div>
      </div>
    </>
  );
};

export default AdminUpdateUser;
