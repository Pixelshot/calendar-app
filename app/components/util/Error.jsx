import { TbError404Off } from 'react-icons/tb';
function Error({ title, children }) {
  return (
    <div className="mt-14 mx-[10%] p-10">
      <TbError404Off size={200} className="mx-auto" />
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export default Error;
