var i = 0;

const menuBar = document.querySelector(".content nav .bx.bx-menu");
const sideBar = document.querySelector(".sidebarD");

window.onload = () => {
  if (window.innerWidth < 1000) {
    sideBar.classList.add("closeD");
  } else {
    sideBar.classList.remove("closeD");
  }
};

const sideLinks = document.querySelectorAll(
  ".sidebarD .side-menu li a:not(.logout):not(.clickSetting)"
);

sideLinks.forEach((item) => {
  const li = item.parentElement;
  item.addEventListener("click", () => {
    sideLinks.forEach((i) => {
      i.parentElement.classList.remove("active");
    });
    li.classList.add("active");
  });
});

menuBar.addEventListener("click", () => {
  sideBar.classList.toggle("closeD");
});

window.addEventListener("resize", () => {
  if (window.innerWidth < 1000) {
    sideBar.classList.add("closeD");
  } else {
    sideBar.classList.remove("closeD");
  }
});

const toggler = document.getElementById("theme-toggle");

toggler.addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});

function openNav() {
  i++;
  document.getElementById("mySidenav").style.width = "270px";
  if (i > 1) {
    closeNav();
    i = 0;
  }
}

function closeNav() {
  i = 0;
  document.getElementById("mySidenav").style.width = "0px";
}

const mainColorLink = document.querySelectorAll(".choosemain div div");

mainColorLink.forEach((item) => {
  const li = item;
  item.addEventListener("click", () => {
    mainColorLink.forEach((i) => {
      i.classList.remove("border-active");
    });
    li.classList.add("border-active");
  });
});

const mainColor = ["pink", "blue", "green", "orange", "cyan"];

function setMainColor(value) {
  mainColor.forEach((item) => {
    if (!item.match(value)) {
      document.body.classList.remove(item);
    }
  });
  document.body.classList.add(value);
}

const iconProfile = document.getElementById("tab-profile");
const imgThumbProfile = document.getElementById("img-thumb-profile");

function openProfile() {
  if (iconProfile.classList.contains("hidden")) {
    iconProfile.classList.remove("hidden");
    imgThumbProfile.classList.remove("col-lg-7");
    imgThumbProfile.classList.add("col-lg-10");
    imgThumbProfile.classList.add("offset-lg-1");
    setTimeout(() => {
      iconProfile.style.opacity = "1";
    }, 0);
  } else {
    iconProfile.style.opacity = "0";
    setTimeout(() => {
      iconProfile.classList.add("hidden");
      imgThumbProfile.classList.remove("col-lg-10");
      imgThumbProfile.classList.remove("offset-lg-1");
      imgThumbProfile.classList.add("col-lg-7");
    }, 300);
  }
}

const pagipostreport = document.getElementById("pagi-post-report");
const tablepostreport = document.getElementById("table-post-report");

function openTable() {
  if (tablepostreport.classList.contains("hidden")) {
    tablepostreport.classList.remove("hidden");
    pagipostreport.classList.add("hidden");
  } else {
    pagipostreport.classList.remove("hidden");
    tablepostreport.classList.add("hidden");
  }
}
