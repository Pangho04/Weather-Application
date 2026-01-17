import { useAlertContext } from '@/shared/providers/useAlertContext';

function useOverlayAlert() {
  const { showAlert, closeAlert } = useAlertContext();

  return {
    showAlert,
    closeAlert,
  };
}

export default useOverlayAlert;
