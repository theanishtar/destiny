/*
 * Helper constants and functions
 */

// make it easier for ourselves by putting some values in objects
// in TypeScript, these would be enums
const KeysG = {
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

const MenuActionsG = {
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

// filter an array of optionsG against an input string
// returns an array of optionsG that begin with the filter string, case-independent
function filterOptions(optionsG = [], filter, exclude = []) {
  return optionsG.filter((option) => {
    const matches = option.toLowerCase().indexOf(filter.toLowerCase()) === 0;
    return matches && exclude.indexOf(option) < 0;
  });
}

// return an array of exact option name matches from a comma-separated string
function findMatches(optionsG, search) {
  const names = search.split(",");
  return names
    .map((name) => {
      const match = optionsG.filter(
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
    (key === KeysG.Down || key === KeysG.Enter || key === KeysG.Space)
  ) {
    return MenuActionsG.Open;
  }

  // handle keys when open
  if (key === KeysG.Down) {
    return MenuActionsG.Next;
  } else if (key === KeysG.Up) {
    return MenuActionsG.Previous;
  } else if (key === KeysG.Home) {
    return MenuActionsG.First;
  } else if (key === KeysG.End) {
    return MenuActionsG.Last;
  } else if (key === KeysG.Escape) {
    return MenuActionsG.Close;
  } else if (key === KeysG.Enter) {
    return MenuActionsG.CloseSelect;
  } else if (key === KeysG.Space) {
    return MenuActionsG.Space;
  } else if (
    key === KeysG.Backspace ||
    key === KeysG.Clear ||
    (key.length === 1 && !altKey && !ctrlKey && !metaKey)
  ) {
    return MenuActionsG.Type;
  }
}

// get index of option that matches a string
// if the filter is multiple iterations of the same letter (e.g "aaa"),
// then return the nth match of the single letter
function getIndexByLetter(optionsG, filter) {
  const firstMatch = filterOptions(optionsG, filter)[0];
  const allSameLetter = (array) => array.every((letter) => letter === array[0]);
  console.log("testing string", filter);

  if (firstMatch) {
    return optionsG.indexOf(firstMatch);
  } else if (allSameLetter(filter.split(""))) {
    const matches = filterOptions(optionsG, filter[0]);
    const matchIndex = (filter.length - 1) % matches.length;
    return optionsG.indexOf(matches[matchIndex]);
  } else {
    return -1;
  }
}

// get updated option index
function getUpdatedIndex(current, max, action) {
  switch (action) {
    case MenuActionsG.First:
      return 0;
    case MenuActionsG.Last:
      return max;
    case MenuActionsG.Previous:
      return Math.max(0, current - 1);
    case MenuActionsG.Next:
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
 * Editable ComboboxG code
 */
const ComboboxG = function (el, optionsG) {
  // element refs
  this.el = el;
  this.inputEl = el.querySelector("input");
  this.listboxEl = el.querySelector("[role=listboxG]");

  // data
  this.idBase = this.inputEl.id;
  this.optionsG = optionsG;

  // state
  this.activeIndex = 0;
  this.open = false;
};

ComboboxG.prototype.init = function () {
  this.inputEl.value = optionsG[0];

  this.inputEl.addEventListener("input", this.onInput.bind(this));
  this.inputEl.addEventListener("blur", this.onInputBlur.bind(this));
  this.inputEl.addEventListener("click", () => this.updateMenuState(true));
  this.inputEl.addEventListener("keydown", this.onInputKeyDown.bind(this));

  this.optionsG.map((option, index) => {
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

ComboboxG.prototype.onInput = function () {
  const curValue = this.inputEl.value;
  const matches = filterOptions(this.optionsG, curValue);

  // set activeIndex to first matching option
  // (or leave it alone, if the active option is already in the matching set)
  const filterCurrentOption = matches.filter(
    (option) => option === this.optionsG[this.activeIndex]
  );
  if (matches.length > 0 && !filterCurrentOption.length) {
    this.onOptionChange(this.optionsG.indexOf(matches[0]));
  }

  const menuState = this.optionsG.length > 0;
  if (this.open !== menuState) {
    this.updateMenuState(menuState, false);
  }
};

ComboboxG.prototype.onInputKeyDown = function (event) {
  const max = this.optionsG.length - 1;

  const action = getActionFromKey(event, this.open);

  switch (action) {
    case MenuActionsG.Next:
    case MenuActionsG.Last:
    case MenuActionsG.First:
    case MenuActionsG.Previous:
      event.preventDefault();
      return this.onOptionChange(
        getUpdatedIndex(this.activeIndex, max, action)
      );
    case MenuActionsG.CloseSelect:
      event.preventDefault();
      this.selectOption(this.activeIndex);
      return this.updateMenuState(false);
    case MenuActionsG.Close:
      event.preventDefault();
      return this.updateMenuState(false);
    case MenuActionsG.Open:
      return this.updateMenuState(true);
  }
};

ComboboxG.prototype.onInputBlur = function () {
  if (this.ignoreBlur) {
    this.ignoreBlur = false;
    return;
  }

  if (this.open) {
    this.selectOption(this.activeIndex);
    this.updateMenuState(false, false);
  }
};

ComboboxG.prototype.onOptionChange = function (index) {
  this.activeIndex = index;
  this.inputEl.setAttribute("aria-activedescendant", `${this.idBase}-${index}`);

  // update active style
  const optionsG = this.el.querySelectorAll("[role=option]");
  [...optionsG].forEach((optionEl) => {
    optionEl.classList.remove("option-current");
  });
  optionsG[index].classList.add("option-current");

  if (this.open && isScrollable(this.listboxEl)) {
    maintainScrollVisibility(optionsG[index], this.listboxEl);
  }
};

ComboboxG.prototype.onOptionClick = function (index) {
  this.onOptionChange(index);
  this.selectOption(index);
  this.updateMenuState(false);
};

ComboboxG.prototype.onOptionMouseDown = function () {
  this.ignoreBlur = true;
};

ComboboxG.prototype.selectOption = function (index) {
  const selected = this.optionsG[index];
  this.inputEl.value = selected;
  this.activeIndex = index;

  // update aria-selected
  const optionsG = this.el.querySelectorAll("[role=option]");
  [...optionsG].forEach((optionEl) => {
    optionEl.setAttribute("aria-selected", "false");
  });
  optionsG[index].setAttribute("aria-selected", "true");
};

ComboboxG.prototype.updateMenuState = function (open, callFocus = true) {
  this.open = open;

  this.inputEl.setAttribute("aria-expanded", `${open}`);
  open ? this.el.classList.add("open") : this.el.classList.remove("open");
  callFocus && this.inputEl.focus();
};

// init combo
const comboElG = document.querySelector(".js-comboboxG");
const optionsG = ["Nam", "Nữ", "Khác"];
const comboComponentG = new ComboboxG(comboElG, optionsG);
comboComponentG.init();
