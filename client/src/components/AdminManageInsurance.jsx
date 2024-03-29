import React, { useState, useEffect, useContext } from "react";
import InsuranceAPI from "../apis/InsuranceAPI";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Table, Button, Tabs, Tab, Nav, Col, Row, Accordion } from "react-bootstrap";
import { AdminContext } from "../context/AdminContext";

const AdminManageSpecialty = (props) => {

    // console.log(props.data);
    // console.log(props.character);

    const [insurances, setInsurances] = useState([]);

    const [expandedRows, setExpandedRows] = useState([]);
    const [expandState, setExpandState] = useState({});

    const handleExpandRow = (event, userId) => {
        const currentExpandedRows = expandedRows;
        const isRowExpanded = currentExpandedRows.includes(userId);

        let obj = {};
        isRowExpanded ? (obj[userId] = false) : (obj[userId] = true);
        setExpandState(obj);

        const newExpandedRows = isRowExpanded ?
            currentExpandedRows.filter(id => id !== userId) :
            currentExpandedRows.concat(userId);

        setExpandedRows(newExpandedRows);
    }

    useEffect(() => {
        if (props.data.length > 1) {
            var temp = []
            var index = 0;
            var data = props.data;
            if (props.character == "#") {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].insurance.charAt(0) >= '0' && data[i].insurance.charAt(0) <= '9') {
                        temp[index] = data[i]
                        index += 1;
                    }
                }
            } else if (props.character == "All") {
                for (var i = 0; i < data.length; i++) {
                    temp[i] = data[i]
                }
            } else {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].insurance.charAt(0) == props.character) {
                        temp[index] = data[i]
                        index += 1;
                    }
                }
            }
            setInsurances(temp);
        }
    }, [props]);


    return (
        <div style={{ margin: 0, marginBottom: 100, height: 1075, overflow: "auto" }}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Insurance</th>
                    </tr>
                </thead>
                <tbody>
                    {insurances.map((insurances, index) => {
                        return (
                            <>
                            <tr key={index} onClick={event => handleExpandRow(event, index)}>
                                <td>{index}</td>
                                <td>{insurances.insurance}</td>
                                </tr>
                                <>
                                    {
                                        expandedRows.includes(index) ?
                                            <tr key={index}>
                                                <td colSpan="8">
                                                    <div style={{ backgroundColor: '#687980', color: '#FFF', padding: '10px', width: "100%" }}>
                                                        <h2> Details </h2>
                                                        <ul>
                                                            <li key={index}>
                                                                <span><b></b></span> {' '}
                                                                <span> </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr> : null
                                    }
                                </>
                            </>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};

export default AdminManageSpecialty;