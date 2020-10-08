import React, { Component } from "react";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { TabView, TabPanel } from "primereact/tabview";
import {
  RichTextEditorComponent,
  Toolbar,
  Inject,
  Image,
  Link,
  HtmlEditor,
  QuickToolbar,
  Table,
} from "@syncfusion/ej2-react-richtexteditor";
import PropTypes from "prop-types";
import NoteUser from "./NoteUser";




export default class Note extends Component {
  inlineMode = {
    enable: true,
    onSelection: true,
  };

  fields = { text: "Name", value: "UserId" };

  constructor(props) {
    super(props);
    this.state = {
      note: this.props.note,
      orgNote: this.props.note,
      mode: this.props.editMode,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      note: props.note,
      orgNote: Object.assign({}, props.note),
      mode: this.props.editMode,
      collabs: this.props.collabs,
    });
    console.log("received collabs", props.collabs);
  }

  onChange = (e) => {
    this.setState({
      note: Object.assign(this.state.note, { [e.target.name]: e.target.value }),
    });
  };

  cancelClicked = (e) => {
    e.preventDefault();
    this.setState({ note: this.state.orgNote });
  };

  getCurrentRights() {
    debugger;
    if (this.props.currentUser === undefined) return "";
    if (
      this.props.collabs === undefined ||
      this.props.collabs === null ||
      this.props.collabs.length === 0
    )
      return "";
    let right = this.props.collabs.filter(
      (x) => x.UserId == this.props.currentUser
    )[0];
    return right ? right.Permission : "";
  }

  getNote() {
    if (this.props.note.mode === "read") {
      return (
        <Panel
          header={this.props.note.Title}
          style={{ maxHeight: "600px", height: "100%", overflow: "scroll" }}
        >
          <div dangerouslySetInnerHTML={{ __html: this.props.note.Body }} />
        </Panel>
      );
    } else
      return (
        <form>
          <input
            type="text"
            style={{
              width: "100%",
              fontWeight: "bold",
              height: "30px",
              paddingLeft: "5px",
              border: "none",
            }}
            placeholder="Enter title"
            name="Title"
            autoFocus="autofocus"
            value={this.state.note.Title}
            onChange={this.onChange}
          />
          <RichTextEditorComponent
            value={this.state.note.Body}
            name="Body"
            change={(e) => {
              console.log("edit fired...");
              let note = this.state.note;
              note.Body = e.value;
              this.setState({ note: note });
            }}
          >
            <Inject
              services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]}
            />
          </RichTextEditorComponent>
        </form>
      );
  }

  getButtons() {
    if (this.props.note.mode === "read") {
      return (
        <React.Fragment>
          {(this.getCurrentRights() === "W" ||
            this.getCurrentRights() === "A") && (
            <Button
              className="p-button-primary"
              label="Edit"
              onClick={(e) => {
                e.preventDefault();
                this.props.editModeStarted(this.state.note);
              }}
              icon="pi pi-external-link"
            />
          )}
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Button
            className="p-button-primary"
            label="Save"
            onClick={(e) => {
              e.preventDefault();
              this.props.itemSaved(this.state.note);
            }}
            icon="pi pi-save"
          />
          {/* <Button
            className="p-button-secondary"
            label="Undo"
            onClick={this.cancelClicked}
            icon="pi pi-replay"
          /> */}
        </React.Fragment>
      );
    }
  }
  getNoteContent = () => {
    return (
      <React.Fragment>
        <div className="row">{this.getNote()}</div>
        <div className="footer">{this.getButtons()}</div>
      </React.Fragment>
    );
  };

  render() {
    return (
      <div
        className="control-section tab-control-section"
        style={{ background: "white" }}
      >
        
        <TabView activeIndex={this.props.activeIndex || 0}>
          <TabPanel header="Note" icon="pi pi-fw pi-pencil">
            {this.getNoteContent()}
          </TabPanel>
          <TabPanel
            header="Permissions"
            enable={this.getCurrentRights() === "A"}
          >
            {this.getCurrentRights() === "A" && <NoteUser {...this.props} />}
          </TabPanel>
        </TabView>
      </div>
    );
  }
}

Note.propTypes = {
  note: PropTypes.object.isRequired,
};
