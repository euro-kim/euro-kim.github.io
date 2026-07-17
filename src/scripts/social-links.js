(function () {
  var config = window.SITE_LINKS || {};

  function bindLink(id, href, options) {
    var element = document.getElementById(id);
    if (!element) {
      return;
    }

    if (!href) {
      element.setAttribute('aria-disabled', 'true');
      element.setAttribute('tabindex', '-1');
      element.removeAttribute('target');
      element.removeAttribute('rel');
      element.href = '#';
      return;
    }

    element.removeAttribute('aria-disabled');
    element.removeAttribute('tabindex');
    element.href = href;

    if (options && options.external) {
      element.target = '_blank';
      element.rel = 'me noopener noreferrer';
    } else {
      element.removeAttribute('target');
      element.removeAttribute('rel');
    }
  }

  bindLink('github-link', config.githubUrl, { external: true });
  bindLink('linkedin-link', config.linkedinUrl, { external: true });
  bindLink('email-link', config.emailAddress ? 'mailto:' + config.emailAddress : '', { external: false });
})();
