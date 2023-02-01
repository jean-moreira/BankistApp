const account1 = {
  owner: "Jean Moreira",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],

  pin: 1111,

  movementsDates: [
    "2022-11-18T21:31:17.178Z",
    "2022-12-23T07:42:02.383Z",
    "2022-01-28T09:15:04.904Z",
    "2022-04-01T10:17:24.185Z",
    "2022-05-08T14:11:59.604Z",
    "2022-07-26T17:01:17.194Z",
    "2022-07-28T23:36:17.929Z",
    "2022-08-01T10:51:36.790Z",
  ],
};

const account2 = {
  owner: "Rachel Bryckaert",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],

  pin: 2222,

  movementsDates: [
    "2022-11-01T13:15:33.035Z",
    "2022-11-30T09:48:16.867Z",
    "2022-12-25T06:04:23.907Z",
    "2022-01-25T14:18:46.235Z",
    "2022-02-05T16:33:06.386Z",
    "2022-04-10T14:43:26.374Z",
    "2022-06-25T18:49:59.371Z",
    "2022-07-26T12:01:20.894Z",
  ],
};

const account3 = {
  owner: "Gabriel Moreira",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],

  pin: 3333,

  movementsDates: [
    "2022-11-01T13:15:33.035Z",
    "2022-11-30T09:48:16.867Z",
    "2022-12-25T06:04:23.907Z",
    "2022-01-25T14:18:46.235Z",
    "2022-02-05T16:33:06.386Z",
    "2022-04-10T14:43:26.374Z",
    "2022-06-25T18:49:59.371Z",
    "2022-07-26T12:01:20.894Z",
  ],
};

const accounts = [account1, account2, account3];

console.log(accounts);
// create the user ID for loggin

const createUserName = function (accountArray) {
  accountArray.forEach((account) => {
    account.id = account.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

createUserName(accounts);

// welcome message function

const welcomeMessage = document.querySelector(".welcome");

const welcomeUser = function (account) {
  welcomeMessage.textContent = `Welcomme ${account.owner}`;
};

let currentAccount = "";

// date and hour function :

headerDate = document.querySelector(".headerLeftDate");

const getAndDisplayDate = function () {
  const now = new Date();
  const yearDigit = now.getFullYear();
  const monthDigit = now.getMonth() + 1;
  const dayDigit = now.getDate();
  const hourDigit = now.getHours();
  const minDigit = now.getMinutes();

  headerDate.textContent = `As of ${dayDigit
    .toString()
    .padStart(2, 0)}/${monthDigit.toString().padStart(2, 0)}/${yearDigit
    .toString()
    .padStart(2, 0)}, ${hourDigit.toString().padStart(2, 0)}:${minDigit
    .toString()
    .padStart(2, 0)}`;
};

// calculate and display the currentAccount balance:

const headerBalanceSelector = document.querySelector(".headerRightBalance");
const movementRowSelector = document.querySelector(".movementRow");
const inSelector = document.querySelector(".inSpan");
const outSelector = document.querySelector(".outSpan");

const calBalance = function (account) {
  const balance = account.movements.reduce((accu, current) => accu + current);

  // add only ins
  // const inCalc = account.movements.reduce(function (accu, curr) {
  //   if (curr > 0) {
  //     return Math.trunc(curr + accu);
  //   } else {
  //     return accu + 0;
  //   }
  // });
  const inCalc = Math.trunc(
    account.movements
      .filter((mov) => mov > 0)
      .reduce((accu, curr) => accu + curr)
  );

  const outCalc = Math.trunc(
    account.movements
      .filter((mov) => mov < 0)
      .reduce((accu, curr) => accu + curr)
  );
  // const outCalc = account.movements.reduce(function (accu, curr) {
  //   if (curr < 0) {
  //     return Math.trunc(accu - curr);
  //   } else {
  //     return accu + 0;
  //   }
  // });

  inSelector.textContent = inCalc;

  outSelector.textContent = Math.abs(outCalc);
  headerBalanceSelector.textContent = `${Math.trunc(balance)}€`;
  console.log(outCalc);
};

const displayMovements = function (currentAccount) {
  currentAccount.movements.forEach(function (mov, i) {
    const typeOfMovement = mov > 0 ? "Deposit" : "Withdrawal";

    // link with the date
    const date = new Date(currentAccount.movementsDates[i]);
    const yearDate = date.getFullYear();
    const monthDate = date.getMonth() + 1;
    const dayDate = date.getDate();

    const html = `<div class="row movementRow--${typeOfMovement}--js">
<div class="movementRowLeft">
  <div class="movementType">${typeOfMovement}</div>
  <div class="movementDate">${dayDate.toString().padStart(2, 0)}/${monthDate
      .toString()
      .padStart(2, 0)}/${yearDate.toString().padStart(2, 0)}</div>
</div>
<div class="movementValue">${Math.abs(mov)}€</div>
</div>`;

    movementRowSelector.insertAdjacentHTML("afterbegin", html);
  });
};

// get value from user :

const inputLogin = document.querySelector(".loginId-input");
const inputPassword = document.querySelector(".loginPassword-input");
const btnLogin = document.querySelector(".btnLogin");
const mainSelector = document.querySelector("main");
const headerSelector = document.querySelector("header");
const btnLoan = document.querySelector(".btnLoan");
const loanInput = document.querySelector(".loanInput");
const transferInput = document.querySelector(".transferInputDestinataire");
const transferInputAmout = document.querySelector(".transferInputAmount");
const btnTransfer = document.querySelector(".btnTransfer");
const deleteInput = document.querySelector(".deleteIdInput");
const deletePassword = document.querySelector(".deletePassword");
const btnDelete = document.querySelector(".btnDelete");
// console.log(transferInput, transferInputAmout);

// actualise any changes
const updateAll = function (currentAccount) {
  movementRowSelector.innerHTML = "";

  mainSelector.style.opacity = 0;
  headerSelector.style.opacity = 0;
  // Case where login are good
  welcomeUser(currentAccount);
  // display current date and main header
  getAndDisplayDate();
  // display movements and main
  displayMovements(currentAccount);
  // Account Balance :
  calBalance(currentAccount);
  // reset login input box and make things appear
  inputLogin.value = "";
  inputPassword.value = "";
  mainSelector.style.opacity = 1;
  headerSelector.style.opacity = 1;
};

// CONNECT BTN EVENT

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  const idValue = inputLogin.value;
  const passwordValue = inputPassword.value;

  currentAccount = accounts.find((account) => account.id === idValue);

  if (currentAccount !== undefined && currentAccount.pin == passwordValue) {
    updateAll(currentAccount);
  } else {
    welcomeMessage.textContent = "Password or id not correct";
  }

  //   return currentAccount;
});

// TRANSFER BTN

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const destinataireInput = transferInput.value;
  const amountInput = transferInputAmout.value;

  // vérifie si le destinataire existe
  const destinataireAccount = accounts.find(
    (acc) => acc.id === destinataireInput
  );

  // calculer ses ressources
  const currentAccountAmount = currentAccount.movements.reduce(
    (accu, curr) => accu + curr
  );

  // si il existe et qu'il a l'argent requis
  if (
    destinataireAccount !== undefined &&
    currentAccountAmount >= amountInput
  ) {
    const nowTransfer = new Date().toISOString();

    destinataireAccount.movements.push(+amountInput);
    destinataireAccount.movementsDates.push(nowTransfer);

    currentAccount.movements.push(+`-${amountInput}`);
    currentAccount.movementsDates.push(nowTransfer);
    updateAll(currentAccount);
  } else {
    alert("Make sure the receiver exist and that you have enough money");
  }
  // console.log(destinataire, amount, test);
});
// LOAN BTN EVENT
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  let loanAsked = +loanInput.value;

  const loanOk = currentAccount.movements.some(
    (amount) => amount >= loanAsked * 0.1
  );

  if (loanOk === true) {
    const nowTransfer = new Date().toISOString();
    currentAccount.movements.push(+`${loanAsked}`);
    currentAccount.movementsDates.push(nowTransfer);
    updateAll(currentAccount);
  } else {
    alert("Make sure you got an entry of at least 10% of what you asked for ");
  }
});

btnDelete.addEventListener("click", function (e) {
  e.preventDefault();

  const accountToBeDeleted = deleteInput.value;
  const passwordOfDeleted = deletePassword.value;

  // do we have the account ?

  const haveAccountOrNot = accounts.find((acc) => acc.id == accountToBeDeleted);

  // see if correspond to the currentAccount and check password is ok

  if (
    haveAccountOrNot !== undefined &&
    haveAccountOrNot.id == currentAccount.id &&
    haveAccountOrNot.pin == currentAccount.pin
  ) {
    const findAccountIndex = accounts.findIndex(
      (acc) => acc.id === currentAccount.id
    );
    // splice from the array

    accounts.splice(findAccountIndex, 1);
    welcomeMessage.textContent = "Login to get started";
    mainSelector.style.opacity = 0;
    headerSelector.style.opacity = 0;
  } else {
    alert("please enter correct account and/or correct password");
  }
});
