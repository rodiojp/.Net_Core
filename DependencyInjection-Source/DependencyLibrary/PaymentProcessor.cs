using System;
using DependencyLibrary.Interfaces;

namespace DependencyLibrary
{
    public class PaymentProcessor : IPaymentProcessor
    {
        public void ChargeCreditCard(string creditCardNumber, string expiryDate)
        {
            if (string.IsNullOrEmpty(creditCardNumber) || string.IsNullOrEmpty(expiryDate))
            {
                throw new Exception("Credit Card Number or Expiry Date are empty strings");
            }
            Console.WriteLine("Call to Credit Card API");
        }
    }
}