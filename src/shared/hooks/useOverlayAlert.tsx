import { useAlertContext } from '@/shared/providers/useAlertContext';
import type { ReactNode } from 'react';
import type { AlertButton } from '@/shared/providers/AlertProvider.types';

type ShowAlertParams = {
  title: string;
  children: ReactNode;
  buttons?: [AlertButton] | [AlertButton, AlertButton];
};

function useOverlayAlert() {
  const { showAlert, closeAlert } = useAlertContext();

  return {
    showAlert: (params: ShowAlertParams) => showAlert(params),
    closeAlert: (id: string) => closeAlert(id),
  };
}

export default useOverlayAlert;
