import { DonationsModel } from '../models/mysql/donations.js'

export class DonationsController {

     // Method to register a new donation
     static async registerNewDonation(req, res)
     {
         const { amount, donor_id, type_id, comment, sector_id } = req.body;
 
         try
         {
             const donationRegister = await DonationsModel.registerNewDonation(amount, donor_id, type_id, comment, sector_id);
 
             if (donationRegister)
             {
                 res.status(200).json({ message: 'Donation register succesfully' });
             }
             else
             {
                 res.status(500).json({ message: 'Failed to register donation'});
             }
         }
         catch(error)
         {
             console.error('Error register donation:', error);
             res.status(500).json({ message: 'Error register donation' });
         }
     }

    // Method to get all donations
     static async getAll(_req, res) 
     {
        try
        {
            const donations = await DonationsModel.getAll();

            res.status(200).json(donations);
        }
        catch (error)
        {
            console.error('Error fetching donations:', error);
            res.status(500).json({ message: 'Failed to fetch donations' });
        }
     }
}