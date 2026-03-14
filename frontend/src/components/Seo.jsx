import { useEffect } from 'react';

const ABSOLUTE_BASE = 'https://www.resumex.cv';

export const Seo = ({ title, description, canonicalPath }) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    const ensureMeta = (name) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      return el;
    };

    if (description) {
      const desc = ensureMeta('description');
      desc.setAttribute('content', description);

      const ogDesc = document.querySelector('meta[property="og:description"]') || (() => {
        const el = document.createElement('meta');
        el.setAttribute('property', 'og:description');
        document.head.appendChild(el);
        return el;
      })();
      ogDesc.setAttribute('content', description);
    }

    if (title) {
      const ogTitle = document.querySelector('meta[property="og:title"]') || (() => {
        const el = document.createElement('meta');
        el.setAttribute('property', 'og:title');
        document.head.appendChild(el);
        return el;
      })();
      ogTitle.setAttribute('content', title);
    }

    if (canonicalPath) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      const normalized = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
      link.setAttribute('href', `${ABSOLUTE_BASE}${normalized}`);

      const ogUrl = document.querySelector('meta[property="og:url"]') || (() => {
        const el = document.createElement('meta');
        el.setAttribute('property', 'og:url');
        document.head.appendChild(el);
        return el;
      })();
      ogUrl.setAttribute('content', `${ABSOLUTE_BASE}${normalized}`);
    }
  }, [title, description, canonicalPath]);

  return null;
};

export default Seo;

