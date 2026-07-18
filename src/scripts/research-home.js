(function () {
  var scene = document.querySelector('[data-paper-scene]');
  var section = document.getElementById('cv-stage');

  if (!scene || !section) {
    return;
  }

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function updateScene() {
    if (reduceMotion) {
      scene.dataset.state = 'flat';
      return;
    }

    var rect = section.getBoundingClientRect();
    var viewport = window.innerHeight || document.documentElement.clientHeight;
    var total = Math.max(rect.height - viewport, 1);
    var progress = Math.min(Math.max((viewport - rect.top) / total, 0), 1);

    if (progress < 0.34) {
      scene.dataset.state = 'entering';
    } else if (progress < 0.7) {
      scene.dataset.state = 'mid';
    } else {
      scene.dataset.state = 'flat';
    }
  }

  scene.dataset.state = reduceMotion ? 'flat' : 'entering';
  updateScene();

  window.addEventListener('scroll', updateScene, { passive: true });
  window.addEventListener('resize', updateScene);
})();
