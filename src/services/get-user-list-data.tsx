import { AlbumsResponse } from '@/types/albums-response';
import { CityResponse } from '@/types/city-response';
import { PostsResponse } from '@/types/posts-response';
import { UserListData } from '@/types/user-list-data';
import { UsersResponse } from '@/types/users-response';
import { WeekDaysResponse } from '@/types/week-days-response';
import { formatWeekDays } from '@/utils/format-weekdays';
import { generateUsername } from '@/utils/generate-username';
import process from 'process';

export async function getUserListData(): Promise<UserListData[]> {
  const usersResponse = await fetch(`${process.env.API_URL}/users`);

  if (!usersResponse.ok) {
    throw new Error('Erro ao buscar usuários');
  }

  const usersData: UsersResponse = await usersResponse.json();

  const rows: UserListData[] = await Promise.all(
    usersData.users.map(async (user) => {
      const [postsResponse, albumsResponse, cityResponse, weekDaysResponse] = await Promise.all([
        fetch(`${process.env.API_URL}/users/${user.id}/posts`),
        fetch(`${process.env.API_URL}/users/${user.id}/albums`),
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/random/city?seed=${user.id}`),
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/random/weekDays?seed=${user.id}`),
      ]);

      const postsData: PostsResponse = postsResponse.ok ? await postsResponse.json() : [];
      const albumsData: AlbumsResponse = albumsResponse.ok ? await albumsResponse.json() : [];
      const cityData: CityResponse = await cityResponse.json();
      const weekDaysData: WeekDaysResponse = await weekDaysResponse.json();

      return {
        id: user.id,
        username: generateUsername(user.email),
        name: user.name,
        email: user.email,
        city: cityData.city,
        weekDays: formatWeekDays(weekDaysData.weekDays),
        posts: Array.isArray(postsData.posts) ? postsData.posts.length : 0,
        albums: Array.isArray(albumsData.albums) ? albumsData.albums.length : 0,
      };
    }),
  );

  return rows;
}
