using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) {}

        public DbSet<Instituto> Institutos { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Grado> Grados { get; set; }
        public DbSet<Grupo> Grupos { get; set; }
        public DbSet<Materia> Materias { get; set; }
        public DbSet<Horario> Horarios { get; set; }
        public DbSet<Calificacion> Calificaciones { get; set; }
        public DbSet<Avance> Avances { get; set; }
        public DbSet<Documento> Documentos { get; set; }
        public DbSet<Notificacion> Notificaciones { get; set; }
        public DbSet<Antecedente> Antecedentes { get; set; }
        public DbSet<LogroReporte> LogrosReportes { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Ejemplo: restringir longitud de campos, enum como string, etc.
            modelBuilder.Entity<Usuario>()
                .Property(u => u.Rol)
                .HasMaxLength(50);
        }
    }
}
