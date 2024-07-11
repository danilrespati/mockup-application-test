import { useState } from "react";
import "./Register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/register";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div
            className="card bg-dark text-white"
            style={{ borderRadius: "1rem" }}
          >
            <div className="card-body p-5 text-center">
              <div className="mb-md-5 mt-md-4 pb-5">
                <form onSubmit={handleSubmit}>
                  <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                  <p className="text-white-50 mb-5">
                    Please insert your email and password!
                  </p>
                  {error && <div>{error}</div>}
                  <div className="form-outline form-white mb-4">
                    <input
                      id="email"
                      type="text"
                      placeholder="Email"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                    <label className="form-label" htmlFor="email" hidden>
                      Email address
                    </label>
                  </div>
                  <div className="form-outline form-white mb-4">
                    <input
                      id="password"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={data.password}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                    <label className="form-label" htmlFor="password" hidden>
                      Password
                    </label>
                  </div>
                  <button
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-outline-light px-5"
                    type="submit"
                  >
                    Sign Up
                  </button>
                </form>
                <br />
                <div>
                  <p className="mb-0">
                    Already have an account?{" "}
                    <Link to="/login">
                      <button className="btn btn-link text-white-50 fw-bold">
                        Login
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
