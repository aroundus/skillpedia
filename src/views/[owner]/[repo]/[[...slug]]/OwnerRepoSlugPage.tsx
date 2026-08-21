import { getRepositoryReadmeMarkdown, getRepositorySkillMarkdown } from '@/features/repository-markdown/api';
import { getRepositoryFileMetadata } from '@/features/repository-metadata/api';
import { normalizeTitle } from '@/shared/lib';

import { getBreadcrumbs, parseMarkdown } from './_lib';
import { Article } from './_ui/Article';
import type { ArticleTab } from './_ui/Article';
import { Empty } from './_ui/Empty';

interface OwnerRepoSlugPageProps {
  owner: string;
  repo: string;
  slug: string[];
}

export const OwnerRepoSlugPage = async ({ owner, repo, slug }: OwnerRepoSlugPageProps) => {
  // 시스템 및 브라우저 예약어 제외 (favicon, .well-known 등)
  if (owner.startsWith('.') || owner === 'favicon.ico') {
    return null;
  }

  const path = slug.join('/');

  const [readmeMarkdownResult, skillMarkdownResult] = await Promise.allSettled([
    getRepositoryReadmeMarkdown({ owner, path, repo }),
    getRepositorySkillMarkdown({ owner, path, repo }),
  ]);

  const readme = readmeMarkdownResult.status === 'fulfilled' ? readmeMarkdownResult.value : null;
  const skill = skillMarkdownResult.status === 'fulfilled' ? skillMarkdownResult.value : null;
  const readmeMarkdown = readme ? parseMarkdown(readme.content) : null;
  const skillMarkdown = skill ? parseMarkdown(skill.content) : null;

  // 파일 경로는 마크다운 조회 결과로 확정되므로, 두 조회를 함께 시작해 왕복이 순차로 누적되지 않도록 합니다.
  const [readmeMetadata, skillMetadata] = await Promise.all([
    readme ? getRepositoryFileMetadata({ filePath: readme.filePath, owner, repo }) : null,
    skill ? getRepositoryFileMetadata({ filePath: skill.path, owner, repo }) : null,
  ]);

  const folderName = path ? path.split('/').at(-1)! : repo;
  const breadcrumbs = getBreadcrumbs({ owner, repo, slug });

  // README와 SKILL이 모두 있으면 탭으로 전환할 수 있도록 탭 목록을 만듭니다.
  const tabs: ArticleTab[] = [];

  if (readme && readmeMarkdown) {
    tabs.push({
      content: readmeMarkdown.content,
      filePath: readme.filePath,
      label: 'README',
      metadata: readmeMetadata,
    });
  }

  if (skill && skillMarkdown) {
    tabs.push({
      content: skillMarkdown.content,
      filePath: skill.path,
      label: 'SKILL',
      metadata: skillMetadata,
    });
  }

  // README의 표시 제목은 그대로 쓰고, 슬러그형 SKILL name·폴더명은 정규화합니다.
  const title = normalizeTitle(
    readmeMarkdown?.frontmatter.title,
    skillMarkdown?.frontmatter.name ?? folderName,
  );
  const description =
    readmeMarkdown?.frontmatter.description ?? skillMarkdown?.frontmatter.description;

  return tabs.length > 0 ? (
    <Article
      breadcrumbs={breadcrumbs}
      description={description}
      owner={owner}
      repo={repo}
      tabs={tabs}
      title={title}
    />
  ) : (
    <Empty owner={owner} repo={repo} />
  );
};
