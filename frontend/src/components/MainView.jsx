import React from 'react';

export default function MainView() {
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title mb-0">Add, Edit & Remove</h4>
          </div>

          <div className="card-body">
            <div className="listjs-table" id="customerList">
              <div className="row g-4 mb-3">
                <div className="col-sm-auto">
                  <button type="button" className="btn btn-success add-btn" id="create-btn">
                    <i className="ri-add-line align-bottom me-1"></i> Add
                  </button>
                  <button className="btn btn-soft-danger">
                    <i className="ri-delete-bin-2-line"></i>
                  </button>
                </div>
                <div className="col-sm">
                  <div className="d-flex justify-content-sm-end">
                    <div className="search-box ms-2">
                      <input type="text" className="form-control search" placeholder="Search..." />
                      <i className="ri-search-line search-icon"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="table-responsive table-card mt-3 mb-1">
                <table className="table align-middle table-nowrap" id="customerTable">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" style={{ width: '50px' }}>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="checkAll" />
                        </div>
                      </th>
                      <th className="sort">Customer</th>
                      <th className="sort">Email</th>
                      <th className="sort">Phone</th>
                      <th className="sort">Joining Date</th>
                      <th className="sort">Delivery Status</th>
                      <th className="sort">Action</th>
                    </tr>
                  </thead>
                  <tbody className="list form-check-all">
                    <tr>
                      <th scope="row">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" name="chk_child" />
                        </div>
                      </th>
                      <td className="customer_name">Mary Cousar</td>
                      <td className="email">marycousar@velzon.com</td>
                      <td className="phone">580-464-4694</td>
                      <td className="date">06 Apr, 2021</td>
                      <td className="status">
                        <span className="badge bg-success-subtle text-success text-uppercase">Active</span>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <button className="btn btn-sm btn-success">Edit</button>
                          <button className="btn btn-sm btn-danger">Remove</button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="noresult" style={{ display: 'none' }}>
                  <div className="text-center">
                    <lord-icon
                      src="https://cdn.lordicon.com/msoeawqm.json"
                      trigger="loop"
                      colors="primary:#121331,secondary:#08a88a"
                      style={{ width: '75px', height: '75px' }}
                    ></lord-icon>
                    <h5 className="mt-2">Sorry! No Result Found</h5>
                    <p className="text-muted mb-0">
                      We've searched more than 150+ Orders but did not find any matching results.
                    </p>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end">
                <div className="pagination-wrap hstack gap-2">
                  <a className="page-item pagination-prev disabled" href="#">
                    Previous
                  </a>
                  <ul className="pagination listjs-pagination mb-0"></ul>
                  <a className="page-item pagination-next" href="#">
                    Next
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
