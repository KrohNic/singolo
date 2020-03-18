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

document.querySelectorAll(".phone--button").forEach(phoneBtn => {
  phoneBtn.addEventListener("click", event => {
    event.target.previousElementSibling.classList.toggle("phone--screen-off");
  });
});

new NavMenu();
