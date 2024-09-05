import java.util.Date;

public class Caixa {
    private int idCaixa;
    private int idVenda;
    private int idProduto;
    private int idCliente;
    private int quantidadeVendida;
    private Date dataVenda;

    // Construtor
    public Caixa(int idCaixa, int idVenda, int idProduto, int idCliente, int quantidadeVendida, Date dataVenda) {
        this.idCaixa = idCaixa;
        this.idVenda = idVenda;
        this.idProduto = idProduto;
        this.idCliente = idCliente;
        this.quantidadeVendida = quantidadeVendida;
        this.dataVenda = dataVenda;
    }
}