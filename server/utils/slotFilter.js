import Appointment from '../models/appointments.js';

export async function filterAvailableSlots(userId, date, possibleSlots) {
    // Get all appointments for this user/date at once
    const appointments = await Appointment.findAll({
      where: {
        user_id : userId,
        date: new Date(date)
      }
    });
  
    // Convert appointments to comparable time format
    const appointmentRanges = appointments.map(appt => ({
      start: new Date(appt.startTime).getTime(),
      end: new Date(appt.endTime).getTime()
    }));
    
    const availableSlots = possibleSlots.filter(slot => {
      const slotStart = new Date(`1970-01-01T${slot.start}`).getTime();
      const slotEnd = new Date(`1970-01-01T${slot.end}`).getTime();
      
      return !appointmentRanges.some(appt => 
        slotStart < appt.end && 
        slotEnd > appt.start
      );
    });
  
    // Extract just the start times
    return availableSlots.map(slot => slot.start);
  }
