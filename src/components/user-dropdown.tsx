import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getCurrentUser } from '@/services/get-current-user';
import { getInitials } from '@/utils/get-initials';
import { Button } from './ui/button';

export async function UserDropdown() {
  const user = await getCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={'ghost'}
          className="data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex gap-2 outline-none"
        >
          <Avatar className="h-8 w-8 rounded-lg grayscale">
            <AvatarFallback className="rounded-full bg-primary-purple text-white">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-neutral-500 font-medium">{user.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-40 rounded-none bg-neutral-700 border-neutral-700 text-zinc-200"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuGroup>
          <DropdownMenuItem className="focus:bg-neutral-700 focus:text-zinc-200 rounded-none border-l-4 border-neutral-700 focus:border-primary-purple">
            Lista de amigos
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-neutral-700 focus:text-zinc-200 rounded-none border-l-4 border-neutral-700 focus:border-primary-purple">
            Artigos salvos
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-neutral-700 focus:text-zinc-200 rounded-none border-l-4 border-neutral-700 focus:border-primary-purple">
            Notificações
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-neutral-700 focus:text-zinc-200 rounded-none border-l-4 border-neutral-700 focus:border-primary-purple">
            Preferências
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-neutral-700 focus:text-zinc-200 rounded-none border-l-4 border-neutral-700 focus:border-primary-purple">
            Fechar Sessão
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
