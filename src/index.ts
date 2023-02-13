/* eslint-disable class-methods-use-this */
function debounce(fn, wait) {
  let t = 0;
  return function (args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
    return t;
  };
}

class ImageLazyLoader {
  constructor(observerOptions = {}) {
    this.observerOptions = {
      delay: 500,
      threshold: 0.7,
      wait: 200,
      className: 'lazyload',
      ...observerOptions,
    };
    this.targets = [...document.querySelectorAll(`.${this.observerOptions.className}`)];
    this.init();
    this.refreshOnEvent(this.observerOptions.refreshEvent);
  }
  onLoad(image) {
    if (this.observerOptions.onLoad) {
      this.observerOptions.onLoad(image);
    }
  }

  onError(image) {
    if (this.observerOptions.onError) {
      this.observerOptions.onError(image);
    }
  }

  init() {
    

    const intersectionHandler = (entry, observer) => {
      const image = entry.target;
      const source = Object.keys(image.dataset).find(el => (el === 'src') || (el === 'srcset'));
      if (source) {
        image[source] = image.dataset[source];
        image.onload = () => this.onLoad(image);
        image.onerror = () => this.onError(image);
        image.classList.remove(this.observerOptions.className);
        image.classList.remove(`${this.observerOptions.className}Placeholder`);
        image.classList.add(`${this.observerOptions.className}Loaded`);
      }
      observer.unobserve(image);
    };

    const entryHandler = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const debouncedHandler = debounce(
            () => intersectionHandler(entry, observer),
            this.observerOptions.wait,
          );
          debouncedHandler();
        }
      });
    };

    const observer = new IntersectionObserver(entryHandler, this.observerOptions);
    this.targets.forEach(target => observer.observe(target));
  }

  refreshOnEvent(refreshEvent) {
    if (refreshEvent) {
      document.addEventListener(refreshEvent, () => this.refresh());
    }
  }

  refresh() {
    this.targets = [...document.querySelectorAll(`.${this.observerOptions.className}`)];
    this.init();
  }
}

