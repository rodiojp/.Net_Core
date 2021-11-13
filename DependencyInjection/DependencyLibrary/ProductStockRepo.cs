using System;
using System.Collections.Generic;
using DependencyLibrary.Interfaces;

namespace DependencyLibrary
{

    public class ProductStockRepo : IProductStockRepo
    {
        private static Dictionary<Product, int> _productStockDatabase = SetupOfStock();
        private static Dictionary<Product, int> SetupOfStock()
        {
            Dictionary<Product, int> productStockDatabase = new Dictionary<Product, int>()
                {
                    {Product.Keyboard, 1},
                    {Product.Mic,1},
                    {Product.Mouse,1},
                    {Product.Speaker,1},
                };
            return productStockDatabase;
        }
        public bool IsInStock(Product product)
        {
            Console.WriteLine($"Call get database for product: {product}");
            return _productStockDatabase[product] > 0;
        }

        public void ReduceStock(Product product)
        {
            Console.WriteLine($"Call Update (reduce) the Database for product: {product}");
            _productStockDatabase[product]--;
        }
        public void PrintStock()
        {
            Console.WriteLine($"Products available in Stock:");
            foreach (var item in _productStockDatabase)
            {
                Console.WriteLine($"{item.Key} = {item.Value}");
            }
        }
        public void AddStock(Product product)
        {
            Console.WriteLine($"Call Update (add) the Database for product: {product}");
            _productStockDatabase[product]--;
        }
    }
}