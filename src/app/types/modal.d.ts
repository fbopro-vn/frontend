interface OpenModalButtonProps {
    openModal: () => void;
  }

interface DebtPaymentModalProps {
    open: boolean;
    onClose: () => void;
    totalDebt: number;
  }
  
interface SearchModalProps {
    open: boolean;
    onClose: () => void;
    totalDebt: number;
  }
  