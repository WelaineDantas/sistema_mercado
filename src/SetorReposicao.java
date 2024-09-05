import java.util.Date;

public class SetorReposicao {
    private int idReposicao;
    private int idDeposito;
    private int quantidade;
    private int idProduto;
    private Date dataValidade;
    private Date dataReposicao;

    // Construtor
    public SetorReposicao(int idReposicao, int idDeposito, int quantidade, int idProduto, Date dataValidade, Date dataReposicao) {
        this.idReposicao = idReposicao;
        this.idDeposito = idDeposito;
        this.quantidade = quantidade;
        this.idProduto = idProduto;
        this.dataValidade = dataValidade;
        this.dataReposicao = dataReposicao;
    }
}