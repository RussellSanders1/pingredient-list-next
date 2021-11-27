import {AmountI, Measurement} from '../lib/types';

const AmountCell = (amount: AmountI) => `${amount.value} ${Measurement[amount.measurement]}`;

 export default AmountCell;