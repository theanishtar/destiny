
console.log("app.js");

const app = {
  deepExtend: function (a, b) {
    for (const prop in b) {
      if (typeof b[prop] === 'object') {
        a[prop] = b[prop] instanceof Array ? [] : {};
        this.deepExtend(a[prop], b[prop]);
      } else {
        a[prop] = b[prop];
      }
    }
  },
  query: function (options) {
    const config = {
      method: 'GET',
      async: true,
      header: {
        type: 'Content-type',
        value: 'application/json'
      },
      data: ''
    };

    this.deepExtend(config, options);

    return new Promise( function (resolve, reject) {
      const xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function() {
        if (xhttp.readyState !== 4) return;

        if (xhttp.status === 200) {
          resolve(xhttp.responseText);
        } else {
          reject({
            status: xhttp.status,
            statusText: xhttp.statusText
          });
        }
      };
  
      xhttp.open(config.method, config.url, config.async);
      xhttp.setRequestHeader(config.header.type, config.header.value);
  
      if (config.method === 'GET') {
        xhttp.send();
      } else if (config.method === 'POST') {
        xhttp.send(config.data);
      }
    });
  },
  querySelector: function (selector, callback) {
    const el = document.querySelectorAll(selector);

    if (el.length) {
      callback(el);
    }
  },
  liquidify: function (el) {
    const image = el.querySelector('img'),
          imageSrc = image.getAttribute('src');
  
    image.style.display = 'none';
    el.style.background = `url("${imageSrc}") no-repeat center`;
    el.style.backgroundSize = 'cover';
  },
  liquidifyStatic: function (figure, image) {
    image.style.display = 'none';
    figure.style.background = `url("${image.getAttribute('src')}") no-repeat center`;
    figure.style.backgroundSize = 'cover';
  },
  dateDiff: function (date1, date2 = new Date()) {
    const timeDiff = Math.abs(date1.getTime() - date2.getTime()),
          secondsDiff = Math.ceil(timeDiff / (1000)),
          minutesDiff = Math.floor(timeDiff / (1000 * 60)),
          hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60)),
          daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
          weeksDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7)),
          monthsDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7 * 4)),
          yearsDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7 * 4 * 12));

    let unit;

    if (secondsDiff < 60) {
      unit = secondsDiff === 1 ? 'second' : 'seconds';

      return {
        unit: unit,
        value: secondsDiff
      }
    } else if (minutesDiff < 60) {
      unit = minutesDiff === 1 ? 'minute' : 'minutes';

      return {
        unit: unit,
        value: minutesDiff
      }
    } else if (hoursDiff < 24) {
      unit = hoursDiff === 1 ? 'hour' : 'hours';

      return {
        unit: unit,
        value: hoursDiff
      }
    } else if (daysDiff < 7) {
      unit = daysDiff === 1 ? 'day' : 'days';

      return {
        unit: unit,
        value: daysDiff
      }
    } else if (weeksDiff < 4) {
      unit = weeksDiff === 1 ? 'week' : 'weeks';

      return {
        unit: unit,
        value: weeksDiff
      }
    } else if (monthsDiff < 12) {
      unit = monthsDiff === 1 ? 'month' : 'months';

      return {
        unit: unit,
        value: monthsDiff
      }
    } else {
      unit = yearsDiff === 1 ? 'year' : 'years';

      return {
        unit: unit,
        value: yearsDiff
      }
    }
  },
  existsInDOM: function (selector) {
    return document.querySelectorAll(selector).length;
  },
  plugins: {
    createTab: function (options) {
      if (app.existsInDOM(options.triggers) && app.existsInDOM(options.elements)) {
        return new XM_Tab(options);
      }
    },
    createHexagon: function (options) {
      if (app.existsInDOM(options.container) || typeof options.containerElement !== 'undefined') {
        return new XM_Hexagon(options);
      }
    },
    createProgressBar: function (options) {
      if (app.existsInDOM(options.container)) {
        return new XM_ProgressBar(options);
      }
    },
    createDropdown: function (options) {
      if (((app.existsInDOM(options.container) || typeof options.containerElement !== 'undefined') && options.controlToggle) || ((app.existsInDOM(options.trigger) || typeof options.triggerElement !== 'undefined') && (app.existsInDOM(options.container) || typeof options.containerElement !== 'undefined'))) {
        return new XM_Dropdown(options);
      }
    },
    createTooltip: function (options) {
      if (app.existsInDOM(options.container)) {
        return new XM_Tooltip(options);
      }
    },
    createSlider: function (options) {
      if (app.existsInDOM(options.container)) {
        return tns(options);
      }
    },
    createPopup: function (options) {
      if (app.existsInDOM(options.container) && app.existsInDOM(options.trigger)) {
        return new XM_Popup(options);
      }
    },
    createAccordion: function (options) {
      if (app.existsInDOM(options.triggerSelector) && app.existsInDOM(options.contentSelector)) {
        return new XM_Accordion(options);
      }
    },
    createChart: function (ctx, options) {
      return new Chart(ctx, options);
    }
  }
};

app.querySelector('.icon-demo-list', function (lists) {
  const icons = [
    {
      name: 'Facebook',
      className: 'facebook'
    },
    {
      name: 'Twitter',
      className: 'twitter'
    },
    {
      name: 'Twitch',
      className: 'twitch'
    },
    {
      name: 'Youtube',
      className: 'youtube'
    },
    {
      name: 'Instagram',
      className: 'instagram'
    },
    {
      name: 'Discord',
      className: 'discord'
    },
    {
      name: 'Patreon',
      className: 'patreon'
    },
    {
      name: 'Google',
      className: 'google'
    },
    {
      name: 'Behance',
      className: 'behance'
    },
    {
      name: 'DeviantArt',
      className: 'deviantart'
    },
    {
      name: 'Artstation',
      className: 'artstation'
    },
    {
      name: 'Cross',
      className: 'cross'
    },
    {
      name: 'Logo Vikinger',
      className: 'logo-vikinger'
    },
    {
      name: 'Grid',
      className: 'grid'
    },
    {
      name: 'Dots',
      className: 'dots'
    },
    {
      name: 'Magnifying Glass',
      className: 'magnifying-glass'
    },
    {
      name: 'Comment',
      className: 'comment'
    },
    {
      name: 'Thumbs Up',
      className: 'thumbs-up'
    },
    {
      name: 'Friend',
      className: 'friend'
    },
    {
      name: 'Group',
      className: 'group'
    },
    {
      name: 'Marketplace',
      className: 'marketplace'
    },
    {
      name: 'Add Friend',
      className: 'add-friend'
    },
    {
      name: 'Remove Friend',
      className: 'remove-friend'
    },
    {
      name: 'Delete',
      className: 'delete'
    },
    {
      name: 'Messages',
      className: 'messages'
    },
    {
      name: 'Send Message',
      className: 'send-message'
    },
    {
      name: 'Back Arrow',
      className: 'back-arrow'
    },
    {
      name: 'Shopping Bag',
      className: 'shopping-bag'
    },
    {
      name: 'Notification',
      className: 'notification'
    },
    {
      name: 'Settings',
      className: 'settings'
    },
    {
      name: 'Cross Thin',
      className: 'cross-thin'
    },
    {
      name: 'Newsfeed',
      className: 'newsfeed'
    },
    {
      name: 'Overview',
      className: 'overview'
    },
    {
      name: 'Members',
      className: 'members'
    },
    {
      name: 'Badges',
      className: 'badges'
    },
    {
      name: 'Quests',
      className: 'quests'
    },
    {
      name: 'Streams',
      className: 'streams'
    },
    {
      name: 'Events',
      className: 'events'
    },
    {
      name: 'Forums',
      className: 'forums'
    },
    {
      name: 'Small Arrow',
      className: 'small-arrow'
    },
    {
      name: 'Big Arrow',
      className: 'big-arrow'
    },
    {
      name: 'Public',
      className: 'public'
    },
    {
      name: 'Private',
      className: 'private'
    },
    {
      name: 'Join Group',
      className: 'join-group'
    },
    {
      name: 'Leave Group',
      className: 'leave-group'
    },
    {
      name: 'More Dots',
      className: 'more-dots'
    },
    {
      name: 'Profile',
      className: 'profile'
    },
    {
      name: 'Timeline',
      className: 'timeline'
    },
    {
      name: 'Photos',
      className: 'photos'
    },
    {
      name: 'Videos',
      className: 'videos'
    },
    {
      name: 'Blog Posts',
      className: 'blog-posts'
    },
    {
      name: 'Forum',
      className: 'forum'
    },
    {
      name: 'Store',
      className: 'store'
    },
    {
      name: 'Star',
      className: 'star'
    },
    {
      name: 'Play',
      className: 'play'
    },
    {
      name: 'Share',
      className: 'share'
    },
    {
      name: 'Pinned',
      className: 'pinned'
    },
    {
      name: 'Status',
      className: 'status'
    },
    {
      name: 'Big Grid View',
      className: 'big-grid-view'
    },
    {
      name: 'Small Grid View',
      className: 'small-grid-view'
    },
    {
      name: 'List Grid View',
      className: 'list-grid-view'
    },
    {
      name: 'Plus',
      className: 'plus'
    },
    {
      name: 'Plus Small',
      className: 'plus-small'
    },
    {
      name: 'Minus Small',
      className: 'minus-small'
    },
    {
      name: 'Poll',
      className: 'poll'
    },
    {
      name: 'Camera',
      className: 'camera'
    },
    {
      name: 'Gif',
      className: 'gif'
    },
    {
      name: 'Tags',
      className: 'tags'
    },
    {
      name: 'Quote',
      className: 'quote'
    },
    {
      name: 'Pin',
      className: 'pin'
    },
    {
      name: 'Ticket',
      className: 'ticket'
    },
    {
      name: 'Events Monthly',
      className: 'events-monthly'
    },
    {
      name: 'Events Weekly',
      className: 'events-weekly'
    },
    {
      name: 'Events Daily',
      className: 'events-daily'
    },
    {
      name: 'Info',
      className: 'info'
    },
    {
      name: 'Check',
      className: 'check'
    },
    {
      name: 'Trophy',
      className: 'trophy'
    },
    {
      name: 'Clock',
      className: 'clock'
    },
    {
      name: 'Return',
      className: 'return'
    },
    {
      name: 'Dribbble',
      className: 'dribbble'
    },
    {
      name: 'Item',
      className: 'item'
    },
    {
      name: 'Wallet',
      className: 'wallet'
    },
    {
      name: 'Earnings',
      className: 'earnings'
    },
    {
      name: 'Revenue',
      className: 'revenue'
    },
    {
      name: 'Login',
      className: 'login'
    }
  ];

  const createIcon = function (iconName) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
          use = document.createElementNS('http://www.w3.org/2000/svg', 'use');

    svg.classList.add(`icon-${iconName}`);
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#svg-${iconName}`);

    svg.appendChild(use);

    return svg;
  };

  const createIconString = function (icon) {
    const iconString = `
    <!-- ICON ${icon.name.toUpperCase()} -->
    <svg class="icon-${icon.className}">
      <use xlink:href="#svg-${icon.className}"></use>
    </svg>
    <!-- /ICON ${icon.name.toUpperCase()} -->`;

    return iconString;
  };

  const createDemoIconString = function (icon) {
    const iconString = `
    <!-- ICON ${icon.name.toUpperCase()} -->
    <svg class="icon-${icon.className} demo-icon">
      <use xlink:href="#svg-${icon.className}"></use>
    </svg>
    <!-- /ICON ${icon.name.toUpperCase()} -->`;

    return iconString;
  };

  const createDemoBox = function (iconData) {
    const container = document.createElement('div'),
          iconContainer = document.createElement('div'),
          icon = createIcon(iconData.className),
          title = document.createElement('p'),
          text = document.createElement('p'),
          button = document.createElement('p'),
          buttonInactiveText = document.createElement('span'),
          buttonActiveText = document.createElement('span');

    container.classList.add('demo-box');
    iconContainer.classList.add('demo-box-icon-wrap');
    icon.classList.add('demo-box-icon');
    title.classList.add('demo-box-title');
    text.classList.add('demo-box-text');
    button.classList.add('button', 'full');
    buttonInactiveText.classList.add('inactive-text');
    buttonActiveText.classList.add('active-text');

    title.innerHTML = iconData.name;
    text.innerHTML = `.icon-${iconData.className}`;
    buttonInactiveText.innerHTML = 'Copy SVG';
    buttonActiveText.innerHTML = 'Copied!';

    iconContainer.appendChild(icon);
    container.appendChild(iconContainer);
    container.appendChild(title);
    container.appendChild(text);
    button.appendChild(buttonInactiveText);
    button.appendChild(buttonActiveText);
    container.appendChild(button);

    return {
      container: container,
      trigger: button
    }
  };

  const copyCode = function (code) {
    const input = document.createElement('textarea');

    input.innerHTML = code;

    document.body.appendChild(input);

    input.select();
    document.execCommand('copy');

    input.remove();
  };

  // ICON BACKLOG
  const divWrap = document.createElement('div');
  divWrap.style.width = '80px';
  divWrap.style.position = 'fixed';
  divWrap.style.top = '80px';
  divWrap.style.left = '0';
  document.body.appendChild(divWrap);

  for (const list of lists) {
    // Sort icons array
    const sortedIcons = icons.sort(function (firstEl, secondEl) {
      if (firstEl.name < secondEl.name) {
        return -1;
      }

      if (firstEl.name > secondEl.name) {
        return 1;
      }

      return 0;
    });

    for (const icon of sortedIcons) {
      const demoBox = createDemoBox(icon);

      list.appendChild(demoBox.container);

      demoBox.trigger.addEventListener('click', function () {
        const iconCode = createIconString(icon);
        copyCode(iconCode);

        demoBox.trigger.classList.add('active');

        window.setTimeout(function () {
          demoBox.trigger.classList.remove('active');
        }, 2000);

        // ICON BACKLOG
        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.justifyContent = 'center';
        div.style.marginTop = '30px';
        div.innerHTML = createDemoIconString(icon);

        divWrap.appendChild(div);
      });
    }
  }
});