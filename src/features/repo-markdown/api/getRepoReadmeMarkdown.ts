import { getInstallationOctokit } from '@/shared/api/github';

export interface GetRepoReadmeMarkdownRequest {
  owner: string;
  path: string;
  repo: string;
}

export interface GetRepoReadmeMarkdownResponse {
  content: string;
  filePath: string;
}

const README_FILE_NAMES = ['README.mdx', 'README.md'] as const;

const getCandidates = (path: string): string[] => {
  if (!path) {
    return [
      ...README_FILE_NAMES,
      ...README_FILE_NAMES.map((name) => {
        return `docs/${name}`;
      }),
    ];
  }

  return [
    `${path}.mdx`,
    `${path}.md`,
    ...README_FILE_NAMES.map((name) => {
      return `${path}/${name}`;
    }),
  ];
};

export const getRepoReadmeMarkdown = async ({
  owner,
  path,
  repo,
}: GetRepoReadmeMarkdownRequest): Promise<GetRepoReadmeMarkdownResponse> => {
  const octokit = await getInstallationOctokit(owner, repo);
  const candidates = getCandidates(path);

  for (const candidate of candidates) {
    try {
      const { data } = await octokit.rest.repos.getContent({
        owner,
        path: candidate,
        repo,
      });

      if ('content' in data && typeof data.content === 'string') {
        return {
          content: Buffer.from(data.content, 'base64').toString('utf8'),
          filePath: candidate,
        };
      }
    } catch (error) {
      // 404 오류인 경우 무시
      if (
        error instanceof Error &&
        'status' in error &&
        (error as { status: number }).status === 404
      ) {
        continue;
      }

      throw error;
    }
  }

  throw new Error(`README markdown not found in ${owner}/${repo}. Tried: ${candidates.join(', ')}`);
};
