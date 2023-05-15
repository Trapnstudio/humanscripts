// @ts-check
// ==UserScript==
// @name         Minimal Instagram
// @version      0.4
// @description  Hide posts on your Instagram feed from people you don't follow. Hide stories. Hide comments.  Keep your circle tight. Keep your focus tighter.
// @match        https://www.instagram.com/*
// @grant        none
// @license      MIT
// @namespace    MEMIJE.IO
// @author       MEMIJE.IO
// ==/UserScript==

(function () {
  'use strict';
  {
    const throttle = (func, timeFrame) => {
      let lastTime = 0;
      let timeoutId = null;

      return function () {
        const timeSinceLastCall = Date.now() - lastTime;

        const runFunc = () => {
          func();
          lastTime = Date.now();
          timeoutId = null;
        };

        if (timeSinceLastCall >= timeFrame) {
          clearTimeout(timeoutId);
          runFunc();
        } else if (!timeoutId) {
          timeoutId = setTimeout(runFunc, timeFrame - timeSinceLastCall);
        }
      };
    };

    // Nuke explore and reels page
    const nukeExploreAndReelsPage = () => {
      const { pathname } = new URL(window.location.href);
      const main = document.querySelector('main');
      const exploreRootPath = '/explore/';
      const reelsRootPath = '/reels/';
      if ([exploreRootPath, reelsRootPath].includes(pathname)) {
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
      const { pathname } = new URL(window.location.href);
      const unwantedPosts = posts.filter((post) => {
        if (pathname !== '/') {
          return false; // if you're not on the root page, don't hide
        }

        const button = post.querySelector('article button');
        if (button && button.textContent === 'Follow') {
          return true; // if you don't follow the person, hide
        }

        const header = post.querySelector('header');
        if (
          header &&
          header.textContent &&
          header.textContent
            .toLowerCase()
            .includes('Paid partnership'.toLowerCase())
        ) {
          return true; // if it is an ad, obviously, hide
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
      const { pathname } = new URL(window.location.href);

      if (pathname.endsWith('/comments/')) {
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
