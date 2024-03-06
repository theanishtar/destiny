/*
 * Helper constants and functions
 */

// make it easier for ourselves by putting some values in objects
// in TypeScript, these would be enums
const Keys = {
  Backspace: "Backspace",
  Clear: "Clear",
  Down: "ArrowDown",
  End: "End",
  Enter: "Enter",
  Escape: "Escape",
  Home: "Home",
  Left: "ArrowLeft",
  PageDown: "PageDown",
  PageUp: "PageUp",
  Right: "ArrowRight",
  Space: " ",
  Tab: "Tab",
  Up: "ArrowUp",
};

const MenuActions = {
  Close: 0,
  CloseSelect: 1,
  First: 2,
  Last: 3,
  Next: 4,
  Open: 5,
  Previous: 6,
  Select: 7,
  Space: 8,
  Type: 9,
};

// filter an array of options against an input string
// returns an array of options that begin with the filter string, case-independent
function filterOptions(options = [], filter, exclude = []) {
  return options.filter((option) => {
    const matches = option.toLowerCase().indexOf(filter.toLowerCase()) === 0;
    return matches && exclude.indexOf(option) < 0;
  });
}

// return an array of exact option name matches from a comma-separated string
function findMatches(options, search) {
  const names = search.split(",");
  return names
    .map((name) => {
      const match = options.filter(
        (option) => name.trim().toLowerCase() === option.toLowerCase()
      );
      return match.length > 0 ? match[0] : null;
    })
    .filter((option) => option !== null);
}

// return combobox action from key press
function getActionFromKey(event, menuOpen) {
  const { key, altKey, ctrlKey, metaKey } = event;
  // handle opening when closed
  if (
    !menuOpen &&
    (key === Keys.Down || key === Keys.Enter || key === Keys.Space)
  ) {
    return MenuActions.Open;
  }

  // handle keys when open
  if (key === Keys.Down) {
    return MenuActions.Next;
  } else if (key === Keys.Up) {
    return MenuActions.Previous;
  } else if (key === Keys.Home) {
    return MenuActions.First;
  } else if (key === Keys.End) {
    return MenuActions.Last;
  } else if (key === Keys.Escape) {
    return MenuActions.Close;
  } else if (key === Keys.Enter) {
    return MenuActions.CloseSelect;
  } else if (key === Keys.Space) {
    return MenuActions.Space;
  } else if (
    key === Keys.Backspace ||
    key === Keys.Clear ||
    (key.length === 1 && !altKey && !ctrlKey && !metaKey)
  ) {
    return MenuActions.Type;
  }
}

// get index of option that matches a string
// if the filter is multiple iterations of the same letter (e.g "aaa"),
// then return the nth match of the single letter
function getIndexByLetter(options, filter) {
  const firstMatch = filterOptions(options, filter)[0];
  const allSameLetter = (array) => array.every((letter) => letter === array[0]);
  console.log("testing string", filter);

  if (firstMatch) {
    return options.indexOf(firstMatch);
  } else if (allSameLetter(filter.split(""))) {
    const matches = filterOptions(options, filter[0]);
    const matchIndex = (filter.length - 1) % matches.length;
    return options.indexOf(matches[matchIndex]);
  } else {
    return -1;
  }
}

// get updated option index
function getUpdatedIndex(current, max, action) {
  switch (action) {
    case MenuActions.First:
      return 0;
    case MenuActions.Last:
      return max;
    case MenuActions.Previous:
      return Math.max(0, current - 1);
    case MenuActions.Next:
      return Math.min(max, current + 1);
    default:
      return current;
  }
}

// check if an element is currently scrollable
function isScrollable(element) {
  return element && element.clientHeight < element.scrollHeight;
}

// ensure given child element is within the parent's visible scroll area
function maintainScrollVisibility(activeElement, scrollParent) {
  const { offsetHeight, offsetTop } = activeElement;
  const { offsetHeight: parentOffsetHeight, scrollTop } = scrollParent;

  const isAbove = offsetTop < scrollTop;
  const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;

  if (isAbove) {
    scrollParent.scrollTo(0, offsetTop);
  } else if (isBelow) {
    scrollParent.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight);
  }
}

/*
 * Editable Combobox code
 */
const Combobox = function (el, options) {
  // element refs
  this.el = el;
  this.inputEl = el.querySelector("input");
  this.listboxEl = el.querySelector("[role=listbox]");

  // data
  this.idBase = this.inputEl.id;
  this.options = options;

  // state
  this.activeIndex = 0;
  this.open = false;
};

Combobox.prototype.init = function () {
  this.inputEl.value = options[0];

  this.inputEl.addEventListener("input", this.onInput.bind(this));
  this.inputEl.addEventListener("blur", this.onInputBlur.bind(this));
  this.inputEl.addEventListener("click", () => this.updateMenuState(true));
  this.inputEl.addEventListener("keydown", this.onInputKeyDown.bind(this));

  this.options.map((option, index) => {
    const optionEl = document.createElement("div");
    optionEl.setAttribute("role", "option");
    optionEl.id = `${this.idBase}-${index}`;
    optionEl.className =
      index === 0 ? "combo-option option-current" : "combo-option";
    optionEl.setAttribute("aria-selected", `${index === 0}`);
    optionEl.innerText = option;

    optionEl.addEventListener("click", () => {
      this.onOptionClick(index);
    });
    optionEl.addEventListener("mousedown", this.onOptionMouseDown.bind(this));

    this.listboxEl.appendChild(optionEl);
  });
};

Combobox.prototype.onInput = function () {
  const curValue = this.inputEl.value;
  const matches = filterOptions(this.options, curValue);

  // set activeIndex to first matching option
  // (or leave it alone, if the active option is already in the matching set)
  const filterCurrentOption = matches.filter(
    (option) => option === this.options[this.activeIndex]
  );
  if (matches.length > 0 && !filterCurrentOption.length) {
    this.onOptionChange(this.options.indexOf(matches[0]));
  }

  const menuState = this.options.length > 0;
  if (this.open !== menuState) {
    this.updateMenuState(menuState, false);
  }
};

Combobox.prototype.onInputKeyDown = function (event) {
  const max = this.options.length - 1;

  const action = getActionFromKey(event, this.open);

  switch (action) {
    case MenuActions.Next:
    case MenuActions.Last:
    case MenuActions.First:
    case MenuActions.Previous:
      event.preventDefault();
      return this.onOptionChange(
        getUpdatedIndex(this.activeIndex, max, action)
      );
    case MenuActions.CloseSelect:
      event.preventDefault();
      this.selectOption(this.activeIndex);
      return this.updateMenuState(false);
    case MenuActions.Close:
      event.preventDefault();
      return this.updateMenuState(false);
    case MenuActions.Open:
      return this.updateMenuState(true);
  }
};

Combobox.prototype.onInputBlur = function () {
  if (this.ignoreBlur) {
    this.ignoreBlur = false;
    return;
  }

  if (this.open) {
    this.selectOption(this.activeIndex);
    this.updateMenuState(false, false);
  }
};

Combobox.prototype.onOptionChange = function (index) {
  this.activeIndex = index;
  this.inputEl.setAttribute("aria-activedescendant", `${this.idBase}-${index}`);

  // update active style
  const options = this.el.querySelectorAll("[role=option]");
  [...options].forEach((optionEl) => {
    optionEl.classList.remove("option-current");
  });
  options[index].classList.add("option-current");

  if (this.open && isScrollable(this.listboxEl)) {
    maintainScrollVisibility(options[index], this.listboxEl);
  }
};

Combobox.prototype.onOptionClick = function (index) {
  this.onOptionChange(index);
  this.selectOption(index);
  this.updateMenuState(false);
};

Combobox.prototype.onOptionMouseDown = function () {
  this.ignoreBlur = true;
};

Combobox.prototype.selectOption = function (index) {
  const selected = this.options[index];
  this.inputEl.value = selected;
  this.activeIndex = index;

  // update aria-selected
  const options = this.el.querySelectorAll("[role=option]");
  [...options].forEach((optionEl) => {
    optionEl.setAttribute("aria-selected", "false");
  });
  options[index].setAttribute("aria-selected", "true");
};

Combobox.prototype.updateMenuState = function (open, callFocus = true) {
  this.open = open;

  this.inputEl.setAttribute("aria-expanded", `${open}`);
  open ? this.el.classList.add("open") : this.el.classList.remove("open");
  callFocus && this.inputEl.focus();
};

// init combo
const comboEl = document.querySelector(".js-combobox");
const options = [
  "Cần Thơ",
  "Vĩnh Long",
  "Hà Nội",
  "TP Hồ Chí Minh",
  "Cà Mau",
  "Bạc Liêu",
  "Đà Lạt",
  "Vũng Tàu",
  "Kiêng Giang",
  "Sóc Trăng",
  "Đồng Tháp",
];
const comboComponent = new Combobox(comboEl, options);
comboComponent.init();
