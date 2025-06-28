import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ALL_DAYS } from '@/constants/all-days';
import { getUser } from '@/services/get-user';
import { formatDateToLongString } from '@/utils/format-date';
import { getInitials } from '@/utils/get-initials';
import { getRandomItems } from '@/utils/get-random-items';
import { faker } from '@faker-js/faker';
import { BookImage, CalendarDays, FileText, Mail, MapPin } from 'lucide-react';
import UserNotFound from './_components/user-not-found';

export default async function UserProfilePage({ params }: { params: { userId: string } }) {
  const { userId } = await params;
  const user = await getUser(userId);

  const fullName = faker.person.fullName();
  const randomDays = getRandomItems(ALL_DAYS, 3);

  if (!user) {
    return <UserNotFound />;
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarFallback className="text-2xl font-bold bg-primary-purple text-white">
                  {getInitials(fullName)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{fullName}</h1>
                <h2 className="text-xl font-bold text-gray-700 mb-2">{user.name}</h2>
                <div className="flex flex-col sm:flex-row items-center gap-4 text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{faker.location.city()}</span>
                  </div>
                </div>
                <p className="text-gray-700 max-w-2xl">{faker.person.bio()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Posts</CardTitle>
              <FileText size={16} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{faker.number.int({ max: 10 })}</div>
              <p className="text-xs text-muted-foreground">Posts realizados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Albuns</CardTitle>
              <BookImage size={16} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{faker.number.int({ max: 10 })}</div>
              <p className="text-xs text-muted-foreground">Albuns publicados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Membro desde</CardTitle>
              <CalendarDays size={16} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatDateToLongString(user.created_at)}</div>
              <p className="text-xs text-muted-foreground">Data de cadastro</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays size={20} />
              Dias da Semana
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {randomDays.map((day) => (
                <Badge key={day} variant="secondary" className="px-3 py-1">
                  {day}
                </Badge>
              ))}
            </div>
            <Separator className="my-4" />
            <p className="text-sm text-muted-foreground">
              Este usuário tem esses dias disponíveis para partidas.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
