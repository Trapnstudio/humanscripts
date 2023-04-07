// @ts-check
// ==UserScript==
// @name         Minimal Instagram
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Hide posts on your Instagram feed from people you don't follow. Hide stories. Hide comments. Keep your circle tight. Keep your focus tighter.
// @author       Memije.io
// @match        https://www.instagram.com/*
// @license      MIT
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  {
    const throttle = (func, timeFrame) => {
      let lastTime = 0;
      return function () {
        const now = Date.now();
        if (now - lastTime >= timeFrame) {
          func();
          lastTime = now;
        }
      };
    };

    // Nuke explore and reels page
    const nukeExploreAndReelsPage = () => {
      const url = new URL(window.location.href);
      const main = document.querySelector('main');
      if (
        url.pathname.startsWith('/explore/') ||
        url.pathname.startsWith('/reels/')
      ) {
        if (main) {
          main.style.display = 'none';
          return;
        }
      }
      if (main) {
        main.style.display = 'flex';
      }
    };

    const nukeStories = () => {
      const stories = Array.from(
        document.querySelectorAll('button[aria-label^="Story by"]'),
      );

      stories.forEach((elem) => (elem.style.visibility = 'hidden'));
    };

    const nukePostsFromPeopleYouDontFollow = () => {
      const posts = Array.from(
        document.querySelectorAll('article[role="presentation"]'),
      );
      const url = new URL(window.location.href);
      const unwantedPosts = posts.filter((post) => {
        if (url.pathname !== '/') {
          return false; // if you're not on the root page, don't hide
        }

        const button = post.querySelector('article button');
        if (button && button.textContent === 'Follow') {
          return true; // if you don't follow the person, hide
        }

        return false; // default to not hiding
      });
      unwantedPosts.forEach((elem) => (elem.style.visibility = 'hidden'));
    };

    const nukeCommentsOnFeed = () => {
      const comments = Array.from(
        document.querySelectorAll(
          'article[role="presentation"] button svg[aria-label="Like"], article[role="presentation"] button svg[aria-label="Unlike"]',
        ),
      );
      comments.forEach((post) => {
        const btn = post.closest('button');
        const elmToHide =
          btn &&
          btn.parentElement &&
          btn.parentElement.parentElement &&
          btn.parentElement.parentElement.parentElement &&
          btn.parentElement.parentElement.parentElement.parentElement;

        if (elmToHide) {
          const roleAttribute = elmToHide.getAttribute('role');
          if (roleAttribute !== 'presentation') {
            elmToHide.style.visibility = 'hidden';
          }
        }
      });
    };

    const nukeCommentsOnPostPage = () => {
      const comments = Array.from(
        document.querySelectorAll('article[role="presentation"] ul ul'),
      );

      comments.forEach((elem) => (elem.style.visibility = 'hidden'));
    };

    const nukeCommentsOnCommentsPage = () => {
      const url = new URL(window.location.href);

      if (url.pathname.endsWith('/comments/')) {
        const moreComments = Array.from(document.querySelectorAll('h3'));
        moreComments.forEach((elem) => {
          const grandParent =
            elem.parentElement &&
            elem.parentElement.parentElement &&
            elem.parentElement.parentElement.parentElement;
          if (grandParent) {
            grandParent.style.visibility = 'hidden';
          }
        });
      }
    };

    const main = () => {
      nukeExploreAndReelsPage();
      nukeStories();
      nukePostsFromPeopleYouDontFollow();
      nukeCommentsOnFeed();
      nukeCommentsOnPostPage();
      nukeCommentsOnCommentsPage();
    };

    const throttledMain = throttle(main, 250);
    const observer = new MutationObserver(() => throttledMain());

    observer.observe(document, {
      subtree: true,
      attributes: true,
    });
  }
})();
