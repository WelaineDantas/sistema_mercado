import java.util.Date;

public class Cliente {
    private int idCliente;
    private String nome;
    private String contato;
    private int idProduto;
    private int idVenda;
    private String endereco;
    private int quantidadeComprada;
    private Date dataCompra;

    // Construtor
    public Cliente(int idCliente, String nome, String contato, int idProduto, int idVenda, String endereco, int quantidadeComprada, Date dataCompra) {
        this.idCliente = idCliente;
        this.nome = nome;
        this.contato = contato;
        this.idProduto = idProduto;
        this.idVenda = idVenda;
        this.endereco = endereco;
        this.quantidadeComprada = quantidadeComprada;
        this.dataCompra = dataCompra;
    }
}
