import { User } from './user';

export interface UserListData extends Pick<User, 'id' | 'name' | 'email'> {
  username: string;
  city: string;
  weekDays: string;
  posts: number;
  albums: number;
}
