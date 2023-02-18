function Error({ title, children }) {
  return (
    <div className="mt-14 mx-[30%]">
      <div className="icon">Icon goes here</div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export default Error;
