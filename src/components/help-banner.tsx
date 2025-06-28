import { HeartPulse, Laugh, LifeBuoy } from 'lucide-react';

export default function HelpBanner() {
  return (
    <div className="max-w-5xl flex items-center justify-between mx-auto gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="font-medium text-primary-purple text-base">Precisa de ajuda?</h2>
        <div className="flex gap-2 items-center">
          <LifeBuoy size={45} className="text-primary-purple shrink-0" />
          <span className="font-medium text-base text-neutral-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incidente ut labore et dolore magna aliqua.
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-medium text-primary-purple text-base">Por que se registrar?</h2>
        <div className="flex gap-2 items-center">
          <HeartPulse size={45} className="text-primary-purple shrink-0" />
          <span className="font-medium text-base text-neutral-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incidente ut labore et dolore magna aliqua.
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-medium text-primary-purple text-base">O que está acontecendo?</h2>
        <div className="flex gap-2 items-center">
          <Laugh size={45} className="text-primary-purple shrink-0" />
          <span className="font-medium text-base text-neutral-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incidente ut labore et dolore magna aliqua.
          </span>
        </div>
      </div>
    </div>
  );
}
