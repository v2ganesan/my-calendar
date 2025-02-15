import Appointment from '../models/appointments.js';

export async function filterAvailableSlots(userId, date, possibleSlots) {
    // Get all appointments for this user/date at once
    console.log('userid', userId)
    console.log('date', date);
    const appointments = await Appointment.findAll({
      where: {
        user_id : userId,
        date: date
      }
    });
    //console.log('appointments:', appointments);
    // Convert appointments to timestamps (milliseconds since epoch)
    const appointmentRanges = appointments.map(appt => ({
      start: new Date(`1970-01-01T${appt.start_time}`).getTime(),
      end: new Date(`1970-01-01T${appt.end_time}`).getTime()
    }));
  
    // Filter slots that don't overlap with any appointment
    const availableSlots = possibleSlots.filter(slot => {
      const slotStart = new Date(`1970-01-01T${slot.start}:00`).getTime();
      const slotEnd = new Date(`1970-01-01T${slot.end}:00`).getTime();

      return !appointmentRanges.some(appt => 
        slotStart < appt.end && 
        slotEnd > appt.start
      );
    });
  
    // Extract just the start times
    return availableSlots.map(slot => slot.start);
  }
