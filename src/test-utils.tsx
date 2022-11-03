import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { GlobalProvider } from './context/GlobalContext';
import store from './state/store';
import { Provider } from 'react-redux';

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <GlobalProvider>
      <Provider store={store}>{children}</Provider>
    </GlobalProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
