import React, { Component } from 'react';
import {
    Note,
    NotesList,
    Toolbar,
  } from "./";
  
  import Logout  from "./Logout";

//Redux stuff
import { connect } from "react-redux";
import * as actions from "../actions";


class Container extends Component {
    constructor(props) {
        super(props);
        this.props.feathCurrentUser();
        this.toolbarClicked = this.toolbarClicked.bind(this);
      }
    
       
    
      componentDidMount() {
        console.log("componentDidMount Container");
        this.props.fetchNotes();
        this.props.fetchUsers();
        this.props.feathCurrentUser();
      }

    
      toolbarClicked(event) {
        switch (event) {
          case "add":
            this.props.newNote({ Title: "", Body: "", mode: "edit" });
            break;
          case "delete":
            this.props.deleteNote(this.props.currentNote);
            break;
          case "refresh":
            this.props.fetchNotes();
            this.props.fetchUsers();
            break;
          case "deleteAll":
            this.props.deleteAllNote();
            break;
          default:
            break;
        }
      }
    
      itemSaved = (note) => {
        this.props.saveNote(note);
      };
    
      NoteSelected = (note) => {
        this.props.selectNote(note);
        this.props.fetchCollab(note.Id);
      };
    
    render() {
        return (
            <div id="container" style={{ position: "absolute" }}>
            <div className="content-section implementation flexgrid-demo">
              <div className="p-grid">
              <div className="p-col-12" style={{float:'right'}}>
                  <Logout />
                </div>
                <div className="p-col-1" style={{ paddingTop: "10px" , width: 'auto' }}>
                  <Toolbar itemClicked={this.toolbarClicked} />
                </div>
                <div className="p-col-4" style={{ paddingTop: "8px" , minWidth: '35%' }}>
                  <NotesList
                    ref={(input) => (this.Notes = input)}
                    notes={this.props.notes}
                    onSelected={this.NoteSelected}
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="p-col-7">
                  <Note
                    users={this.props.users}
                    currentUser={this.props.currentUser}
                    note={this.props.currentNote}
                    itemSaved={this.itemSaved}
                    editModeStarted={this.props.editModeStarted}
                    editMode={this.props.currentNote.mode}
                    collabs={this.props.collabs}
                    permissions={this.props.permissions}
                    deleteCollab={this.props.deleteCollab}
                    addCollab={this.props.addCollab}
                  />
                </div>
              </div>
            </div>
          </div>
        )
    }
}


const mergeCollbs = (collbs, permissions, users) => {
    collbs.forEach((element) => {
      element.permissionName = permissions.filter(
        (x) => x.code === element.Permission
      )[0].code;
      element.UserName = users.filter(
        (x) => x.EmpId === element.UserId
      )[0].EmpName;
      console.log("element", element);
    });
  
    return collbs;
  };
  
  const mapStateToProps = (state) => {
    const permissions = [
      { name: "Admin", code: "A" },
      { name: "Write", code: "W" },
      { name: "Read", code: "R" },
    ];
  
    return {
      notes: state.notesReducer.notes,
      users: state.usersReducer.users,
      currentUser: state.usersReducer.currentUser,
      currentNote: state.notesReducer.currentNote,
      permissions: permissions,
      collabs: mergeCollbs(
        state.notesCollabReducer.collabs,
        permissions,
        state.usersReducer.users
      ),
    };
  };
  
  export default connect(mapStateToProps, { ...actions })(Container);
  