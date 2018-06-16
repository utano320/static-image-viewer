import { render } from '@vue/server-test-utils';
import App from './App.vue';

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(App);
  });

  test('image tags count > 0', () => {
    // expect(wrapper.findAll('img').length).toBeGreaterThan(0);
    expect(wrapper.find('img').length).toBeGreaterThan(0);
  });

  // test 画像がきちんと読み込まれているか？
});
