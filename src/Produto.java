import java.util.Date;

public class Produto {
    private int idProduto;
    private String nome;
    private double precoCompra;
    private double precoVenda;
    private int codigoBarra;
    private Date dataValidade;
    private int idFornecedor;

    // Construtor
    public Produto(int idProduto, String nome, double precoCompra, double precoVenda, int codigoBarra, Date dataValidade, int idFornecedor) {
        this.idProduto = idProduto;
        this.nome = nome;
        this.precoCompra = precoCompra;
        this.precoVenda = precoVenda;
        this.codigoBarra = codigoBarra;
        this.dataValidade = dataValidade;
        this.idFornecedor = idFornecedor;
    }
}