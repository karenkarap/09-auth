'use client';
import Link from 'next/link';
import css from './AuthNavigation.module.css';
import { logout } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import TagsMenu from '../TagsMenu/TagsMenu';
import { useRouter } from 'next/navigation';

const AuthNavigation = () => {
  const { user, isAuthenticated, clearIsAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleClickLogOut = async () => {
    await logout();
    clearIsAuthenticated();
    router.push('/sign-in');
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <li className={css.navigationItem}>
            <Link href="/profile" prefetch={false} className={css.navigationLink}>
              Profile
            </Link>
          </li>
          <li>
            <TagsMenu />
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user?.username}</p>
            <button className={css.logoutButton} onClick={handleClickLogOut}>
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
              Login
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  );
};

export default AuthNavigation;
