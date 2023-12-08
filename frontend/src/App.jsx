import './App.css'
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  let [cityNames, setCityNames] = useState('');
  
  let [data, setdata] = useState([]);

  const handleSubmit = async (event) => {
   try {
     event.preventDefault();
     const cities = cityNames.split(',').map(city => city.trim());

     let response = await axios.post('http://localhost:5000/getWeather', {
       cities
     });
     setCityNames('');
     setdata(response.data);
     toast.success('Weather data fetched successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });

   } catch (error) {
    toast.error(`${error.response.data}Please check you spellings!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
   }
  };

  return (
    <div style={{ width: "100vw", height: "100vh",overflowX:'hidden' }}>
       <ToastContainer />
      <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '5px' }}>
        <h2 style={{ color: '#333' }}>Enter City Names</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={cityNames}
            onChange={(e) => setCityNames(e.target.value)}
            placeholder="Enter city names, separated by commas"
            style={{ flex: '1', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
          <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#007BFF', color: '#fff', cursor: 'pointer' }}>
            Submit
          </button>
        </form>
      </div>
      <div style={{margin:'10px', display:'flex',flexDirection:'column',alignItems:'center',width:"100vw",overflowY:'scroll'}}>
        {data.map((info, index) => {
          return <div key={index} style={{ border: '1px solid #ddd', margin: '10px',width:'90vw', padding: '10px', borderRadius: '5px', backgroundColor: '#ADD8E6'}}>
            <h2 style={{ color: '#333' }}>{info.location.name}, {info.location.region}, {info.location.country}</h2>
            <p><strong>Temperature:</strong> {info.current.temp_c}°C ({info.current.temp_f}°F)</p>
            <p><strong>Condition:</strong> {info.current.condition.text}</p>
            <p><strong>Wind:</strong> {info.current.wind_kph} kph ({info.current.wind_mph} mph) {info.current.wind_dir}</p>
            <p><strong>Humidity:</strong> {info.current.humidity}%</p>
          </div>
        })}
      </div>
    </div>
  )
}

export default App
