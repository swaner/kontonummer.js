import { BankAccount } from "./bankAccount";

/**
 * Licens: MIT
 * Author: @jop-io, http://jop.io
 */

export class AccountNumberValidator {
    public static validate(number: string) : BankAccount | null {
        var n = number.replace(/\D/g, ''), i, bank;
        
        for (i in banks)
        {
            bank = banks[i];
            if (bank.regex.test(n))
            {
                return this.validateBank(n, bank);
            }
        }

        return null;
    }

    private static validateBank(accnum: string, bank: any) : BankAccount | null {
        let clearing = accnum.substr(0,accnum.charAt(0) === "8" ? 5 : 4);
        
        let number =
            // Samtliga konton av typ 1
            bank.type === 1 ? accnum.substr(-7):
            // Handelsbankens koton av typ 2
            bank.type === 2 && bank.comment === 2 ? accnum.substr(-9):
            // Swedbanks konton av typ 2 
            bank.type === 2 && bank.comment === 3 && accnum.charAt(0) === "8" ? accnum.substr(5):
            // Plusgirots konton av typ 2
            bank.type === 2 && bank.comment === 3 && accnum.charAt(0) === "9" ? accnum.substr(4):
            // Resterande konton av typ 2
            accnum.substr(-10);
        
        let modResult = 
            bank.type === 1 && bank.comment === 1 ? this.mod11((clearing+number).substr(-10)):
            bank.type === 1 && bank.comment === 2 ? this.mod11((clearing+number)):
            bank.type === 2 && bank.comment === 2 ? this.mod11(number):
            this.mod10(number);
        
        return !modResult ? null : {
            bank_name: bank.name,
            clearing_number: clearing,
            account_number: number
        };
    }

    private static mod10(number: string): boolean
    {
        var len = number.length, bit = 1, sum = 0, val, arr = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
        while (len)
        {
            val = parseInt(number.charAt(--len), 10);
            sum += (bit ^= 1) ? arr[val] : val;
        }
        return <boolean>(sum && sum % 10 === 0);
    };

    private static mod11(number: string): boolean
    {
        var len = number.length, sum = 0, val, weights = [1, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
        var arr = weights.splice(weights.length-len, weights.length-(weights.length-len));
        while (len)
        {
            val = parseInt(number.charAt(--len), 10);
            sum += arr[len] * val;
        }
        return <boolean>(sum && sum % 11 === 0);
    }

}

const banks = [{
    name: 'Amfa Bank',
    type: 1,
    comment: 2,
    regex: /^966[0-9]{8}$/
},{
    name: 'Avanza Bank',
    type: 1,
    comment: 2,
    regex: /^95[5-6][0-9]{8}$/
},{
    name: 'BlueStep Finans',
    type: 1,
    comment: 1,
    regex: /^968[0-9]{8}$/
},{
    name: 'BNP Paribas SA.',
    type: 1,
    comment: 2,
    regex: /^947[0-9]{8}$/
},{
    name: 'Citibank',
    type: 1,
    comment: 2,
    regex: /^904[0-9]{8}$/
},{
    name: 'Danske Bank',
    type: 1,
    comment: 1,
    regex: /^(12|13|24)[0-9]{9}$/
},{
    name: 'DNB Bank',
    type: 1,
    comment: 2,
    regex: /^(919|926)[0-9]{8}$/
},{
    name: 'Ekobanken',
    type: 1,
    comment: 2,
    regex: /^970[0-9]{8}$/
},{
    name: 'Erik Penser',
    type: 1,
    comment: 2,
    regex: /^959[0-9]{8}$/
},{
    name: 'Forex Bank',
    type: 1,
    comment: 1,
    regex: /^94[0-4][0-9]{8}$/
},{
    name: 'ICA Banken',
    type: 1,
    comment: 1,
    regex: /^927[0-9]{8}$/
},{
    name: 'IKANO Bank',
    type: 1,
    comment: 1,
    regex: /^917[0-9]{8}$/
},{
    name: 'JAK Medlemsbank',
    type: 1,
    comment: 2,
    regex: /^967[0-9]{8}$/
},{
    name: 'Landshypotek',
    type: 1,
    comment: 2,
    regex: /^939[0-9]{8}$/
},{
    name: 'Lån & Spar Bank Sverige',
    type: 1,
    comment: 1,
    regex: /^963[0-9]{8}$/
},{
    name: 'Länsförsäkringar Bank',
    type: 1,
    comment: 1,
    regex: /^(340|906)[0-9]{8}$/
},{
    name: 'Länsförsäkringar Bank',
    type: 1,
    comment: 2,
    regex: /^902[0-9]{8}$/
},{
    name: 'Marginalen Bank',
    type: 1,
    comment: 1,
    regex: /^923[0-9]{8}$/
},{
    name: 'MedMera Bank',
    type: 1,
    comment: 2,
    regex: /^965[0-9]{8}$/
},{
    name: 'Nordax Bank',
    type: 1,
    comment: 2,
    regex: /^964[0-9]{8}$/
},{
    name: 'Nordea',
    type: 1,
    comment: 1,
    regex: /^(?!3300|3782)(1[1456789][0-9]{2}|20[0-9]{2}|3[0-3][0-9]{2}|34[1-9][0-9]|3[5-9][0-9]{2})[0-9]{7}$/
},{
    name: 'Nordea',
    type: 1,
    comment: 2,
    regex: /^4[0-9]{10}$/
},{
    name: 'Nordnet Bank',
    type: 1,
    comment: 2,
    regex: /^910[0-9]{8}$/
},{
    name: 'Resurs Bank',
    type: 1,
    comment: 1,
    regex: /^928[0-9]{8}$/
},{
    name: 'Riksgälden',
    type: 1,
    comment: 2,
    regex: /^988[0-9]{8}$/
},{
    name: 'Santander Consumer Bank',
    type: 1,
    comment: 1,
    regex: /^946[0-9]{8}$/
},{
    name: 'SBAB',
    type: 1,
    comment: 1,
    regex: /^925[0-9]{8}$/
},{
    name: 'SEB',
    type: 1,
    comment: 1,
    regex: /^(5[0-9]{3}|912[0-4]|91[3-4][0-9])[0-9]{7}$/
},{
    name: 'Skandiabanken',
    type: 1,
    comment: 2,
    regex: /^91[5-6][0-9]{8}$/
},{
    name: 'Swedbank',
    type: 1,
    comment: 1,
    regex: /^7[0-9]{10}$/
},{
    name: 'Ålandsbanken',
    type: 1,
    comment: 2,
    regex: /^23[0-9]{9}$/
},
// TYP 2
{
    name: 'Danske Bank',
    type: 2,
    comment: 1,
    regex: /^918[0-9]{11}$/
},{
    name: 'Handelsbanken',
    type: 2,
    comment: 2,
    regex: /^6[0-9]{12}$/
},{
    name: 'Nordera Plusgirot',
    type: 2,
    comment: 3,
    regex: /^(95[0-4]|996)[0-9]{8,11}$/ // Clearingnr 4 siffror, räkningsnr 7-10 siffror
},{
    name: 'Nordea',
    type: 2,
    comment: 1,
    regex: /^(3300|3782)[0-9]{10}$/
},{
    name: 'Riksgälden',
    type: 2,
    comment: 1,
    regex: /^989[0-9]{11}$/
},{
    name: 'Sparbanken Syd',
    type: 2,
    comment: 1,
    regex: /^957[0-9]{11}$/
},{
    name: 'Swedbank',
    type: 2,
    comment: 3,
    regex: /^8[0-9]{10,14}$/ // Clearingnr 5 siffror, räkningsnr 7-10 siffror
},{
    name: 'Swedbank',
    type: 2,
    comment: 1,
    regex: /^93[0-4][0-9]{11}$/
}];