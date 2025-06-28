import { CircleQuestionMark, Grip } from 'lucide-react';
import Breadcrumb from './breadcrumb';
import LogoSensedia from './logo-sensedia';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';

export default function TopBar() {
  return (
    <div className="px-6 py-4 bg-background flex justify-between ">
      <div className="flex items-center gap-2">
        <LogoSensedia type="icon" />
        <span className="uppercase text-primary-purple font-bold text-sm">BEM-VINDO</span>
        <Breadcrumb />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <CircleQuestionMark size={24} className="text-neutral-500" />
          <Grip size={24} className="text-neutral-500" />
        </div>
        <Separator orientation="vertical" />
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="text-neutral-500  text-sm font-medium">Nome</span>
        </div>
      </div>
    </div>
  );
}
