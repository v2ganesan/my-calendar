export async function generatePossibleSlots(startTime, endTime, duration) {
  //array of possible slots to check for overlap with existing appts 
  const slots = [];
  //console.log('start', startTime);
  let current = new Date(`1970-01-01T${startTime}`);
  //console.log('current', current );
  const end = new Date(`1970-01-01T${endTime}`);
  //console.log('duration', duration.hours);
  const durationIncrement = 
    (duration.hours ?? 0) * 3_600_000 +  // 60*60*1000
    (duration.minutes ?? 0) * 60_000;    // 60*1000

    while(current < end) {
      const slotEnd = new Date(current.getTime() + durationIncrement);
      //console.log('end time', slotEnd)
      if(slotEnd <= end) {
        //console.log('Slot start ', current.toTimeString().substring(0, 5));
        slots.push({
          start: current.toTimeString().substring(0, 5),
          end: slotEnd.toTimeString().substring(0, 5)
        });
      }
      current = slotEnd;
    }
    return slots;
  }
