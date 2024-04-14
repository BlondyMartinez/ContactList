import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

const PhoneCode = ({ phone }) => {
  const { store } = useContext(Context);
  const [selectedCode, setSelectedCode] = useState('');
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
    .then((response) => response.json())
    .then((data) => { setCountryData(data); })
    .catch((error) => console.error("Error fetching country data:", error));
  }, []);

  const handleCodeChange = (e) => {
    store.selectedAlphaCode = e.target.value.split('_')[0];
    store.selectedCode = e.target.value.split('_')[1]
    setSelectedCode(`${store.selectedAlphaCode}_${store.selectedCode}`)
  };

  return (
    <div className="d-flex align-items-center">
      {store.selectedAlphaCode && (
        <img
          src={countryData.find((country) => country.alpha2Code === store.selectedAlphaCode)?.flags.svg}
          alt={countryData.find((country) => country.alpha2Code === store.selectedAlphaCode)?.name}
          className="w-auto"
          style={{ height: "2rem", marginRight: "5px", border: "2px solid black" }}
        />
      )}
      <select id="phone-code" className="form-select w-auto" value={selectedCode} onChange={handleCodeChange} required={phone?.length > 1}>
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