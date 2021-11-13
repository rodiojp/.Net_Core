namespace DependencyLibrary.Interfaces
{
    public interface IOrderManager
    {
        void Submit(Product product, string creditCardNumber, string expiryDate);
    }
}