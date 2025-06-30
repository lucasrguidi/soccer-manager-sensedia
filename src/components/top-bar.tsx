import { CircleQuestionMark, Grip } from 'lucide-react';
import Breadcrumb from './breadcrumb';
import LogoSensedia from './logo-sensedia';
import { Separator } from './ui/separator';
import { UserDropdown } from './user-dropdown';
import { Suspense } from 'react';
import SkeletonUserDropdown from './skeletons/skeleton-user-dropdown';

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
        <Suspense fallback={<SkeletonUserDropdown />}>
          <UserDropdown />
        </Suspense>
      </div>
    </div>
  );
}
