(function () {
  'use strict';

  var BASE_COUNT = 617;

  /* ============================================================
     SCROLL REVEAL ANIMATIONS (IntersectionObserver)
     ============================================================ */
  function initScrollReveal() {
    var targets = document.querySelectorAll(
      '.reveal, .problem-item, .testimonial-item, .how-item'
    );
    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('in-view'); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach(function (el, i) {
      // stagger children of a grid slightly
      var delay = (i % 4) * 70;
      el.style.transitionDelay = delay + 'ms';
      observer.observe(el);
    });
  }

  /* ============================================================
     COUNT-UP ANIMATION (numbers on reveal)
     ============================================================ */
  function animateCountUp(el, from, to, duration) {
    var startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(from + (to - from) * eased);
      el.textContent = current.toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = to.toLocaleString();
      }
    }
    requestAnimationFrame(step);
  }

  function initCounters() {
    var counters = document.querySelectorAll('[data-count-to]');
    if (!counters.length) return;

    if (!('IntersectionObserver' in window)) {
      counters.forEach(function (el) {
        el.textContent = el.getAttribute('data-count-to');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var to = parseInt(el.getAttribute('data-count-to'), 10);
            var from = parseInt(el.getAttribute('data-count-start') || '0', 10);
            animateCountUp(el, from, to, 1600);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach(function (el) { observer.observe(el); });
  }

  /* ============================================================
     LIVE STATS FETCH — get real count from backend
     ============================================================ */
  var liveCounterEl = document.getElementById('live-counter');
  var countDisplayEl = document.getElementById('count-display');
  var currentTotal = BASE_COUNT;

  function refreshStats() {
    fetch('/api/stats')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && typeof data.count === 'number') {
          currentTotal = data.count;
          if (countDisplayEl) countDisplayEl.textContent = currentTotal.toLocaleString();
          if (liveCounterEl) {
            liveCounterEl.setAttribute('data-count-to', String(currentTotal));
          }
        }
      })
      .catch(function () { /* fail silently, fall back to base */ });
  }
  refreshStats();

  /* ============================================================
     AVATAR STACK — Gravatar + initials fallback
     ============================================================ */
  var avatarStackEl = document.getElementById('avatar-stack');

  function makeInitialsEl(initials, index) {
    var av = document.createElement('div');
    av.className = 'av';
    av.style.zIndex = String(10 - index);
    var inner = document.createElement('div');
    inner.className = 'av-initials';
    inner.textContent = initials || '?';
    av.appendChild(inner);
    return av;
  }

  function renderAvatars(avatars) {
    if (!avatarStackEl || !avatars || !avatars.length) return;
    avatarStackEl.innerHTML = '';

    // Render in reverse so first signup appears on the right (leftmost in row-reverse)
    var reversed = avatars.slice().reverse();

    reversed.forEach(function (person, idx) {
      var av = document.createElement('div');
      av.className = 'av';
      av.style.zIndex = String(idx + 1);

      if (person.emailHash) {
        // Try Gravatar — d=404 so we get a proper 404 if no Gravatar exists
        var img = document.createElement('img');
        img.src = 'https://www.gravatar.com/avatar/' + person.emailHash + '?s=76&d=404';
        img.alt = '';
        img.width = 38;
        img.height = 38;

        img.onerror = function () {
          // Gravatar not found — swap to initials
          av.innerHTML = '';
          var inner = document.createElement('div');
          inner.className = 'av-initials';
          inner.textContent = person.initials || '?';
          av.appendChild(inner);
        };

        av.appendChild(img);
      } else {
        var inner = document.createElement('div');
        inner.className = 'av-initials';
        inner.textContent = person.initials || '?';
        av.appendChild(inner);
      }

      avatarStackEl.appendChild(av);
    });
  }

  fetch('/api/avatars')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (data && Array.isArray(data.avatars)) {
        renderAvatars(data.avatars);
      }
    })
    .catch(function () { /* fail silently */ });



  /* ============================================================
     FORM HANDLING
     ============================================================ */
  var form = document.getElementById('waitlist-form');
  var submitBtn = document.getElementById('submit-btn');
  var lastSubmittedEmail = '';

  function validateField(id, check) {
    var field = document.getElementById('field-' + id);
    var input = document.getElementById(id);
    if (!field || !input) return true;
    var valid = check(input.value.trim());
    field.classList.toggle('has-error', !valid);
    if (!valid) {
      field.classList.remove('shake');
      requestAnimationFrame(function () { field.classList.add('shake'); });
    }
    return valid;
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var nameOk = validateField('name', function (v) { return v.length >= 2; });
      var emailOk = validateField('email', function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); });
      var roleOk = validateField('role', function (v) { return v !== ''; });
      
      var termsOk = document.getElementById('terms') ? document.getElementById('terms').checked : true;
      var termsField = document.getElementById('field-terms');
      if (termsField) termsField.classList.toggle('has-error', !termsOk);
      if (!termsOk && termsField) {
        termsField.classList.remove('shake');
        requestAnimationFrame(function () { termsField.classList.add('shake'); });
      }

      if (!nameOk || !emailOk || !roleOk || !termsOk) return;

      var payload = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        role: document.getElementById('role').value,
        company: document.getElementById('company').value.trim(),
        github: document.getElementById('github').value.trim(),
      };
      lastSubmittedEmail = payload.email;

      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" style="animation:spin 0.7s linear infinite" aria-hidden="true"><path d="M21 12a9 9 0 1 1-9-9"/></svg> Joining…';

      fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(function (r) { return r.json().then(function (d) { return { status: r.status, body: d }; }); })
        .then(function (res) {
          if (res.status !== 200 || res.body.error) {
            throw new Error(res.body.error || 'Something went wrong. Please try again.');
          }
          var position = res.body.position;
          var total = res.body.total;
          showSuccessModal(position, total);
          form.reset();
        })
        .catch(function (err) {
          submitBtn.disabled = false;
          submitBtn.innerHTML =
            '<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg> Request early access';
          alert(err.message || 'Something went wrong. Please try again.');
        });
    });

    ['name', 'email', 'role', 'terms'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) {
        el.addEventListener(id === 'terms' ? 'change' : 'input', function () {
          var field = document.getElementById('field-' + id);
          if (field) field.classList.remove('has-error');
        });
      }
    });
  }

  /* ============================================================
     DRAWER HANDLING
     ============================================================ */
  var openTermsBtn = document.getElementById('open-terms-btn');
  var closeTermsBtn = document.getElementById('close-terms-btn');
  var termsDrawer = document.getElementById('terms-drawer');
  var termsOverlay = document.getElementById('terms-drawer-overlay');

  function openTerms(e) {
    if (e) e.preventDefault();
    if (termsDrawer) termsDrawer.classList.add('open');
    if (termsOverlay) termsOverlay.classList.add('open');
  }

  function closeTerms() {
    if (termsDrawer) termsDrawer.classList.remove('open');
    if (termsOverlay) termsOverlay.classList.remove('open');
  }

  if (openTermsBtn) openTermsBtn.addEventListener('click', openTerms);
  if (closeTermsBtn) closeTermsBtn.addEventListener('click', closeTerms);
  if (termsOverlay) termsOverlay.addEventListener('click', closeTerms);

  /* ============================================================
     SUCCESS MODAL + CONFETTI
     ============================================================ */
  var modalOverlay = document.getElementById('modal-overlay');
  var modalClose = document.getElementById('modal-close');
  var modalDone = document.getElementById('modal-done');

  function showSuccessModal(position, total) {
    document.getElementById('your-position').textContent = position.toLocaleString();
    document.getElementById('total-count').textContent = total.toLocaleString() + ' engineers';

    var progEl = modalOverlay.querySelector('.progress');
    if (progEl) progEl.style.strokeDashoffset = '201';

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        if (progEl) progEl.style.strokeDashoffset = '0';
      });
    });

    fireConfetti();

    // reset submit button state (in background, in case modal is closed and user wants to resubmit)
    submitBtn.disabled = false;
    submitBtn.innerHTML =
      '<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg> Request early access';
  }

  function hideModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', hideModal);
  if (modalDone) modalDone.addEventListener('click', hideModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) hideModal();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') hideModal();
  });

  var linkedinCta = document.getElementById('linkedin-cta');
  if (linkedinCta) {
    linkedinCta.addEventListener('click', function () {
      if (lastSubmittedEmail) {
        fetch('/api/track-linkedin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: lastSubmittedEmail })
        }).catch(function() {});
      }
    });
  }

  function fireConfetti() {
    var wrap = document.getElementById('confetti-wrap');
    if (!wrap) return;
    var colors = ['#22c55e', '#4ade80', '#60a5fa', '#fbbf24', '#f87171', '#c084fc', '#f5f5f7'];
    var count = 90;
    var w = window.innerWidth;

    for (var i = 0; i < count; i++) {
      (function (idx) {
        var piece = document.createElement('div');
        piece.className = 'confetti-piece';
        var size = 6 + Math.random() * 8;
        var isCircle = Math.random() > 0.5;
        piece.style.width = size + 'px';
        piece.style.height = (isCircle ? size : size * 0.4) + 'px';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        if (isCircle) piece.style.borderRadius = '50%';
        var startX = Math.random() * w;
        piece.style.left = startX + 'px';

        wrap.appendChild(piece);

        var duration = 2200 + Math.random() * 1800;
        var drift = (Math.random() - 0.5) * 260;
        var rotation = (Math.random() - 0.5) * 720;
        var delay = Math.random() * 250;

        var anim = piece.animate(
          [
            { transform: 'translate(0px, 0px) rotate(0deg)', opacity: 1 },
            {
              transform:
                'translate(' + drift + 'px, ' + (window.innerHeight + 60) + 'px) rotate(' + rotation + 'deg)',
              opacity: 0.9,
              offset: 0.85,
            },
            {
              transform:
                'translate(' + drift + 'px, ' + (window.innerHeight + 120) + 'px) rotate(' + rotation + 'deg)',
              opacity: 0,
            },
          ],
          { duration: duration, delay: delay, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', fill: 'forwards' }
        );

        anim.onfinish = function () {
          if (piece.parentNode) piece.parentNode.removeChild(piece);
        };
      })(i);
    }
  }

  /* ============================================================
     INIT
     ============================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    initScrollReveal();
    initCounters();
  });
})();
