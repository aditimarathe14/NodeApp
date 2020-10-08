import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import Moment from 'react-moment';

import PropTypes from "prop-types";

export default class NotesList extends Component {
  constructor(props) {
    super(props);
    this.notesTpl = this.notesTpl.bind(this);
    this.cutshort = this.cutshort.bind(this);
    if(this.props.notes != null){
      this.state = {
        current: this.props.notes.length > 0 ? this.props.notes[0] : null
      };
    }
    
  }

  notesTpl(rowData, column) {
 
    return (
      <Card
        style={{ textAlign: "left" }}
        title={this.cutshort(rowData.Title, 30)}
      >
          <Moment className="time" date={rowData.lastUpdateOn}  fromNow/>
        <div
          dangerouslySetInnerHTML={{ __html: this.cutshort(rowData.Body, 150) }}
        />

      </Card>
    );
  }

  cutshort(text, number) {
    if (text === undefined || text === null) return "";
    if (text.length < number) return text;
    else {
      let newText = text.slice(0, number - 3);
      return newText + "...";
    }
  }

  render() {
    return (
      <div>
        <div className="content-section implementation">
          {this.props.notes && <DataTable
            style={{ textAlign: "left" }}
            scrollable={true}
            scrollHeight={`${window.innerHeight - 20}px`}
            value={this.props.notes}
            selectionMode="single"
            selection={this.state.current}
            onSelectionChange={e => {
              this.setState({ current: e.value });
              this.props.onSelected(e.value);
            }}
          >
            <Column
              field="title"
              footerStyle={{ display: "none" }}
              headerStyle={{ display: "none" }}
              body={this.notesTpl}
              style={{ textAlign: "center" }}
              header="notes"
            />
          </DataTable>}
        </div>
      </div>
    );
  }
}

NotesList.propTypes = {
  notes: PropTypes.array.isRequired,
  onSelected: PropTypes.func.isRequired
};
