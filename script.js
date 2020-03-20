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

    console.log("slide", this);

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

document.querySelectorAll(".phone--button").forEach(phoneBtn => {
  phoneBtn.addEventListener("click", event => {
    event.target.previousElementSibling.classList.toggle("phone--screen-off");
  });
});

new NavMenu();
new Slider();
