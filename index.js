class LazyLoader{
  constructor(className = 'lazyload', observerOptions = {}){
    this.observerOptions = {
      delay: 200,
      threshold: .7,
      wait: 400,
      ...observerOptions,
    };
    this.className = className;
    this.targets = [...document.querySelectorAll(`.${this.className}`)];
    this.init();
    this.refreshOnEvent(this.observerOptions.refreshEvent);
  }
  
  init() {
    function debounce (fn, wait) {
      let t = 0;
      return function() {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, arguments), wait);
        return t;
      }
    }
    
    const intersectionHandler = (entry, observer) => {
      const lazy = entry.target;
      const attrs = Object.keys(lazy.dataset);
      if (attrs.includes('src', 'srcset')) {
        lazy[attrs[0]] = lazy.dataset[attrs[0]];
        lazy.classList.remove(this.className);
      }
      observer.unobserve(lazy);
    };
    
    const cb = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const debouncedHandler = debounce(() => intersectionHandler(entry, observer), this.observerOptions.wait);
          debouncedHandler();
        }
      });
    };
    
    const observer = new IntersectionObserver(cb, this.observerOptions); 
    this.targets.forEach(target => observer.observe(target))
  }

  refreshOnEvent(refreshEvent) {
    if (refreshEvent) {
      document.addEventListener(refreshEvent, () => this.refresh());
    }
  }

  refresh() {
    this.targets = [...document.querySelectorAll(`.${this.className}`)];
    this.init();
  }
}

const lazyloadObserver = new LazyLoader('lazyload', {refreshEvent: 'ajaxloaded'});