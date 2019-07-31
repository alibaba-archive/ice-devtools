import React from 'react';
import MainComponent from '../src';

export default {
  name: '<%= name %>', // 组件名称
  editor: () => {
    return {
      props: [],
    };
  },
  adaptor: (props) => {
    const { ...others } = props;
    return (
      // eslint-disable-next-line react/react-in-jsx-scope
      <MainComponent {...others} />
    );
  },
};
