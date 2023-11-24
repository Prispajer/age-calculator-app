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
    let yearDifference = this.currentYear - this.yearInput.value;
    let monthDifference = this.currentMonth - this.monthInput.value;
    let dayDifference = this.currentDay - this.dayInput.value;

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      yearDifference--;
      monthDifference += 12;
    }

    if (dayDifference < 0) {
      const daysInLastMonth = 30;
      dayDifference += daysInLastMonth;
      monthDifference--;
    }

    this.dayResult.innerHTML = dayDifference;
    this.monthResult.innerHTML = monthDifference;
    this.yearResult.innerHTML = yearDifference;
  },

  isDayCorrect() {
    const dayValue = this.dayInput.value;
    if (dayValue === "" || dayValue <= 0 || dayValue > 31) {
      this.errorState(
        this.dayInput,
        this.errorSelectors[0],
        dayValue === "" ? this.typeOfError[0] : this.typeOfError[1],
        this.dayLabel
      );
      return false;
    }

    this.clearError(this.dayInput, this.errorSelectors[0], this.dayLabel);
    return true;
  },

  isMonthCorrect() {
    const monthValue = this.monthInput.value;
    if (monthValue === "" || monthValue <= 0 || monthValue > 12) {
      this.errorState(
        this.monthInput,
        this.errorSelectors[1],
        monthValue === "" ? this.typeOfError[0] : this.typeOfError[2],
        this.monthLabel
      );
      return false;
    }

    this.clearError(this.monthInput, this.errorSelectors[1], this.monthLabel);
    return true;
  },

  isYearCorrect() {
    const yearValue = this.yearInput.value;
    if (
      yearValue === "" ||
      yearValue > this.currentYear ||
      yearValue == this.currentYear
    ) {
      this.errorState(
        this.yearInput,
        this.errorSelectors[2],
        yearValue === "" ? this.typeOfError[0] : this.typeOfError[3],
        this.yearLabel
      );
      return false;
    }

    this.clearError(this.yearInput, this.errorSelectors[2], this.yearLabel);
    return true;
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
