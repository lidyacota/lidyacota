(function () {
  'use strict';

  var measurementId = 'G-L5XPW81723';
  var hostname = window.location.hostname;
  var tagId = 'lidyacota-analytics-tag';

  if ((hostname !== 'www.lidyacota.com' && hostname !== 'lidyacota.com') ||
      window['ga-disable-' + measurementId] === true ||
      document.getElementById(tagId)) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });

  var tag = document.createElement('script');
  tag.id = tagId;
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
  document.head.appendChild(tag);
}());
