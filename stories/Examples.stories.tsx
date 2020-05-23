import React from 'react';
import { Wizard, Step, Controls, useControls } from '../src/';

export default {
  title: 'Examples',
};

export const BasicTree = () => {
  const tree = {
    step1: ['step2'],
    step2: ['step3', 'error'],
    step3: ['step1'],
    error: ['step2'],
  } as const;

  return (
    <Wizard tree={tree} first="step1">
      <Step name="step1">
        <div>
          I am step 1
          <br />
          <Controls>
            {({ destinations: { step2 } }) => (
              <button onClick={step2}>Go to Step 2</button>
            )}
          </Controls>
        </div>
      </Step>
      <Step name="step2">
        <div>
          I am step 2
          <br />
          <Controls>
            {({ destinations: { step3, error } }) => (
              <div>
                <button onClick={error}>Go to error</button>
                <button onClick={step3}>Go to Step 3</button>
              </div>
            )}
          </Controls>
        </div>
      </Step>
      <Step name="step3">
        <div>
          I am step 3
          <br />
          <Controls>
            {({ destinations: { step1 } }) => (
              <button onClick={step1}>Go to Step 1</button>
            )}
          </Controls>
        </div>
      </Step>
      <Step name="error">
        <div>
          I am step 4
          <br />
          <Controls>
            {({ destinations: { step2 } }) => (
              <button onClick={step2}>Go to Step 2</button>
            )}
          </Controls>
        </div>
      </Step>
    </Wizard>
  );
};

export const ComplexTree = () => {
  const tree = {
    step1: ['step2', 'sideshow'],
    sideshow: ['step2', 'step3'],
    step2: ['step3', 'error'],
    step3: ['step1'],
    error: ['step2'],
  };
  return (
    <div>
      <Wizard first="step1" tree={tree}>
        {Object.keys(tree).map(key => (
          <Step name={key} key={key}>
            <Controls>
              {({ tree, step, destinations }) => {
                return (
                  <div>
                    I am {step}
                    <br />
                    {Object.entries(destinations).map(([key, value]) => (
                      <button key={key} onClick={value}>
                        GO TO {key}
                      </button>
                    ))}
                  </div>
                );
              }}
            </Controls>
          </Step>
        ))}
      </Wizard>
    </div>
  );
};

export const HooksTree = () => {
  const inTree = {
    step1: ['step2', 'sideshow'],
    sideshow: ['step2', 'step3'],
    step2: ['step3', 'error'],
    step3: ['step1'],
    error: ['step2'],
  } as const;

  const StepComp = ({ value }) => {
    const { step, tree, destinations } = useControls<typeof inTree>();
    return (
      <Step name={value}>
        <div>
          I am {step}
          <br />
          {Object.entries(destinations).map(([key, value]) => (
            <button key={key} onClick={value}>
              GO TO {key}
            </button>
          ))}
        </div>
      </Step>
    );
  };
  return (
    <Wizard first="step1" tree={inTree}>
      {Object.keys(inTree).map(key => (
        <StepComp key={key} value={key} />
      ))}
    </Wizard>
  );
};

export const PassedDataTree = () => {
  const tree = {
    step1: ['step2'],
    step2: ['step3'],
    step3: ['step1'],
  } as const;

  return (
    <Wizard tree={tree} first="step1" initialData={1}>
      <Step name="step1">
        <div>
          I am step 1
          <br />
          <Controls>
            {({ destinations: { step2 }, data }) => (
              <>
                <div>You have been to {data} steps.</div>
                <button
                  onClick={() => {
                    step2((data as number) + 1);
                  }}
                >
                  Go to Step 2
                </button>
              </>
            )}
          </Controls>
        </div>
      </Step>
      <Step name="step2">
        <div>
          I am step 2
          <br />
          <Controls>
            {({ destinations: { step3 }, data }) => (
              <>
                <div>You have been to {data} steps.</div>
                <button
                  onClick={() => {
                    step3((data as number) + 1);
                  }}
                >
                  Go to Step 2
                </button>
              </>
            )}
          </Controls>
        </div>
      </Step>
      <Step name="step3">
        <div>
          I am step 3
          <br />
          <Controls>
            {({ destinations: { step1 }, data }) => (
              <>
                <div>You have been to {data} steps.</div>
                <button
                  onClick={() => {
                    step1((data as number) + 1);
                  }}
                >
                  Go to Step 2
                </button>
              </>
            )}
          </Controls>
        </div>
      </Step>
    </Wizard>
  );
};
