import React, { Component } from "react";

class Listcompany extends Component {
  render() {
    return (
      <div className="container">
        <div className="table-responsive">
          <table class="table table-bordered table-striped" id=" company_name">
            <tr>
              <th> COMPANY NAME</th>
              <th> PRICE</th>
              <th>CHANGE</th>
            </tr>
            <tr>
              <td> TCS</td>

              <td> PRICE </td>
              <td>CHANGE</td>
            </tr>
            <tr>
              <td> MICROSOFT</td>
              <td> PRICE</td>
              <td>CHANGE</td>
            </tr>
            <tr>
              <td> RELIANCE</td>
              <td> PRICE</td>
              <td>CHANGE</td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}
export default Listcompany;
