import java.util.Date;

public class Deposito {
    private int idDeposito;
    private int idProduto;
    private int quantidadeEmEstoque;
    private Date dataRecebimento;

    // Construtor
    public Deposito(int idDeposito, int idProduto, int quantidadeEmEstoque, Date dataRecebimento) {
        this.idDeposito = idDeposito;
        this.idProduto = idProduto;
        this.quantidadeEmEstoque = quantidadeEmEstoque;
        this.dataRecebimento = dataRecebimento;
    }
}
