import type { ReactNode } from 'react';
import type { AlertButton } from '@/shared/providers/AlertProvider.types';

type ShowAlertParams = {
  title: string;
  children: ReactNode;
  buttons?: [AlertButton] | [AlertButton, AlertButton];
};

type OpenEditFavoriteNameAlertParams = {
  defaultValue: string;
  inputRef: React.MutableRefObject<string>;
  onClose: () => void;
  onSave: () => void;
  showAlert: (params: ShowAlertParams) => string;
  closeAlert: (id: string) => void;
};

function openEditFavoriteNameAlert({
  defaultValue,
  inputRef,
  onClose,
  onSave,
  showAlert,
  closeAlert,
}: OpenEditFavoriteNameAlertParams) {
  const overlayId = showAlert({
    title: '즐겨찾기 이름 변경',
    children: (
      <fieldset className="fieldset">
        <legend className="fieldset-legend pb-4">즐겨찾기 장소의 별명을 설정할 수 있습니다.</legend>
        <input
          type="text"
          className="input input-primary shadow-md pl-4"
          placeholder="이름을 입력해주세요."
          defaultValue={defaultValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const refToUpdate = inputRef;
            refToUpdate.current = e.currentTarget.value;
          }}
        />
        <p className="label text-error">최소 1자 이상 입력해주세요.</p>
        <p className="label text-error">최대 10자 까지 입력할 수 있습니다.</p>
      </fieldset>
    ),
    buttons: [
      {
        text: '취소',
        onClick: () => {
          onClose();
          closeAlert(overlayId);
        },
      },
      {
        text: '저장',
        onClick: () => {
          onSave();
          closeAlert(overlayId);
        },
      },
    ],
  });

  return overlayId;
}

export default openEditFavoriteNameAlert;
