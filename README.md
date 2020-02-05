# Lazy observer
IntersectionObserver-api based lazyloader for images
# Methods
**Reload** - manually reload target images
# Paramenetrs:
* target image classname - (**str**: css class selector)
* options - (**obj**)
# Options
All native options of IntersectionObserver API available as is. You can check documentation here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

Additional option:
* **wait** - time of debounce idle (**int**: ms)
* **refreshEvent** - label of event that will refresh target events (**str**: eventname)
---
```
const observerOptions = {
  delay: 200,
  threshold: .7,
  wait: 400,
  refreshEvent: 'updateLazyImages'
};

const lazyloadObserver = new LazyLoader('lazyload', observerOptions);
```
That means if image will be shown more than 200ms in viewport loader will load image after debounce time
