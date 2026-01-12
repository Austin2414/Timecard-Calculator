import { useState } from "react";

type DailyTimes = {
    day: string,
    inTime: string,
    outTime: string,
    lunch: boolean,
}


function TimeCalculator() { 
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const [times, setTimes] = useState<DailyTimes[]>(
        days.map(day => ({
            day,
            inTime: "",
            outTime: "",
            lunch: true,
        }))
    );
    
    const weeklyMinutes = times.reduce((total, time) => {
        const start = time.inTime ? convertTimesToMinutes(time.inTime): 0;
        const end = time.outTime ? convertTimesToMinutes(time.outTime): 0;

        const worked = end - start;
        const dailyMinutes = time.lunch ? worked - 30: worked;

        return total + Math.max(dailyMinutes, 0);


    }, 0);

    const formattedWeekly = minutesIntoString(weeklyMinutes);


    

    return (
        <div className="app-container">
            <h1 className="heading">Time Calculator</h1>
            <ul className="days">
                {times.map((time) => {

                    const start = time.inTime 
                        ? convertTimesToMinutes(time.inTime)
                    : 0;

                    const end = time.outTime 
                        ? convertTimesToMinutes(time.outTime)
                    : 0;

                    const worked = end - start;
                    const totalMinutesWorked = time.lunch ? worked - 30 : worked;
                    const formattedTime = minutesIntoString(Math.max(totalMinutesWorked, 0));

                        return (
                        <li key={time.day}>
                        {time.day} - <strong>{formattedTime}</strong>

                        <input 
                            type="time" 
                            placeholder="Time IN" 
                            value={time.inTime}
                            onChange={(e) => {
                                setTimes(prevTimes =>
                                    prevTimes.map(t =>
                                        t.day === time.day
                                            ? { ...t, inTime: e.target.value}
                                            : t
                                    )
                                )
                            }}
                        />                       

                        <input
                            type="time"
                            placeholder="Time OUT"
                            value={time.outTime}
                            onChange={(e) => {
                                setTimes(prevTimes =>
                                    prevTimes.map(t =>
                                        t.day === time.day
                                            ? { ...t, outTime: e.target.value }
                                            : t
                                    )
                                )
                            }}
                        /> 

                        <input 
                            type="checkbox"
                            checked={time.lunch}
                            onChange={(e) =>
                                setTimes(prevTimes =>
                                    prevTimes.map(t =>
                                        t.day === time.day
                                        ? { ...t, lunch: e.target.checked}
                                        : t
                                    )
                                )
                            }
                        />

                        <label> Deduct Lunch (30 minutes)</label>
                        </li>

                        )
                    })}
            </ul>  
            <div className="footer">Total Weekly Hours: {formattedWeekly}</div>             
        </div>
    );
}

function convertTimesToMinutes(time:string): number {
    const [hoursString, minutesString] = time.split(":");

    const hours = Number(hoursString);
    const minutes = Number(minutesString);

    const totalMinutes = hours * 60 + minutes;

    return totalMinutes
}

function minutesIntoString(time:number): string {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
}

export default TimeCalculator;