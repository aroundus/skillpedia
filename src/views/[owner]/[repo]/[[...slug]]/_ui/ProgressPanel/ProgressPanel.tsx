'use client';

import { useEffect, useState } from 'react';

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

// loading.tsx 폴백에서 페이지 폴백으로 교체되며 다시 마운트되는 경우 진행값이 되돌아가지 않도록 경로별로 기억합니다.
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

  const [progress, setProgress] = useState(() => {
    return lastProgressMap.get(pathname) ?? 0;
  });

  const displayedProgress = Math.max(progress, floor);
  const percent = Math.round(displayedProgress * 100);

  useEffect(() => {
    lastProgressMap.set(pathname, displayedProgress);
  }, [displayedProgress, pathname]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setProgress(ceiling);

      return;
    }

    const timer = setInterval(() => {
      setProgress((previous) => {
        const current = Math.max(previous, floor);

        return current + (ceiling - current) * EASE_FACTOR;
      });
    }, TICK_INTERVAL);

    return () => {
      return clearInterval(timer);
    };
  }, [ceiling, floor]);

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
            {percent}
            <span className={styles.percentUnit}>%</span>
          </Statistic.Heading>
        </Statistic>
      </div>

      <div className={styles.bottom}>
        <Text as="p" className={styles.step} size="200" variant="muted">
          {t(`steps.${currentStepName}`)}
        </Text>

        <ProgressBar aria-hidden className={styles.progressBar} progress={percent} />
      </div>
    </main>
  );
};
