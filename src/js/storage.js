const storageOption = document.getElementById("option");
const loadStorageOption = () => {
  storageOption.classList.add("option--open");
};

const closeStorageOption = () => {
  storageOption.classList.remove("option--open");
};

const loadStorage = () => {
  // Credit : https://stackoverflow.com/questions/4391575/how-to-find-the-size-of-localstorage
  let _lsTotal = 0,
    _xLen,
    _x;
  for (_x in localStorage) {
    if (!localStorage.hasOwnProperty(_x)) {
      continue;
    }
    _xLen = (localStorage[_x].length + _x.length) * 2;
    _lsTotal += _xLen;
  }

  const spans = document.querySelectorAll(".storage__size");
  for (let i = 0; i < spans.length; i++) {
    spans[i].textContent = (_lsTotal / 1024).toFixed(2) + " KB";
  }
};
