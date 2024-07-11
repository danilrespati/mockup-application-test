import { useEffect, useLayoutEffect, useState } from "react";
import "./Form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Table from "../Table/Table";
import Modal from "../Modal/Modal";
import $ from "jquery";

const emptyForm = {
  position: "",
  name: "",
  nik: "",
  born: "",
  gender: "",
  religion: "",
  bloodType: "",
  status: "",
  addressId: "",
  addressActual: "",
  email: "",
  phone: "",
  emergencyContact: "",
  education: [],
  training: [],
  workHistory: [],
  skill: "",
  anyPlacement: "",
  expectedSalary: "",
  signatureInfo: "Jakarta, 10 Juli 2024",
};

const Form = () => {
  const [data, setData] = useState({ ...emptyForm });
  const [modalState, setModalState] = useState({
    isActive: "",
    type: "education",
  });
  useLayoutEffect(() => {
    validateToken();
  }, []);
  useEffect(() => {
    getFormData(data.email);
  }, []);
  const [error, setError] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  const navigate = useNavigate();

  const validateToken = () => {
    const token = localStorage.getItem("token");
    try {
      const url = "http://localhost:8080/api/auth/validate";
      axios.post(url, { token: token }).then((res) => {
        getFormData(res.data.data.email);
      });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        window.scrollTo(0, 0);
        setError(error.response.data.message);
        navigate("/login");
      }
    }
  };

  const getFormData = async (email) => {
    if (!email) return;
    try {
      const url = "http://localhost:8080/api/form/get";
      axios.post(url, { email }).then((res) => {
        const obj = res.data.data;
        delete obj._id;
        delete obj.__v;
        if (obj.education)
          obj.education.forEach((v, i, a) => delete obj.education[i]._id);
        if (obj.training)
          obj.training.forEach((v, i, a) => delete obj.education[i]._id);
        if (obj.workHistory)
          obj.workHistory.forEach((v, i, a) => delete obj.education[i]._id);
        setData({ ...emptyForm, ...obj });
      });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        window.scrollTo(0, 0);
        setError(error.response.data.message);
      }
    }
  };

  const handleInputChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const url = "http://localhost:8080/api/form/submit";
      await axios.post(url, data);
      window.scrollTo(0, 0);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        window.scrollTo(0, 0);
        setError(error.response.data.message);
      }
    }
  };

  const handleDelete = async (e) => {
    try {
      const url = "http://localhost:8080/api/form/delete";
      await axios.post(url, { email: data.email });
      getFormData(data.email);
      window.scrollTo(0, 0);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        window.scrollTo(0, 0);
        setError(error.response.data.message);
      }
    }
  };

  const handleModal = ({ currentTarget: button }) => {
    const type = $(button).siblings("table").prop("id");
    setModalState({
      isActive: "is-active",
      type,
    });
    $("#addModal button.btn-secondary").one("click", function () {
      $("#addModal input").each(function () {
        $(this).val("");
      });
      setModalState({ ...modalState, isActive: "" });
    });
    $("#addModal button.btn-primary").one("click", function () {
      setModalState({ ...modalState, isActive: "" });
      let isEmpty = "";
      const newData = {};
      $("#addModal input").each(function () {
        const $this = $(this);
        const key = $this.prop("name");
        const val = $this.val().trim();
        $this.val("");
        isEmpty += val;
        newData[key] = val;
      });
      if (isEmpty == "") return false;
      const oldData = data[type];
      oldData.push(newData);
      setData({ ...data, [type]: [...oldData] });
    });
  };

  return (
    <div>
      <Modal isActive={modalState.isActive} type={modalState.type} />
      <nav className="navbar navbar-dark bg-dark px-2">
        <h2 className="text-white">Form</h2>
        <button
          data-mdb-button-init
          data-mdb-ripple-init
          className="btn btn-outline-danger"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
      {error && <div className="bg-danger">{error}</div>}
      <div className="px-2 pb-2">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="position" className="form-label">
              POSISI YANG DILAMAR :
            </label>
            <input
              id="position"
              type="text"
              name="position"
              value={data.position}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              NAMA :
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={data.name}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="nik" className="form-label">
              NO. KTP :
            </label>
            <input
              id="nik"
              type="text"
              name="nik"
              value={data.nik}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="born" className="form-label">
              TEMPAT, TANGGAL LAHIR :
            </label>
            <input
              id="born"
              type="text"
              name="born"
              value={data.born}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender" className="form-label">
              JENIS KELAMIN :
            </label>
            <select
              id="gender"
              name="gender"
              value={data.gender}
              onChange={handleInputChange}
              className="form-control form-select"
            >
              <option value="" defaultValue disabled hidden></option>
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="religion" className="form-label">
              AGAMA :
            </label>
            <input
              id="religion"
              type="text"
              name="religion"
              value={data.religion}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="bloodType" className="form-label">
              GOLONGAN DARAH :
            </label>
            <select
              id="bloodType"
              name="bloodType"
              value={data.bloodType}
              onChange={handleInputChange}
              className="form-control form-select"
            >
              <option value="" defaultValue disabled hidden></option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="AB">AB</option>
              <option value="O">O</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="status" className="form-label">
              STATUS :
            </label>
            <select
              id="status"
              name="status"
              value={data.status}
              onChange={handleInputChange}
              className="form-control form-select"
            >
              <option value="" defaultValue disabled hidden></option>
              <option value="Lajang">Lajang</option>
              <option value="Menikah">Menikah</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="addressId" className="form-label">
              ALAMAT KTP :
            </label>
            <input
              id="addressId"
              type="text"
              name="addressId"
              value={data.addressId}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="addressActual" className="form-label">
              ALAMAT TINGGAL :
            </label>
            <input
              id="addressActual"
              type="text"
              name="addressActual"
              value={data.addressActual}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              EMAIL :
            </label>
            <input
              id="email"
              type="text"
              name="email"
              value={data.email}
              onChange={handleInputChange}
              className="form-control"
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              NO. TELP :
            </label>
            <input
              id="phone"
              type="text"
              name="phone"
              value={data.phone}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="emergencyContact" className="form-label">
              ORANG TERDEKAT YANG DAPAT DIHUBUNGI :
            </label>
            <input
              id="emergencyContact"
              type="text"
              name="emergencyContact"
              value={data.emergencyContact}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="education" className="form-label">
              PENDIDIKAN TERAKHIR :
            </label>
            <button
              type="button"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-outline-success btn-sm mx-2"
              onClick={handleModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-plus"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
            </button>
            <Table
              id={"education"}
              dataArr={data.education}
              headerMap={{
                level: "Jenjang Pendidikan Terakhir",
                insitution: "Nama Institusi Akademik",
                major: "Jurusan",
                graduatedYear: "Tahun Lulus",
                score: "IPK",
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="training" className="form-label">
              RIWAYAT PELATIHAN :
            </label>
            <button
              type="button"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-outline-success btn-sm mx-2"
              onClick={handleModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-plus"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
            </button>
            <Table
              id={"training"}
              dataArr={data.training}
              headerMap={{
                title: "Nama Kursus/ Seminar",
                certificate: "Sertifikat (ada/tidak)",
                year: "Tahun",
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="workHistory" className="form-label">
              RIWAYAT PEKERJAAN :
            </label>
            <button
              type="button"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-outline-success btn-sm mx-2"
              onClick={handleModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-plus"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
            </button>
            <Table
              id={"workHistory"}
              dataArr={data.workHistory}
              headerMap={{
                company: "Nama Perusahaan",
                position: "Posisi Terakhir",
                salary: "Pendapatan Terakhir",
                year: "Tahun",
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="skill" className="form-label">
              SKILL : Tuliskan keahlian & keterampilan yang saat ini anda
              miliki.
            </label>
            <input
              id="skill"
              type="text"
              name="skill"
              value={data.skill}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="anyPlacement" className="form-label">
              BERSEDIA DITEMPATKAN DI SELURUH KANTOR PERUSAHAAN :
            </label>
            <select
              id="anyPlacement"
              name="anyPlacement"
              value={data.anyPlacement}
              onChange={handleInputChange}
              className="form-control form-select"
            >
              <option value="" defaultValue disabled hidden></option>
              <option value="Ya">Ya</option>
              <option value="Tidak">Tidak</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="expectedSalary" className="form-label">
              PENGHASILAN YANG DIHARAPKAN :
            </label>
            <input
              id="expectedSalary"
              type="text"
              name="expectedSalary"
              value={data.expectedSalary}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="pt-3 float-end">
            <button
              type="submit"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-outline-primary mx-2"
            >
              Submit
            </button>
            <button
              type="button"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-outline-danger mx-2"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Form;
