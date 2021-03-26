import React, { useEffect, useState } from 'react';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { easeQuadInOut } from 'd3-ease';
import { Animate } from 'react-move';
import './ProgressBar.scss';

interface IAnimated {
  valueStart: number;
  valueEnd: number;
  duration: number;
  easingFunction?: any;
  children: any;
}

interface IProgressBar {
  value: number;
}

const AnimatedProgressProvider: React.FC<IAnimated> = ({
  valueStart,
  valueEnd,
  duration,
  easingFunction,
  children,
}) => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  return (
    <Animate
      start={() => ({
        value: valueStart,
      })}
      update={() => ({
        value: [isAnimated ? valueEnd : null],
        timing: {
          duration: duration * 1000,
          ease: easingFunction,
        },
      })}
    >
      {({ value }) => children(value)}
    </Animate>
  );
};

const ProgressBar: React.FC<IProgressBar> = ( { value } ) => {
  return (
      <AnimatedProgressProvider
        valueStart={0}
        valueEnd={value}
        duration={1.4}
        easingFunction={easeQuadInOut}
      >
        {(value: any) => {
          const roundedValue = Math.round(value);
          return (
            <CircularProgressbarWithChildren
              value={value}
              strokeWidth={25}
              styles={buildStyles({
                pathColor: `rgba(255, 187 ,46, ${value / 100})`,
                pathTransition: 'none',
                strokeLinecap: 'butt',
                rotation: (1 - value / 100) / 2,
                trailColor: '#edeeea',
              })}
            >
              <div className='progress-bar__label'>
                <div className='progress-bar__value'>
                  <strong>{roundedValue}%</strong>
                </div>
                <div>
                  изученных
                  <br />
                  слов
                </div>
              </div>
            </CircularProgressbarWithChildren>
          );
        }}
      </AnimatedProgressProvider>
  );
};

export default ProgressBar;
