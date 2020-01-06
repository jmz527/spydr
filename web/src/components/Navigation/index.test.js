// React
import React from 'react';

// React Router
import { Link, MemoryRouter } from 'react-router-dom';

// Enzyme
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Custom
import Navigation from './index.js';

configure({adapter: new Adapter()});

describe('<Navigation />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );
  });

  it('should render 4 <Link />', () => {
    expect(wrapper.find(Link)).toHaveLength(4);
  });

  it('should render a Home <Link />', () => {
    expect(wrapper.find(Link).filter({to: '/'}).text()).toEqual('Home');
  });

  it('should render a Instagram <Link />', () => {
    expect(wrapper.find(Link).filter({to: '/instagram'}).text()).toEqual('Instagram');
  });

  it('should render a Reddit <Link />', () => {
    expect(wrapper.find(Link).filter({to: '/reddit'}).text()).toEqual('Reddit');
  });

  it('should render a Youtube <Link />', () => {
    expect(wrapper.find(Link).filter({to: '/youtube'}).text()).toEqual('Youtube');
  });

});
