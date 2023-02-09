export default function Modal({ children, onClose }) {
  return (
    <div className="fixed top-0 left-0 w-max h-screen" onClick={onClose}>
      <dialog
        className="fixed top-[25vh] w-[30rem] border-none"
        open
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </dialog>
    </div>
  );
}
