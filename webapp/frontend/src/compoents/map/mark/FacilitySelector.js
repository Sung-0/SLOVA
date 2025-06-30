import { useState, useRef, useEffect } from "react";
import { useFacilityMark } from "../../context/FacilityMarkContext";
import * as motion from "motion/react-client";
import "../../../css/FacilitySelector.css";

const colors = ["#FF33B5", "#FF008C", "#D309E1", "#9C1AFF"];

const FacilitySelector = ({ onToggle }) => {

    const { isOpen, setIsOpen, filters, setFilters } = useFacilityMark();

    const containerRef = useRef(null);
    const [height, setHeight] = useState(1000);

    useEffect(() => {
        if (containerRef.current) {
            setHeight(containerRef.current.getBoundingClientRect().height);
        }
    }, [isOpen]);

    

    const markerGroups = {
        fire: ['fire'],
        police: ['police'],
        hospital: ["hospital", "armyHospital"],
    };

    const items = [
    { key: "all", label: "모두 보기" },
    { key: "fire", label: "소방서" },
    { key: "police", label: "경찰서" },
    { key: "hospital", label: "병원" },
    ];

    const handleToggle = (type) => {
        const updated = { ...filters };

        if (type === "all") {
        const isAllOn = Object.values(updated).every(Boolean);
        Object.keys(updated).forEach((key) => {
            updated[key] = !isAllOn;
        });
        } else {
        const keys = markerGroups[type] || [type];
        keys.forEach((key) => {
            updated[key] = !filters[key];
        });
        }

        setFilters(updated);
        onToggle && onToggle(updated);
    };

    return (
        <div className="container">
            <motion.nav
                initial={false}
                animate={isOpen ? "open" : "closed"}
                custom={height}
                ref={containerRef}
                className="nav"
            >
                <motion.div className="nav-bg" variants={sidebarVariants} />
                <motion.ul 
                    className={`menu-list ${isOpen ? "open" : "closed"}`} 
                    variants={navVariants}
                >
                    {items.map((item, i) => (
                        <motion.li
                            key={item.key}
                            className="menu-item"
                            variants={itemVariants}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleToggle(item.key)}
                        >
                            <div
                                className="circle"
                                style={{
                                    border: `2px solid ${colors[i]}`,
                                    backgroundColor: filters[item.key] ? colors[i] : "transparent",
                                }}
                            />
                            <span
                                className="label-pill"
                                style={{
                                  borderColor: colors[i],  
                                }}
                            >
                                {item.label}
                            </span>
                        </motion.li>
                    ))}
                </motion.ul>
                <MenuToggle toggle={() => setIsOpen(!isOpen)} />
            </motion.nav>
        </div>
    );
};

const navVariants = {
    open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const itemVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: { y: { stiffness: 1000, velocity: -100 } },
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: { y: { stiffness: 1000 } },
    },
};

const sidebarVariants = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        transition: { type: "spring", stiffness: 20, restDelta: 2 },
    }),
    closed: {
        clipPath: "circle(30px at 40px 40px)",
        transition: { delay: 0.2, type: "spring", stiffness: 400, damping: 40 },
    },
};

const Path = (props) => (
    <motion.path
        fill="transparent"
        strokeWidth="3"
        stroke="hsl(0, 0%, 18%)"
        strokeLinecap="round"
        {...props}
    />
);

const MenuToggle = ({ toggle }) => (
    <button className="toggle-btn" onClick={toggle}>
        <svg width="23" height="23" viewBox="0 0 23 23">
            <Path
                variants={{
                    closed: { d: "M 2 2.5 L 20 2.5" },
                    open: { d: "M 3 16.5 L 17 2.5" },
                }}
            />
            <Path
                d="M 2 9.423 L 20 9.423"
                variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                }}
                transition={{ duration: 0.1 }}
            />
            <Path
                variants={{
                    closed: { d: "M 2 16.346 L 20 16.346" },
                    open: { d: "M 3 2.5 L 17 16.346" },
                }}
            />
        </svg>
        <span className="toggle-label">시설 검색</span>
    </button>
);

export default FacilitySelector;
