public class Usuario {
    private int idUsuario;
    private String loginUsuario;
    private String senhaUsuario;
    private String setorUsuario;

    // Construtor
    public Usuario(int idUsuario, String loginUsuario, String senhaUsuario, String setorUsuario) {
        this.idUsuario = idUsuario;
        this.loginUsuario = loginUsuario;
        this.senhaUsuario = senhaUsuario;
        this.setorUsuario = setorUsuario;
    }
}
