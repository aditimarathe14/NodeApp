import React, { Component } from "react";
import { Dropdown } from "primereact/dropdown";
import { DataTable, Column } from "primereact/datatable";
import { Button } from "primereact/button";

export default class NoteUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Note_id: this.props.Id,
      User: null,
      Permission: null,
    };

    console.log(props.permissions);
  }

  permissionTemplate = (rowdata) =>{
    
    let permissions = {
      A : 'Admin',
      W : 'Write',
      R : 'Read'
    }
    return (
      <span>
        {permissions[rowdata.permissionName]}
      </span>
      );
  }

  actionTemplate = (rowData, column) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-trash"
          className="p-button-error"
          onClick={(e) => {
            e.preventDefault();
            if (window.confirm("Are you sure you want to remove this ?")) {
              this.props.deleteCollab(rowData.Id);
            }
          }}
        ></Button>
      </div>
    );
  };

  onChangeUser = (e) => {
    this.setState({ User: e.value });
  };

  onChangePermission = (e) => {
    this.setState({ Permission: e.value });
  };

  addCollab = (e) => {
    if (this.state.User === null || this.state.Permission === null) {
      alert("please select user and permision and try again");
      return;
    }
    if (
      this.props.collabs.filter((x) => x.UserId === this.state.User.UserId)
        .length > 0
    ) {
      alert("User Already exist please try to delete it and again");
      return;
    }
    this.props.addCollab({
      Note_id: this.props.note.Id,
      UserId: this.state.User.EmpId,
      Permission: this.state.Permission.code,
    });
  };

  render() {
    return (
      <div>
        <DataTable value={this.props.collabs}>
          <Column field="UserName" header="UserId" />
          {/* <Column field="permissionName" header="Permission" /> */}
          <Column
            body={this.permissionTemplate}
            style={{ textAlign: "center" }}
            header="Permission"
          />

          <Column
            body={this.actionTemplate}
            style={{ textAlign: "center", width: "8em" }}
          />
        </DataTable>
        <br />
        <div>
          <Dropdown
            onChange={this.onChangeUser}
            value={this.state.User}
            options={this.props.users}
            dataKey="EmpId"
            optionLabel="EmpName"
            placeholder="Add users"
          />
          &nbsp;&nbsp;
          <Dropdown
            onChange={this.onChangePermission}
            value={this.state.Permission}
            optionLabel="name"
            dataKey="code"
            options={this.props.permissions}
            placeholder="Select Permission"
          />
          &nbsp;&nbsp;
          <Button
            type="button"
            icon="pi pi-plus"
            onClick={this.addCollab}
            className="p-button-error"
          ></Button>
        </div>
      </div>
    );
  }
}
