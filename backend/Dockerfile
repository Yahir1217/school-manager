# Imagen base para ejecutar .NET apps
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5239

# Imagen para build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiamos primero solo el archivo .csproj y restauramos dependencias
COPY backend.csproj . 
RUN dotnet restore

# Ahora copiamos todo el código fuente
COPY . .

# Publicamos la app en modo Release
RUN dotnet publish -c Release -o /app/publish

# Imagen final
FROM base AS final
WORKDIR /app

# Instalamos cliente de MySQL para usar mysqladmin
RUN apt-get update && apt-get install -y default-mysql-client

# Copiamos la app publicada
COPY --from=build /app/publish .

# Copiamos el script de espera y le damos permisos
COPY wait-for-mysql.sh /wait-for-mysql.sh
RUN chmod +x /wait-for-mysql.sh

# Ejecutamos el script para esperar MySQL antes de arrancar la app
ENTRYPOINT ["/wait-for-mysql.sh", "mysql", "dotnet", "backend.dll"]
