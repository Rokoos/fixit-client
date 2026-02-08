export const logout = () => localStorage.removeItem("fixerTkn");

export const getToken = () => {
  // return JSON.parse(localStorage.getItem("fixerTkn"));
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTViNTEwYmM3MzBjZWJjYzU4Nzg2NmUiLCJpYXQiOjE3NzA1MzM0OTh9.mzoxToDDZ1ThDbtSwQQvhMti5dMeVLbVqoLAaWfQ5ZI";
};
export const menuStyles = (route, id, userId) => {
  if (route === "profile" && id === userId) {
    return "border-coral-red bg-white text-coral-red";
  } else if (route === "nannys") {
    return "border-coral-red bg-white text-coral-red";
  } else {
    return "border-white bg-coral-red text-white ";
  }
};

export const phoneFormat = (phone) => {
  // let str = phone.split("");
  const str = phone.match(/.{1,3}/g).join(" ");
  // console.log(joy.join(' '));

  return str;
};

export const charNumber = (comment, length) => length - comment.length;
export const getCategory = (num) => {
  if (num === "1") {
    return "naprawa";
  } else if (num === "2") {
    return "inna usługa";
  }
};

export const getSubCategory = (num) => {
  if (num === "1") {
    return "auta";
  } else if (num === "2") {
    return "agd";
  } else if (num === "3") {
    return "rtv";
  } else if (num === "4") {
    return "komputera/laptopa";
  } else if (num === "5") {
    return "innego sprzętu";
  }
};

export const sortCarMakes = (arr) =>
  arr.sort((a, b) => {
    if (a.brand < b.brand) {
      return -1;
    }
    if (a.brand > b.brand) {
      return 1;
    }
    return 0;
  });

export const getCarModels = (make, arr) => {
  if (make !== "Wybierz" || make !== "") {
    let car = arr.find(({ brand }) => brand === make);
    return car.models;
  } else {
    return;
  }
};

export const getYear = () => {
  let num = 1980;
  let newNum = [];

  for (let i = num; i <= 2025; i++) {
    newNum.push(i);
  }
  return newNum;
};

export const checkProposalsIds = (proposals, id) =>
  proposals.some((e) => e.addedBy._id === id);

export const getFilteredProposal = (proposal, id) =>
  proposal.filter((el) => el.addedBy._id === id);
