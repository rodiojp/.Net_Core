using System;
using DependencyLibrary.Interfaces;

namespace DependencyLibrary
{
    public class ConsolePrintProcessor : IPrintProcessor
    {
        public void Print(Product product, int value)
        {
            Console.WriteLine($"{product.ToString().PadRight(9)}\t=\t{((byte)product)}\t=>\t{value}");
        }
    }
}