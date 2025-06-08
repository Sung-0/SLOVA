import React, { useState, useEffect, useRef, useContext } from 'react';
import { MapContext } from '../context/MapContext';

const ZoomControls = () => {
  const { map } = useContext(MapContext);
  const [zoom, setZoom] = useState(0);
  const sliderRef = useRef(null);
  const [hovered, setHovered] = useState(false); // 투명도 조절 상태태

  useEffect(() => {
    if (!map) return;

    const view = map.getView();
    setZoom(view.getZoom());

    const onChange = () => {
      setZoom(view.getZoom());
    };

    view.on("change:resolution", onChange);
    return () => view.un("change:resolution", onChange);
  }, [map]);

  const zoomIn = () => {
    if (!map) return;
    const view = map.getView();
    view.setZoom(Math.min(view.getZoom() + 1, view.getMaxZoom()));
  };

  const zoomOut = () => {
    if (!map) return;
    const view = map.getView();
    view.setZoom(Math.max(view.getZoom() - 1, view.getMinZoom()));
  };

  const onSliderChange = (e) => {
    if (!map) return;
    const newZoom = Number(e.target.value);
    map.getView().setZoom(newZoom);
  };

  const minZoom = map?.getView()?.getMinZoom?.() ?? 7;
  const maxZoom = map?.getView()?.getMaxZoom() ?? 18;

  const wrapperStyle = {
    position: 'absolute',
    top: 150,
    right: 10,
    opacity: hovered ? 1 : 0.3,
    transition: 'opacity 0.3s ease-in-out',
    zIndex: 1000,
  };

  return (
    <div
      style={wrapperStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
    <div style={styles.container}>
      <button onClick={zoomIn} style={styles.button}>+</button>

      <input
        type="range"
        min={minZoom}
        max={maxZoom}
        step={0.1}
        value={zoom}
        onChange={onSliderChange}
        style={styles.slider}
        orient="vertical"
        ref={sliderRef}
      />
      <div style={styles.zoomLabel}>{zoom.toFixed(1)}</div>

      <button onClick={zoomOut} style={styles.button}>-</button>
    </div>
  </div>
  );
};

const styles = {
  container: {
    width: "40px",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: "6px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "8px 0",
    userSelect: "none",
  },
  button: {
    width: "32px",
    height: "32px",
    fontSize: "24px",
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "8px",
  },
  slider: {
    writingMode: "bt-lr",
    WebkitAppearance: "slider-vertical",
    height: "100px",
    width: "8px",
    marginBottom: "8px",
  },
  zoomLabel: {
    fontSize: "14px",
    marginBottom: "8px",
    color: "#444",
  },
};

export default ZoomControls;
