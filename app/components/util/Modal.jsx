export default function Modal({ children, onClose }) {
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen backdrop-blur-sm"
      onClick={onClose}
    >
      <dialog
        className="fixed top-[25vh] w-[30rem] border-none bg-slate-200 rounded-xl"
        open
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </dialog>
    </div>
  );
}
