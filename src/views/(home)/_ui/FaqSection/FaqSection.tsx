'use client';

import { Box, FAQ, Section } from '@primer/react-brand';
import { useTranslations } from 'next-intl';

import styles from './FaqSection.module.scss';

interface FaqItem {
  answer: string;
  question: string;
}

export const FaqSection = () => {
  const t = useTranslations('HomePage.FaqSection');
  const items = t.raw('items') as FaqItem[];

  return (
    <Section
      as="section"
      className={styles.container}
      paddingBlockEnd="spacious"
      paddingBlockStart="spacious"
    >
      <Box
        paddingInlineEnd={40}
        paddingInlineStart={40}
      >
        <FAQ className={styles.inner}>
          <FAQ.Heading as="h2">{t('title')}</FAQ.Heading>
          <FAQ.Subheading>{t('description')}</FAQ.Subheading>
          {items.map((item, index) => {
            return (
              <FAQ.Item key={item.question}>
                <FAQ.Question>{item.question}</FAQ.Question>
                <FAQ.Answer>
                  <p>
                    {t.rich(`items.${index}.answer`, {
                      code: (chunks) => {
                        return <code>{chunks}</code>;
                      },
                    })}
                  </p>
                </FAQ.Answer>
              </FAQ.Item>
            );
          })}
        </FAQ>
      </Box>
    </Section>
  );
};
