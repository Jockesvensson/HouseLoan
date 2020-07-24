<template>
<div class="">
  <div class="">
    <div class="house-price-container">
      <div class="">
        Bostadens pris: <input v-model="propertyPrice" class="house-price" type="number" placeholder=""> kr
      </div>
      <div class="">
        Bolån (85% av bostadens pris): {{calculatePropertyLoan}} kr
      </div>
      <div class="">
        Kontantinsats (15% av bostadspris): {{calculatePropertyDownPayment}} kr
      </div>
    </div>
    <div class="personal-finance-container">
      <div class="">
        Fyll i summan av ditt sparande: <input v-model="savings" class="total-saving" type="number" placeholder=""> kr
      </div>
      <div class="">
        <button @click="calulateMissingDownPayment()" class="calculate-btn">Beräkna</button>
      </div>
    </div>
    <div class="economy-container">
      <div v-show="goodEconomy" class="good-economy">
        <div class="">
          Du behöver inget privatlån
        </div>
        <div class="">
          Fyll i räntan på bostadslånet: <input v-model="interestMortgage" class="interest-mortgage" type="number" placeholder=""> %
        </div>
      </div>
      <div v-show="badEconomy" class="bad-economy">
        <div class="">Du har inte tillräckligt med pengar för kontaktinsatsen, vill du ta ett privatlån?</div>
        <button @click="takePersonalLoan()" class="yes-btn">JA</button>
        <button @click="takeHouseLoan()" class="no-btn">NEJ</button>
      </div>
    </div>
    <div v-show="personalLoan" class="personal-loan-container">
      <div class="">
        Fyll i räntan på privatlånet: <input v-model="interestLoan" class="interest-loan" type="number" placeholder=""> %
      </div>
      <div class="">
        Fyll i önskad avbetalningstid: <input v-model="paybackTime" class="payback-time" type="number" placeholder=""> månader
      </div>
      <div class="">
        Fyll i räntan på bostadslånet: <input v-model="interestMortgage" class="interest-mortgage" type="number" placeholder=""> %
      </div>
    </div>
    <div v-show="houseLoan" class="house-loan-container">
      <div class="">
        Fyll i räntan på bostadslånet: <input v-model="interestMortgage" class="interest-mortgage" type="number" placeholder=""> %
      </div>
    </div>
    <div class="operating-cost-container">
      <div class="">
        Fyll i den årliga driftkostnaden: <input v-model="operatingCost" class="operating-cost" type="number" placeholder=""> kr/år
      </div>
    </div>
    Saknad kontantinsats: {{missedMoney.toFixed(2)}} kr <br>
    Amortering Privatlån(kr/månad): {{calulateLoanMonthly.toFixed(2)}} kr<br>
    Räntekostnad för privaltlån före skatteavdrag (kr/månad): {{calculateInterestLoanMonthly.toFixed(2)}} kr<br>
    Ränktekostnad för privatlån efter skatteavdrag (kr/månad): {{calculateInterestLoanMonthlyDeduction.toFixed(2)}} kr<br>
    Totalkostnad privatlån före skatteavdrag (kr/månad): {{calculateSumLoanPreDeduction.toFixed(2)}} kr<br>
    Totalkostnad privatlån efter skatteavdrag (kr/månad): {{calculateSumLoanPostDeduction.toFixed(2)}} kr<br>
    Amortering Bolån(kr/månad): {{calculateMortgageMonthly.toFixed(2)}} kr<br>
    Ränta (kr/månad) före skatteavdrag: {{calculateInterestMortgageMonthly.toFixed(2)}} kr<br>
    Ränta (kr/månad) efter skatteavdrag: {{calculateInterestMortgageMonthlyDeduction.toFixed(2)}} kr<br>
    Totalkostnad bostadslån före skatteavdrag (kr/månad): {{calculateSumMortgagePreDeduction.toFixed(2)}} kr<br>
    Totalkostnad bostadslån efter skatteavdrag (kr/månad): {{calculateSumMortgagePostDeduction.toFixed(2)}} kr<br>
    Driftkostnad för hus (kr/månad): {{calculateOperatingCostMonthly.toFixed(2)}} kr<br>
    Total kostnad före skatteavdrag (kr/månad): {{calculateSumTotalPreDeduction.toFixed(2)}} kr<br>
    Total kostnad efter skatteavdrag (kr/månad): {{calculateSumTotalPostDeduction.toFixed(2)}} kr<br>

  </div>
</template>

// <script>
export default {
    name: 'Home',
    data() {
        return {
          propertyPrice: 0,
          downPayment: 0,
          savings: 0,
          missedMoney: 0,
          goodEconomy: false,
          badEconomy: false,
          interestLoan: 0,
          paybackTime: 0,
          interestMortgage: 0,
          personalLoan: false,
          houseLoan: false,
          interestLoanMonthly: 0,
          operatingCost: 0,
        }
    },
    computed: {
      calculatePropertyLoan() {
        let propertyLoan;
        propertyLoan = this.propertyPrice * 0.85;
        return propertyLoan;
      },
      calculatePropertyDownPayment() {
        let propertyDownPayment;
        propertyDownPayment = this.propertyPrice * 0.15;
        return propertyDownPayment;
      },
      calulateLoanMonthly() {
        let loanMonthly;
        loanMonthly = this.missedMoney / this.paybackTime;
        console.log(loanMonthly);
        return loanMonthly;
      },
      calculateInterestLoanMonthly() {
        let interestLoanMonthly;
        interestLoanMonthly = (this.missedMoney * this.interestLoan / 12) / 100;
        return interestLoanMonthly;
      },
      calculateInterestLoanMonthlyDeduction() {
        let interestLoanMonthlyDeduction;
        interestLoanMonthlyDeduction = this.calculateInterestLoanMonthly * 0.7;
        return interestLoanMonthlyDeduction;
      },
      calculateSumLoanPreDeduction() {
        if (!Number.isNaN(this.calulateLoanMonthly)) {
          let sumLoanPreDeduction;
          sumLoanPreDeduction = this.calulateLoanMonthly + this.calculateInterestLoanMonthly;
          return sumLoanPreDeduction;
        } else {
          let sumLoanPreDeduction = 0;
          return sumLoanPreDeduction;
        }
      },
      calculateSumLoanPostDeduction() {
        if (!Number.isNaN(this.calulateLoanMonthly)) {
          let sumLoanPostDeduction;
          sumLoanPostDeduction = this.calulateLoanMonthly + this.calculateInterestLoanMonthlyDeduction;
          return sumLoanPostDeduction;
        } else {
          let sumLoanPostDeduction = 0;
          return sumLoanPostDeduction;
        }
      },
      calculateMortgageMonthly() {
        let mortgageMonthly;
        mortgageMonthly = this.calculatePropertyLoan * 0.02 / 12;
        return mortgageMonthly;
      },
      calculateInterestMortgageMonthly() {
        let interestMortgageMonthly;
        interestMortgageMonthly = (this.calculatePropertyLoan * this.interestMortgage / 12) / 100;
        return interestMortgageMonthly;
      },
      calculateInterestMortgageMonthlyDeduction() {
        let interestMortgageMonthlyDeduction;
        interestMortgageMonthlyDeduction = this.calculateInterestMortgageMonthly * 0.7;
        return interestMortgageMonthlyDeduction;
      },
      calculateSumMortgagePreDeduction() {
        let sumMortgagePreDeduction;
        sumMortgagePreDeduction = this.calculateMortgageMonthly + this.calculateInterestMortgageMonthly;
        return sumMortgagePreDeduction;
      },
      calculateSumMortgagePostDeduction() {
        let sumMortgagePostDeduction;
        sumMortgagePostDeduction = this.calculateMortgageMonthly + this.calculateInterestMortgageMonthlyDeduction;
        return sumMortgagePostDeduction;
      },
      calculateOperatingCostMonthly() {
        let operatingCostMonthly;
        operatingCostMonthly = this.operatingCost / 12;
        return operatingCostMonthly;
      },
      calculateSumTotalPreDeduction() {
        let sumTotalPreDeduction;
        sumTotalPreDeduction = this.calculateSumLoanPreDeduction + this.calculateSumMortgagePreDeduction + this.calculateOperatingCostMonthly;
        return sumTotalPreDeduction;
      },
      calculateSumTotalPostDeduction() {
        let sumTotalPostDeduction;
        sumTotalPostDeduction = this.calculateSumLoanPostDeduction + this.calculateSumMortgagePostDeduction + this.calculateOperatingCostMonthly;
        return sumTotalPostDeduction;
      },
    },
    methods: {
      calulateMissingDownPayment() {
        this.missedMoney;
        this.missedMoney = this.calculatePropertyDownPayment - this.savings
        console.log(this.missedMoney);
        
        if (this.savings >= this.calculatePropertyDownPayment) {
          this.goodEconomy = true
        } else this.badEconomy = true
      },
      takePersonalLoan() {
        this.personalLoan = true
      },
      takeHouseLoan() {
        this.houseLoan = true
      },
    }
}
</script>

<style scoped>


</style>