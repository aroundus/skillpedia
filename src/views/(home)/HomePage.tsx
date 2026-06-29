'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import type { ChangeEventHandler, KeyboardEventHandler, MouseEventHandler, ReactNode } from 'react';

import {
  BookIcon,
  BrowserIcon,
  CopilotIcon,
  DatabaseIcon,
  PeopleIcon,
  SearchIcon,
  ServerIcon,
  ShieldCheckIcon,
  ToolsIcon,
} from '@primer/octicons-react';
import type { Icon } from '@primer/octicons-react';
import {
  Box,
  FormControl,
  Grid,
  Heading,
  Hero,
  Pillar,
  Section,
  TextInput,
  UnorderedList,
} from '@primer/react-brand';

import styles from './HomePage.module.scss';

interface Category {
  icon: Icon;
  name: string;
  repos: string[];
}

interface Feature {
  description: string;
  icon: ReactNode;
  title: string;
}

// 인기 저장소 둘러보기 카테고리 목록입니다.
const CATEGORIES: Category[] = [
  {
    icon: CopilotIcon,
    name: 'AI 에이전트',
    repos: [
      'anthropics/skills',
      'openai/openai-cookbook',
      'langchain-ai/langchain',
      'microsoft/autogen',
    ],
  },
  {
    icon: BrowserIcon,
    name: '프론트엔드',
    repos: ['facebook/react', 'vercel/next.js', 'vuejs/core', 'sveltejs/svelte'],
  },
  {
    icon: ServerIcon,
    name: '백엔드 & API',
    repos: ['fastapi/fastapi', 'nestjs/nest', 'expressjs/express'],
  },
  {
    icon: DatabaseIcon,
    name: '데이터 & 스토리지',
    repos: ['prisma/prisma', 'supabase/supabase', 'redis/redis'],
  },
  {
    icon: ToolsIcon,
    name: 'DevOps & 클라우드',
    repos: ['kubernetes/kubernetes', 'hashicorp/terraform', 'docker/compose'],
  },
  {
    icon: ShieldCheckIcon,
    name: '보안',
    repos: ['aquasecurity/trivy', 'gitleaks/gitleaks', 'ossf/scorecard'],
  },
  {
    icon: BookIcon,
    name: '문서화',
    repos: ['mkdocs/mkdocs', 'shuding/nextra', 'facebook/docusaurus'],
  },
  {
    icon: PeopleIcon,
    name: '커뮤니티 & 협업',
    repos: ['github/docs', 'primer/react', 'storybookjs/storybook'],
  },
];

// 내부용 안전 운영 방법 목록입니다.
const FEATURES: Feature[] = [
  {
    description:
      'GitHub App을 설치해 Private 저장소를 안전하게 연결하고, 사내 문서만 선택적으로 수집합니다.',
    icon: (
      <svg
        className={styles.featureIcon}
        fill="none"
        height="30"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
        width="30"
      >
        <rect height="11" rx="2" width="18" x="3" y="11" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: '비공개 저장소 연결',
  },
  {
    description: 'Vercel Private·Docker로 사내망에 직접 배포해 외부 노출 없이 운영할 수 있습니다.',
    icon: (
      <svg
        className={styles.featureIcon}
        fill="none"
        height="30"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
        width="30"
      >
        <rect height="8" rx="2" width="20" x="2" y="2" />
        <rect height="8" rx="2" width="20" x="2" y="14" />
        <path d="M6 6h.01M6 18h.01" />
      </svg>
    ),
    title: '사내 인프라에 셀프 호스팅',
  },
  {
    description: 'SSO·접근 제어를 연동해 인증된 팀원에게만 문서 열람 권한을 부여합니다.',
    icon: (
      <svg
        className={styles.featureIcon}
        fill="none"
        height="30"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
        width="30"
      >
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: '조직 멤버만 접근',
  },
];

export const HomePage = () => {
  const router = useRouter();
  const [repo, setRepo] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  // 입력한 저장소를 정규화한 뒤 문서 경로로 이동합니다.
  const submitRepo = () => {
    const value = repo
      .trim()
      .replace(/^https?:\/\/github\.com\//i, '')
      .replace(/\/$/, '');

    if (value.length === 0) {
      setStatus('저장소를 owner/repo 형식으로 입력해 주세요.');

      return;
    }

    const isValidFormat = /^[\w.-]+\/[\w.-]+$/.test(value);

    if (isValidFormat) {
      router.push(`/${value}`);

      return;
    }

    setStatus('올바른 형식이 아니에요. 예: anthropics/skills');
  };

  const handleRepoChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setRepo(event.target.value);
    setStatus(null);
  };

  const handleRepoKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      submitRepo();
    }
  };

  const handleSubmitClick: MouseEventHandler<HTMLButtonElement> = () => {
    submitRepo();
  };

  const submitDisabled = repo.trim().length === 0;

  return (
    <div className={styles.container}>
      <Section
        as="section"
        backgroundColor="default"
        className={styles.section}
        paddingBlockEnd="spacious"
        paddingBlockStart="spacious"
      >
        <Box paddingInlineEnd={40} paddingInlineStart={40}>
          <Hero align="center">
            <Hero.Heading letterSpacing="condensed" weight="extrabold">
              흩어진 스킬 문서를 한곳에서, 정확하게
            </Hero.Heading>
            <Hero.Description size="400" variant="muted">
              GitHub 저장소에 흩어져 있는 SKILL.md 문서들을 찾아서 구조화된 형태로 제공합니다.
            </Hero.Description>
            <Box marginBlockStart={32} style={{ width: '100%' }}>
              <FormControl fullWidth size="large" validationStatus={status ? 'error' : undefined}>
                <FormControl.Label>GitHub 저장소 주소</FormControl.Label>
                <TextInput
                  fullWidth
                  leadingVisual={<SearchIcon />}
                  placeholder="https://github.com/skills/introduction-to-github"
                  size="medium"
                  type="search"
                  value={repo}
                  onChange={handleRepoChange}
                  onKeyDown={handleRepoKeyDown}
                />
                {status ? <FormControl.Validation>{status}</FormControl.Validation> : null}
              </FormControl>
            </Box>
            <Hero.PrimaryAction as="button" href="#" size="large">
              문서 보기
            </Hero.PrimaryAction>
            <Hero.Image
              alt=""
              position="inline-end"
              src="/images/hero.svg"
              style={{ height: '100%' }}
            />
          </Hero>
        </Box>
      </Section>

      <Section
        as="section"
        className={styles.section}
        paddingBlockEnd="spacious"
        paddingBlockStart="spacious"
      >
        <Box paddingInlineEnd={40} paddingInlineStart={40}>
          <Heading as="h2" size="5" weight="bold">
            인기 저장소 둘러보기
          </Heading>

          <Grid style={{ marginTop: 80 }}>
            {CATEGORIES.map((category) => {
              return (
                <Grid.Column
                  key={category.name}
                  span={{ xsmall: 12, small: 6, medium: 4, large: 3 }}
                >
                  <Pillar>
                    <Pillar.Icon icon={category.icon} size="medium" />
                    <Pillar.Heading weight="bold">{category.name}</Pillar.Heading>
                  </Pillar>
                  <UnorderedList>
                    {category.repos.map((repoPath) => {
                      return (
                        <UnorderedList.Item key={repoPath}>
                          <Link className={styles.link} href={`/${repoPath}`}>
                            {repoPath}
                          </Link>
                        </UnorderedList.Item>
                      );
                    })}
                  </UnorderedList>
                </Grid.Column>
              );
            })}
          </Grid>
        </Box>
      </Section>

      <section className={styles.internal}>
        <div className={styles.inner}>
          <div className={styles.intro}>
            <span className={styles.introLabel}>비공개 · 내부용</span>
            <h2 className={styles.introHeading}>팀 내부에서만 안전하게 사용하기</h2>
            <p className={styles.introDescription}>
              공개 배포 없이 사내 저장소의 스킬 문서만 수집하고, 인증된 팀원에게만 제공할 수
              있습니다. 다음 세 가지 방법으로 안전하게 운영하세요.
            </p>
          </div>

          <div className={styles.features}>
            {FEATURES.map((feature) => {
              return (
                <div className={styles.feature} key={feature.title}>
                  {feature.icon}
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureText}>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.inner}>
          <span>Skillpedia · SKILL.md & README 문서 수집 관문</span>
          <span className={styles.nav}>
            <Link className={styles.navLink} href="/">
              GitHub
            </Link>
            <Link className={styles.navLink} href="/">
              소개
            </Link>
            <Link className={styles.navLink} href="/">
              작성 가이드
            </Link>
          </span>
        </div>
      </footer>
    </div>
  );
};
