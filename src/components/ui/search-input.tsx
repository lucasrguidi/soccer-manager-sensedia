import * as React from 'react';

import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

function SearchInput({
  className,
  type,
  label,
  ...props
}: React.ComponentProps<'input'> & { label: string }) {
  return (
    <div className="relative w-full ">
      <div className="group relative z-0 w-full">
        <input
          type={type}
          id="floating-input"
          className={cn(
            'peer block w-full !pl-2 pr-8 appearance-none rounded-t-sm border-0 border-b-2 border-neutral-400 bg-gray-800/5 py-2.5 px-0 text-sm text-gray-900 focus:border-secondary-purple focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-secondary-purple aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
            className,
          )}
          placeholder=" "
          {...props}
        />
        <label
          htmlFor="floating-input"
          className="absolute top-3 pl-2 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-neutral-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-secondary-purple dark:text-gray-400 peer-focus:dark:text-secondary-purple aria-invalid:text-destructive"
          aria-invalid={props['aria-invalid'] ? 'true' : 'false'}
        >
          {label}
        </label>
        <Search
          size={16}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-500"
        />
      </div>
    </div>
  );
}

export { SearchInput };
