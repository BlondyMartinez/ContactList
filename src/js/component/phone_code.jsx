import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

const PhoneCode = ({ phone }) => {
  const { store, actions } = useContext(Context);
  const [countryData, setCountryData] = useState([]);
  const [selectedAlpha2Code, setSelectedAlpha2Code] = useState('');

  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
    .then((response) => response.json())
    .then((data) => { setCountryData(data); })
    .catch((error) => console.error("Error fetching country data:", error));
  }, []);

  
  useEffect(() => {
    const alpha2Code = store.selectedCode.split('_')[0];
    setSelectedAlpha2Code(alpha2Code);
  }, [store.selectedCode]);


  const handleCodeChange = (e) => {
    actions.setSelectedCode(e.target.value);
  };

  return (
    <div className="d-flex align-items-center">
      {selectedAlpha2Code && (
        <img
          src={countryData.find((country) => country.alpha2Code === selectedAlpha2Code)?.flags.svg}
          alt={countryData.find((country) => country.alpha2Code === selectedAlpha2Code)?.name}
          className="w-auto"
          style={{ height: "2rem", marginRight: "5px", border: "2px solid black" }}
        />
      )}
      <select id="phone-code" className="form-select w-auto" value={store.selectedCode} onChange={handleCodeChange} required={phone?.length > 1}>
        <option value="">Code</option>
        {countryData.map((country, index) => {
          return (
            <option key={index} value={`${country.alpha2Code}_${country.callingCodes[0]}`}>
              {country.alpha2Code} ({`+${country.callingCodes[0]}`})
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default PhoneCode;