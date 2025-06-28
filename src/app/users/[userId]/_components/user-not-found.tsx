import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, UserX } from 'lucide-react';
import Link from 'next/link';

export default function UserNotFound() {
  return (
    <div className=" bg-white flex items-center justify-center py-8">
      <Card className="w-full max-w-md h-fit text-center">
        <CardHeader className="pb-4">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <UserX className="w-8 h-8 text-gray-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Perfil não encontrado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            O perfil que você está procurando não existe ou foi removido.
          </p>

          <Button asChild className="flex-1">
            <Link href="/users" className="flex items-center gap-2">
              <Home size={16} />
              Voltar ao início
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
