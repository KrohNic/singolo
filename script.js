class NavMenu {
  constructor() {
    this.HEADER = document.querySelector("HEADER");
    this.ARTICLES = document.querySelectorAll("ARTICLE");
    this.MENU = document.querySelector(".nav");
    this.NAV_ITEMS_LIST = document.querySelectorAll(".nav_item");
    this.offsetBottomList = [];

    this.ARTICLES.forEach(item => {
      this.offsetBottomList.push(item.offsetTop + item.offsetHeight);
    });

    this.NAV_ITEMS_LIST.forEach((navItem, i) => {
      navItem.addEventListener("click", e => this.highlightNavByClick(i));
    });

    window.addEventListener("scroll", e => this.highlightNavByScroll(e));
  }

  deactivateNavItems() {
    this.NAV_ITEMS_LIST.forEach(element => {
      element.classList.remove("nav_item--current");
    });
  }

  highlightNavByClick(i) {
    if (event.target.tagName !== "LI") return;
    if (event.target.classList.contains("nav_item--current")) return;

    const marginScroll = this.ARTICLES[i].offsetTop - this.HEADER.offsetHeight;

    window.scroll(window.scrollX, marginScroll);
  }

  isOnScreenMiddle(blockIndex) {
    const screenMiddleOffsetY = window.innerHeight / 2 + window.scrollY;
    return screenMiddleOffsetY < this.offsetBottomList[blockIndex];
  }

  highlightNavByScroll(event) {
    for (let i = 0; i < this.offsetBottomList.length; ++i) {
      if (this.isOnScreenMiddle(i)) {
        this.deactivateNavItems();

        this.NAV_ITEMS_LIST[i].classList.add("nav_item--current");
        break;
      }
    }
  }
}

class Slider {
  constructor() {
    this.SLIDER_LEFT = document.querySelector(".slider-controls-left");
    this.SLIDER_RIGHT = document.querySelector(".slider-controls-right");
    this.SLIDES_LIST = document.querySelector(".slider--content").children;

    this.isSliderRunning = false;
    this.curIndex = 0;

    for (let i = 0; i < this.SLIDES_LIST.length; ++i)
      if (!this.SLIDES_LIST[i].classList.contains("slide--hidden")) {
        this.curIndex = i;
        break;
      }

    this.SLIDER_LEFT.addEventListener("click", () => this.nextSlide(false));
    this.SLIDER_RIGHT.addEventListener("click", () => this.nextSlide(true));

    for (let i = 0; i < this.SLIDES_LIST.length; ++i)
      this.SLIDES_LIST[i].addEventListener("animationend", () =>
        this.animationEndListener(i)
      );

    document.querySelectorAll(".phone--button").forEach(phoneBtn => {
      phoneBtn.addEventListener("click", event => {
        event.target.previousElementSibling.classList.toggle(
          "phone--screen-off"
        );
      });
    });
  }

  animationEndListener(i) {
    this.SLIDES_LIST[i].classList.remove("from_right");
    this.SLIDES_LIST[i].classList.remove("to_left");
    this.SLIDES_LIST[i].classList.remove("from_left");
    this.SLIDES_LIST[i].classList.remove("to_right");

    if (this.curIndex !== i) this.SLIDES_LIST[i].classList.add("slide--hidden");

    this.isSliderRunning = false;
  }

  nextSlide(rightDirection) {
    if (this.isSliderRunning) return;

    this.isSliderRunning = true;

    let nextIndex;

    if (rightDirection) {
      nextIndex = (this.curIndex + 1) % this.SLIDES_LIST.length;

      this.SLIDES_LIST[nextIndex].classList.remove("slide--hidden");
      this.SLIDES_LIST[nextIndex].classList.add("from_right");
      this.SLIDES_LIST[this.curIndex].classList.add("to_left");
    } else {
      nextIndex =
        (this.SLIDES_LIST.length + this.curIndex - 1) % this.SLIDES_LIST.length;

      this.SLIDES_LIST[nextIndex].classList.remove("slide--hidden");
      this.SLIDES_LIST[nextIndex].classList.add("from_left");
      this.SLIDES_LIST[this.curIndex].classList.add("to_right");
    }

    this.SLIDES_LIST[this.curIndex].classList.add("slide--hidden");
    this.curIndex = nextIndex;
  }
}

class Portfolio {
  constructor() {
    this.IMAGES = document.querySelector(".images");
    this.MENU = document.querySelector(".portfolio--nav_ul");
    this.MENU_ITEMS_LIST = document.querySelector(
      ".portfolio--nav_ul"
    ).children;

    for (let i = 0; i < this.MENU_ITEMS_LIST.length; ++i) {
      this.MENU_ITEMS_LIST[i].addEventListener("click", e =>
        this.navClickListener(this.MENU_ITEMS_LIST[i], i)
      );
    }

    this.IMAGES.addEventListener("click", event => {
      this.selectImage(event.target);
    });
  }

  selectImage(elem) {
    if (!elem.classList.contains("images--item")) return;

    for (let i = 0; i < this.IMAGES.children.length; ++i) {
      this.IMAGES.children[i].classList.remove("images--item-selected");
    }

    elem.classList.add("images--item-selected");
  }

  navClickListener(navItem, index) {
    if (navItem.classList.contains("portfolio--nav_li-active")) return;

    this.deactivateMenuItems();

    navItem.classList.add("portfolio--nav_li-active");
    navItem.classList.remove("portfolio--nav_li");

    this.shuffleImages(index);
  }

  deactivateMenuItems() {
    for (let i = 0; i < this.MENU_ITEMS_LIST.length; ++i) {
      this.MENU_ITEMS_LIST[i].classList.remove("portfolio--nav_li-active");
      this.MENU_ITEMS_LIST[i].classList.add("portfolio--nav_li");
    }
  }

  shuffleImages(index) {
    for (let i = 0; i < this.IMAGES.children.length; ++i) {
      this.IMAGES.append(
        this.IMAGES.children[(i + index) % this.IMAGES.children.length]
      );
    }
  }
}

class Contact {
  constructor() {
    this.FORM = document.querySelector(".getaquote--form");

    this.FORM.addEventListener("submit", e => this.formSubmit(event));
  }

  formSubmit(event) {
    event.preventDefault();

    let subject = this.FORM.querySelector("#subject").value;

    if (subject.length) subject = `Subject: ${subject}`;
    else subject = "No subject";

    let descr = this.FORM.querySelector("#description").value;

    if (descr.length) descr = `Description: ${descr}`;
    else descr = "No description";

    this.makeModalWindow("The letter was sent", subject, descr);

    return false;
  }

  makeModalWindow(title, ...rest) {
    const bg = document.createElement("DIV");
    bg.classList.add("modal--background");

    const modalWindow = document.createElement("DIV");
    modalWindow.classList.add("modal");

    const closeBtn = document.createElement("BUTTON");
    closeBtn.classList.add("modal--close_btn");
    closeBtn.innerText = "OK";
    closeBtn.addEventListener("click", () => {
      this.FORM.reset();
      document.querySelector(".modal--background").remove();
    });

    const titleElem = document.createElement("H3");
    titleElem.classList.add("modal--title");
    titleElem.innerText = title;

    bg.appendChild(modalWindow);
    modalWindow.appendChild(titleElem);

    rest.forEach(item => {
      const temp = document.createElement("div");
      temp.classList.add("modal--text");
      temp.innerText = item;
      modalWindow.appendChild(temp);
    });

    modalWindow.appendChild(closeBtn);
    document.body.appendChild(bg);
  }
}

new NavMenu();
new Slider();
new Portfolio();
new Contact();

document.querySelector(".nav--burger").addEventListener("click", event => {
  document.querySelector(".nav--burger").classList.toggle("nav--burger-active");
  document.querySelector(".nav--logo").classList.toggle("display_block");
  document.querySelector(".nav").classList.toggle("display_block");
});
