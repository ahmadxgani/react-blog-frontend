// @ts-nocheck
const Modalbox = ({ children, title, onClose }) => {
  return (
    <div className="absolute md:w-1/2 w-4/5 flex mx-auto top-28 inset-x-0 flex-col bg-slate-400 rounded gap-5 lg:p-5 md:p-3 p-2">
      <header className="flex justify-between items-center">
        <h3 className="text-lg">{title}</h3>
        <span className="text-2xl hover:cursor-pointer" onClick={onClose}>
          &#10006;
        </span>
      </header>
      {children}
    </div>
  );
};

export default Modalbox;
