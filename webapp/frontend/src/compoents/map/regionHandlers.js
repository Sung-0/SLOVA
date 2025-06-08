export const handleSidoChange = async (code, {
  setSidoCode, setSigunguCode, setEmdCode, setRiCode,
  setSigunguList, setEmdList, setRiList,
  setBoundaryGeojson
}) => {
  setSidoCode(code);
  setSigunguCode('');
  setEmdCode('');
  setRiCode('');
  setSigunguList([]);
  setEmdList([]);
  setRiList([]);

  if (code) {
    try {
      const res = await fetch(`/api/sigungu/${code}`);
      const data = await res.json();
      setSigunguList(data);
      setBoundaryGeojson(null); // 초기화
    } catch (error) {
      console.error('시군구 리스트 로딩 실패:', error);
    }
  }
};

export const handleSigunguChange = async (code, {
  setSigunguCode, setEmdCode, setRiCode,
  setEmdList, setRiList,
  setBoundaryGeojson
}) => {
  setSigunguCode(code);
  setEmdCode('');
  setRiCode('');
  setEmdList([]);
  setRiList([]);

  if (code) {
    try {
      const res = await fetch(`/api/emd/${code}`);
      const data = await res.json();
      setEmdList(data);
      setBoundaryGeojson(null);
    } catch (error) {
      console.error('읍면동 리스트 로딩 실패:', error);
    }
  }
};

export const handleEmdChange = async (code, {
  setEmdCode, setRiCode, setRiList,
  emdList,
  setBoundaryGeojson
}) => {
  setEmdCode(code);
  setRiCode('');
  setRiList([]);

  if (code) {
    try {
      const selected = emdList.find(item => item.code === code);
      if (selected && (selected.name.endsWith('읍') || selected.name.endsWith('면'))) {
        const res = await fetch(`/api/ri/${code}`);
        const data = await res.json();
        setRiList(data);
      }
      setBoundaryGeojson(null);
    } catch (error) {
      console.error('리 리스트 로딩 실패:', error);
    }
  }
};

export const handleRiChange = (code, {
  setRiCode,
  setBoundaryGeojson
}) => {
  setRiCode(code);
  setBoundaryGeojson(null);
};