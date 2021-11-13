using System;
using DependencyLibrary.Interfaces;

namespace DependencyLibrary
{
    public class ShippingProcessor : IShippingProcessor
    {
        private readonly IProductStockRepo _productStockRepo;

        public ShippingProcessor(IProductStockRepo productStockRepo)
        {
            _productStockRepo = productStockRepo ?? throw new ArgumentNullException(nameof(productStockRepo));
        }
        public void MailProduct(Product product)
        {
            _productStockRepo.ReduceStock(product);
            Console.WriteLine("Call to Shipping Processor API");
        }
    }
}