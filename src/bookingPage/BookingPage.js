import React from 'react';
//import { useState, useEffect, useCallback } from 'react';
import Calendar from 'react-calendar'
import { Await } from 'react-router-dom';

export default async function bookingCalendar() {
    //const response = await fetch(`/api/apptOps/availableSlots=${userId}=${id}=${date}`);
    // const data = await response.json();

    return (
        <div>
            <Calendar />
        </div>
    )
}
