import { mount } from 'svelte';
import OraklyWidget from './OraklyWidget.svelte';

export function create(container, options = {}, onComplete) {
  onComplete = onComplete instanceof Function ? onComplete : ()=>{};

  if (document.readyState === "complete") {
    const widget = createWidget(container, options);
    onComplete(widget);
    return widget;
  } else { 
    document.addEventListener("readystatechange", (event) => {
      const widgetContainer = document.getElementsByClassName("ow-container");
      if (document.readyState === "complete" && !widgetContainer.length) {
        const widget = createWidget(container, options);
        onComplete(widget);
      }
    });
  }

}

function createWidget(container, options) {
  container = container || document.body;
  const widget = mount(OraklyWidget, {
    target: container,
    props: options
  });
  return widget;
}