import React, { useEffect, useContext, useState } from 'react';
import { Container, Table, Button, Col, Row } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DoctorAPI from '../apis/DoctorAPI';
import AppointmentAPI from '../apis/AppointmentAPI';

const ApptInfo = (props) => {
    const [apptInfo, setApptInfo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await (AppointmentAPI.post("/getApptInfo", {
                    appointment_id: props.apptID
                }));
                setApptInfo(response.data.data);
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [props.apptID]);

    const onClickCancel = async (e) => {
        console.log(e);
        props.onCancel(e);
        try {
            const response = await (AppointmentAPI.post("/cancelAppt", {
                appointment_id: e
            }));
            console.log(response.data.data);
        }
        catch (err) {
            console.log(err)
        }
        props.onCancel();
    }

    return (
        <div>
            <h1>Appointment Info</h1>
            {apptInfo.map((apptInfo, index) => {
                return (
                    <div key={index}>
                        Practice:
                        <br />
                            Start Time: {apptInfo.start_time}
                        <br />
                            End Time: {apptInfo.end_time}
                        <br />
                            Status: {apptInfo.status}
                        <br />
                            Patient:
                        <br />
                        <Button onClick={() => onClickCancel(apptInfo.appointment_id)}>
                            Cancel
                            </Button>
                    </div>
                );
            })}
        </div>
    );
}

export default ApptInfo;