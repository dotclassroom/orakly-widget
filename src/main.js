import { mount } from 'svelte';
import OraklyWidget from './OraklyWidget.svelte';

export function create(container, options = {}) {
  const widget = mount(OraklyWidget, {
    target: container,
    props: options
  });
  
  return widget;
}