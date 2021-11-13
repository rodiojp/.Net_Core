using System;
using DependencyLibrary;
using DependencyLibrary.Interfaces;
// This library adds Extesions ServiceProviderServiceExtensions for IServiceProvider interface
using Microsoft.Extensions.DependencyInjection;

namespace DependencyApp
{
    class Program
    {
        //namespace System
        //{
        //    //
        //    // Summary:
        //    //     Defines a mechanism for retrieving a service object; that is, an object that
        //    //     provides custom support to other objects.
        //    public interface IServiceProvider
        public static readonly IServiceProvider Container = new ContainerBuilder().Build();

        static void Main(string[] args)
        {
            var product = string.Empty;
            IOrderManager orderManager = Container.GetService<IOrderManager>();
            do
            {
                Console.WriteLine("Enter a product:" +
                    $"\n{Product.Keyboard} = {((byte)Product.Keyboard)}," +
                    $"\n{Product.Mouse} = {((byte)Product.Mouse)}," +
                    $"\n{Product.Mic} = {((byte)Product.Mic)}," +
                    $"\n{Product.Speaker} = {((byte)Product.Speaker)}");

                product = Console.ReadLine();
                if (product == "exit") break;
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
