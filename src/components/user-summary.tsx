import { AlignLeft, Trophy, Volleyball } from 'lucide-react';

export default function UserSummary() {
  return (
    <div className="p-6 bg-primary-purple">
      <div className="max-w-5xl flex items-center justify-between mx-auto">
        <div className="flex gap-2 items-center">
          <Volleyball size={52} className="text-white" />
          <div className="flex flex-col justify-between">
            <span className="text-white text-md font-bold">Tipo de Quadra</span>
            <span className="text-white text-md font-light">Society</span>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <AlignLeft size={52} className="text-white" />
          <div className="flex flex-col justify-between">
            <span className="text-white text-md font-bold">Nível</span>
            <span className="text-white text-md font-light">Semi-Profissional</span>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <Trophy size={52} className="text-white" />
          <div className="flex flex-col justify-between">
            <span className="text-white text-md font-bold">Vitórias</span>
            <span className="text-white text-md font-light">345</span>
          </div>
        </div>
      </div>
    </div>
  );
}
