import { HomePage } from '@/views/(home)/HomePage';
import { getRepoGroups } from '@/views/(home)/_lib';

export default function Page() {
  const repoGroups = getRepoGroups();

  return <HomePage repoGroups={repoGroups} />;
}
