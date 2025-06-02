import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LocationSelect({ onLocationChange }) {
  const [sidoCode, setSidoCode] = useState('');
  const [sigunguList, setSigunguList] = useState([]);
  const [sigunguCode, setSigunguCode] = useState('');
  const [emdList, setEmdList] = useState([]);
  const [emdCode, setEmdCode] = useState('');
  const [riList, setRiList] = useState([]);

  // 시군구 불러오기
  useEffect(() => {
    if (sidoCode) {
      axios.get(`/api/sigungu/${sidoCode}`).then(res => setSigunguList(res.data));
    }
  }, [sidoCode]);

  // 읍면동 불러오기
  useEffect(() => {
    if (sigunguCode) {
      axios.get(`/api/emd/${sigunguCode}`).then(res => setEmdList(res.data));
    }
  }, [sigunguCode]);

  // 리 불러오기
  useEffect(() => {
    if (emdCode) {
      axios.get(`/api/ri/${emdCode}`).then(res => setRiList(res.data));
    }
  }, [emdCode]);

  // 각 선택 시 상위 코드 갱신
  const handleSidoChange = (e) => {
    setSidoCode(e.target.value);
    setSigunguCode('');
    setEmdCode('');
    setSigunguList([]);
    setEmdList([]);
    setRiList([]);
  };

  const handleSigunguChange = (e) => {
    setSigunguCode(e.target.value);
    setEmdCode('');
    setEmdList([]);
    setRiList([]);
  };

  const handleEmdChange = (e) => {
    setEmdCode(e.target.value);
    setRiList([]);
  };

  const handleRiChange = (e) => {
    const liCode = e.target.value;
    const selected = riList.find(item => item.code === liCode);
    if (selected && onLocationChange) {
      onLocationChange(selected); // 지도 이동/경계 그리기
    }
  };

  return (
    <table className='location-table'>
      <tbody>
        <tr>
          <th scope="row">시/군/구</th>
          <td>
            <select onChange={handleSidoChange} className="searchLocationSelect">
                <option value="">::::::::::선택::::::::::</option>
                <option value="11">서울특별시</option> <option value="26">부산광역시</option>
                <option value="27">대구광역시</option> <option value="28">인천광역시</option>
                <option value="29">광주광역시</option> <option value="30">대전광역시</option>
                <option value="31">울산광역시</option> <option value="36">세종특별자치시</option>
                <option value="41">경기도</option> <option value="43">충청북도</option>
                <option value="44">충청남도</option> <option value="46">전라남도</option>
                <option value="47">경상북도</option> <option value="48">경상남도</option>
                <option value="50">제주특별자치도</option> <option value="51">강원특별자치도</option>
                <option value="45">전북특별자치도</option>
            </select>
          </td>
        </tr>
        <tr>
          <th scope="row">시/군/구</th>
          <td>
            <select onChange={handleSigunguChange} className="searchLocationSelect" value={sigunguCode}>
              <option value="">::::::::::선택::::::::::</option>
              {sigunguList.map(item => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
          </td>
        </tr>
        <tr>
          <th scope="row">읍/면/동</th>
          <td>
            <select onChange={handleEmdChange} className="searchLocationSelect" value={emdCode}>
              <option value="">::::::::::선택::::::::::</option>
              {emdList.map(item => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
          </td>
        </tr>
        <tr>
          <th scope="row">리</th>
          <td>
            <select onChange={handleRiChange} className="searchLocationSelect">
              <option value="">::::::::::선택::::::::::</option>
              {riList.map(item => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default LocationSelect;
