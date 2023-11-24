const appCalculatorAge = {
  dayInput: document.querySelector(".app__day-input"),
  monthInput: document.querySelector(".app__month-input"),
  yearInput: document.querySelector(".app__year-input"),
  dayLabel: document.querySelector(".app__day-label"),
  monthLabel: document.querySelector(".app__month-label"),
  yearLabel: document.querySelector(".app__year-label"),
  dayResult: document.querySelector(".app__calculated-day"),
  monthResult: document.querySelector(".app__calculated-month"),
  yearResult: document.querySelector(".app__calculated-year"),
  errorSelectors: document.querySelectorAll(".errorSelector"),
  submit: document.querySelector("button"),

  currentDay: new Date().getDate(),
  currentMonth: new Date().getMonth() + 1,
  currentYear: new Date().getFullYear(),
  typeOfError: [
    "The field is required",
    "Must be a valid day",
    "Must be a valid month",
    "Must be a valid year",
    "Must be a valid date",
    "Must be in the past",
  ],

  calculateDate() {
    let dayStorage = 0;
    let monthStorage = 0;
    let yearStorage = Math.abs(this.currentYear - this.yearInput.value);

    if (this.currentMonth >= this.monthInput.value) {
      monthStorage = this.currentMonth - this.monthInput.value;
    } else {
      yearStorage--;
      monthStorage = 12 + this.currentMonth - this.monthInput.value;
    }

    if (this.currentDay >= this.dayInput.value) {
      dayStorage = this.currentDay - this.dayInput.value;
    } else {
      monthStorage--;
      if ((this.dayInput.value, this.monthInput.value, this.yearInput.value)) {
        dayStorage = 30 + this.currentDay - this.dayInput.value;
      }
      if (monthStorage < 0) {
        monthStorage = 11;
        yearStorage--;
      }
    }

    this.dayResult.innerHTML = dayStorage;
    this.monthResult.innerHTML = monthStorage;
    this.yearResult.innerHTML = yearStorage;
  },

  isDayCorrect() {
    if (this.dayInput.value === "") {
      this.errorState(
        this.dayInput,
        this.errorSelectors[0],
        this.typeOfError[0],
        this.dayLabel
      );
      return false;
    } else if (this.dayInput.value <= 0 || this.dayInput.value > 31) {
      this.errorState(
        this.dayInput,
        this.errorSelectors[0],
        this.typeOfError[1],
        this.dayLabel
      );
      return false;
    } else {
      this.clearError(this.dayInput, this.errorSelectors[0], this.dayLabel);
      return true;
    }
  },

  isMonthCorrect() {
    if (this.monthInput.value === "") {
      this.errorState(
        this.monthInput,
        this.errorSelectors[1],
        this.typeOfError[0],
        this.monthLabel
      );
      return false;
    } else if (this.monthInput.value <= 0 || this.monthInput.value > 12) {
      this.errorState(
        this.monthInput,
        this.errorSelectors[1],
        this.typeOfError[2],
        this.monthLabel
      );
      return false;
    } else {
      this.clearError(this.monthInput, this.errorSelectors[1], this.monthLabel);
      return true;
    }
  },

  isYearCorrect() {
    if (this.yearInput.value === "") {
      this.errorState(
        this.yearInput,
        this.errorSelectors[2],
        this.typeOfError[0],
        this.yearLabel
      );
      return false;
    } else if (this.yearInput.value > this.currentYear) {
      this.errorState(
        this.yearInput,
        this.errorSelectors[2],
        this.typeOfError[3],
        this.yearLabel
      );
      return false;
    } else if (this.yearInput.value == this.currentYear) {
      this.errorState(
        this.yearInput,
        this.errorSelectors[2],
        this.typeOfError[3],
        this.yearLabel
      );
      return false;
    } else {
      this.clearError(this.yearInput, this.errorSelectors[2], this.yearLabel);
      return true;
    }
  },

  errorState(input, errorSelector, errorMessage, label) {
    errorSelector.innerHTML = errorMessage;
    errorSelector.classList.remove("hidden");
    input.classList.add("error-input");
    label.classList.add("error-label");
  },

  clearError(input, errorSelector, label) {
    errorSelector.classList.add("hidden");
    input.classList.remove("error-input");
    label.classList.remove("error-label");
  },
};

appCalculatorAge.submit.addEventListener("click", () => {
  const isDayValid = appCalculatorAge.isDayCorrect();
  const isMonthValid = appCalculatorAge.isMonthCorrect();
  const isYearValid = appCalculatorAge.isYearCorrect();

  if (isDayValid && isMonthValid && isYearValid) {
    appCalculatorAge.calculateDate();
  }
});
