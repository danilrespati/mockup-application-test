import React from "react";

const Modal = ({ isActive, type }) => {
  return (
    <div
      id="addModal"
      className={`modal ${isActive}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Tambah Riwayat</h5>
          </div>
          <div className="modal-body">
            {type === "education" && (
              <>
                <div className="form-group">
                  <label htmlFor="level" className="form-label">
                    Jenjang Pendidikan :
                  </label>
                  <input
                    id="level"
                    type="text"
                    name="level"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="insitution" className="form-label">
                    Nama Institusi Akademik :
                  </label>
                  <input
                    id="insitution"
                    type="text"
                    name="insitution"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="major" className="form-label">
                    Jurusan :
                  </label>
                  <input
                    id="major"
                    type="text"
                    name="major"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="graduatedYear" className="form-label">
                    Tahun Lulus :
                  </label>
                  <input
                    id="graduatedYear"
                    type="text"
                    name="graduatedYear"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="score" className="form-label">
                    IPK :
                  </label>
                  <input
                    id="score"
                    type="text"
                    name="score"
                    className="form-control"
                  />
                </div>
              </>
            )}
            {type === "training" && (
              <>
                <div className="form-group">
                  <label htmlFor="title" className="form-label">
                    Nama Kursus/ Seminar :
                  </label>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="certificate" className="form-label">
                    Sertifikat (ada/tidak) :
                  </label>
                  <input
                    id="certificate"
                    type="text"
                    name="certificate"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="year" className="form-label">
                    Tahun :
                  </label>
                  <input
                    id="year"
                    type="text"
                    name="year"
                    className="form-control"
                  />
                </div>
              </>
            )}
            {type === "workHistory" && (
              <>
                <div className="form-group">
                  <label htmlFor="company" className="form-label">
                    Nama Perusahaan :
                  </label>
                  <input
                    id="company"
                    type="text"
                    name="company"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="position" className="form-label">
                    Posisi Terakhir :
                  </label>
                  <input
                    id="position"
                    type="text"
                    name="position"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="salary" className="form-label">
                    Pendapatan Terakhir :
                  </label>
                  <input
                    id="salary"
                    type="text"
                    name="salary"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="year" className="form-label">
                    Tahun :
                  </label>
                  <input
                    id="year"
                    type="text"
                    name="year"
                    className="form-control"
                  />
                </div>
              </>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
