import { AddOrEditBar } from "../AddOrEditBar";

interface IModalProps {
  id: string;
  setShowPopupEdit: React.Dispatch<React.SetStateAction<boolean>>;
  showPopupEdit: boolean;
}

export function Modal({ id, setShowPopupEdit, showPopupEdit }: IModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-4 rounded shadow-lg z-10 ">
        <div className="flex gap-2 mb-2 ">
          <AddOrEditBar type="edit" id={id} />
          <button
            onClick={() => setShowPopupEdit(!showPopupEdit)}
            className="text-white text-sm font-bold bg-red-700 flex p-4 items-center rounded-lg"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
