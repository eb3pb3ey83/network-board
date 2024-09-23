import { selectAdviceNewaq500m, selectAdvicebb } from '@/state/slices/adviceSlice';
import { Title } from '@/components/Title';
import { Info } from '@/components/Info';
import { Advice as AdviceContainer, AdviceTitle, Divide, AdviceWrapper } from './style';
import { ReactComponent as AlertSvg } from '@/assets/alert-outline.svg';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Board } from '../Board';

export const Advice = () => {
  const advicebb = useSelector(selectAdvicebb);
  const adviceNewaq500m = useSelector(selectAdviceNewaq500m);
  return (
    <>
      {advicebb.length || adviceNewaq500m.length ? (
        <Board>
          {advicebb.length ? (
            adviceNewaq500m.length ? (
              <>
                <Title name="寬頻狀態" sx={{ marginBottom: '16px' }} prefix={<AlertSvg />} />
                {advicebb.map((item) => (
                  <AdviceWrapper key={item.id}>
                    <AdviceContainer>
                      <AdviceTitle>{item.title}</AdviceTitle>
                      <Info sx={{ padding: '0 0 16px' }} title="建議處置">
                        {item.value}
                      </Info>
                    </AdviceContainer>
                  </AdviceWrapper>
                ))}
                <Divide />
                <Title name="高頻寬New-AQ" sx={{ marginBottom: '16px' }} prefix={<AlertSvg />} />
                {adviceNewaq500m.map((item) => (
                  <Fragment key={item.id}>
                    <AdviceWrapper>
                      <Info sx={{ padding: '0 0 16px' }} title="建議處置">
                        {item.value}
                      </Info>
                    </AdviceWrapper>
                  </Fragment>
                ))}
              </>
            ) : (
              <>
                <Title name="寬頻狀態" sx={{ marginBottom: '16px' }} prefix={<AlertSvg />} />
                {advicebb.map((item) => (
                  <AdviceWrapper key={item.id}>
                    <AdviceContainer>
                      <AdviceTitle>{item.title}</AdviceTitle>
                      <Info sx={{ padding: '0 0 16px' }} title="建議處置">
                        {item.value}
                      </Info>
                    </AdviceContainer>
                  </AdviceWrapper>
                ))}
              </>
            )
          ) : adviceNewaq500m.length ? (
            <>
              <Title name="高頻寬New-AQ" sx={{ marginBottom: '16px' }} prefix={<AlertSvg />} />
              {adviceNewaq500m.map((item) => (
                <Fragment key={item.id}>
                  <AdviceWrapper>
                    <Info sx={{ padding: '0 0 16px' }} title="建議處置">
                      {item.value}
                    </Info>
                  </AdviceWrapper>
                </Fragment>
              ))}
            </>
          ) : null}
        </Board>
      ) : null}
    </>
  );
};
