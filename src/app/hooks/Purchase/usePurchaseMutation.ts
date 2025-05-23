import useSWRMutation from 'swr/mutation';
import { postPurchase } from '@/app/api/purchase';

interface MaterialItem  {
    material_id: string;
    material_name: string;
    amount: number;
    costPrice: number;
    total_price: number;
  };
  
interface PurchasePayload  {
    purchase_details: MaterialItem[];
    total_money: number;
    vat: number;
    amount_paid: number;
    remaining_payment: number;
    paymentMethod: string;
  };
const usePurchaseMutation = () => {
  return useSWRMutation('/api/purchase', (_url: string, { arg }: { arg: PurchasePayload }) => 
    {
        return  postPurchase(arg);
    });
};

export default usePurchaseMutation;
