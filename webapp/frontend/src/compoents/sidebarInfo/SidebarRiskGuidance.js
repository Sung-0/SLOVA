import { useState } from "react"
import RISK_GUIDANCE from "./RiskGuidance"
import PDFModel from './PDFModal';
import { useSidebar } from "../context/SidebarContext"
import './css/more_button.css';

const SidebarRiskGuidance = () => {
    const { rankOnly } = useSidebar();
    const [modalOpen, setModalOpen] = useState(false);
    const tableData = RISK_GUIDANCE[rankOnly] || [];


  return (
    <div>
      <table className="risk-table">
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              <td style={{ padding: '10px 0' }}>{item}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 더보기 버튼 */}
      {rankOnly && (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button
            onClick={() => setModalOpen(true)}
            className="more-button"
          >
            행동 지침 정보 더보기 <span className="arrow-circle">▼</span>
          </button>
        </div>
      )}

      {/* PDF 모달 */}
      <PDFModel
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        rank={rankOnly}
      />
    </div>
  );
};

export default SidebarRiskGuidance;