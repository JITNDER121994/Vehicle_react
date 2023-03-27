import React, { useEffect, useState } from 'react'
import "./homepage.css"



const HomeJ = () => {
    const [data, setData] = useState([]);
    const[search,  setSearch] =useState("");
    function Search(){
    let Data = data.filter((el) =>{ 
      return search === el.Mfr_CommonName;
   });
  
  
   console.log(Data);
    }
    useEffect(() => {
      fetch(
        "https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json&page=2"
      )
        .then((res) => {
          return res.json();
        })
        .then((vehicleData) => {
          setData(vehicleData.Results);
       
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
  
    return (
        <div className="main-container">
         
          <h1>Vehicle Manufecturers</h1>
  
          <div className="d">
            <div className="search">
              <label htmlFor="search">Search:</label>
              <input type="text" id="search" value={search}  onChange={(e)=>{setSearch(e.target.value);Search()}}/>
            </div>
  
            <div className="filter">
              <label htmlFor="filter">Filter By Vehicle Type:</label>
              <select name="filterList" id="filterList">
                <option value="all">All</option>
                <option value="passenger_car">Passenger Car</option>
                <option value="truck">Truck</option>
                <option value="mpv">Multipurpose Passenger Vehicle(MPV)</option>
                <option value="motercycle">Motercycle</option>
                <option value="trailer">Trailer</option>
                <option value="lsv">Low speed vehicle(LSV)</option>
                <option value="offRoad">Off Road Vehicle</option>
                <option value="bus">Bus</option>
                <option value="incomplete">Incomplete Vehicle</option>
                <option value=""></option>
                <option value=""></option>
              </select>
            </div>
          </div>
  
          <div className="vehicle-data">
            <table>
              <thead>
                  <tr>
  
                 
                <th>Name</th>
                <th>Country</th>
                <th>Type</th>
                </tr>
              </thead>
  
              <tbody>
                  {data.map((elm ,i)=>{
  
                      return(
  
                          <tr key={i}>
                  <td>{elm.Mfr_CommonName}</td>
                  <td>{elm.Country}</td>
                  <td>{elm.VehicleTypes.length > 0 && elm.VehicleTypes[0].Name }</td>
                </tr>
                      )
                  }
                  )}
                
              </tbody>
              
            </table>
          </div>
        
      
      </div>
    );
  };
  
export default HomeJ;
