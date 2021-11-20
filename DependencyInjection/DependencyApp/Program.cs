using System;
using DependencyLibrary;
using DependencyLibrary.Interfaces;
// This library adds Extesions ServiceProviderServiceExtensions for IServiceProvider interface
using Microsoft.Extensions.DependencyInjection;

namespace DependencyApp
{
    class Program
    {
        private static void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IPrintProcessor, ConsolePrintProcessor>();
            services.AddSingleton<IProductStockRepo, ProductStockRepo>();
            services.AddSingleton<IPaymentProcessor, PaymentProcessor>();
            services.AddSingleton<IShippingProcessor, ShippingProcessor>();
            services.AddSingleton<IOrderManager, OrderManager>();
        }

        static void Main(string[] args)
        {
            #region Create Container
            // Microsoft.Extensions.DependencyInjection -> ServiceCollection()
            ServiceCollection serviceCollection = new ServiceCollection();
            // Call static void ConfigureServices(IServiceCollection services)
            ConfigureServices(serviceCollection);
            // Create service provider
            // Defines a mechanism for retrieving a service object; that is, an object that provides custom support to other objects.
            // System -> public interface IServiceProvider and Microsoft.Extensions.DependencyInjection -> BuildServiceProvider()
            IServiceProvider serviceProvider = serviceCollection.BuildServiceProvider();
            #endregion

            var product = string.Empty;
            IOrderManager orderManager = serviceProvider.GetService<IOrderManager>();
            do
            {
                IProductStockRepo productStockRepo = serviceProvider.GetService<IProductStockRepo>();
                productStockRepo.PrintStock(serviceProvider.GetService<IPrintProcessor>());
                Console.Write("Enter `exit` or a product #: ");
                    //$"\n{Product.Keyboard} = {((byte)Product.Keyboard)}," +
                    //$"\n{Product.Mouse} = {((byte)Product.Mouse)}," +
                    //$"\n{Product.Mic} = {((byte)Product.Mic)}," +
                    //$"\n{Product.Speaker} = {((byte)Product.Speaker)}");

                product = Console.ReadLine();
                if (product.Contains("exit",StringComparison.InvariantCultureIgnoreCase)) break;
                try
                {
                    // The same implementation as:
                    // if (Enum.TryParse<Product>(product, out Product productEnum))
                    if (Enum.TryParse(product, out Product productEnum))
                    {
                        Console.WriteLine("Please enter a valid payment method: XXXX XXXX XXXX XXXX;MMYY");
                        var paymentMethod = Console.ReadLine();
                        if (string.IsNullOrEmpty(paymentMethod) || paymentMethod.Split(";").Length != 2)
                        {
                            throw new Exception("Payment method is invalid");
                        }
                        orderManager.Submit(productEnum, paymentMethod.Split(";")[0], paymentMethod.Split(";")[1]);
                    }
                    else
                    {
                        Console.WriteLine("Invalid product");
                    }
                }
                catch (System.Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
                Console.WriteLine(Environment.NewLine);
            } while (true);
        }
    }
}
