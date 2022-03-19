import React, { useState } from 'react';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { TimeZones } from './TimeZones';


function App() {

  const [timezone, settimezone] = useState("Asia/Kolkata")

  const Clockrender = () => {
    const [hours, sethours] = useState(0)
    const [minutes, setminutes] = useState(0)
    const [seconds, setseconds] = useState(0)
    const [amorpm, setamorpm] = useState('AM')

    const [hrot, sethrot] = useState(0)
    const [mrot, setmrot] = useState(0)
    const [srot, setsrot] = useState(0)

    
    useEffect(() => {
      const interval = setInterval(() => {

        var time = new Date().toLocaleString("en-US", { timeZone: `${timezone}`, timeStyle: 'medium', hourCycle: 'h24' });

        if(parseInt(time.slice(0, 2))>=12){
            setamorpm('PM')
        } else setamorpm('AM')

        var htime = parseInt(time.slice(0, 2)) % 12;
        var mtime = parseInt(time.slice(3, 5));
        var stime = parseInt(time.slice(6, 8));

        sethours(htime);
        setminutes(mtime);
        setseconds(stime);

        sethrot(30 * htime + mtime / 2);
        setmrot(6 * mtime);
        setsrot(6 * stime);
      }, 1000)

      return () => clearInterval(interval)
    }, [])

    return (
      <section className='mainsection'>
        <div className="App">
          <div className="clockcontainer">
            <div id="hour" className="hour" style={{ transform: `rotate(${hrot}deg)` }} ></div>
            <div id="min" className="min" style={{ transform: `rotate(${mrot}deg)` }} ></div>
            <div id="sec" className="second" style={{ transform: `rotate(${srot}deg)` }} ></div>
            <div id="midpoint"></div>
          </div>
        </div>
        <div className='digitaltime'>
          <p>{hours} : {minutes} : {seconds} {amorpm}</p>
        </div>
        <Timezoneinput />
      </section>
    );
  }


const Timezoneinput = () => {
  return (<>
    <div className="container p-5">
      <select
        className="custom-select"
        value={timezone}
        onChange={(e) => {
          settimezone(e.target.value);
        }}
      >
        {TimeZones.map(timez => <option key={timez} value={timez} >{timez}</option>)}
      </select>
    </div>
    </>)
    ;
}

  return (
    <>
    <Clockrender/>
    
    </>);
}

export default App;


