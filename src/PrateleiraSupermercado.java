import java.util.Date;

public class PrateleiraSupermercado {
    private int idPrateleira;
    private int idProduto;
    private double precoVenda;
    private int quantidade;
    private Date dataValidade;

    // Construtor
    public PrateleiraSupermercado(int idPrateleira, int idProduto, double precoVenda, int quantidade, Date dataValidade) {
        this.idPrateleira = idPrateleira;
        this.idProduto = idProduto;
        this.precoVenda = precoVenda;
        this.quantidade = quantidade;
        this.dataValidade = dataValidade;
    }
}
