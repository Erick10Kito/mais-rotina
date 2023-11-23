import { AddOrEditBar } from "../AddOrEditBar";

interface IModalProps {
  id: string;
  handleOpenAndClosePopup: () => void;
  title:string
}

export function Modal({ id, handleOpenAndClosePopup, title }: IModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-4 rounded shadow-lg z-10 mx-2 min-w-[600px] max-[768px]:min-w-[95%] ">
        <div className="flex  w-full">
          <AddOrEditBar
            type="edit"
            id={id}
            handleOpenAndClosePopup={handleOpenAndClosePopup}
            title={title}
          />
        </div>
      </div>
    </div>
  );
}
