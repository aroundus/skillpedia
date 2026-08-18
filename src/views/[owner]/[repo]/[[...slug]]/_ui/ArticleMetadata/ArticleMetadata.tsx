'use client';

import { GitCommitIcon } from '@primer/octicons-react';
import { Avatar } from '@primer/react';
import { Text } from '@primer/react-brand';
import { useFormatter, useNow, useTranslations } from 'next-intl';

import type { RepositoryFileMetadata } from '@/features/repository-metadata/api';

import styles from './ArticleMetadata.module.scss';

interface ArticleMetadataProps {
  metadata: RepositoryFileMetadata;
}

const AVATAR_LIMIT_COUNT = 6;

export const ArticleMetadata = ({ metadata }: ArticleMetadataProps) => {
  const t = useTranslations('OwnerRepoSlugPage.ArticleMetadata');
  const format = useFormatter();
  const now = useNow();

  const { committedAt, contributors, htmlUrl, message } = metadata;
  const avatarContributors = contributors
    .filter((contributor) => {
      return Boolean(contributor.avatarUrl);
    })
    .slice(0, AVATAR_LIMIT_COUNT);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {avatarContributors.length > 0 && (
          <span className={styles.avatars}>
            {avatarContributors.map((contributor) => {
              return (
                <Avatar
                  alt=""
                  className={styles.avatar}
                  key={contributor.name}
                  size={24}
                  src={contributor.avatarUrl}
                />
              );
            })}
          </span>
        )}
        <Text
          as="span"
          size="100"
          variant="muted"
        >
          {t.rich('description', {
            authorName: contributors[0]?.name ?? '',
            committedAt: format.relativeTime(new Date(committedAt), now),
            name: (chunks) => {
              return <span className={styles.author}>{chunks}</span>;
            },
            otherCount: Math.max(contributors.length - 1, 0),
          })}
        </Text>
      </div>

      <a
        className={styles.commit}
        href={htmlUrl}
        rel="noreferrer"
        target="_blank"
      >
        <GitCommitIcon size={12} />
        <span>{message}</span>
      </a>
    </div>
  );
};
