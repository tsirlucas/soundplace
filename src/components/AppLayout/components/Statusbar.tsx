import React from 'react';

type Props = {
  error: string;
};

export const StatusBar = ({error}: Props) => (
  <section className={`status-bar ${error ? 'show' : ''}`}>
    <span>{error}</span>
  </section>
);
