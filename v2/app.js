(function () {
  'use strict';

  var STORAGE_KEY = 'gymnovite-lang';
  var DEFAULT_LANG = 'sv';

  function getLang() {
    try {
      return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    } catch (e) {
      return DEFAULT_LANG;
    }
  }

  function setLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* private browsing / storage blocked — fall through, still apply in-memory */
    }
    applyLang(lang);
  }

  function applyLang(lang) {
    var dict = window.I18N || {};

    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var entry = dict[key];
      if (entry && entry[lang] != null) {
        el.innerHTML = entry[lang];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      var entry = dict[key];
      if (entry && entry[lang] != null) {
        el.setAttribute('placeholder', entry[lang]);
      }
    });

    if (window.I18N_TITLE && window.I18N_TITLE[lang]) {
      document.title = window.I18N_TITLE[lang];
    }

    document.querySelectorAll('.lang-switch button').forEach(function (btn) {
      var pressed = btn.getAttribute('data-lang') === lang;
      btn.setAttribute('aria-pressed', pressed ? 'true' : 'false');
    });
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.lang-switch button[data-lang]');
    if (!btn) return;
    setLang(btn.getAttribute('data-lang'));
  });

  document.querySelectorAll('#year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  applyLang(getLang());

  // Generic "opens a pre-filled email" form handler.
  // Usage: <form data-mailto-form data-mailto-to="you@example.com" data-mailto-subject="...">
  document.querySelectorAll('form[data-mailto-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var to = form.getAttribute('data-mailto-to');
      var subjectTemplate = form.getAttribute('data-mailto-subject') || 'Meddelande från gymnovite.se';
      var data = new FormData(form);

      var lines = [];
      form.querySelectorAll('[data-mailto-field]').forEach(function (field) {
        var value = (data.get(field.name) || '').toString().trim();
        if (!value) return;
        var fieldLabel = field.getAttribute('data-mailto-field');
        lines.push(fieldLabel + ': ' + value);
      });

      var subject = subjectTemplate;
      var serviceField = form.querySelector('[name="service"]');
      if (serviceField && serviceField.value) {
        var selected = serviceField.options[serviceField.selectedIndex];
        if (selected) subject = subjectTemplate + ' — ' + selected.textContent;
      }

      var body = lines.join('\n');
      var mailto = 'mailto:' + encodeURIComponent(to) +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      window.location.href = mailto;

      var status = form.querySelector('.form-status');
      if (status) {
        status.classList.add('visible', 'success');
      }
    });
  });
})();
