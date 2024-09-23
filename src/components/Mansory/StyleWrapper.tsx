/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

export const Style: React.NamedExoticComponent<{ children: React.ReactNode }> = React.memo(({ children }) => {
  return <style>{children}</style>;
});
