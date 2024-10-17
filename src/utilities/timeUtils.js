// timeUtils.js

const parseMeetingTime = (meetingString) => {
    console.log("Meeting String:", meetingString);
    if (!meetingString) {
      return { days: [], startTime: 0, endTime: 0 }; // No conflict if missing
    }
  
    const [days, timeRange] = meetingString.split(' ');
    const [startTime, endTime] = (timeRange || '').split('-').map(t => convertToMinutes(t) || 0);
  
    return { days: Array.from(days), startTime, endTime };
  };
  
  const convertToMinutes = (time) => {
    if (!time) return 0; // Handle missing time strings
    console.log("Time:", time);
    const [hours, minutes] = time.split(':').map(Number);
    return (hours || 0) * 60 + (minutes || 0);
  };
  
  export const hasConflict = (course1, course2) => {
    const { days: days1, startTime: start1, endTime: end1 } = parseMeetingTime(course1.meets);
    const { days: days2, startTime: start2, endTime: end2 } = parseMeetingTime(course2.meets);
  
    const sharedDays = days1.some(day => days2.includes(day));
    const timeOverlap = start1 < end2 && start2 < end1;
  
    return sharedDays && timeOverlap;
  };
  