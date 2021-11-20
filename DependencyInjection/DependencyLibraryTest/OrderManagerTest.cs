using Microsoft.VisualStudio.TestTools.UnitTesting;
using DependencyLibrary;
using System;
using DependencyLibrary.Interfaces;
using Moq;

namespace DependencyLibraryTest
{
    [TestClass]
    public class OrderManagerTest
    {
        [TestMethod]
        [DataRow(Product.Keyboard, "1010101010101010", "0622")]
        [ExpectedException(typeof(Exception), "Keyboard is currently not in stock.")]
        public void OrderManagerSubmitTest(Product product, string creditCardNumber, string expiryDate)
        {
            //Moq.Language.Flow.IReturnsResult<IProductStockRepo>
            var productStockRepoMock = new Mock<IProductStockRepo>();
            productStockRepoMock
                .Setup(m => m.IsInStock(It.IsAny<Product>()))
                .Returns(false);
            var mockPaymentProcessor = new Mock<IPaymentProcessor>();
            var mockMhippingProcessor = new Mock<IShippingProcessor>();
            var mockPrintProcessor = new Mock<IPrintProcessor>();

            // Tests that we expect to return true.
            OrderManager orderManager = new OrderManager(productStockRepoMock.Object, mockPaymentProcessor.Object, mockMhippingProcessor.Object, mockPrintProcessor.Object);
            orderManager.Submit(product, creditCardNumber, expiryDate);
            
            // Sipping the same product to generate availability Exception
            orderManager.Submit(product, creditCardNumber, expiryDate);
        }

    }
}
