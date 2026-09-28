'use client';

import { useEffect, useRef, useState } from 'react';

import { SparkleFillIcon } from '@primer/octicons-react';
import { ProgressBar } from '@primer/react';
import { Statistic, Text } from '@primer/react-brand';
import { useTranslations } from 'next-intl';

import { usePathname } from '@/shared/i18n/navigation';

import { PROGRESS_STEP_NAMES } from './ProgressStepStore';
import { useCurrentProgressStepName } from './useCurrentProgressStepName';

import styles from './ProgressPanel.module.scss';

const PROGRESS_CAP = 0.99;
const EASE_FACTOR = 0.02;
const TICK_INTERVAL = 100;

// Next.js가 loading.tsx 폴백을 페이지 폴백으로 교체하며 ProgressPanel을 다시 마운트하는 경우 진행값이 되돌아가지 않도록 경로별로 기억합니다.
const lastProgressMap = new Map<string, number>();

export const ProgressPanel = () => {
  const t = useTranslations('OwnerRepoSlugLoadingPage.ProgressPanel');
  const pathname = usePathname();

  const [owner, repo, ...slug] = pathname.split('/').filter(Boolean);
  const path = slug.map(decodeURIComponent).join('/');
  const currentStepName = useCurrentProgressStepName({ owner, path, repo });
  const currentStepIndex = PROGRESS_STEP_NAMES.indexOf(currentStepName);
  const floor = currentStepIndex / PROGRESS_STEP_NAMES.length;
  const ceiling = Math.min((currentStepIndex + 1) / PROGRESS_STEP_NAMES.length, PROGRESS_CAP);

  const percentRef = useRef<HTMLSpanElement>(null);
  const progressBarItemRef = useRef<HTMLSpanElement>(null);
  const [initialPercent] = useState(() => {
    return Math.round((lastProgressMap.get(pathname) ?? 0) * 100);
  });

  // 진행값을 React 상태로 갱신하면 타이머 업데이트가 본문의 Suspense 재시도 렌더링을 계속 중단시키므로 DOM에 직접 반영합니다.
  useEffect(() => {
    let progress = Math.max(lastProgressMap.get(pathname) ?? 0, floor);

    const renderProgress = () => {
      const percent = Math.round(progress * 100);

      lastProgressMap.set(pathname, progress);
      percentRef.current?.replaceChildren(String(percent));
      progressBarItemRef.current?.style.setProperty('--progress-width', `${percent}%`);
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      progress = ceiling;
      renderProgress();

      return;
    }

    renderProgress();

    const timer = setInterval(() => {
      progress += (ceiling - progress) * EASE_FACTOR;
      renderProgress();
    }, TICK_INTERVAL);

    return () => {
      return clearInterval(timer);
    };
  }, [ceiling, floor, pathname]);

  return (
    <main className={styles.container}>
      <div className={styles.top}>
        <p className={styles.caption}>
          <SparkleFillIcon />

          <span>
            {owner}/<strong>{repo}</strong>
          </span>
        </p>
      </div>

      <div className={styles.middle}>
        <Statistic>
          <Statistic.Heading className={styles.percent}>
            <span ref={percentRef}>{initialPercent}</span>
            <span className={styles.percentUnit}>%</span>
          </Statistic.Heading>
        </Statistic>
      </div>

      <div className={styles.bottom}>
        <Text
          as="p"
          className={styles.step}
          size="200"
          variant="muted"
        >
          {t(`steps.${currentStepName}`)}
        </Text>

        <ProgressBar
          aria-hidden
          className={styles.progressBar}
        >
          <ProgressBar.Item
            progress={initialPercent}
            ref={progressBarItemRef}
          />
        </ProgressBar>
      </div>
    </main>
  );
};
