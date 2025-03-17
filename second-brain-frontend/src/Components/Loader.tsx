import { GiBrain } from "react-icons/gi";
const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="flex gap-6 flex-col items-center">
        {/* Simple pulsing circle with brain icon */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute w-full h-full rounded-full bg-primary-500 opacity-30 animate-ping"></div>
          <div className="absolute w-full h-full rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div>
          <div className="text-primary-500 font-bold text-lg">
               <GiBrain />
          </div>
        </div>
        
        {/* Simple text */}
        <p className="font-bold text-xl">
          <span className="text-slate-700">Second</span>
          <span className="text-primary-500"> Brain</span>
        </p>
      </div>
    </div>
  );
};

export default Loader;