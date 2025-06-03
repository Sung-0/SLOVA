import { useEffect} from 'react';
import { useRegion } from '../context/RegionContext';


function LocationSelect() {

  const {
      sidoCode, sigunguCode,
      emdCode, riCode,
      sigunguList, emdList, riList,
      handleSidoChange, handleSigunguChange,
      handleEmdChange, handleRiChange,
      setSelectedLocation
    } = useRegion();

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
            <select onChange={ (e) => handleSidoChange(e.target.value)} className="searchLocationSelect" value={sidoCode}>
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
            <select onChange={ (e) => handleSigunguChange(e.target.value)} className="searchLocationSelect" value={sigunguCode} disabled={sigunguList.length === 0}>
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
            <select onChange={ (e) => handleEmdChange(e.target.value)} className="searchLocationSelect" value={emdCode} disabled={!emdList.length}>
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
              <select onChange={ (e) => handleRiChange(e.target.value)} className="searchLocationSelect"  value={riCode}>
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
