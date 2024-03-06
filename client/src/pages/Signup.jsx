/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  //handling the form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const res_data = await response.json();
      console.log(response);
      if (response.ok) {
        console.log("Registration successfull");
        storeTokenInLS(res_data.token);
        toast.success("Registration successfull");
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        navigate("/");
      } else {
        console.log(res_data);
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.msg
        );
        // alert(res_data.extraDetails ? res_data.extraDetails : res_data.msg);
      }
    } catch (error) {
      console.log("Registration error" + { error });
    }
  };

  return (
    <section>
      <main>
        <div className="section-registration">
          <div className=" container grid grid-two-cols">
            <div className="registration-image">
              <img
                src="/images/register.png"
                alt="register "
                width="500"
                height="400"
              />
            </div>
            <div className="registration-form">
              <h1 className="main-heading mb-3">Registration form</h1>
              <br />
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="username"
                    id="username"
                    required
                    autoComplete="off"
                    value={user.username}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label htmlFor="email">email</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="enter your email"
                    id="email"
                    required
                    autoComplete="off"
                    value={user.email}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label htmlFor="phone">phone</label>
                  <input
                    type="number"
                    name="phone"
                    placeholder="phone"
                    id="phone"
                    required
                    autoComplete="off"
                    value={user.phone}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label htmlFor="password">password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    id="password"
                    required
                    autoComplete="off"
                    value={user.password}
                    onChange={handleInput}
                  />
                </div>
                <br />
                <button type="submit" className="btn btn-submit">
                  Register Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};
