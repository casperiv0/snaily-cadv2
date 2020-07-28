import React, { Component } from "react";
import axios from "axios";
import { backendURL } from "../../../../config/config";
import Cookies from "js-cookie";
import ErrorMessage from "../../../Partials/Messages/ErrorMessage";
import lang from "../../../../language.json";

export default class CreateCompanyModal extends Component {
  constructor() {
    super();

    this.state = {
      companyName: "",
      companyOwner: "",
      whitelisted: "false",
      address: "",
      loading: true,
      error: "",
      companyWhitelisted: "",
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    axios({
      url: backendURL + "/company/create",
      method: "POST",
      headers: {
        "x-auth-snailycad-token": Cookies.get("__session"),
      },
      data: {
        companyName: this.state.companyName,
        owner: this.state.companyOwner,
        whitelistStatus: this.state.whitelisted,
        address: this.state.address,
      },
    }).then((res) => {
      console.log(res.data);

      if (res.data.msg === "Company Created") {
        sessionStorage.setItem(
          "message",
          `${lang.citizen.company.created_company} ${this.state.companyName}`
        );
        return (window.location = "/citizen");
      }

      this.setState({
        error: res.data.msg,
      });
    });
  };

  render() {
    const { companyName, error, address } = this.state;
    return (
      <div
        className="modal fade"
        id="createCompanyModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="createCompanyModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-dark border-dark text-light">
            <div className="modal-header">
              <h5 className="modal-title" id="createCompanyModal">
                {lang.citizen.company.create}
              </h5>
              <button
                type="button"
                className="close text-light"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={this.onSubmit}>
              <div className="modal-body">
                {error ? <ErrorMessage message={error} /> : null}
                <div className="form-group">
                  <label htmlFor="companyName">{lang.citizen.company.name}</label>
                  <input
                    className="form-control bg-secondary border-secondary text-light"
                    type="text"
                    name="companyName"
                    id="companyName"
                    value={companyName}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">{lang.citizen.company.address}</label>
                  <input
                    className="form-control bg-secondary border-secondary text-light"
                    type="text"
                    name="address"
                    id="address"
                    value={address}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="companyName">{lang.citizen.company.select_owner}</label>
                  <select
                    className="form-control bg-secondary border-secondary text-light"
                    name="companyOwner"
                    onChange={this.onChange}
                    id="companyOwner"
                  >
                    <option>{lang.citizen.company.select_owner}..</option>
                    {!this.props.owners[0] ? (
                      <option>{lang.citizen.company.no_cit}</option>
                    ) : (
                      this.props.owners.map((owner, index) => {
                        return (
                          <option key={index} value={owner.full_name}>
                            {owner.full_name}
                          </option>
                        );
                      })
                    )}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="whitelisted">{lang.citizen.company.whitelisted}</label>
                  <select
                    className="form-control bg-secondary border-secondary text-light"
                    name="whitelisted"
                    id="whitelisted"
                    onChange={this.onChange}
                  >
                    <option value="false">{lang.global.no}</option>
                    <option value="true">{lang.global.yes}</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  {lang.global.cancel}
                </button>
                <button type="submit" className="btn btn-primary">
                  {lang.citizen.company.create}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
