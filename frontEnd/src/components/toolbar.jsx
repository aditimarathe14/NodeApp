import React, { Component } from 'react'
import {Button} from 'primereact/button';

import PropTypes from 'prop-types';



export default class Toolbar extends Component {
    render() {
        return (
            <div className="toolbar">
                <Button className="p-button-secondary" onClick={(e) => this.props.itemClicked('add')} icon="pi pi-plus" /> <br />
                <Button className="p-button-secondary" onClick={(e) => this.props.itemClicked('delete')}  icon="pi pi-trash" /> <br />
                {/* <Button className="p-button-secondary" onClick={(e) => this.props.itemClicked('deleteAll')}  icon="pi pi-trash" /> <br /> */}
                <Button className="p-button-secondary" onClick={(e) => this.props.itemClicked('refresh')} icon="pi pi-refresh" />
            </div>
        )
    }
}

Toolbar.propTypes ={
    itemClicked : PropTypes.func.isRequired,
}