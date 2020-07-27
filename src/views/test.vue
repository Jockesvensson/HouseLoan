<template>
    <div class="">
        <div class="test-container">
            <div class="left-container">
                <div class="loan-container">
                    <div class="loan-text">Ditt lån</div>
                </div>
                <div class="my-loan-container">
                    <div class="price-wrapper">
                        <div class="price-text">Bostadens pris</div>
                        <div class="price-number">
                            <!-- <input v-model="propertyPrice" class="price-input" type="text" placeholder="" required> <span class="currency">kr</span> -->
                            <vue-numeric separator="space" v-model="propertyPrice" :max="16000000" class="price-input"></vue-numeric><span class="currency">kr</span>
                        </div>
                        <div class="question-mark">
                            <button @click="showHelpText(index = 0)" class="question-btn btn">?</button>
                        </div>
                    </div>
                    <div class="price-changer-wrapper">
                        <div class="">
                            <range-slider class="slider" min="0" max="16000000" v-model="propertyPrice"/>
                        </div>
                    </div>
                </div>
                <div class="loan-number-container secondary-container">
                    <div class="price-wrapper">
                        <div class="price-text">Bolån (85%)</div>
                        <div class="price-number-calc">{{calculatePropertyLoan.toFixed(0) | splitNumber}} kr</div>
                        <div class="question-mark">
                            <button @click="showHelpText(index = 1)" class="question-btn btn">?</button>
                        </div>
                        <div class="price-text">Kontantinsats (15%)</div>
                        <div class="price-number-calc">{{calculatePropertyDownPayment.toFixed(0) | splitNumber}} kr</div>
                        <div class="question-mark">
                            <button @click="showHelpText(index = 2)" class="question-btn btn">?</button>
                        </div>
                    </div>
                </div>
                <div class="interest-Mortgage-container secondary-container">
                    <div class="price-wrapper">
                        <div class="price-text">Ränta på bolånet</div>
                        <div class="price-number">
                            <input v-model="interestMortgage" class="price-input" type="" placeholder=""> <span class="currency">%</span>
                        </div>
                        <div class="question-mark">
                            <button @click="showHelpText(index = 3)" class="question-btn btn">?</button>
                        </div>
                    </div>
                    <div class="price-changer-wrapper">
                        <div class="">
                            <range-slider class="slider" min="0" max="20" step="0.5" v-model="interestMortgage"/>
                        </div>
                    </div>
                </div>
                <div class="operating-cost-container secondary-container">
                    <div class="price-wrapper">
                        <div class="price-text">Driftkostnad</div>
                        <div class="price-number">
                            <vue-numeric separator="space" v-model="operatingCost" class="price-input"></vue-numeric><span class="currency">kr/år</span>
                        </div>
                        <div class="question-mark">
                            <button @click="showHelpText(index = 4)" class="question-btn btn">?</button>
                        </div>
                    </div>
                    <div class="price-changer-wrapper">
                        <div class="">
                            <range-slider class="slider" min="0" max="100000" v-model="operatingCost"/>
                        </div>
                    </div>
                </div>
                <div class="my-downpayment-container secondary-container">
                    <div class="price-wrapper">
                        <div class="price-text">Sparande</div>
                        <div class="price-number">
                            <vue-numeric separator="space" v-model="savings" :max="calculatePropertyDownPayment" class="price-input"></vue-numeric><span class="currency">kr</span>
                        </div>
                        <div class="question-mark">
                            <button @click="showHelpText(index = 5)" class="question-btn btn">?</button>
                        </div>
                    </div>
                    <div class="price-changer-wrapper">
                        <div class="">
                            <range-slider class="slider" :min="0" :max="calculatePropertyDownPayment" v-model="savings"/>
                        </div>
                    </div>
                    <div class="calc-missing-downpayment">
                        <button @click="calulateMissingDownPayment()" class="calculate-btn btn">Beräkna</button>
                        <button @click="removeAllNumbers()" class="calculate-remove-btn btn">Nollställ</button>
                    </div>
                </div>
                <div v-show="badEconomy" class="bad-economy secondary-container">
                    <div class="bad-economy-text">Du har inte tillräckligt med pengar för kontaktinsatsen, vill du ta ett privatlån?</div>
                    <div class="bad-economy-btn-wrapper">
                        <button @click="takePersonalLoan()" class="bad-economy-yes-btn btn">Ja</button>
                        <button @click="takeHouseLoan()" class="bad-economy-no-btn btn">Nej</button>
                    </div>
                </div>
                <div v-show="goodEconomy" class="good-economy secondary-container">
                    <div class="good-economy-text">Du behöver inget privatlån.</div>
                </div>
                <div v-show="personalLoan" class="other-numbers-container secondary-container">
                    <div class="price-wrapper">
                        <div class="price-text">Ränta på privatlånet</div>
                        <div class="price-number">
                            <input v-model="interestLoan" class="price-input" type="" placeholder=""> <span class="currency">%</span>
                        </div>
                        <div class="question-mark">
                            <button @click="showHelpText(index = 6)" class="question-btn btn">?</button>
                        </div>
                    </div>
                    <div class="price-changer-wrapper">
                        <div class="">
                            <range-slider class="slider" min="0" max="20" step="0.5" v-model="interestLoan"/>
                        </div>
                    </div>
                    <div class="price-wrapper">
                        <div class="price-text">Avbetalningstid</div>
                        <div class="price-number">
                            <input v-model="paybackTime" class="price-input" type="" placeholder=""> <span class="currency">månader</span>
                        </div>
                        <div class="question-mark">
                            <button @click="showHelpText(index = 7)" class="question-btn btn">?</button>
                        </div>
                    </div>
                    <div class="price-changer-wrapper">
                        <div class="">
                            <range-slider class="slider" min="6" max="240" step="6" v-model="paybackTime"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right-container">
                <div class="loan-cost-container">
                    <div class="loan-cost-text">Din lånekostnad</div>
                </div>
                <div class="total-cost-container">
                    <div class="total-cost-wrapper">
                        <div class="cost-wrapper-title">
                            <div class="cost-title">Kostnad per månad</div>
                            <div class="cost-question-mark">
                                <button @click="showHelpText(index = 9)" class="question-btn btn">?</button>
                            </div>
                        </div>
                        <div class="cost-wrapper-text">
                            <div class="cost-wrapper-text">
                                <div class="cost-text">Saknad kontantinsats: </div>
                                <div class="cost-number">{{missedMoney.toFixed(0) | splitNumber}} kr</div>
                                <div class="cost-text">Amortering Privatlån: </div>
                                <div class="cost-number">{{calulateLoanMonthly.toFixed(0) | splitNumber}} kr</div>
                                <div class="cost-text">Räntekostnad för privaltlån före skatt: </div>
                                <div class="cost-number">{{calculateInterestLoanMonthly.toFixed(0) | splitNumber}} kr</div>
                                <div class="cost-text">Ränktekostnad för privatlån efter skatt: </div>
                                <div class="cost-number">{{calculateInterestLoanMonthlyDeduction.toFixed(0) | splitNumber}} kr</div>
                                <div class="cost-text highlight">Totalkostnad privatlån före skatt: </div>
                                <div class="cost-number highlight">{{calculateSumLoanPreDeduction.toFixed(0) | splitNumber}} kr</div>
                                <div class="cost-text highlight">Totalkostnad privatlån efter skatt: </div>
                                <div class="cost-number highlight">{{calculateSumLoanPostDeduction.toFixed(0) | splitNumber}} kr</div>
                                <div class="border-line"></div>
                            </div>
                            <div class="cost-text">Amortering Bolån: </div>
                            <div class="cost-number">{{calculateMortgageMonthly.toFixed(0) | splitNumber}} kr</div>
                            <div class="cost-text">Ränta före skatteavdrag: </div>
                            <div class="cost-number">{{calculateInterestMortgageMonthly.toFixed(0) | splitNumber}} kr</div>
                            <div class="cost-text">Ränta efter skatteavdrag: </div>
                            <div class="cost-number">{{calculateInterestMortgageMonthlyDeduction.toFixed(0) | splitNumber}} kr</div>
                            <div class="cost-text">Totalkostnad bostadslån före skatt: </div>
                            <div class="cost-number">{{calculateSumMortgagePreDeduction.toFixed(0) | splitNumber}} kr</div>
                            <div class="cost-text">Totalkostnad bostadslån efter skatt: </div>
                            <div class="cost-number">{{calculateSumMortgagePostDeduction.toFixed(0) | splitNumber}} kr</div>
                            <div class="cost-text">Driftkostnad för hus: </div>
                            <div class="cost-number ">{{calculateOperatingCostMonthly.toFixed(0) | splitNumber}} kr</div>
                            <div class="cost-text highlight">Total kostnad före skatt: </div>
                            <div class="cost-number highlight">{{calculateSumTotalPreDeduction.toFixed(0) | splitNumber}} kr</div>
                            <div class="cost-text highlight">Total kostnad efter skatt: </div>
                            <div class="cost-number highlight">{{calculateSumTotalPostDeduction.toFixed(0) | splitNumber}} kr</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div v-show="showHelp" class="help-container">
            <div @click="closeHelp()" class="close-btn btn">X</div>
            <div class="help-wrapper">
                <div class="help-text">
                    {{helpText[index].text}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueNumeric from 'vue-numeric'
import RangeSlider from 'vue-range-slider'
import 'vue-range-slider/dist/vue-range-slider.css'
export default {
    name: 'Test',
    components: {VueNumeric, RangeSlider},
    data() {
        return {
            index: 0,
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
            showHelp: false,
        }
    },
    computed: {
        helpText() {
            return this.$store.getters.getHelpText;
        },
        calculatePropertyLoan() {
            let propertyLoan;
            propertyLoan = this.propertyPrice * 0.85;
            return propertyLoan;
        },
        calculateMaxSavings() {
            let maxSavings;
            maxSavings = this.downPayment;
            return maxSavings
        },
        calculatePropertyDownPayment() {
            let propertyDownPayment;
            propertyDownPayment = this.propertyPrice * 0.15;
            return propertyDownPayment;
        },
        calulateLoanMonthly() {
            let loanMonthly;
            if (this.paybackTime == 0) {
                loanMonthly = 0
                return loanMonthly
            } else {
                loanMonthly = this.missedMoney / this.paybackTime;
                return loanMonthly;
            }
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
            if (this.calculateSumLoanPreDeduction == 'Infinity') {
                sumTotalPreDeduction = this.calculateSumMortgagePreDeduction + this.calculateOperatingCostMonthly;
                return sumTotalPreDeduction;
            } else {
                sumTotalPreDeduction = this.calculateSumLoanPreDeduction + this.calculateSumMortgagePreDeduction + this.calculateOperatingCostMonthly;
                return sumTotalPreDeduction;
            }
        },
        calculateSumTotalPostDeduction() {
            let sumTotalPostDeduction = 0;
            if (this.calculateSumLoanPostDeduction == 'Infinity') {
                sumTotalPostDeduction = this.calculateSumMortgagePostDeduction + this.calculateOperatingCostMonthly;
                return sumTotalPostDeduction;
            } else {
                sumTotalPostDeduction = this.calculateSumLoanPostDeduction + this.calculateSumMortgagePostDeduction + this.calculateOperatingCostMonthly;
                return sumTotalPostDeduction;
            }
        },
    },
        methods: {
            showHelpText(index) {
                console.log(index);
                this.showHelp = !this.showHelp;
            },
            closeHelp() {
                this.showHelp = false;
            },
            calulateMissingDownPayment() {
                
                // console.log(this.missedMoney);
                
                if (this.savings.toFixed(0) - this.calculatePropertyDownPayment.toFixed(0) >= 0) {
                    this.missedMoney;
                    this.missedMoney = this.calculatePropertyDownPayment.toFixed(0) - this.savings.toFixed(0)
                    this.goodEconomy = true
                    this.badEconomy = false
                } else {
                    this.missedMoney;
                    this.missedMoney = this.calculatePropertyDownPayment.toFixed(0) - this.savings.toFixed(0)
                    this.badEconomy = true
                    this.goodEconomy = false
                }
            },
            removeAllNumbers() {
                // this.propertyPrice = 0;
                // this.downPayment = 0;
                // this.savings = 0;
                // this.missedMoney = 0;
                // this.goodEconomy = false;
                // this.badEconomy = false;
                // this.interestLoan = 0;
                // this.paybackTime = 0;
                // this.interestMortgage = 0;
                // this.personalLoan = false;
                // this.houseLoan = false;
                // this.interestLoanMonthly = 0;
                // this.operatingCost = 0;
                this.$router.go(this.$router.currentRoute);
            },
            takePersonalLoan() {
                this.personalLoan = true
                this.badEconomy = false
            },
            takeHouseLoan() {
                this.badEconomy = false
                this.houseLoan = true
            },
        }
}
</script>

<style scoped lang="scss">

.btn:focus {
    outline: none;
}

.test-container {
    position: relative;
    max-width: 920px;
    margin: 0 auto;
    box-sizing: border-box;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    text-align: left;
}

.left-container {
    flex-grow: 1;
    flex: 0 0 48%;
    margin-right: 20px;
}

@media only screen and (max-width: 767px) {
    .left-container {
        flex: 0 0 100%;
        margin-right: 0px;
    }
}

.right-container {
    flex-grow: 1;
    flex: 0 0 48%;
}

@media only screen and (max-width: 767px) {
    .right-container {
        flex: 0 0 100%;
        margin-top: 10px;
    }
}

.loan-container {
    display: flex;
    align-items: center;
    height: 30px;
    border-radius: 4px 4px 0px 0px;
    border: none;
    background-color: rgba(0, 100, 0, 0.61);
}

.loan-cost-container {
    display: flex;
    align-items: center;
    height: 30px;
    border-radius: 4px 4px 0px 0px;
    border: none;
    background-color: rgba(221, 127, 38, 0.61);
}

.loan-text {
    padding-left: 10px;
    font-size: 12px;
    color: white;
}

.loan-cost-text {
    padding-left: 10px;
    font-size: 12px;
    color: black;
}

.my-loan-container {
    border: 1px solid lightgrey;
}

.secondary-container {
    border-right: 1px solid lightgray;
    border-left: 1px solid lightgray;
    border-bottom: 1px solid lightgrey;
}

.price-wrapper {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    padding-top: 25px;
}

.price-text {
    flex-grow: 1;
    flex: 0 0 40%;
    padding-left: 10px;
    font-size: 12px;
}

@media only screen and (max-width: 319px) {
    .price-text {
        flex: 0 0 35%;
        padding-left: 5px;
    }
}

.price-number {
    position: relative;
    bottom: 10px;
    flex-grow: 1;
    flex: 0 0 45%;
}

@media only screen and (max-width: 319px) {
    .price-number {
        flex: 0 50%;
        padding-left: 5px;
    }
    .price-number-calc {
        flex: 0 50%;
    }
}

.price-number-calc {
    position: relative;
    flex-grow: 1;
    flex: 0 0 45%;
    padding-bottom: 20px;
    font-size: 12px;
}

.question-mark {
    position: relative;
    bottom: 3px;
    text-align: right;
    flex-grow: 1;
    flex: 0 0 10%;
}

.currency {
    font-size: 12px;
    margin-left: 5px;
}

input {
    width: 40%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px 4px 4px 4px;
    box-sizing: border-box;
    resize: vertical;
    text-align: right;
    background-color: rgba(211, 211, 211, 0.377);
    font-size: 12px;
}

@media only screen and (max-width: 479px) {
    input {
        width: 60%;
    }
}

@media only screen and (max-width: 319px) {
    input {
        width: 80%;
    }
}

.question-btn {
    display: inline-block;
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid rgb(211, 163, 59);
    background-color: rgb(211, 163, 59);
}

.price-changer-wrapper {
    height: 50px;
    padding-left: 10px;
    border: 1px solid white;
}

.calc-missing-downpayment {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}

.calculate-btn {
    height: 25px;
    margin: 5px;
    cursor: pointer;
    border-radius: 4px 4px 4px 4px;
    border: none;
    background-color: rgba(0, 100, 0, 0.61);
    color: white;
}
.calculate-remove-btn {
    height: 25px;
    margin: 5px;
    cursor: pointer;
    border-radius: 4px 4px 4px 4px;
    border: none;
    background-color: rgb(221, 13, 13);
    color: white;
}

.good-economy {
    padding: 10px 10px 10px 10px;
    text-align: center;
}

.good-economy-text {
    color: rgba(0, 100, 0, 0.61);
}

.bad-economy {
    text-align: center;
    padding: 10px 10px 0px 10px;
}

.bad-economy-text {
    font-size: 12px;
}

.bad-economy-btn-wrapper {
    display: flex;
    justify-content: center;
    margin: 10px;
}

.bad-economy-yes-btn {
    height: 25px;
    width: 40px;
    margin: 5px;
    cursor: pointer;
    border-radius: 4px 4px 4px 4px;
    border: none;
    background-color: rgba(0, 100, 0, 0.61);
    color: white;
}

.bad-economy-no-btn {
    height: 25px;
    width: 40px;
    margin: 5px;
    cursor: pointer;
    border-radius: 4px 4px 4px 4px;
    border: none;
    background-color: rgb(221, 13, 13);
    color: white;
}

.total-cost-container {
    border: 1px solid lightgrey;
}

.total-cost-wrapper {
    margin: 30px 10px 30px 10px;
    padding-bottom: 5px;
    border-radius: 4px 4px 4px 4px;
    background-color: rgba(211, 211, 211, 0.788);
}

.cost-wrapper-title {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    padding-top: 15px;
}

.cost-title {
    flex-grow: 1;
    flex: 0 0 85%;
    padding-left: 15px;
    margin-bottom: 15px;
    font-size: 20px;
}

@media only screen and (max-width: 479px) {
    .cost-title {
        flex: 0 0 80%;
        font-size: 16px;
    }
}

.cost-question-mark {
    position: relative;
    bottom: 3px;
    text-align: right;
    flex-grow: 1;
    flex: 0 0 10%;
}

.highlight {
    font-weight: 700;
}

.cost-wrapper-text {
    position: relative;
    display: flex;
    flex-wrap: wrap;
}

.cost-text {
    flex-grow: 1;
    flex: 0 0 70%;
    padding-left: 15px;
    margin-bottom: 5px;
    font-size: 12px;
}

@media only screen and (max-width: 479px) {
    .cost-text {
        flex: 0 0 65%;
        font-size: 10px;
    }
}

.cost-number {
    flex-grow: 1;
    flex: 0 0 25%;
    font-size: 12px;
}

@media only screen and (max-width: 479px) {
    .cost-number {
        font-size: 10px;
    }
}

.border-line {
    margin-bottom: 30px;
}

.slider {
    width: 93%;
    bottom: 35px;
}

@media only screen and (max-width: 479px) {
    .slider {
        width: 90%;
    }
}

.help-container {
    position: absolute;
    z-index: 9999;
    left: 50%;
    top: 50%;
    padding: 2px;
    width: 280px;
    background-color: rgb(85, 187, 235);
}

.close-btn {
    position: absolute;
    right: 3%;
    top: 8%;
    cursor: pointer;
    font-size: 12px;
    font-weight: 900;
    color: red;
}

.help-wrapper {
    border: 1px solid white;
    background-color: white;
    margin-top: 25px;
    padding: 5px;
}

.help-text {
    padding: 5px;
    text-align: left;
    font-size: 12px;
}

</style>