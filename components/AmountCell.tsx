import { AmountI } from '../lib/models/amount';
import Measurement from '../lib/types/measurement';

const AmountCell = (amount: AmountI) => `${amount.value} ${Measurement[amount.measurement]}`;

export default AmountCell;