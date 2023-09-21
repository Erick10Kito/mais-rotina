import { AddOrEditBar } from "../AddOrEditBar";

interface IModalProps {
  id: string;
  handleOpenAndClosePopup: () => void;
}

export function Modal({ id, handleOpenAndClosePopup }: IModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-4 rounded shadow-lg z-10 mx-2 ">
        <div className="flex gap-2  ">
          <AddOrEditBar
            type="edit"
            id={id}
            handleOpenAndClosePopup={handleOpenAndClosePopup}
          />
        </div>
      </div>
    </div>
  );
}
