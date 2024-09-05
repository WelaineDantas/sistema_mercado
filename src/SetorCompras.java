public class SetorCompras {
    private int idCompras;
    private int idFornecedor;
    private int idProduto;
    private int quantidade;
    private double precoCompra;

    // Construtor
    public SetorCompras(int idCompras, int idFornecedor, int idProduto, int quantidade, double precoCompra) {
        this.idCompras = idCompras;
        this.idFornecedor = idFornecedor;
        this.idProduto = idProduto;
        this.quantidade = quantidade;
        this.precoCompra = precoCompra;
    }
}
