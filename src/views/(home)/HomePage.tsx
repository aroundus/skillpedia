'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import type { ChangeEventHandler, KeyboardEventHandler, MouseEventHandler } from 'react';

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
  MinimalFooter,
  Pillar,
  Section,
  SectionIntro,
  Text,
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
  icon: Icon;
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

      <Section as="section" backgroundColor="subtle" data-color-mode="dark">
        <Box
          paddingBlockEnd={80}
          paddingBlockStart={80}
          paddingInlineEnd={40}
          paddingInlineStart={40}
        >
          <SectionIntro>
            <SectionIntro.Label>Private</SectionIntro.Label>
            <SectionIntro.Heading size="2" weight="extrabold">
              사내 저장소 스킬을
              <br />팀 안에서 안전하게
            </SectionIntro.Heading>
            <SectionIntro.Description>
              사내 인프라에 직접 설치해서 운영해 보세요. 외부에 공개하지 않고 사내 저장소의 스킬
              문서를 안전하게 구조화할 수 있습니다.
            </SectionIntro.Description>
            <SectionIntro.Link href="#">가이드 보러 가기</SectionIntro.Link>
          </SectionIntro>
        </Box>
      </Section>

      <MinimalFooter
        copyrightStatement={`© ${new Date().getFullYear()} Skillpedia · 오픈소스 스킬 문서 사전`}
        logoHref="https://github.com/aroundus/skillpedia"
        socialLinks={false}
      >
        <MinimalFooter.Footnotes>
          <Text>
            <strong>
              Skillpedia(스킬피디아)는 GitHub의 공식 페이지가 아니며, 개인이 운영하는 비공식
              프로젝트입니다.
            </strong>{' '}
            GitHub 저장소에 흩어진 SKILL.md 파일을 수집하여 구조화된 문서를 제공하는 것이
            목적입니다. 개발자가 작성한 스킬 문서를 읽고 정확한 사용법을 파악할 수 있도록 합니다. AI
            에이전트가 도구를 정확하게 사용하려면 엔지니어가 작성한 검증된 지침서가 필요합니다.
            Skillpedia는 그 지침서를 가장 효율적으로 전달하는 통로가 됩니다.
          </Text>
        </MinimalFooter.Footnotes>
        <MinimalFooter.Link href="/">소개</MinimalFooter.Link>
        <MinimalFooter.Link href="/">작성 가이드</MinimalFooter.Link>
      </MinimalFooter>
    </div>
  );
};
