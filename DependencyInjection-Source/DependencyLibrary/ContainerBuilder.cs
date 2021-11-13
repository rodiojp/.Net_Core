using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DependencyLibrary.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace DependencyLibrary
{
    public class ContainerBuilder
    {
        public IServiceProvider Build()
        {
            ServiceCollection container = new ServiceCollection();
            container.AddSingleton<IProductStockRepo, ProductStockRepo>();
            container.AddSingleton<IPaymentProcessor, PaymentProcessor>();
            container.AddSingleton<IShippingProcessor, ShippingProcessor>();
            container.AddSingleton<IOrderManager, OrderManager>();
            return container.BuildServiceProvider();
        }
    }
}
