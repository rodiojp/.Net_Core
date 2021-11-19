namespace DependencyLibrary.Interfaces
{
    public interface IProductStockRepo
    {
        void AddStock(Product product);
        bool IsInStock(Product product);
        void PrintStock(IPrintProcessor printer);
        void ReduceStock(Product product);
    }
}