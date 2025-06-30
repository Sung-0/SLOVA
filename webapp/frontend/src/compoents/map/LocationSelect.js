import { useEffect} from 'react';
import { useRegion } from '../context/RegionContext';
import {
  handleSidoChange,
  handleSigunguChange,
  handleEmdChange,
  handleRiChange
} from '../map/regionHandlers'
import { SIDO_LIST } from './sido';


function LocationSelect() {
  const region = useRegion();

  const {
    sidoCode, sigunguCode, emdCode, riCode,
    sigunguList, emdList, riList, setSelectedLocation
  } = region;

    useEffect(() => {
      if (riCode) {
        setSelectedLocation({ code: riCode});
      } else if (emdCode) {
        setSelectedLocation({ code: emdCode});
      } else if (sigunguCode) {
        setSelectedLocation({ code: sigunguCode});
      } else if (sidoCode) {
        setSelectedLocation({ code: sidoCode });
      }
    }, [sidoCode, sigunguCode, emdCode, riCode, setSelectedLocation]);

  return (
    <table className='location-table'>
      <tbody>
        <tr>
          <th scope="row">시/도</th>
          <td>
            <select onChange={ (e) => handleSidoChange(e.target.value, region)} className="searchLocationSelect" value={sidoCode}>
                <option value="">::::::::::선택::::::::::</option>
                {SIDO_LIST.map((sido) => (
                  <option key={sido.code} value={sido.code}>
                    {sido.name}
                  </option>
                ))}
            </select>
          </td>
        </tr>
        <tr>
          <th scope="row">시/군/구</th>
          <td>
            <select onChange={ (e) => handleSigunguChange(e.target.value, region)} className="searchLocationSelect" value={sigunguCode} disabled={sigunguList.length === 0}>
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
            <select onChange={ (e) => handleEmdChange(e.target.value, region)} className="searchLocationSelect" value={emdCode} disabled={!emdList.length}>
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
            {riList.length > 0 && (
              <select onChange={ (e) => handleRiChange(e.target.value, region)} className="searchLocationSelect"  value={riCode}>
                <option value="">::::::::::선택::::::::::</option>
                {riList.map(item => (
                  <option key={item.code} value={item.code}>
                    {item.name}
                  </option>
                ))}
              </select>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default LocationSelect;
