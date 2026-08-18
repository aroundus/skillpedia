import { unstable_cache } from 'next/cache';

import {
  GITHUB_REVALIDATE_SECONDS,
  getRepositoryCacheTag,
  getRepositoryOctokit,
} from '@/shared/api/github';

export interface RepositoryFileMetadata {
  authorAvatarUrl: string;
  authorName: string;
  authorUrl: string;
  committedAt: string;
  htmlUrl: string;
  message: string;
}

export interface GetRepositoryFileMetadataRequest {
  filePath: string;
  owner: string;
  repo: string;
}

/**
 * 파일 메타데이터 조회
 *
 * @description
 * 파일의 마지막 커밋 1건에서 작성자와 작업 일시, 커밋 링크와 메시지를 추립니다.
 * 커밋이 없거나 조회에 실패하면 null을 반환합니다. 메타데이터는 본문 노출을 막지 않는 부가 정보이므로 오류로 처리하지 않습니다.
 */
export const getRepositoryFileMetadata = ({
  filePath,
  owner,
  repo,
}: GetRepositoryFileMetadataRequest): Promise<RepositoryFileMetadata | null> => {
  return unstable_cache(
    async () => {
      const octokit = await getRepositoryOctokit(owner, repo);

      try {
        const { data } = await octokit.rest.repos.listCommits({
          owner,
          path: filePath,
          per_page: 1,
          repo,
        });
        const [commit] = data;

        if (!commit) {
          return null;
        }

        return {
          authorAvatarUrl: commit.author?.avatar_url ?? '',
          authorName: commit.commit.author?.name ?? '',
          authorUrl: commit.author?.html_url ?? '',
          committedAt: commit.commit.author?.date ?? commit.commit.committer?.date ?? '',
          htmlUrl: commit.html_url,
          message: commit.commit.message.split('\n')[0],
        };
      } catch {
        return null;
      }
    },
    ['repository-file-metadata', owner, repo, filePath],
    { revalidate: GITHUB_REVALIDATE_SECONDS, tags: [getRepositoryCacheTag(owner, repo)] },
  )();
};
